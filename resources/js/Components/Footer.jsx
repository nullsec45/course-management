import { Link } from '@inertiajs/react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-100 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Course Trading</h3>
            <p className="text-slate-400 text-sm mb-4">
              Platform terbaik untuk belajar dan berbagi pengetahuan tentang trading
            </p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Menu Utama</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Kursus
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Artikel
                </Link>
              </li>
              <li>
                <Link href="/videos" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Video
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Sumber Daya</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Panduan
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Hubungi Kami</h4>
            <div className="space-y-3">
              <div className="flex gap-2 items-start">
                <Mail className="h-5 w-5 mt-0.5 text-slate-400 flex-shrink-0" />
                <a href="mailto:info@coursetrading.com" className="text-slate-400 hover:text-white transition-colors text-sm">
                  info@coursetrading.com
                </a>
              </div>
              <div className="flex gap-2 items-start">
                <Phone className="h-5 w-5 mt-0.5 text-slate-400 flex-shrink-0" />
                <a href="tel:+62123456789" className="text-slate-400 hover:text-white transition-colors text-sm">
                  +62 (123) 456-789
                </a>
              </div>
              <div className="flex gap-2 items-start">
                <MapPin className="h-5 w-5 mt-0.5 text-slate-400 flex-shrink-0" />
                <p className="text-slate-400 text-sm">
                  Jakarta, Indonesia
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              &copy; {currentYear} Course Trading. Semua hak dilindungi.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Kebijakan Privasi
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Syarat & Ketentuan
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
