import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const NOMES = [
  "Camila S.", "Fernanda R.", "Juliana C.", "Priscila M.", "Rafaela T.",
  "Amanda L.", "Patrícia N.", "Tatiane O.", "Bianca F.", "Larissa M.",
  "Renata V.", "Simone A.", "Débora P.", "Mariana K.", "Cristiane B.",
  "Jéssica W.", "Vanessa H.", "Letícia D.", "Aline G.", "Mônica S.",
  "Carolina F.", "Luciana P.", "Natália R.", "Gabriela M.", "Andressa L.",
  "Thais B.", "Isabela C.", "Raquel O.", "Sabrina N.", "Denise A.",
  "Elaine T.", "Flávia R.", "Michele S.", "Rosana P.", "Karina M.",
  "Bruna C.", "Viviane L.", "Cláudia F.", "Edilene S.", "Sueli R.",
];

const TEMPOS = ["agora mesmo", "há 1 min", "há 2 min", "há 3 min", "há 5 min"];

function embaralhar<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function NotificacaoMembro() {
  const [visivel, setVisivel] = useState(false);
  const [nome, setNome] = useState("");
  const [tempo, setTempo] = useState("agora mesmo");
  const [fila] = useState(() => embaralhar(NOMES));
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const primeiro = setTimeout(() => mostrar(0), 8000);
    return () => clearTimeout(primeiro);
  }, []);

  function mostrar(idx: number) {
    setNome(fila[idx % fila.length]);
    setTempo(TEMPOS[Math.floor(Math.random() * TEMPOS.length)]);
    setIndice(idx);
    setVisivel(true);

    const esconder = setTimeout(() => {
      setVisivel(false);
      const intervalo = 20000 + Math.random() * 15000;
      setTimeout(() => mostrar(idx + 1), intervalo);
    }, 4000);

    return () => clearTimeout(esconder);
  }

  return (
    <AnimatePresence>
      {visivel && (
        <motion.div
          key={indice}
          initial={{ opacity: 0, x: -60, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -40, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="fixed bottom-6 left-4 z-50"
          style={{ pointerEvents: "none" }}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-border px-4 py-3 flex items-center gap-2.5"
               style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.15)" }}>
            <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-foreground leading-tight">
                {nome} entrou agora!
              </p>
              <p className="text-xs text-muted-foreground">{tempo} · Método Pequenos Gênios</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
