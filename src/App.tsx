import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ContentProtection from "./components/ContentProtection";
import AppRoutes from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <ContentProtection />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 w-full min-w-0">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}