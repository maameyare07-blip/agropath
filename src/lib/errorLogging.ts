import { supabase } from "@/integrations/supabase/client";

type ErrorSource = "window" | "unhandledrejection" | "react";

const APP_VERSION = import.meta.env.MODE;
const reported = new Set<string>();

/**
 * Sends a runtime error to the backend so mobile blank-screen crashes are
 * captured with stack traces. Fails silently — logging must never crash the app.
 */
export async function reportError(
  error: unknown,
  source: ErrorSource = "window",
  extra?: string,
) {
  try {
    const err = error as { message?: string; stack?: string } | undefined;
    const message = String(err?.message ?? error ?? "Unknown error").slice(0, 2000);
    const stack = [err?.stack, extra].filter(Boolean).join("\n\n").slice(0, 8000) || null;

    // De-duplicate identical errors within a session (e.g. render loops).
    const key = `${source}:${message}:${stack?.slice(0, 200) ?? ""}`;
    if (reported.has(key)) return;
    reported.add(key);

    await supabase.from("client_errors").insert({
      message,
      stack,
      source,
      route: typeof window !== "undefined" ? window.location.pathname + window.location.search : null,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
      viewport:
        typeof window !== "undefined"
          ? `${window.innerWidth}x${window.innerHeight} dpr=${window.devicePixelRatio}`
          : null,
      app_version: APP_VERSION,
    });
  } catch {
    // Never let error reporting throw.
  }
}

let installed = false;

/** Installs global handlers for uncaught errors and rejected promises. */
export function initErrorLogging() {
  if (installed || typeof window === "undefined") return;
  installed = true;

  window.addEventListener("error", (event) => {
    const location = event.filename
      ? `at ${event.filename}:${event.lineno}:${event.colno}`
      : undefined;
    void reportError(event.error ?? event.message, "window", location);
  });

  window.addEventListener("unhandledrejection", (event) => {
    void reportError(event.reason, "unhandledrejection");
  });
}
