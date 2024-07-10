import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RoleProvider } from "./context/RoleContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RoleProvider>
      <React.StrictMode>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => window.location.replace("/")}
        >
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    </RoleProvider>
  </QueryClientProvider>
);
