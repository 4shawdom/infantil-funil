import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, AlertCircle, TrendingUp, Star, Target, Lightbulb, Lock, Brain, Search, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ETAPAS = [
  { icon: Search, texto: "Analisando suas respostas...", dur: 1400 },
  { icon: Brain, texto: "Identificando o perfil de desenvolvimento...", dur: 1400 },
  { icon: Sparkles, texto: "Selecionando as melhores atividades...", dur: 1400 },
  { icon: CheckCircle2, texto: "Montando o plano personalizado!", dur: 800 },
];

function LoadingDiagnostico({ nomeCrianca }: { nomeCrianca: string }) {
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    let etapa = 0;
    let prog = 0;
    const total = ETAPAS.reduce((a, e) => a + e.dur, 0);
    let acumulado = 0;

    const intervaloProg = setInterval(() => {
      prog = Math.min(prog + 1, 99);
      setProgresso(prog);
    }, total / 100);

    function avancar() {
      if (etapa >= ETAPAS.length - 1) {
        clearInterval(intervaloProg);
        setProgresso(100);
        return;
      }
      acumulado += ETAPAS[etapa].dur;
      etapa += 1;
      setEtapaAtual(etapa);
      setTimeout(avancar, ETAPAS[etapa].dur);
    }

    const t = setTimeout(avancar, ETAPAS[0].dur);
    return () => { clearTimeout(t); clearInterval(intervaloProg); };
  }, []);

  const Icon = ETAPAS[etapaAtual].icon;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm text-center"
      >
        {/* Ícone animado */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full gradient-bg opacity-20 animate-ping" />
          <div className="absolute inset-2 rounded-full gradient-bg opacity-30 animate-pulse" />
          <div className="relative w-24 h-24 rounded-full gradient-bg flex items-center justify-center shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={etapaAtual}
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Icon className="w-10 h-10 text-white" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Título */}
        <h2 className="font-display text-2xl text-foreground mb-2">
          Procurando as melhores atividades para{" "}
          <span className="gradient-text">{nomeCrianca}</span>...
        </h2>

        {/* Etapa atual */}
        <AnimatePresence mode="wait">
          <motion.p
            key={etapaAtual}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-muted-foreground text-sm mb-8"
          >
            {ETAPAS[etapaAtual].texto}
          </motion.p>
        </AnimatePresence>

        {/* Barra de progresso */}
        <div className="w-full bg-muted rounded-full h-3 mb-4 overflow-hidden">
          <motion.div
            className="h-full rounded-full gradient-bg"
            animate={{ width: `${progresso}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        <p className="text-xs text-muted-foreground font-semibold">{progresso}%</p>

        {/* Etapas concluídas */}
        <div className="mt-8 space-y-2">
          {ETAPAS.map((etapa, i) => {
            const E = etapa.icon;
            const concluida = i < etapaAtual;
            const atual = i === etapaAtual;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: i <= etapaAtual ? 1 : 0.3, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 text-left"
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                  concluida ? "bg-accent" : atual ? "gradient-bg animate-pulse" : "bg-muted"
                }`}>
                  {concluida
                    ? <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    : <E className="w-3.5 h-3.5 text-white" />
                  }
                </div>
                <span className={`text-xs font-medium ${
                  concluida ? "text-accent line-through" : atual ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {etapa.texto}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

interface ResultadoState {
  nomeMae: string;
  nomeCrianca: string;
  idadeCrianca: string;
  respostas: string[];
  resultado: {
    nivel: "critico" | "moderado" | "leve";
    principalDificuldade: string;
    scores: Record<string, number>;
  };
}

const NIVEL_CONFIG = {
  critico: {
    label: "Atenção Urgente",
    cor: "text-red-500",
    bg: "bg-red-50 border-red-200",
    emoji: "🚨",
    descricao: "O diagnóstico indica que {nome} está enfrentando desafios significativos no desenvolvimento. Mas a boa notícia: com o método certo, a evolução pode ser rápida e visível.",
  },
  moderado: {
    label: "Em Desenvolvimento",
    cor: "text-orange-500",
    bg: "bg-orange-50 border-orange-200",
    emoji: "📈",
    descricao: "{nome} está progredindo, mas com o suporte adequado pode avançar muito mais rápido. O momento de agir é agora — cada semana importa nessa fase.",
  },
  leve: {
    label: "No Caminho Certo",
    cor: "text-green-600",
    bg: "bg-green-50 border-green-200",
    emoji: "✨",
    descricao: "{nome} tem uma boa base! Com um sistema estruturado de estímulos, o desenvolvimento dele(a) pode ser acelerado ainda mais nessa fase tão importante.",
  },
};

const DIFICULDADE_CONFIG: Record<string, { label: string; emoji: string; dica: string }> = {
  atencao: {
    label: "Foco e Atenção",
    emoji: "🎯",
    dica: "Atividades de 15 min com pausas estratégicas treinando atenção sustentada",
  },
  linguagem: {
    label: "Linguagem e Comunicação",
    emoji: "🗣️",
    dica: "Jogos de comunicação, narração de histórias e ampliação de vocabulário",
  },
  coordenacao: {
    label: "Coordenação Motora",
    emoji: "✋",
    dica: "Atividades manuais progressivas que desenvolvem controle e precisão",
  },
  tudo: {
    label: "Desenvolvimento Completo",
    emoji: "🌟",
    dica: "Rotina integrada que trabalha todos os aspectos cognitivos de forma balanceada",
  },
};

const LOADING_TOTAL = ETAPAS.reduce((a, e) => a + e.dur, 0) + 300;

export default function Resultado() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ResultadoState | null;
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setCarregando(false), LOADING_TOTAL);
    return () => clearTimeout(t);
  }, []);

  if (!state) {
    navigate("/");
    return null;
  }

  if (carregando) {
    return <LoadingDiagnostico nomeCrianca={state.nomeCrianca} />;
  }

  const { nomeMae, nomeCrianca, idadeCrianca, resultado } = state;
  const config = NIVEL_CONFIG[resultado.nivel];
  const dificuldade = DIFICULDADE_CONFIG[resultado.principalDificuldade] || DIFICULDADE_CONFIG.tudo;

  const descricao = config.descricao.replace("{nome}", nomeCrianca);

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="max-w-2xl mx-auto px-4">

        {/* Resultado do diagnóstico */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-8 pb-6">
          <div className="text-center mb-6">
            <span className="text-4xl mb-3 block">{config.emoji}</span>
            <Badge variant="outline" className={`mb-3 text-sm font-bold border-2 px-4 py-1 ${config.cor}`}>
              {config.label}
            </Badge>
            <h1 className="font-display text-2xl md:text-3xl text-foreground mb-2">
              Diagnóstico de <span className="gradient-text">{nomeCrianca}</span>, {idadeCrianca}
            </h1>
          </div>

          <div className={`rounded-2xl p-5 border-2 mb-5 ${config.bg}`}>
            <p className="text-foreground text-base leading-relaxed">{descricao}</p>
          </div>

          {/* Área de foco */}
          <div className="bg-card rounded-2xl p-5 card-shadow border border-border mb-5">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="font-display text-lg text-foreground">Área de Foco Principal</h3>
            </div>
            <div className="flex items-center gap-3 bg-primary/10 rounded-xl p-4">
              <span className="text-3xl">{dificuldade.emoji}</span>
              <div>
                <p className="font-bold text-foreground">{dificuldade.label}</p>
                <p className="text-sm text-muted-foreground">{dificuldade.dica}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mini VSL — Quebra de crença */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 mb-8"
        >
          <div className="bg-card rounded-2xl p-5 card-shadow border border-border">
            <div className="flex items-start gap-3 mb-3">
              <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <h3 className="font-display text-lg text-foreground">
                Por que as "atividades soltas" não funcionam?
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              <strong className="text-foreground">Olá, {nomeMae}!</strong> O diagnóstico de {nomeCrianca} revelou algo muito importante:
              não é falta de esforço da sua parte — é falta de <strong className="text-foreground">sistema</strong>.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              Packs de atividades soltas, vídeos no YouTube e dicas espalhadas no Instagram
              <strong className="text-foreground"> não criam progresso</strong>. Eles criam confusão.
              O que realmente funciona é uma <strong className="text-foreground">rotina guiada, personalizada e progressiva</strong>.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Porque o cérebro infantil aprende por <strong className="text-foreground">repetição estruturada</strong>,
              não por estímulos aleatórios.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-5 card-shadow border border-border">
            <div className="flex items-start gap-3 mb-3">
              <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <h3 className="font-display text-lg text-foreground">
                O que realmente muda o desenvolvimento
              </h3>
            </div>
            <div className="space-y-3">
              {[
                { passo: "1", titulo: "Diagnóstico personalizado", desc: "Saber exatamente o que estimular baseado no perfil único da criança — não em receitas genéricas." },
                { passo: "2", titulo: "Rotina progressiva de 15 min", desc: "Atividades sequenciadas que evoluem conforme a criança avança, sem sobrecarga." },
                { passo: "3", titulo: "Sistema de progresso visível", desc: "Quando a mãe vê evolução, mantém consistência. Consistência = resultado real." },
              ].map(({ passo, titulo, desc }) => (
                <div key={passo} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                    {passo}
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{titulo}</p>
                    <p className="text-muted-foreground text-xs">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-2xl p-5 card-shadow border border-border">
            <div className="flex items-start gap-3 mb-3">
              <TrendingUp className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <h3 className="font-display text-lg text-foreground">
                Resultados que mães estão vendo
              </h3>
            </div>
            <div className="space-y-3">
              {[
                { semanas: "1-2 semanas", resultado: "Menos resistência nas atividades, maior interesse" },
                { semanas: "3-4 semanas", resultado: "Foco visivelmente melhor, progresso nas habilidades-alvo" },
                { semanas: "6-8 semanas", resultado: "Mudança real no comportamento e na aprendizagem" },
              ].map(({ semanas, resultado }) => (
                <div key={semanas} className="flex items-center gap-3 bg-accent/10 rounded-xl p-3">
                  <Star className="w-4 h-4 text-accent flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-accent">{semanas}</p>
                    <p className="text-xs text-foreground">{resultado}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-3xl p-6 card-shadow border-2 border-primary/20 text-center"
        >
          <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-display text-xl text-foreground mb-2">
            O plano personalizado de {nomeCrianca} está pronto
          </h3>
          <p className="text-muted-foreground text-sm mb-5">
            Com base no diagnóstico, criamos um sistema completo focado em{" "}
            <strong className="text-foreground">{dificuldade.label.toLowerCase()}</strong> —
            adequado para {idadeCrianca}.
          </p>

          <Button
            variant="cta"
            size="xl"
            className="w-full mb-3 animate-pulse-warm text-base"
            onClick={() => navigate("/checkout", { state: { nomeMae, nomeCrianca, idadeCrianca } })}
          >
            Quero o Método Mente Ativa
            <ArrowRight className="w-5 h-5" />
          </Button>

          <p className="text-xs text-muted-foreground">
            ✅ Acesso imediato · 🔒 Pagamento seguro · 💰 Garantia de 7 dias
          </p>
        </motion.div>
      </div>
    </div>
  );
}
