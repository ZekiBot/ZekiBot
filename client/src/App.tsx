import { Switch, Route } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AiChat from "@/pages/AiChat";
import ImageGeneration from "@/pages/ImageGeneration";
import Games from "@/pages/Games";
import CodeAssistant from "@/pages/CodeAssistant";
import Dashboard from "@/pages/Dashboard";
import Admin from "@/pages/Admin";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { PointsProvider } from "@/context/PointsContext";

function Router() {
  const { user, isAdmin } = useAuth();

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/sohbet" component={AiChat} />
      <Route path="/gorsel-olustur" component={ImageGeneration} />
      <Route path="/oyunlar" component={Games} />
      <Route path="/kod-yazma" component={CodeAssistant} />
      {user && <Route path="/profil" component={Dashboard} />}
      {isAdmin && <Route path="/admin" component={Admin} />}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    // Wrap everything in PointsProvider since it depends on AuthProvider which is higher up in main.tsx
    <PointsProvider>
      <div className="flex flex-col min-h-screen bg-dark text-light font-inter">
        <Header />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
      </div>
    </PointsProvider>
  );
}

export default App;
