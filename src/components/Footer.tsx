import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/gungho-logo.png';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import en from '../locales/en.json';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="relative z-10 border-t border-primary/15 bg-gradient-to-b from-orange-50 via-orange-50 to-amber-50/90">
      <div className="page-content-inset py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <img src={logo} alt={en.navigation.logoAlt} className="h-16 w-auto mb-4" />
            <p className="text-stone-600 mb-6 max-w-md">
              {en.footer.brandDescription}
            </p>
            <div className="flex gap-4">
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 bg-primary/[0.06] text-stone-600 transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 bg-primary/[0.06] text-stone-600 transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 bg-primary/[0.06] text-stone-600 transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground">
                <Linkedin className="w-5 h-5" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 bg-primary/[0.06] text-stone-600 transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground">
                <Instagram className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-stone-900">{en.footer.quickLinks}</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="text-stone-600 transition-colors hover:text-primary"
                >
                  {en.navigation.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/event-management')}
                  className="text-stone-600 transition-colors hover:text-primary"
                >
                  {en.navigation.eventManagement}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/marketing-services')}
                  className="text-stone-600 transition-colors hover:text-primary"
                >
                  {en.navigation.marketingServices}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="text-stone-600 transition-colors hover:text-primary"
                >
                  {en.navigation.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="text-stone-600 transition-colors hover:text-primary"
                >
                  {en.navigation.contactUs}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-semibold text-stone-900">{en.footer.contactUs}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-stone-600">
                <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span>{en.footer.emails[0]}</span>
              </li>
              <li className="flex items-start gap-3 text-stone-600">
                <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span>{en.footer.phoneNumbers[0]}</span>
              </li>
              <li className="flex items-start gap-3 text-stone-600">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span>{en.footer.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-primary/15 pt-8 md:flex-row">
          <p className="text-sm text-stone-500">
            © {new Date().getFullYear()} {en.footer.copyright}
          </p>
          <div className="flex gap-6 text-sm">
            <button
              onClick={() => navigate('/privacy-policy')}
              className="text-stone-500 transition-colors hover:text-primary"
            >
              {en.footer.privacyPolicy}
            </button>
            <button
              onClick={() => navigate('/terms-of-service')}
              className="text-stone-500 transition-colors hover:text-primary"
            >
              {en.footer.termsOfService}
            </button>
            <button
              onClick={() => navigate('/cookie-policy')}
              className="text-stone-500 transition-colors hover:text-primary"
            >
              {en.footer.cookiePolicy}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
