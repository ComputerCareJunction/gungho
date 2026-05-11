import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/gungho-logo.png';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import en from '../locales/en.json';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="page-content-inset py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <img src={logo} alt={en.navigation.logoAlt} className="h-16 w-auto mb-4" />
            <p className="text-white/60 mb-6 max-w-md">
              {en.footer.brandDescription}
            </p>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full bg-slate-800 hover:bg-primary text-white/70 hover:text-white transition-all flex items-center justify-center">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-slate-800 hover:bg-primary text-white/70 hover:text-white transition-all flex items-center justify-center">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-slate-800 hover:bg-primary text-white/70 hover:text-white transition-all flex items-center justify-center">
                <Linkedin className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-slate-800 hover:bg-primary text-white/70 hover:text-white transition-all flex items-center justify-center">
                <Instagram className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{en.footer.quickLinks}</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="text-white/60 hover:text-primary transition-colors"
                >
                  {en.navigation.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/event-management')}
                  className="text-white/60 hover:text-primary transition-colors"
                >
                  {en.navigation.eventManagement}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/marketing-services')}
                  className="text-white/60 hover:text-primary transition-colors"
                >
                  {en.navigation.marketingServices}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="text-white/60 hover:text-primary transition-colors"
                >
                  {en.navigation.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="text-white/60 hover:text-primary transition-colors"
                >
                  {en.navigation.contactUs}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">{en.footer.contactUs}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/60">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                <span>{en.footer.emails[0]}</span>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                <span>{en.footer.phoneNumbers[0]}</span>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                <span>{en.footer.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} {en.footer.copyright}
          </p>
          <div className="flex gap-6 text-sm">
            <button
              onClick={() => navigate('/privacy-policy')}
              className="text-white/40 hover:text-primary transition-colors"
            >
              {en.footer.privacyPolicy}
            </button>
            <button
              onClick={() => navigate('/terms-of-service')}
              className="text-white/40 hover:text-primary transition-colors"
            >
              {en.footer.termsOfService}
            </button>
            <button
              onClick={() => navigate('/cookie-policy')}
              className="text-white/40 hover:text-primary transition-colors"
            >
              {en.footer.cookiePolicy}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
