import { Link } from "wouter";
import { Brain, Twitter, Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark-surface pt-12 pb-6 border-t border-dark-lighter">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="text-accent mr-2">
                <Brain className="h-6 w-6" />
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
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-light-muted hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-light-muted hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-light-muted hover:text-primary transition-colors"
              >
                <Youtube className="h-5 w-5" />
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
                  <span className="text-light-muted hover:text-light transition-colors cursor-pointer block">
                    Yapay Zeka Sohbet
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/gorsel-olusturma">
                  <span className="text-light-muted hover:text-light transition-colors cursor-pointer block">
                    Görsel Oluşturma
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/oyunlar">
                  <span className="text-light-muted hover:text-light transition-colors cursor-pointer block">
                    Yapay Zeka Oyunları
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/kod-yazma">
                  <span className="text-light-muted hover:text-light transition-colors cursor-pointer block">
                    Kod Yazma
                  </span>
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
                <Link href="/sikca-sorulan-sorular">
                  <span className="text-light-muted hover:text-light transition-colors cursor-pointer block">
                    Sıkça Sorulan Sorular
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/yardim-merkezi">
                  <span className="text-light-muted hover:text-light transition-colors cursor-pointer block">
                    Yardım Merkezi
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/iletisim">
                  <span className="text-light-muted hover:text-light transition-colors cursor-pointer block">
                    İletişim
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/geri-bildirim">
                  <span className="text-light-muted hover:text-light transition-colors cursor-pointer block">
                    Geri Bildirim
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-poppins font-semibold text-lg mb-4">Yasal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/kullanim-sartlari">
                  <span className="text-light-muted hover:text-light transition-colors cursor-pointer block">
                    Kullanım Şartları
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/gizlilik-politikasi">
                  <span className="text-light-muted hover:text-light transition-colors cursor-pointer block">
                    Gizlilik Politikası
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/cerez-politikasi">
                  <span className="text-light-muted hover:text-light transition-colors cursor-pointer block">
                    Çerez Politikası
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/telif-hakki">
                  <span className="text-light-muted hover:text-light transition-colors cursor-pointer block">
                    Telif Hakkı
                  </span>
                </Link>
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
