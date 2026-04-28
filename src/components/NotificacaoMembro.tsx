import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const MEMBROS = [
  { nome: "Camila S.", cidade: "São Paulo, SP", foto: "/fotos/mae1.jpg" },
  { nome: "Fernanda R.", cidade: "Belo Horizonte, MG", foto: "/fotos/mae2.jpg" },
  { nome: "Juliana C.", cidade: "Porto Alegre, RS", foto: "/fotos/mae3.jpg" },
  { nome: "Priscila M.", cidade: "Rio de Janeiro, RJ", foto: "/fotos/mae4.jpg" },
  { nome: "Rafaela T.", cidade: "Salvador, BA", foto: "/fotos/mae5.jpg" },
  { nome: "Amanda L.", cidade: "Curitiba, PR", foto: null },
  { nome: "Patrícia N.", cidade: "Fortaleza, CE", foto: null },
  { nome: "Tatiane O.", cidade: "Recife, PE", foto: null },
  { nome: "Bianca F.", cidade: "Manaus, AM", foto: null },
  { nome: "Larissa M.", cidade: "Goiânia, GO", foto: null },
  { nome: "Renata V.", cidade: "Florianópolis, SC", foto: null },
  { nome: "Simone A.", cidade: "Brasília, DF", foto: null },
  { nome: "Débora P.", cidade: "Natal, RN", foto: null },
  { nome: "Mariana K.", cidade: "Porto Alegre, RS", foto: null },
  { nome: "Cristiane B.", cidade: "Santos, SP", foto: null },
  { nome: "Jéssica W.", cidade: "Campinas, SP", foto: null },
  { nome: "Vanessa H.", cidade: "Belém, PA", foto: null },
  { nome: "Letícia D.", cidade: "São Luís, MA", foto: null },
];

const TEMPOS = ["agora mesmo", "há 1 min", "há 2 min", "há 3 min", "há 5 min"];

function iniciais(nome: string) {
  return nome.split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase();
}

export function NotificacaoMembro() {
  const [visivel, setVisivel] = useState(false);
  const [membro, setMembro] = useState(MEMBROS[0]);
  const [tempo, setTempo] = useState("agora mesmo");
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    // Primeira notificação aparece após 8 segundos
    const primeiro = setTimeout(() => mostrar(0), 8000);
    return () => clearTimeout(primeiro);
  }, []);

  function mostrar(idx: number) {
    const m = MEMBROS[idx % MEMBROS.length];
    const t = TEMPOS[Math.floor(Math.random() * TEMPOS.length)];
    setMembro(m);
    setTempo(t);
    setIndice(idx);
    setVisivel(true);

    // Fica visível por 4.5 segundos
    const esconder = setTimeout(() => {
      setVisivel(false);

      // Próxima notificação em 18-35 segundos
      const intervalo = 18000 + Math.random() * 17000;
      const proximo = setTimeout(() => mostrar(idx + 1), intervalo);
      return () => clearTimeout(proximo);
    }, 4500);

    return () => clearTimeout(esconder);
  }

  return (
    <AnimatePresence>
      {visivel && (
        <motion.div
          key={indice}
          initial={{ opacity: 0, y: 80, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-6 left-4 right-4 z-50 max-w-xs"
          style={{ pointerEvents: "none" }}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-border p-3 flex items-center gap-3"
               style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
            {/* Foto ou avatar */}
            <div className="flex-shrink-0">
              {membro.foto ? (
                <img
                  src={membro.foto}
                  alt={membro.nome}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                />
              ) : (
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold border-2 border-primary/20">
                  {iniciais(membro.nome)}
                </div>
              )}
            </div>

            {/* Texto */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                <p className="text-[11px] text-accent font-bold">Novo membro</p>
              </div>
              <p className="text-sm font-bold text-foreground leading-tight truncate">
                {membro.nome} entrou no Pequenos Gênios!
              </p>
              <p className="text-xs text-muted-foreground">{membro.cidade} · {tempo}</p>
            </div>

            {/* Indicador de tempo */}
            <div className="flex-shrink-0">
              <motion.div
                className="w-1.5 h-10 rounded-full gradient-bg"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{ duration: 4.5, ease: "linear" }}
                style={{ transformOrigin: "top" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
