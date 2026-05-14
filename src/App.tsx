import { BrowserRouter, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import AppRoutes from "./routes";

function AppShell() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const shellBg = isHome ? "bg-transparent" : "bg-white";
  const mainBg = isHome ? "bg-transparent" : "bg-white";

  return (
    <>
      <ScrollToTop />
      <div className={`flex min-h-screen flex-col ${shellBg}`}>
        <Navbar isHome={isHome} />
        <main
          className={`min-w-0 flex-1 w-full max-md:pt-[calc(env(safe-area-inset-top,0px)+5.75rem)] md:pt-0 ${mainBg}`}
        >
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
