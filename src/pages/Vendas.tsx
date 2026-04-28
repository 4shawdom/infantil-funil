import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { NotificacaoMembro } from "@/components/NotificacaoMembro";
import {
  CheckCircle2, Star, ShieldCheck, Clock,
  ArrowRight, Users, Heart, ChevronDown, ChevronUp, Lock, AlertTriangle, Zap
} from "lucide-react";
import { useState } from "react";

const LINK_CAKTO = "https://pay.cakto.com.br/3fycrna_866544";
function irParaCakto() { window.location.href = LINK_CAKTO; }

interface VendasState { nomeMae?: string; nomeCrianca?: string; idadeCrianca?: string; }

// Fotos reais das mães
const FOTO_HERO = "/fotos/hero.png";
const FOTO_MAE1 = "/fotos/mae1.jpg";
const FOTO_MAE2 = "/fotos/mae2.jpg";
const FOTO_MAE3 = "/fotos/mae3.jpg";
const FOTO_MAE4 = "/fotos/mae4.jpg";
const FOTO_MAE5 = "/fotos/mae5.jpg";

const AVATARES_BAR = [FOTO_MAE1, FOTO_MAE2, FOTO_MAE3, FOTO_MAE4, FOTO_MAE5];

// ─── CTA ──────────────────────────────────────────────
function BotaoCTA({ label = "Quero o Método Pequenos Gênios", sub }: { label?: string; sub?: string }) {
  return (
    <div className="text-center">
      <button
        onClick={irParaCakto}
        className="w-full gradient-cta text-white font-extrabold rounded-2xl shadow-xl hover:opacity-95 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3 py-5 text-lg"
      >
        <Lock className="w-5 h-5 flex-shrink-0" />
        {label}
        <ArrowRight className="w-5 h-5 flex-shrink-0" />
      </button>
      <p className="text-xs text-muted-foreground mt-2">
        {sub || "🔒 Pagamento seguro · Acesso imediato · Garantia de 7 dias"}
      </p>
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────
const FAQS = [
  { q: "Funciona para crianças com TDAH ou TEA?", a: "Sim! O método foi desenhado para ser inclusivo. As atividades são curtas, sensorialmente equilibradas e ajustáveis para crianças neurodivergentes." },
  { q: "Preciso ter conhecimento pedagógico?", a: "Não! O passo a passo é tão claro que qualquer mãe consegue aplicar, independente de formação." },
  { q: "Meu filho vai querer participar?", a: "As atividades são lúdicas e gamificadas — pensadas para engajar crianças de 3 a 8 anos. A maioria das mães relata que os filhos pedem para fazer." },
  { q: "Em quanto tempo vejo resultado?", a: "A maioria das mães nota diferença nas primeiras 2 semanas. Resultados consistentes aparecem entre 4 e 8 semanas de uso regular." },
  { q: "Como funciona a garantia de 7 dias?", a: "Se por qualquer motivo não gostar, basta enviar uma mensagem e devolvemos 100% do valor. Sem burocracia, sem perguntas." },
  { q: "É um app ou material físico?", a: "É um web app — acessa pelo celular, tablet ou computador. Sem instalar nada. Acesso liberado imediatamente após a compra." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [aberto, setAberto] = useState(false);
  return (
    <div className={`border rounded-2xl overflow-hidden transition-colors ${aberto ? "border-primary/30 bg-primary/5" : "border-border bg-card"}`}>
      <button onClick={() => setAberto(!aberto)} className="w-full flex items-center justify-between p-4 text-left gap-3">
        <span className="font-semibold text-foreground text-sm">{q}</span>
        {aberto ? <ChevronUp className="w-4 h-4 text-primary flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
      </button>
      {aberto && <div className="px-4 pb-4"><p className="text-muted-foreground text-sm leading-relaxed">{a}</p></div>}
    </div>
  );
}

// ─── Depoimentos tipo WhatsApp ─────────────────────────
const DEPOIMENTOS = [
  {
    foto: FOTO_MAE1,
    nome: "Camila Souza",
    local: "São Paulo, SP",
    tempo: "há 2 dias",
    texto: "Gente, não acredito no que tô vendo 😭 Minha filha de 5 anos ficou 20 MINUTOS fazendo as atividades sem reclamar. Isso nunca tinha acontecido. Método Pequenos Gênios mudou tudo pra nós ❤️",
    tag: "3 semanas de uso",
    estrelas: 5,
  },
  {
    foto: FOTO_MAE2,
    nome: "Fernanda Ribeiro",
    local: "Belo Horizonte, MG",
    tempo: "há 5 dias",
    texto: "Meu filho tem TDAH e eu estava desesperada tentando tudo. Esse método é diferente porque respeita o ritmo dele. Em 1 mês a professora da escola perguntou o que eu tava fazendo diferente 🥹",
    tag: "TDAH confirmado",
    estrelas: 5,
  },
  {
    foto: FOTO_MAE3,
    nome: "Juliana Castro",
    local: "Porto Alegre, RS",
    tempo: "há 1 semana",
    texto: "A fonoaudióloga ficou IMPRESSIONADA com o progresso da minha filha de 4 anos. 6 semanas de método e a melhora na fala foi incrível. Choro de gratidão mesmo 💛",
    tag: "Atraso na fala",
    estrelas: 5,
  },
  {
    foto: FOTO_MAE4,
    nome: "Priscila Moura",
    local: "Rio de Janeiro, RJ",
    tempo: "há 3 dias",
    texto: "Comprei sem muita expectativa porque já tinha tentado vários métodos. Mas é COMPLETAMENTE diferente. Não é um pack de atividades soltas — é um sistema de verdade. Vale muito mais do que paguei.",
    tag: "Verificado ✓",
    estrelas: 5,
  },
  {
    foto: FOTO_MAE5,
    nome: "Rafaela Torres",
    local: "Salvador, BA",
    tempo: "há 4 dias",
    texto: "15 minutos por dia que realmente cabem na minha rotina de mãe solo. E os resultados aparecem! Meu filho de 6 anos já está muito mais concentrado na escola. Obrigada demais 🙏",
    tag: "Mãe solo",
    estrelas: 5,
  },
];

// ─── PÁGINA ───────────────────────────────────────────
export default function Vendas() {
  const location = useLocation();
  const state = location.state as VendasState | null;
  const nomeCrianca = state?.nomeCrianca || "seu filho(a)";
  const nomeMae = state?.nomeMae || "Você";

  return (
    <div className="min-h-screen bg-background">
      <NotificacaoMembro />
      <div className="max-w-2xl mx-auto px-4">

        {/* ══ BLOCO 1 — HERO ══════════════════════════════ */}
        <section className="pt-8 pb-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>

            {/* Badge urgência */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-1.5 text-red-600 text-xs font-bold animate-pulse">
                <Zap className="w-3.5 h-3.5" /> Oferta com 62% OFF — válida por tempo limitado
              </div>
            </div>

            {/* Headline */}
            <h1 className="font-display text-3xl md:text-4xl text-foreground leading-tight text-center mb-3 text-balance">
              Seu filho pode ter mais foco, falar melhor e se coordenar em{" "}
              <span className="gradient-text">15 minutos por dia</span>
            </h1>
            <p className="text-muted-foreground text-lg text-center mb-5 text-balance">
              Sem saber pedagogia. Sem rotina complicada. Mesmo que outros métodos já tenham falhado antes.
            </p>

            {/* Foto hero */}
            <div className="rounded-3xl overflow-hidden mb-5 card-shadow border border-border">
              <img
                src={FOTO_HERO}
                alt="Mãe e filho fazendo atividades educativas juntos"
                className="w-full h-52 object-cover"
                loading="eager"
              />
            </div>

            {/* Prova social imediata */}
            <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3 mb-5 card-shadow">
              <div className="flex -space-x-2 flex-shrink-0">
                {AVATARES_BAR.map((src, i) => (
                  <img key={i} src={src} alt="" className="w-9 h-9 rounded-full border-2 border-background object-cover" />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                  <span className="text-xs font-bold text-foreground ml-1">4.9/5</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">+1.247 mães</strong> já transformaram a rotina dos filhos
                </p>
              </div>
            </div>

            <BotaoCTA label={`Quero o plano de ${nomeCrianca}`} />

            {/* Mini benefícios */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[
                { emoji: "⏱️", texto: "15 min por dia" },
                { emoji: "📱", texto: "Acesso imediato" },
                { emoji: "🎯", texto: "Plano personalizado" },
              ].map(({ emoji, texto }) => (
                <div key={texto} className="bg-card rounded-2xl p-3 text-center border border-border card-shadow">
                  <span className="text-xl block mb-1">{emoji}</span>
                  <p className="text-xs font-semibold text-foreground">{texto}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ══ BLOCO 2 — IDENTIFICAÇÃO ═════════════════════ */}
        <section className="pb-10">
          <h2 className="font-display text-2xl text-foreground mb-5 text-center">
            {nomeMae}, você já sentiu isso?
          </h2>
          <div className="space-y-3">
            {[
              { emoji: "😔", texto: "Culpa por não saber como estimular seu filho do jeito certo" },
              { emoji: "😰", texto: "Medo de que o atraso de hoje vire dificuldade para sempre na escola" },
              { emoji: "😤", texto: "Frustração de tentar várias coisas que não funcionam ou que ele recusa" },
              { emoji: "😩", texto: "Exaustão de conciliar tudo isso com uma rotina já esgotante" },
            ].map(({ emoji, texto }) => (
              <div key={texto} className="flex items-center gap-3 bg-card rounded-2xl p-4 border border-border card-shadow">
                <span className="text-2xl flex-shrink-0">{emoji}</span>
                <p className="text-foreground text-sm leading-snug">{texto}</p>
              </div>
            ))}
          </div>
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mt-4 text-center">
            <p className="text-foreground text-sm font-semibold">
              Você não está falhando como mãe.<br />
              <span className="text-primary">Você está usando a ferramenta errada para o problema certo.</span>
            </p>
          </div>
        </section>

        {/* ══ BLOCO 3 — PROBLEMA ══════════════════════════ */}
        <section className="pb-10">
          <div className="bg-card rounded-3xl p-5 border border-border card-shadow">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
              <h2 className="font-display text-xl text-foreground">Por que atividades soltas não funcionam?</h2>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              A internet está cheia de packs, sugestões espalhadas e vídeos genéricos. O problema é que{" "}
              <strong className="text-foreground">nada disso tem sequência, progressão ou personalização.</strong>
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Você tenta uma coisa hoje, outra amanhã — a criança perde interesse e você fica com a sensação de que{" "}
              <em>"nada funciona com o meu filho."</em>
            </p>
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-3">
              <p className="text-sm text-foreground font-semibold text-center">
                🧠 O cérebro infantil aprende por <strong>repetição estruturada</strong>, não por estímulos aleatórios.
              </p>
            </div>
          </div>
        </section>

        {/* ══ BLOCO 4 — MÉTODO ════════════════════════════ */}
        <section className="pb-10">
          <div className="text-center mb-6">
            <span className="text-4xl block mb-2">🧠✨</span>
            <h2 className="font-display text-2xl text-foreground mb-1">Método Pequenos Gênios</h2>
            <p className="text-muted-foreground text-sm">Não é um pack. É um <strong className="text-foreground">sistema guiado</strong>.</p>
          </div>
          <div className="space-y-3">
            {[
              { n: "01", emoji: "🎯", titulo: "Diagnóstico → Plano personalizado", desc: "Seu filho é único. O sistema identifica o perfil dele e monta uma rotina focada nas áreas que mais precisam de atenção." },
              { n: "02", emoji: "📅", titulo: "Rotina de 15 min por dia", desc: "Toda manhã você abre o app e encontra as atividades prontas. Passo a passo completo. Sem planejar, sem improvisar." },
              { n: "03", emoji: "⭐", titulo: "Progresso visível semana a semana", desc: "Seu filho sobe de nível conforme avança. Você acompanha a evolução e mantém a consistência que gera resultado real." },
            ].map(({ n, emoji, titulo, desc }) => (
              <div key={n} className="flex gap-4 bg-card rounded-2xl p-4 border border-border card-shadow">
                <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-xl">{emoji}</span>
                </div>
                <div>
                  <p className="text-xs text-primary font-bold mb-0.5">PASSO {n}</p>
                  <p className="font-bold text-foreground text-sm mb-1">{titulo}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ BLOCO 5 — O QUE INCLUI ══════════════════════ */}
        <section className="pb-10">
          <h2 className="font-display text-2xl text-foreground mb-5 text-center">Tudo que você recebe</h2>
          <div className="bg-card rounded-3xl border-2 border-primary/20 overflow-hidden card-shadow">
            <div className="gradient-bg p-4 text-center">
              <p className="text-white font-bold text-sm">📦 Método Pequenos Gênios — Acesso Completo</p>
            </div>
            <div className="p-4 space-y-3">
              {[
                { emoji: "🧠", item: "Sistema diagnóstico personalizado", detalhe: "Rotina montada para o perfil do seu filho" },
                { emoji: "📅", item: "Rotina diária de 15 minutos", detalhe: "3 atividades por dia com passo a passo completo" },
                { emoji: "📚", item: "Biblioteca com +80 atividades", detalhe: "Filtradas por habilidade e nível" },
                { emoji: "⭐", item: "Sistema de 5 níveis de evolução", detalhe: "Progresso visível que engaja mãe e filho" },
                { emoji: "🎯", item: "Foco em atenção, linguagem e coordenação", detalhe: "As 3 áreas mais críticas do desenvolvimento" },
                { emoji: "📱", item: "Web app — sem instalar nada", detalhe: "Acessa pelo celular, tablet ou computador" },
                { emoji: "♾️", item: "Acesso vitalício + atualizações grátis", detalhe: "Funciona para os próximos filhos também" },
              ].map(({ emoji, item, detalhe }) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">{emoji}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-sm">{item}</p>
                    <p className="text-muted-foreground text-xs">{detalhe}</p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-accent ml-auto flex-shrink-0 mt-0.5" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ BLOCO 6 — PROVA SOCIAL REAL ═════════════════ */}
        <section className="pb-10">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-primary" />
            <h2 className="font-display text-2xl text-foreground">O que as mães estão dizendo</h2>
          </div>
          <p className="text-muted-foreground text-sm mb-5">Resultados reais de mães que já usam o método</p>

          <div className="space-y-4">
            {DEPOIMENTOS.map(({ foto, nome, local, tempo, texto, tag, estrelas }) => (
              <motion.div
                key={nome}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl border border-border card-shadow overflow-hidden"
              >
                {/* Cabeçalho */}
                <div className="flex items-center gap-3 p-4 pb-3">
                  <img
                    src={foto}
                    alt={nome}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 flex-shrink-0"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-foreground text-sm">{nome}</p>
                      <span className="text-[10px] bg-accent/10 text-accent border border-accent/20 rounded-full px-2 py-0.5 font-bold flex-shrink-0">
                        ✓ Verificado
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs">{local} · {tempo}</p>
                  </div>
                  <div className="flex gap-0.5 flex-shrink-0">
                    {Array.from({ length: estrelas }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                {/* Texto */}
                <div className="px-4 pb-3">
                  <p className="text-foreground text-sm leading-relaxed">{texto}</p>
                </div>

                {/* Tag resultado */}
                <div className="px-4 pb-4">
                  <span className="text-xs bg-primary/10 text-primary rounded-full px-3 py-1 font-semibold">
                    🏷️ {tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contador de mães */}
          <div className="mt-5 bg-muted/50 rounded-2xl p-4 flex items-center justify-between border border-border">
            <div className="flex -space-x-2">
              {AVATARES_BAR.map((src, i) => (
                <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-2 border-background object-cover" />
              ))}
              <div className="w-8 h-8 rounded-full bg-primary border-2 border-background flex items-center justify-center text-[10px] text-white font-bold">
                +1k
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-foreground text-sm">1.247 mães</p>
              <p className="text-xs text-muted-foreground">transformaram seus filhos</p>
            </div>
          </div>
        </section>

        {/* ══ BLOCO 7 — OFERTA ════════════════════════════ */}
        <section className="pb-10">
          <div className="bg-card rounded-3xl border-2 border-primary/30 card-shadow overflow-hidden">
            <div className="gradient-bg px-5 py-3 text-center">
              <p className="text-white text-xs font-bold uppercase tracking-wide">🔥 Oferta especial — 62% de desconto</p>
            </div>
            <div className="p-5">
              <h2 className="font-display text-2xl text-foreground text-center mb-4">
                Invista no desenvolvimento de {nomeCrianca}
              </h2>
              <div className="text-center mb-5">
                <p className="text-muted-foreground text-sm">De <span className="line-through font-semibold">R$97</span> por apenas</p>
                <div className="flex items-end justify-center gap-1 my-1">
                  <span className="text-muted-foreground text-2xl font-bold">R$</span>
                  <span className="font-display text-6xl text-foreground leading-none">27</span>
                </div>
                <p className="text-muted-foreground text-sm">pagamento único · acesso vitalício</p>
                <div className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/20 rounded-full px-3 py-1 mt-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                  <span className="text-xs font-bold text-accent">Você economiza R$70</span>
                </div>
              </div>
              <BotaoCTA label="Garantir acesso agora — R$27" />
              <p className="text-center text-xs text-muted-foreground mt-3">
                💳 Parcelado em até 12x de <strong>R$2,82</strong> no cartão
              </p>
            </div>
          </div>
        </section>

        {/* ══ BLOCO 8 — GARANTIA ══════════════════════════ */}
        <section className="pb-10">
          <div className="bg-accent/10 border-2 border-accent/30 rounded-3xl p-6 text-center">
            <ShieldCheck className="w-14 h-14 text-accent mx-auto mb-3" />
            <h3 className="font-display text-xl text-foreground mb-2">Garantia incondicional de 7 dias</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Teste o método completo por 7 dias. Se por qualquer motivo não gostar,{" "}
              <strong className="text-foreground">devolvemos 100% do valor</strong> sem burocracia, sem perguntas.
              O risco é nosso. O resultado é de {nomeCrianca}.
            </p>
          </div>
        </section>

        {/* ══ BLOCO 9 — FAQ ════════════════════════════════ */}
        <section className="pb-10">
          <h2 className="font-display text-2xl text-foreground mb-5 text-center">Perguntas frequentes</h2>
          <div className="space-y-2">
            {FAQS.map(({ q, a }) => <FaqItem key={q} q={q} a={a} />)}
          </div>
        </section>

        {/* ══ BLOCO 10 — CTA FINAL ════════════════════════ */}
        <section className="pb-16">
          <div className="text-center mb-5">
            <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
            <h2 className="font-display text-2xl text-foreground mb-2">
              {nomeMae}, o melhor momento é agora
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed text-balance">
              O cérebro de {nomeCrianca} está no pico da plasticidade neural.{" "}
              <strong className="text-foreground">Cada semana sem estimulação estruturada é potencial que não volta.</strong>{" "}
              Por R$27 você tem acesso a um sistema que pode mudar o desenvolvimento do seu filho para sempre.
            </p>
          </div>
          <BotaoCTA label="Quero começar hoje mesmo" />
          <div className="flex items-center justify-center gap-4 mt-5 flex-wrap">
            {[
              { icon: ShieldCheck, texto: "Compra segura" },
              { icon: Clock, texto: "Acesso em minutos" },
              { icon: Lock, texto: "Garantia de 7 dias" },
            ].map(({ icon: Icon, texto }) => (
              <div key={texto} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Icon className="w-3.5 h-3.5 text-accent" />
                {texto}
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-6">
            © Método Pequenos Gênios · Todos os direitos reservados
          </p>
        </section>

      </div>
    </div>
  );
}
