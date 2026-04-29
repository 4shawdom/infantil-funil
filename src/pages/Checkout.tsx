import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, Lock, Clock, Star, CheckCircle2,
  CreditCard, Smartphone, ChevronDown, ChevronUp, ArrowRight, Zap
} from "lucide-react";

// ⚠️ Substitua pelos seus links do Cakto
const LINK_PRINCIPAL = "https://pay.cakto.com.br/3fycrna_866544";
const LINK_COMBO = "https://pay.cakto.com.br/bipthqh";

interface CheckoutState {
  nomeMae?: string;
  nomeCrianca?: string;
  idadeCrianca?: string;
}

const PRECO_PRINCIPAL = 37;
const PRECO_BUMP = 17;

function Selo({ icon: Icon, texto }: { icon: any; texto: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <Icon className="w-3.5 h-3.5 text-accent flex-shrink-0" />
      <span>{texto}</span>
    </div>
  );
}

export default function Checkout() {
  const location = useLocation();
  const state = location.state as CheckoutState | null;
  const nomeCrianca = state?.nomeCrianca || "seu filho(a)";
  const nomeMae = state?.nomeMae || "";

  const [orderBump, setOrderBump] = useState(false);
  const [metodoPagamento, setMetodoPagamento] = useState<"cartao" | "pix">("cartao");
  const [faqAberto, setFaqAberto] = useState(false);

  const total = PRECO_PRINCIPAL + (orderBump ? PRECO_BUMP : 0);

  function handleFinalizar() {
    const link = orderBump ? LINK_COMBO : LINK_PRINCIPAL;
    window.location.href = link;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card py-3 px-4 sticky top-0 z-30 shadow-sm">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl gradient-bg flex items-center justify-center">
              <span className="text-white text-xs font-bold">M</span>
            </div>
            <span className="font-display font-extrabold text-foreground text-sm">Método Pequenos Gênios</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="w-3.5 h-3.5 text-accent" />
            <span>Compra 100% segura</span>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">

        {/* Título */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-3 py-1 text-accent text-xs font-bold mb-3">
            <Zap className="w-3 h-3" /> Oferta por tempo limitado
          </div>
          <h1 className="font-display text-2xl text-foreground leading-tight">
            Você está a <span className="gradient-text">1 passo</span> de transformar o desenvolvimento de{" "}
            <span className="gradient-text">{nomeCrianca}</span>
          </h1>
        </motion.div>

        {/* Resumo do pedido */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-card rounded-3xl border border-border card-shadow overflow-hidden"
        >
          <div className="p-4 border-b border-border">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Resumo do pedido</p>

            {/* Produto principal */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-xl">🧠</span>
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">Método Pequenos Gênios 15 Minutos</p>
                  <p className="text-muted-foreground text-xs">Sistema completo + 80 atividades + acesso vitalício</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {["Diagnóstico", "Rotina diária", "5 níveis", "Biblioteca"].map((tag) => (
                      <span key={tag} className="text-[10px] bg-primary/10 text-primary rounded-full px-2 py-0.5 font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-muted-foreground line-through">R$97</p>
                <p className="font-display text-lg text-foreground font-bold">R${PRECO_PRINCIPAL}</p>
              </div>
            </div>

            {/* Depoimento rápido */}
            <div className="bg-muted/60 rounded-2xl p-3 flex gap-2 items-start">
              <div className="flex gap-0.5 flex-shrink-0 mt-0.5">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-xs text-muted-foreground italic">
                "Meu filho tem 5 anos e em 3 semanas já noto diferença enorme no foco dele. Melhor investimento que fiz!"
                <span className="font-semibold not-italic text-foreground">, Camila S., SP</span>
              </p>
            </div>
          </div>

          {/* Order Bump */}
          <div className={`p-4 transition-all duration-300 ${orderBump ? "bg-secondary/5" : "bg-amber-50/50"}`}>
            <div className="flex items-start gap-3">
              <button
                onClick={() => setOrderBump(!orderBump)}
                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200 ${
                  orderBump ? "bg-secondary border-secondary" : "border-secondary/50 bg-white hover:border-secondary"
                }`}
              >
                {orderBump && <CheckCircle2 className="w-4 h-4 text-white" />}
              </button>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] bg-secondary text-white rounded-full px-2 py-0.5 font-bold uppercase tracking-wide">
                        ⚡ Adicionar ao pedido
                      </span>
                    </div>
                    <p className="font-bold text-foreground text-sm">Pack Especial TDAH / TEA</p>
                    <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">
                      20 atividades extras adaptadas para crianças neurodivergentes, com orientações para hipersensibilidade e resistência.
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-muted-foreground line-through">R$37</p>
                    <p className="font-bold text-secondary text-base">+R${PRECO_BUMP}</p>
                  </div>
                </div>

                <button
                  onClick={() => setFaqAberto(!faqAberto)}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mt-2 transition-colors"
                >
                  {faqAberto ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  O que está incluso?
                </button>

                <AnimatePresence>
                  {faqAberto && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 space-y-1"
                    >
                      {[
                        "20 atividades sensorialmente adaptadas",
                        "Guia para lidar com resistência e birra",
                        "Protocolo para crianças com hipersensibilidade",
                        "Comunicação visual para TEA leve",
                        "Rotina estruturada para TDAH",
                      ].map(item => (
                        <p key={item} className="text-xs text-muted-foreground flex gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                          {item}
                        </p>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="p-4 border-t border-border bg-muted/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                {orderBump && (
                  <p className="text-xs text-accent font-medium">Economia de R${97 + 37 - total} em relação ao preço cheio</p>
                )}
              </div>
              <motion.div
                key={total}
                initial={{ scale: 1.1, color: "hsl(22, 90%, 58%)" }}
                animate={{ scale: 1 }}
                className="text-right"
              >
                <p className="font-display text-3xl font-bold text-foreground">
                  R$<span className="gradient-text">{total}</span>
                </p>
                <p className="text-xs text-muted-foreground">pagamento único · acesso vitalício</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Método de pagamento */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-3xl border border-border card-shadow p-4"
        >
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Forma de pagamento</p>
          <div className="grid grid-cols-2 gap-2 mb-2">
            {[
              { id: "cartao", icon: CreditCard, label: "Cartão de crédito" },
              { id: "pix", icon: Smartphone, label: "PIX (5% off)" },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setMetodoPagamento(id as any)}
                className={`flex items-center gap-2 p-3 rounded-2xl border-2 transition-all text-sm font-semibold ${
                  metodoPagamento === id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center">
            {metodoPagamento === "cartao"
              ? "Em até 12x no cartão de crédito"
              : `Pague R$${Math.round(total * 0.95)} no PIX com 5% de desconto`}
          </p>
        </motion.div>

        {/* Botão principal */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <button
            onClick={handleFinalizar}
            className="w-full gradient-cta text-white font-extrabold text-lg rounded-2xl py-5 shadow-xl hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-3"
          >
            <Lock className="w-5 h-5" />
            {metodoPagamento === "pix"
              ? `Pagar R$${Math.round(total * 0.95)} no PIX agora`
              : `Garantir acesso por R$${total}`}
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-center text-xs text-muted-foreground mt-2">
            Ao clicar você será direcionado ao checkout seguro do Cakto
          </p>
        </motion.div>

        {/* Selos de segurança */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-2"
        >
          {[
            { icon: ShieldCheck, texto: "Pagamento 100% seguro" },
            { icon: Lock, texto: "Dados criptografados" },
            { icon: Clock, texto: "Acesso imediato" },
            { icon: CheckCircle2, texto: "Garantia de 7 dias" },
          ].map(({ icon, texto }) => (
            <div key={texto} className="bg-card rounded-2xl border border-border p-3 flex items-center gap-2">
              <Selo icon={icon} texto={texto} />
            </div>
          ))}
        </motion.div>

        {/* Garantia */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="bg-accent/10 border border-accent/20 rounded-3xl p-4 flex items-start gap-3"
        >
          <ShieldCheck className="w-8 h-8 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-foreground text-sm">Garantia incondicional de 7 dias</p>
            <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">
              Se por qualquer motivo você não ficar satisfeita, devolvemos 100% do valor pago. Sem perguntas, sem burocracia.
            </p>
          </div>
        </motion.div>

        {/* Rodapé */}
        <p className="text-center text-xs text-muted-foreground pb-4">
          © Método Pequenos Gênios · Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}
