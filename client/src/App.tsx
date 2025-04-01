import { Switch, Route } from "wouter";
import NotFound from "./pages/not-found";
import Home from "./pages/Home";
import AiChat from "./pages/AiChat";
import ImageGeneration from "./pages/ImageGeneration";
import Games from "./pages/Games";
import CodeAssistant from "./pages/CodeAssistant";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Cookies from "./pages/Cookies";
import Copyright from "./pages/Copyright";
import Faq from "./pages/Faq";
import HelpCenter from "./pages/HelpCenter";
import Feedback from "./pages/Feedback";
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
  const { user, isAdmin } = useAuth();

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/sohbet" component={AiChat} />
      <Route path="/gorsel-olusturma" component={ImageGeneration} />
      <Route path="/oyunlar" component={Games} />
      <Route path="/kod-yazma" component={CodeAssistant} />
      {user && <Route path="/profil" component={Dashboard} />}
      {isAdmin && <Route path="/admin" component={Admin} />}
      
      {/* Bilgi Sayfaları */}
      <Route path="/hakkimizda" component={About} />
      <Route path="/gizlilik-politikasi" component={Privacy} />
      <Route path="/kullanim-sartlari" component={Terms} />
      <Route path="/iletisim" component={Contact} />
      <Route path="/cerez-politikasi" component={Cookies} />
      <Route path="/telif-hakki" component={Copyright} />
      
      {/* Destek Sayfaları */}
      <Route path="/sikca-sorulan-sorular" component={Faq} />
      <Route path="/yardim-merkezi" component={HelpCenter} />
      <Route path="/geri-bildirim" component={Feedback} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
