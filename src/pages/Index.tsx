import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, Star, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const IDADES = ["2 anos", "3 anos", "4 anos", "5 anos", "6 anos", "7 anos", "8 anos", "9 anos", "10 anos", "11 anos", "12 anos"];

export default function Index() {
  const navigate = useNavigate();
  const [nomeMae, setNomeMae] = useState("");
  const [nomeCrianca, setNomeCrianca] = useState("");
  const [idadeCrianca, setIdadeCrianca] = useState("");
  const [erro, setErro] = useState("");

  function handleComecar() {
    if (!nomeMae.trim() || !nomeCrianca.trim() || !idadeCrianca) {
      setErro("Preencha todos os campos para continuar.");
      return;
    }
    setErro("");
    navigate("/quiz", {
      state: {
        nomeMae: nomeMae.trim(),
        nomeCrianca: nomeCrianca.trim(),
        idadeCrianca,
      },
    });
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="text-center pt-6 pb-2 px-4">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-primary text-sm font-semibold mb-4">
          <Brain className="w-4 h-4" />
          Diagnóstico Gratuito
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 pb-8 text-center max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl md:text-4xl font-display leading-tight text-foreground mb-4">
            Seu filho tem{" "}
            <span className="gradient-text">dificuldade de foco, fala</span>{" "}
            ou coordenação?
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            Responda <strong>10 perguntas rápidas</strong> e descubra como estimular o desenvolvimento dele
            em apenas <strong>15 minutos por dia</strong>, mesmo sem saber pedagogia.
          </p>

          {/* Benefícios rápidos */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { icon: Clock, label: "Só 5 min" },
              { icon: Star, label: "100% gratuito" },
              { icon: CheckCircle2, label: "Resultado na hora" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="bg-card rounded-2xl p-3 card-shadow flex flex-col items-center gap-1">
                <Icon className="w-5 h-5 text-primary" />
                <span className="text-xs font-semibold text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Formulário de entrada */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card rounded-3xl p-6 card-shadow border border-border"
        >
          <h2 className="font-display text-xl text-foreground mb-5">
            Vamos começar! 👋
          </h2>

          <div className="space-y-4 text-left">
            <div>
              <label className="text-sm font-semibold text-foreground mb-1 block">
                Qual é o seu nome?
              </label>
              <input
                type="text"
                placeholder="Ex: Ana Paula"
                value={nomeMae}
                onChange={(e) => setNomeMae(e.target.value)}
                className="w-full border-2 border-border rounded-xl px-4 py-3 text-foreground bg-background focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground mb-1 block">
                Nome do seu filho(a):
              </label>
              <input
                type="text"
                placeholder="Ex: Miguel"
                value={nomeCrianca}
                onChange={(e) => setNomeCrianca(e.target.value)}
                className="w-full border-2 border-border rounded-xl px-4 py-3 text-foreground bg-background focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground mb-1 block">
                Quantos anos ele(a) tem?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {IDADES.map((idade) => (
                  <button
                    key={idade}
                    onClick={() => setIdadeCrianca(idade)}
                    className={`border-2 rounded-xl py-2.5 text-sm font-bold transition-all ${
                      idadeCrianca === idade
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {idade}
                  </button>
                ))}
              </div>
            </div>

            {erro && (
              <p className="text-destructive text-sm text-center font-medium">{erro}</p>
            )}

            <Button
              variant="cta"
              size="lg"
              className="w-full mt-2 animate-pulse-warm"
              onClick={handleComecar}
            >
              Fazer o diagnóstico grátis
              <ArrowRight className="w-5 h-5" />
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              🔒 Seus dados estão seguros. Sem spam.
            </p>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
