import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Brain } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Pergunta {
  id: number;
  texto: string;
  subtexto?: string;
  imagem?: string;
  opcoes: { label: string; valor: string; peso?: Record<string, number> }[];
}

const PERGUNTAS: Pergunta[] = [
  {
    id: 1,
    imagem: "/fotos/quiz/q1.png",
    texto: "Seu filho(a) consegue manter o foco em uma atividade por mais de 5 minutos?",
    subtexto: "Considere brincadeiras, desenhos, histórias…",
    opcoes: [
      { label: "🚫 Raramente: desiste muito rápido", valor: "muito_dificil", peso: { atencao: 3 } },
      { label: "😕 Às vezes, depende da atividade", valor: "moderado", peso: { atencao: 1 } },
      { label: "✅ Sim, normalmente consegue", valor: "ok", peso: { atencao: 0 } },
    ],
  },
  {
    id: 2,
    imagem: "/fotos/quiz/q2.png",
    texto: "Como está a comunicação verbal do seu filho(a)?",
    opcoes: [
      { label: "😟 Abaixo do esperado para a idade", valor: "abaixo", peso: { linguagem: 3 } },
      { label: "😐 Na média, comunica o básico", valor: "media", peso: { linguagem: 1 } },
      { label: "🗣️ Se comunica bem, sem dificuldades", valor: "ok", peso: { linguagem: 0 } },
    ],
  },
  {
    id: 3,
    imagem: "/fotos/quiz/q3.png",
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
    imagem: "/fotos/quiz/q4.png",
    texto: "Seu filho(a) tem diagnóstico ou suspeita de TDAH, TEA ou dificuldade de aprendizado?",
    opcoes: [
      { label: "✅ Sim, já tem diagnóstico confirmado", valor: "diagnosticado", peso: { necessidade_especial: 3 } },
      { label: "🔍 Estamos investigando / em avaliação", valor: "investigando", peso: { necessidade_especial: 2 } },
      { label: "❌ Não, sem diagnóstico", valor: "nao", peso: { necessidade_especial: 0 } },
    ],
  },
  {
    id: 5,
    imagem: "/fotos/quiz/q5.png",
    texto: "Como seu filho(a) reage quando fica frustrado(a)?",
    opcoes: [
      { label: "😤 Chora muito, faz birra ou se fecha", valor: "intenso" },
      { label: "😕 Fica chateado mas aceita ajuda", valor: "moderado" },
      { label: "😌 Lida bem com a frustração", valor: "tranquilo" },
    ],
  },
  {
    id: 6,
    imagem: "/fotos/quiz/q6.png",
    texto: "Com que frequência você consegue sentar com seu filho(a) para atividades educativas?",
    opcoes: [
      { label: "😔 Raramente, menos de uma vez por semana", valor: "raro" },
      { label: "📅 2 a 3 vezes por semana", valor: "medio" },
      { label: "🌟 Todos os dias ou quase", valor: "frequente" },
    ],
  },
  {
    id: 7,
    imagem: "/fotos/quiz/q7.png",
    texto: "Qual é a sua maior dificuldade para estimular seu filho(a) em casa?",
    opcoes: [
      { label: "🤷 Não sei por onde começar ou o que fazer", valor: "sem_conhecimento" },
      { label: "⏱️ Falta de tempo na rotina", valor: "sem_tempo" },
      { label: "😤 Meu filho não quer participar", valor: "resistencia" },
    ],
  },
  {
    id: 8,
    imagem: "/fotos/quiz/q8.png",
    texto: "Seu filho(a) demonstra interesse em aprender coisas novas?",
    opcoes: [
      { label: "😶 Pouco, é difícil engajá-lo(a)", valor: "baixo" },
      { label: "🙂 Interesse moderado em algumas coisas", valor: "moderado" },
      { label: "🤩 Muito curioso(a) e animado(a) para aprender", valor: "alto" },
    ],
  },
  {
    id: 9,
    imagem: "/fotos/quiz/q9.png",
    texto: "Como você descreveria o nível de atividade do seu filho(a)?",
    opcoes: [
      { label: "⚡ Muito agitado(a), difícil de controlar", valor: "muito_ativo" },
      { label: "⚖️ Equilibrado: ativo, mas consegue parar", valor: "equilibrado" },
      { label: "🐢 Mais calmo(a) e quieto(a) que o esperado", valor: "calmo" },
    ],
  },
  {
    id: 10,
    imagem: "/fotos/quiz/q10.png",
    texto: "O que você mais quer desenvolver no seu filho(a) nos próximos 3 meses?",
    subtexto: "Escolha a sua prioridade principal",
    opcoes: [
      { label: "🎯 Foco e atenção: ficar mais concentrado(a)", valor: "atencao", peso: { prioridade: 1 } },
      { label: "🗣️ Linguagem e comunicação: falar melhor", valor: "linguagem", peso: { prioridade: 2 } },
      { label: "✋ Coordenação e habilidades motoras", valor: "coordenacao", peso: { prioridade: 3 } },
      { label: "🌟 Tudo acima: desenvolvimento completo", valor: "tudo", peso: { prioridade: 4 } },
    ],
  },
];

