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

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-dark text-light font-inter">
      <Header />
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

// Routes component wrapped within App, so useAuth hook works properly
function AppRoutes() {
  // Temporarily using mock data for development
  const user = { id: 1, username: "Test", points: 100, isAdmin: true }; 
  const isAdmin = true;

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/sohbet" component={AiChat} />
      <Route path="/gorsel-olusturma" component={ImageGeneration} />
      <Route path="/oyunlar" component={Games} />
      <Route path="/kod-yazma" component={CodeAssistant} />
      {user && <Route path="/profil" component={Dashboard} />}
      {isAdmin && <Route path="/admin" component={Admin} />}
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
