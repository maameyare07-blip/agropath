import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Loader2, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import AgroPathLogo from "@/components/AgroPathLogo";
import Wordmark from "@/components/Wordmark";
import Seo from "@/components/Seo";

type AuthorizationDetails = {
  client?: { name?: string; client_name?: string; redirect_uri?: string } | null;
  redirect_url?: string;
  redirect_to?: string;
  scope?: string;
  scopes?: string[];
};

type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  approveAuthorization: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  denyAuthorization: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
};

const oauthApi = () => (supabase.auth as unknown as { oauth: OAuthApi }).oauth;

const SCOPE_LABELS: Record<string, string> = {
  openid: "Confirm who you are",
  profile: "Share your basic profile",
  email: "Share your email address",
  offline_access: "Stay connected until you disconnect it",
};

const OAuthConsent = () => {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id");

  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [details, setDetails] = useState<AuthorizationDetails | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!authorizationId) {
        setError("This authorization link is incomplete. Please start the connection again.");
        setLoading(false);
        return;
      }

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        const next = window.location.pathname + window.location.search;
        window.location.replace(`/admin/login?next=${encodeURIComponent(next)}`);
        return;
      }
      if (cancelled) return;
      setAccount(userData.user.email ?? null);

      try {
        const { data, error: detailsError } = await oauthApi().getAuthorizationDetails(authorizationId);
        if (cancelled) return;
        if (detailsError) {
          setError(detailsError.message);
        } else {
          const redirect = data?.redirect_url ?? data?.redirect_to;
          if (redirect && !data?.client) {
            window.location.replace(redirect);
            return;
          }
          setDetails(data);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not load this request.");
      }
      if (!cancelled) setLoading(false);
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [authorizationId]);

  const decide = async (approve: boolean) => {
    if (!authorizationId) return;
    setWorking(true);
    setError(null);
    try {
      const api = oauthApi();
      const { data, error: decisionError } = approve
        ? await api.approveAuthorization(authorizationId)
        : await api.denyAuthorization(authorizationId);
      if (decisionError) {
        setError(decisionError.message);
        setWorking(false);
        return;
      }
      const redirect = data?.redirect_url ?? data?.redirect_to;
      if (redirect) {
        window.location.replace(redirect);
        return;
      }
      setError("The request completed but no return address was provided.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    }
    setWorking(false);
  };

  const clientName = details?.client?.name ?? details?.client?.client_name ?? "An application";
  const scopes = details?.scopes ?? (details?.scope ? details.scope.split(/\s+/).filter(Boolean) : []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <Seo title="Authorize access | AgroPath" description="Approve or deny an application requesting access." path="/.lovable/oauth/consent" noindex />
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 justify-center mb-8">
          <AgroPathLogo className="w-7 h-7" />
          <Wordmark className="font-heading font-bold text-xl" />
        </Link>

        <div className="bg-card border border-border rounded-2xl shadow-sm p-8">
          {loading ? (
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-4 text-primary">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-sm font-medium">Authorization request</span>
              </div>

              <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
                Connect {clientName} to AgroPath
              </h1>
              {account && (
                <p className="text-sm text-muted-foreground mb-4">Signed in as {account}</p>
              )}

              {error ? (
                <p className="text-sm text-destructive mb-6">{error}</p>
              ) : (
                <>
                  <p className="text-sm text-foreground mb-4">
                    This lets {clientName} use this app as you.
                  </p>
                  {details?.client?.redirect_uri && (
                    <p className="text-xs text-muted-foreground mb-4 break-all">
                      Returns to: {details.client.redirect_uri}
                    </p>
                  )}
                  {scopes.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {scopes.map((scope) => (
                        <li key={scope} className="text-sm text-muted-foreground">
                          • {SCOPE_LABELS[scope] ?? `Additional permission requested: ${scope}`}
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="text-xs text-muted-foreground mb-6">
                    This does not bypass this app's permissions or backend policies.
                  </p>
                </>
              )}

              <div className="flex flex-col gap-3">
                <Button onClick={() => decide(true)} disabled={working || !!error} className="w-full min-h-[44px]">
                  {working ? <Loader2 className="w-4 h-4 animate-spin" /> : "Approve"}
                </Button>
                <Button
                  onClick={() => decide(false)}
                  variant="outline"
                  disabled={working || !authorizationId}
                  className="w-full min-h-[44px]"
                >
                  Cancel connection
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OAuthConsent;
