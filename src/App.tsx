import { BrowserRouter } from "react-router-dom";
import ContentProtection from "./components/ContentProtection";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import AppRoutes from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <ContentProtection />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}