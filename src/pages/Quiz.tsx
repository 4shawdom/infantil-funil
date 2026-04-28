import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Pergunta {
  id: number;
  texto: string;
  subtexto?: string;
  opcoes: { label: string; valor: string; peso?: Record<string, number> }[];
}

const PERGUNTAS: Pergunta[] = [
  {
    id: 1,
    texto: "Seu filho(a) consegue manter o foco em uma atividade por mais de 5 minutos?",
    subtexto: "Considere brincadeiras, desenhos, histórias…",
    opcoes: [
      { label: "🚫 Raramente — desiste muito rápido", valor: "muito_dificil", peso: { atencao: 3 } },
      { label: "😕 Às vezes — depende muito da atividade", valor: "moderado", peso: { atencao: 1 } },
      { label: "✅ Sim, normalmente consegue", valor: "ok", peso: { atencao: 0 } },
    ],
  },
  {
    id: 2,
    texto: "Como está a comunicação verbal do seu filho(a)?",
    opcoes: [
      { label: "😟 Abaixo do esperado para a idade", valor: "abaixo", peso: { linguagem: 3 } },
      { label: "😐 Na média — comunica o básico", valor: "media", peso: { linguagem: 1 } },
      { label: "🗣️ Se comunica bem, sem dificuldades", valor: "ok", peso: { linguagem: 0 } },
    ],
  },
  {
    id: 3,
    texto: "Como é a coordenação motora do seu filho(a)?",
    subtexto: "Pintar, recortar, amarrar sapato, segurar lápis…",
    opcoes: [
      { label: "✂️ Tem muita dificuldade com atividades manuais", valor: "muito_dificil", peso: { coordenacao: 3 } },
      { label: "🖌️ Alguma dificuldade, mas está melhorando", valor: "moderado", peso: { coordenacao: 1 } },
      { label: "👌 Coordenação adequada para a idade", valor: "ok", peso: { coordenacao: 0 } },
    ],
  },
  {
    id: 4,
    texto: "Seu filho(a) tem diagnóstico ou suspeita de TDAH, TEA ou dificuldade de aprendizado?",
    opcoes: [
      { label: "✅ Sim, já tem diagnóstico confirmado", valor: "diagnosticado", peso: { necessidade_especial: 3 } },
      { label: "🔍 Estamos investigando / em avaliação", valor: "investigando", peso: { necessidade_especial: 2 } },
      { label: "❌ Não, sem diagnóstico", valor: "nao", peso: { necessidade_especial: 0 } },
    ],
  },
  {
    id: 5,
    texto: "Como seu filho(a) reage quando fica frustrado(a)?",
    opcoes: [
      { label: "😤 Chora muito, faz birra ou se fecha", valor: "intenso" },
      { label: "😕 Fica chateado mas aceita ajuda", valor: "moderado" },
      { label: "😌 Lida bem com a frustração", valor: "tranquilo" },
    ],
  },
  {
    id: 6,
    texto: "Com que frequência você consegue sentar com seu filho(a) para atividades educativas?",
    opcoes: [
      { label: "😔 Raramente — menos de 1x por semana", valor: "raro" },
      { label: "📅 2 a 3 vezes por semana", valor: "medio" },
      { label: "🌟 Todos os dias ou quase", valor: "frequente" },
    ],
  },
  {
    id: 7,
    texto: "Qual é a sua maior dificuldade para estimular seu filho(a) em casa?",
    opcoes: [
      { label: "🤷 Não sei por onde começar ou o que fazer", valor: "sem_conhecimento" },
      { label: "⏱️ Falta de tempo na rotina", valor: "sem_tempo" },
      { label: "😤 Meu filho não quer participar das atividades", valor: "resistencia" },
    ],
  },
  {
    id: 8,
    texto: "Seu filho(a) demonstra interesse em aprender coisas novas?",
    opcoes: [
      { label: "😶 Pouco — é difícil engajá-lo(a)", valor: "baixo" },
      { label: "🙂 Interesse moderado em algumas coisas", valor: "moderado" },
      { label: "🤩 Muito curioso(a) e animado(a) para aprender", valor: "alto" },
    ],
  },
  {
    id: 9,
    texto: "Como você descreveria o nível de atividade do seu filho(a)?",
    opcoes: [
      { label: "⚡ Muito agitado(a), difícil de controlar", valor: "muito_ativo" },
      { label: "⚖️ Equilibrado — ativo mas consegue parar", valor: "equilibrado" },
      { label: "🐢 Mais calmo(a) e quieto(a) que o esperado", valor: "calmo" },
    ],
  },
  {
    id: 10,
    texto: "O que você mais quer desenvolver no seu filho(a) nos próximos 3 meses?",
    subtexto: "Escolha a sua prioridade principal",
    opcoes: [
      { label: "🎯 Foco e atenção — ficar mais concentrado(a)", valor: "atencao", peso: { prioridade: 1 } },
      { label: "🗣️ Linguagem e comunicação — falar melhor", valor: "linguagem", peso: { prioridade: 2 } },
      { label: "✋ Coordenação e habilidades motoras", valor: "coordenacao", peso: { prioridade: 3 } },
      { label: "🌟 Tudo acima — desenvolvimento completo", valor: "tudo", peso: { prioridade: 4 } },
    ],
  },
];