const IDADES = ["2 anos","3 anos","4 anos","5 anos","6 anos","7 anos","8 anos","9 anos","10 anos","11 anos","12 anos"];

function TelaIdade({ onComecar }: { onComecar: (idadeCrianca: string) => void }) {
  const [idadeCrianca, setIdadeCrianca] = useState("");

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-5xl block mb-3">🧒</span>
          <h1 className="font-display text-2xl text-foreground mb-2">Qual a idade do seu filho(a)?</h1>
          <p className="text-muted-foreground text-sm">Isso ajuda a personalizar o diagnóstico</p>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {IDADES.map(idade => (
            <button
              key={idade}
              onClick={() => { setIdadeCrianca(idade); setTimeout(() => onComecar(idade), 200); }}
              className={`border-2 rounded-2xl py-4 text-sm font-bold transition-all ${
                idadeCrianca === idade
                  ? "border-primary bg-primary/10 text-primary scale-95"
                  : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/5"
              }`}
            >
              {idade}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const [idadeCrianca, setIdadeCrianca] = useState<string | null>(null);
  const [atual, setAtual] = useState(0);
  const [respostas, setRespostas] = useState<string[]>([]);
  const [selecionado, setSelecionado] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);
  const [bloqueado, setBloqueado] = useState(false);

  if (!idadeCrianca) {
    return <TelaIdade onComecar={(idade) => setIdadeCrianca(idade)} />;
  }

  const nomeMae = "";
  const nomeCrianca = "seu filho(a)";
  const pergunta = PERGUNTAS[atual];
  const progresso = (atual / PERGUNTAS.length) * 100;

  function handleSelecionar(valor: string) {
    if (bloqueado) return;
    setSelecionado(valor);
    setBloqueado(true);

    setTimeout(() => {
      const novasRespostas = [...respostas, valor];

      if (atual < PERGUNTAS.length - 1) {
        setRespostas(novasRespostas);
        setDirection(1);
        setAtual(atual + 1);
        setSelecionado(null);
        setBloqueado(false);
      } else {
        const resultado = calcularResultado(novasRespostas);
        navigate("/resultado", {
          state: { nomeMae, nomeCrianca, idadeCrianca, respostas: novasRespostas, resultado },
        });
      }
    }, 350);
  }

  function handleAnterior() {
    if (atual === 0) return;
    setRespostas(respostas.slice(0, -1));
    setDirection(-1);
    setAtual(atual - 1);
    setSelecionado(null);
    setBloqueado(false);
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

    const prioridade = resp[9];
    const max = Object.entries(dificuldades).sort(([, a], [, b]) => b - a)[0][0];
    const totalScore = Object.values(dificuldades).reduce((a, b) => a + b, 0);
    const nivel: "critico" | "moderado" | "leve" = totalScore >= 6 ? "critico" : totalScore >= 3 ? "moderado" : "leve";

    return {
      nivel,
      principalDificuldade: prioridade === "tudo" ? max : prioridade,
      scores: dificuldades,
    };
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-4 pt-5 pb-3 max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-2">
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
          Diagnóstico personalizado: <strong>{idadeCrianca}</strong>
        </p>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 px-4 max-w-2xl mx-auto w-full pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={atual}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ duration: 0.28 }}
          >
            {/* Imagem da pergunta */}
            {pergunta.imagem && (
              <div className="rounded-3xl overflow-hidden mb-4 border border-border card-shadow w-full"
                   style={{ aspectRatio: "3/4", maxHeight: "380px" }}>
                <img
                  src={pergunta.imagem}
                  alt=""
                  className="w-full h-full object-cover object-center"
                />
              </div>
            )}

            {/* Card da pergunta */}
            <div className="bg-card rounded-3xl p-5 card-shadow border border-border mb-4">
              <h2 className="font-display text-xl text-foreground leading-snug mb-1">
                {pergunta.texto}
              </h2>
              {pergunta.subtexto && (
                <p className="text-muted-foreground text-sm">{pergunta.subtexto}</p>
              )}
            </div>

            {/* Opções — clique avança direto */}
            <div className="space-y-3">
              {pergunta.opcoes.map((opcao) => (
                <button
                  key={opcao.valor}
                  onClick={() => handleSelecionar(opcao.valor)}
                  disabled={bloqueado}
                  className={`w-full text-left border-2 rounded-2xl p-4 transition-all duration-200 ${
                    selecionado === opcao.valor
                      ? "border-primary bg-primary/10 shadow-md scale-[0.99]"
                      : "border-border bg-card hover:border-primary/40 hover:bg-primary/5 active:scale-[0.98]"
                  } ${bloqueado && selecionado !== opcao.valor ? "opacity-40" : ""}`}
                >
                  <span className="font-semibold text-foreground text-sm leading-snug">{opcao.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Botão voltar */}
        {atual > 0 && (
          <button
            onClick={handleAnterior}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mt-5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
        )}
      </main>
    </div>
  );
}
