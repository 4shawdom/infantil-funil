import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Resultado from "./pages/Resultado";
import Vendas from "./pages/Vendas";
import Checkout from "./pages/Checkout";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/resultado" element={<Resultado />} />
        <Route path="/vendas" element={<Vendas />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
}
