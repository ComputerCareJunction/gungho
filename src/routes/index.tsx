import { Route, Routes } from "react-router-dom";
import About from "../pages/about";
import CookiePolicyPage from "../pages/legal/cookie-policy";
import PrivacyPolicyPage from "../pages/legal/privacy-policy";
import TermsOfServicePage from "../pages/legal/terms-of-service";
import ContactUs from "../pages/contact";
import HomePage from "../pages/home";
import EventManagement from "../pages/services/event-management";
import EventExhibitionPortfolioPage from "../pages/services/event-management/exhibition-portfolio";
import MarketingServices from "../pages/services/marketing-services";
import BrandVisibilityDetailPage from "../pages/services/brand-visibility-detail";
import TradeActivationDetailPage from "../pages/services/trade-activation-detail";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/event-management" element={<EventManagement />} />
      <Route path="/event-management/exhibition-portfolio" element={<EventExhibitionPortfolioPage />} />
      <Route path="/marketing-services" element={<MarketingServices />} />
      <Route path="/marketing-services/trade-activation" element={<TradeActivationDetailPage />} />
      <Route path="/marketing-services/:detailSlug" element={<BrandVisibilityDetailPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms-of-service" element={<TermsOfServicePage />} />
      <Route path="/cookie-policy" element={<CookiePolicyPage />} />
    </Routes>
  );
}
