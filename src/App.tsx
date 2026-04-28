import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Resultado from "./pages/Resultado";
import Vendas from "./pages/Vendas";
import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <BrowserRouter>
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
