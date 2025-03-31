const HowItWorks = () => {
  return (
    <section className="py-16 bg-dark-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
            Nasıl{" "}
            <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              Çalışır
            </span>
            ?
          </h2>
          <p className="text-light-muted max-w-2xl mx-auto">
            ZekiBot'u kullanmak için sadece birkaç basit adım izlemeniz yeterli.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mb-4 relative">
              <span className="text-primary font-poppins font-bold text-xl">
                1
              </span>
              <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 hidden md:block">
                <i className="fas fa-arrow-right text-dark-lighter text-2xl"></i>
              </div>
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-3">
              Ücretsiz Kayıt Olun
            </h3>
            <p className="text-light-muted">
              E-posta adresinizle veya sosyal medya hesaplarınızla hızlıca kayıt
              olabilirsiniz.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-secondary bg-opacity-20 flex items-center justify-center mb-4 relative">
              <span className="text-secondary font-poppins font-bold text-xl">
                2
              </span>
              <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 hidden md:block">
                <i className="fas fa-arrow-right text-dark-lighter text-2xl"></i>
              </div>
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-3">
              İstediğiniz Özelliği Seçin
            </h3>
            <p className="text-light-muted">
              Sohbet, görsel oluşturma, oyun veya kod yazma özelliklerinden
              birini seçin.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-accent bg-opacity-20 flex items-center justify-center mb-4">
              <span className="text-accent font-poppins font-bold text-xl">
                3
              </span>
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-3">
              Yapay Zekanın Gücünü Keşfedin
            </h3>
            <p className="text-light-muted">
              Yapay zeka destekli araçları kullanarak yaratıcılığınızı ve
              üretkenliğinizi artırın.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
