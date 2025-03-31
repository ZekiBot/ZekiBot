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
import { useAuth } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";

function Router() {
  // Temporary mock data for development - remove in production
  const user = { id: 1, username: "Test", points: 100, isAdmin: true }; 
  const isAdmin = true;

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
    <div className="flex flex-col min-h-screen bg-dark text-light font-inter">
      <Header />
      <main className="flex-grow">
        <Router />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
