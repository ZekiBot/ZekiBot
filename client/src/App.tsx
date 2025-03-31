import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./context/AuthContext";
import { PointsProvider } from "./context/PointsContext";

import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import AITools from "@/pages/ai-tools";
import Chat from "@/pages/chat";
import ImageGenerator from "@/pages/image-generator";
import Games from "@/pages/games";
import CodeAssistant from "@/pages/code-assistant";
import Pricing from "@/pages/pricing";
import Admin from "@/pages/admin/index";
import Layout from "@/components/layout/Layout";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/ai-tools" component={AITools} />
        <Route path="/chat" component={Chat} />
        <Route path="/image-generator" component={ImageGenerator} />
        <Route path="/games" component={Games} />
        <Route path="/code-assistant" component={CodeAssistant} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/admin" component={Admin} />
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PointsProvider>
          <Router />
          <Toaster />
        </PointsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
