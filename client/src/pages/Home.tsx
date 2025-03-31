import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorks from "@/components/home/HowItWorks";
import CallToAction from "@/components/home/CallToAction";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>ZekiBot - Yapay Zeka Destekli Çok Amaçlı Web Platformu</title>
        <meta
          name="description"
          content="ZekiBot - Yapay zeka ile sohbet edin, görsel oluşturun, oyun oynayın ve kod yazın. Herkes için kullanıcı dostu bir platform."
        />
        <meta
          name="keywords"
          content="yapay zeka, sohbet, görsel oluşturma, oyun, kodlama, yaşlılar, çocuklar, internet öğrenenler"
        />
      </Helmet>
      
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <CallToAction />
    </>
  );
};

export default Home;
