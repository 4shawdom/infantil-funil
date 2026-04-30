import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Clock, Star, CheckCircle2, Users } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 pb-16">

        {/* Logo */}
        <div className="pt-8 pb-6 text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-2xl gradient-bg flex items-center justify-center shadow-md">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-extrabold text-foreground text-lg">Pequenos Gênios</span>
          </div>
        </div>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-primary text-xs font-bold mb-4">
            ✨ Diagnóstico gratuito e personalizado
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-foreground leading-tight mb-4 text-balance">
            Você só precisa de{" "}
            <span className="gradient-text">15 minutos por dia</span>{" "}
            para parar de se sentir perdida e saber como estimular o desenvolvimento do seu filho
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed text-balance">
            Um sistema guiado que ajuda mães a estimular foco, linguagem e coordenação,
            sem precisar de conhecimento pedagógico.
          </p>
        </motion.div>

        {/* Imagem hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl overflow-hidden mb-8 card-shadow border border-border"
        >
          <img
            src="/fotos/hero.png"
            alt="Mãe e filho fazendo atividades juntos"
            className="w-full h-56 object-cover object-top"
          />
        </motion.div>

        {/* O que é */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-8">
          <h2 className="font-display text-xl text-foreground mb-4 text-center">O que é o Método Pequenos Gênios?</h2>
          <div className="space-y-3">
            {[
              { icon: "🎯", titulo: "Diagnóstico personalizado", desc: "Identifica as áreas que mais precisam de atenção no desenvolvimento do seu filho." },
              { icon: "📅", titulo: "Rotina de 15 minutos", desc: "Atividades diárias guiadas, com passo a passo completo. Sem improvisação." },
              { icon: "⭐", titulo: "Progresso visível", desc: "Sistema de níveis que mostra a evolução semana a semana." },
            ].map(({ icon, titulo, desc }) => (
              <div key={titulo} className="flex items-start gap-4 bg-card rounded-2xl p-4 border border-border card-shadow">
                <span className="text-2xl flex-shrink-0">{icon}</span>
                <div>
                  <p className="font-bold text-foreground text-sm">{titulo}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Objetivos */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
          <h2 className="font-display text-xl text-foreground mb-4 text-center">Desenvolvemos 3 áreas essenciais</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { emoji: "🎯", label: "Foco e Atenção" },
              { emoji: "🗣️", label: "Linguagem" },
              { emoji: "✋", label: "Coordenação" },
            ].map(({ emoji, label }) => (
              <div key={label} className="bg-card rounded-2xl p-4 text-center border border-border card-shadow">
                <span className="text-3xl block mb-2">{emoji}</span>
                <p className="text-xs font-bold text-foreground leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Para quem é */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mb-8">
          <div className="bg-primary/5 border border-primary/15 rounded-3xl p-5">
            <h2 className="font-display text-lg text-foreground mb-3 text-center">Para quem é esse método?</h2>
            <div className="space-y-2">
              {[
                "Mães com filhos que apresentam atraso cognitivo",
                "Crianças com dificuldade de foco ou atenção",
                "Casos de TDAH, TEA ou atraso na fala e no aprendizado",
                "Mães sem tempo: a rotina cabe em 15 minutos",
                "Quem não tem formação pedagógica",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                  <p className="text-foreground text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Prova social */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
          <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3 card-shadow">
            <div className="flex -space-x-2">
              {["/fotos/mae1.jpg", "/fotos/mae2.jpg", "/fotos/mae3.jpg", "/fotos/mae4.jpg", "/fotos/mae5.jpg"].map((src, i) => (
                <img key={i} src={src} alt="" className="w-9 h-9 rounded-full border-2 border-background object-cover" />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                <span className="text-xs font-bold ml-1">4.9</span>
              </div>
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">+1.247 mães</strong> já usam o método
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <button
            onClick={() => navigate("/quiz")}
            className="w-full gradient-cta text-white font-extrabold rounded-2xl py-5 text-lg shadow-xl hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
          >
            <Brain className="w-5 h-5" />
            Iniciar diagnóstico gratuito
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="flex items-center justify-center gap-4 mt-3 flex-wrap">
            {[
              { icon: Clock, texto: "Só 5 minutos" },
              { icon: Star, texto: "100% gratuito" },
              { icon: Users, texto: "Resultado na hora" },
            ].map(({ icon: Icon, texto }) => (
              <div key={texto} className="flex items-center gap-1 text-xs text-muted-foreground">
                <Icon className="w-3.5 h-3.5 text-primary" />
                {texto}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
