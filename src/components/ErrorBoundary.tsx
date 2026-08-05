import { Component, ErrorInfo, ReactNode } from "react";
import { reportError } from "@/lib/errorLogging";

type Props = { children: ReactNode };
type State = { error: Error | null };

/**
 * Catches render-time crashes so visitors never see a blank screen.
 * Renders a branded fallback with a reload action instead.
 */
class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Surfaces in the browser console for diagnostics.
    console.error("App crashed:", error);
    void reportError(error, "react", info.componentStack ?? undefined);
  }


  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="font-heading text-2xl font-bold mb-3">
            Something went wrong
          </h1>
          <p className="text-muted-foreground mb-6">
            The page could not be displayed. Please reload to try again.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="min-h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold"
          >
            Reload page
          </button>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
