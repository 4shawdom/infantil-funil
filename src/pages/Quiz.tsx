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
      { label: "🚫 Raramente — desiste muito rápido", valor: "muito_dificil", peso: { atencao: 3 } },
      { label: "😕 Às vezes — depende da atividade", valor: "moderado", peso: { atencao: 1 } },
      { label: "✅ Sim, normalmente consegue", valor: "ok", peso: { atencao: 0 } },
    ],
  },
  {
    id: 2,
    imagem: "/fotos/quiz/q2.png",
    texto: "Como está a comunicação verbal do seu filho(a)?",
    opcoes: [
      { label: "😟 Abaixo do esperado para a idade", valor: "abaixo", peso: { linguagem: 3 } },
      { label: "😐 Na média — comunica o básico", valor: "media", peso: { linguagem: 1 } },
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
      { label: "😔 Raramente — menos de 1x por semana", valor: "raro" },
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

const IDADES = ["2 anos","3 anos","4 anos","5 anos","6 anos","7 anos","8 anos","9 anos","10 anos","11 anos","12 anos"];

function TelaInicio({ onComecar }: { onComecar: (nomeMae: string, nomeCrianca: string, idadeCrianca: string) => void }) {
  const [nomeMae, setNomeMae] = useState("");
  const [nomeCrianca, setNomeCrianca] = useState("");
  const [idadeCrianca, setIdadeCrianca] = useState("");
  const [erro, setErro] = useState("");

  function handleSubmit() {
    if (!nomeMae.trim() || !nomeCrianca.trim() || !idadeCrianca) {
      setErro("Preencha todos os campos para continuar.");
      return;
    }
    onComecar(nomeMae.trim(), nomeCrianca.trim(), idadeCrianca);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <span className="text-4xl block mb-2">🧠</span>
          <h1 className="font-display text-2xl text-foreground mb-1">Vamos começar!</h1>
          <p className="text-muted-foreground text-sm">Preencha para personalizar o diagnóstico</p>
        </div>
        <div className="bg-card rounded-3xl p-5 card-shadow border border-border space-y-4">
          <div>
            <label className="text-sm font-semibold text-foreground mb-1 block">Seu nome</label>
            <input type="text" placeholder="Ex: Ana Paula" value={nomeMae} onChange={e => setNomeMae(e.target.value)}
              className="w-full border-2 border-border rounded-xl px-4 py-3 text-foreground bg-background focus:outline-none focus:border-primary transition-colors text-sm" />
          </div>
          <div>
            <label className="text-sm font-semibold text-foreground mb-1 block">Nome do seu filho(a)</label>
            <input type="text" placeholder="Ex: Miguel" value={nomeCrianca} onChange={e => setNomeCrianca(e.target.value)}
              className="w-full border-2 border-border rounded-xl px-4 py-3 text-foreground bg-background focus:outline-none focus:border-primary transition-colors text-sm" />
          </div>
          <div>
            <label className="text-sm font-semibold text-foreground mb-1 block">Idade do seu filho(a)</label>
            <div className="grid grid-cols-4 gap-2">
              {IDADES.map(idade => (
                <button key={idade} onClick={() => setIdadeCrianca(idade)}
                  className={`border-2 rounded-xl py-2 text-xs font-bold transition-all ${idadeCrianca === idade ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground hover:border-primary/50"}`}>
                  {idade}
                </button>
              ))}
            </div>
          </div>
          {erro && <p className="text-destructive text-sm text-center">{erro}</p>}
          <button onClick={handleSubmit}
            className="w-full gradient-cta text-white font-extrabold rounded-2xl py-4 text-base hover:opacity-95 transition-all">
            Iniciar diagnóstico →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const stateExterno = location.state as { nomeMae: string; nomeCrianca: string; idadeCrianca: string } | null;

  const [dadosIniciais, setDadosIniciais] = useState<{ nomeMae: string; nomeCrianca: string; idadeCrianca: string } | null>(stateExterno);
  const [atual, setAtual] = useState(0);
  const [respostas, setRespostas] = useState<string[]>([]);
  const [selecionado, setSelecionado] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);
  const [bloqueado, setBloqueado] = useState(false);

  if (!dadosIniciais) {
    return <TelaInicio onComecar={(nomeMae, nomeCrianca, idadeCrianca) => setDadosIniciais({ nomeMae, nomeCrianca, idadeCrianca })} />;
  }

  const { nomeMae, nomeCrianca, idadeCrianca } = dadosIniciais;
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
          Diagnóstico de <strong>{nomeCrianca}</strong> — {idadeCrianca}
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
              <div className="rounded-3xl overflow-hidden mb-4 border border-border card-shadow">
                <img
                  src={pergunta.imagem}
                  alt=""
                  className="w-full h-48 object-cover object-top"
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