export default function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { nomeMae: string; nomeCrianca: string; idadeCrianca: string } | null;

  const [atual, setAtual] = useState(0);
  const [respostas, setRespostas] = useState<string[]>([]);
  const [selecionado, setSelecionado] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);

  if (!state) {
    navigate("/");
    return null;
  }

  const { nomeMae, nomeCrianca, idadeCrianca } = state;
  const pergunta = PERGUNTAS[atual];
  const progresso = ((atual) / PERGUNTAS.length) * 100;

  function handleSelecionar(valor: string) {
    setSelecionado(valor);
  }

  function handleProximo() {
    if (!selecionado) return;
    const novasRespostas = [...respostas, selecionado];

    if (atual < PERGUNTAS.length - 1) {
      setRespostas(novasRespostas);
      setDirection(1);
      setAtual(atual + 1);
      setSelecionado(null);
    } else {
      const resultado = calcularResultado(novasRespostas);
      navigate("/resultado", {
        state: { nomeMae, nomeCrianca, idadeCrianca, respostas: novasRespostas, resultado },
      });
    }
  }

  function handleAnterior() {
    if (atual === 0) return;
    const novasRespostas = respostas.slice(0, -1);
    setRespostas(novasRespostas);
    setDirection(-1);
    setAtual(atual - 1);
    setSelecionado(null);
  }

  function calcularResultado(resp: string[]) {
    const dificuldades: Record<string, number> = { atencao: 0, linguagem: 0, coordenacao: 0 };

    PERGUNTAS.forEach((p, i) => {
      const opcao = p.opcoes.find((o) => o.valor === resp[i]);
      if (opcao?.peso) {
        Object.entries(opcao.peso).forEach(([k, v]) => {
          if (k in dificuldades) dificuldades[k] += v;
        });
      }
    });

    const prioridade = resp[9]; // última pergunta

    const max = Object.entries(dificuldades).sort(([, a], [, b]) => b - a)[0][0];
    const totalScore = Object.values(dificuldades).reduce((a, b) => a + b, 0);

    let nivel: "critico" | "moderado" | "leve";
    if (totalScore >= 6) nivel = "critico";
    else if (totalScore >= 3) nivel = "moderado";
    else nivel = "leve";

    return {
      nivel,
      principalDificuldade: prioridade === "tudo" ? max : prioridade,
      scores: dificuldades,
    };
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header do quiz */}
      <header className="px-4 pt-5 pb-3 max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center flex-shrink-0">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Pergunta {atual + 1} de {PERGUNTAS.length}</span>
              <span>{Math.round(progresso)}% concluído</span>
            </div>
            <Progress value={progresso} className="h-2" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Diagnóstico de <strong>{nomeCrianca}</strong> — {idadeCrianca}
        </p>
      </header>

      {/* Pergunta */}
      <main className="flex-1 px-4 max-w-2xl mx-auto w-full pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={atual}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-card rounded-3xl p-5 card-shadow border border-border mb-4">
              <h2 className="font-display text-xl text-foreground leading-snug mb-1">
                {pergunta.texto}
              </h2>
              {pergunta.subtexto && (
                <p className="text-muted-foreground text-sm">{pergunta.subtexto}</p>
              )}
            </div>

            <div className="space-y-3">
              {pergunta.opcoes.map((opcao) => (
                <button
                  key={opcao.valor}
                  onClick={() => handleSelecionar(opcao.valor)}
                  className={`w-full text-left border-2 rounded-2xl p-4 transition-all duration-200 ${
                    selecionado === opcao.valor
                      ? "border-primary bg-primary/10 shadow-md"
                      : "border-border bg-card hover:border-primary/40 hover:bg-primary/5"
                  }`}
                >
                  <span className="font-semibold text-foreground text-sm leading-snug">{opcao.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navegação */}
        <div className="flex gap-3 mt-5">
          {atual > 0 && (
            <Button variant="outline" size="default" onClick={handleAnterior} className="flex-shrink-0">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="cta"
            size="default"
            className="flex-1"
            onClick={handleProximo}
            disabled={!selecionado}
          >
            {atual < PERGUNTAS.length - 1 ? "Próxima pergunta" : "Ver meu resultado"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}
