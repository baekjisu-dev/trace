import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "sonner";

import "./index.css";
import App from "./App.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 60_000,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Toaster />
      <App />
    </QueryClientProvider>
  </BrowserRouter>
);
