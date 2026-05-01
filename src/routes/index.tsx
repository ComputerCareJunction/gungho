import { Route, Routes } from "react-router-dom";
import About from "../pages/about";
import CookiePolicyPage from "../pages/legal/cookie-policy";
import PrivacyPolicyPage from "../pages/legal/privacy-policy";
import TermsOfServicePage from "../pages/legal/terms-of-service";
import ContactUs from "../pages/contact";
import HomePage from "../pages/home";
import EventManagement from "../pages/services/event-management";
import MarketingServices from "../pages/services/marketing-services";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/event-management" element={<EventManagement />} />
      <Route path="/marketing-services" element={<MarketingServices />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms-of-service" element={<TermsOfServicePage />} />
      <Route path="/cookie-policy" element={<CookiePolicyPage />} />
    </Routes>
  );
}
