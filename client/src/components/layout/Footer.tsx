import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-dark-surface pt-12 pb-6 border-t border-dark-lighter">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="text-accent mr-2">
                <i className="fas fa-robot text-2xl"></i>
              </div>
              <h3 className="font-poppins font-bold text-xl bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                ZekiBot
              </h3>
            </div>
            <p className="text-light-muted mb-4">
              Yapay zeka destekli çok amaçlı web platformu. Herkes için
              tasarlanmış kullanıcı dostu arayüz.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="text-light-muted hover:text-primary transition-colors"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="text-light-muted hover:text-primary transition-colors"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="#"
                className="text-light-muted hover:text-primary transition-colors"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="text-light-muted hover:text-primary transition-colors"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-poppins font-semibold text-lg mb-4">
              Özellikler
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/sohbet">
                  <a className="text-light-muted hover:text-light transition-colors">
                    Yapay Zeka Sohbet
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/gorsel-olustur">
                  <a className="text-light-muted hover:text-light transition-colors">
                    Görsel Oluşturma
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/oyunlar">
                  <a className="text-light-muted hover:text-light transition-colors">
                    Yapay Zeka Oyunları
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/kod-yazma">
                  <a className="text-light-muted hover:text-light transition-colors">
                    Kod Yazma
                  </a>
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-light-muted hover:text-light transition-colors"
                >
                  Puan Sistemi
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-poppins font-semibold text-lg mb-4">Destek</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-light-muted hover:text-light transition-colors"
                >
                  Sıkça Sorulan Sorular
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-light-muted hover:text-light transition-colors"
                >
                  Yardım Merkezi
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-light-muted hover:text-light transition-colors"
                >
                  İletişim
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-light-muted hover:text-light transition-colors"
                >
                  Geri Bildirim
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-poppins font-semibold text-lg mb-4">Yasal</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-light-muted hover:text-light transition-colors"
                >
                  Kullanım Şartları
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-light-muted hover:text-light transition-colors"
                >
                  Gizlilik Politikası
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-light-muted hover:text-light transition-colors"
                >
                  Çerez Politikası
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-light-muted hover:text-light transition-colors"
                >
                  Telif Hakkı
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-lighter pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-light-muted text-sm">
              &copy; {new Date().getFullYear()} ZekiBot. Tüm hakları saklıdır.
            </p>
            <div className="mt-4 md:mt-0">
              <select className="bg-dark-lighter border border-dark-lighter rounded px-3 py-1 text-light-muted text-sm focus:border-primary">
                <option value="tr">Türkçe</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
