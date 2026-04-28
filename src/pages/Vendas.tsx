import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle2, Star, ShieldCheck, Clock, Brain, ArrowRight,
  Users, BookOpen, Zap, Heart, AlertTriangle, ChevronDown, ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface VendasState {
  nomeMae?: string;
  nomeCrianca?: string;
  idadeCrianca?: string;
}

const DEPOIMENTOS = [
  {
    nome: "Camila S.", cidade: "SP",
    foto: "CS",
    texto: "Minha filha de 5 anos mal conseguia sentar por 3 minutos. Em 3 semanas de Mente Ativa, ela já consegue fazer as atividades completas. Chorei de emoção!",
    estrelas: 5,
  },
  {
    nome: "Fernanda R.", cidade: "MG",
    foto: "FR",
    texto: "Meu filho tem TDAH e eu estava desesperada. Esse método mudou tudo. As atividades são curtas, no ritmo dele, e ele GOSTA de fazer. Impossível de acreditar.",
    estrelas: 5,
  },
  {
    nome: "Priscila M.", cidade: "RJ",
    foto: "PM",
    texto: "Comprei achando que era mais um pack de atividades. Me surpreendi completamente. É um sistema real, com lógica e progressão. Vale cada centavo.",
    estrelas: 5,
  },
  {
    nome: "Juliana C.", cidade: "RS",
    foto: "JC",
    texto: "Minha filha de 4 anos estava com atraso na fala. Com 6 semanas do método, a fonoaudióloga ficou impressionada com a evolução. Recomendo para toda mãe!",
    estrelas: 5,
  },
  {
    nome: "Rafaela T.", cidade: "BA",
    foto: "RT",
    texto: "O que mais me surpreendeu foi a facilidade. 15 minutos por dia que realmente cabem na minha rotina corrida. E os resultados aparecem!",
    estrelas: 5,
  },
];

const FAQ = [
  {
    q: "Funciona para crianças com TDAH ou TEA?",
    a: "Sim! O método foi pensado para ser inclusivo, com atividades adaptáveis para crianças neurodivergentes. As atividades são curtas, sensorialmente equilibradas e têm grau de dificuldade ajustável.",
  },
  {
    q: "Preciso ter conhecimento pedagógico para aplicar?",
    a: "Não! O método foi criado especificamente para mães sem formação pedagógica. Cada atividade vem com o passo a passo completo e o tempo exato que você precisa dedicar.",
  },
  {
    q: "Como funciona a garantia de 7 dias?",
    a: "Se em 7 dias você não achar que o método vale, basta enviar uma mensagem e devolvemos 100% do valor pago. Sem burocracia, sem perguntas.",
  },
  {
    q: "Meu filho(a) vai querer participar?",
    a: "As atividades foram desenhadas para engajar crianças de 3 a 8 anos. São lúdicas, com elementos de jogo e recompensa. A maioria das mães relata que os filhos pedem para fazer.",
  },
  {
    q: "Quanto tempo tenho acesso?",
    a: "Você tem acesso vitalício ao produto. Atualizações futuras inclusas. Pode usar para os irmãos mais novos também!",
  },
  {
    q: "É um app ou tem material físico?",
    a: "É um web app acessível de qualquer dispositivo (celular, tablet, computador). Não precisa instalar nada. Após o pagamento você recebe o link de acesso por e-mail.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [aberto, setAberto] = useState(false);
  return (
    <div className="border border-border rounded-2xl overflow-hidden">
      <button
        onClick={() => setAberto(!aberto)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
      >
        <span className="font-semibold text-foreground text-sm pr-4">{q}</span>
        {aberto ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
      </button>
      {aberto && (
        <div className="px-4 pb-4">
          <p className="text-muted-foreground text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

function CTABox({ label = "Quero o Método Mente Ativa", onIrCheckout }: { label?: string; onIrCheckout: () => void }) {
  return (
    <div className="bg-card rounded-3xl p-6 card-shadow border-2 border-primary/30 text-center">
      <div className="mb-4">
        <p className="text-muted-foreground text-sm line-through">De R$97</p>
        <div className="flex items-end justify-center gap-1">
          <span className="text-muted-foreground text-lg font-semibold">R$</span>
          <span className="font-display text-5xl text-foreground">37</span>
          <span className="text-muted-foreground text-sm self-end mb-1">à vista</span>
        </div>
        <Badge variant="default" className="mt-1 text-xs">🔥 62% de desconto — por tempo limitado</Badge>
      </div>

      <div className="text-left bg-muted/50 rounded-2xl p-4 mb-5 space-y-2">
        {[
          "✅ Sistema completo com + de 80 atividades",
          "✅ Rotina diária de 15 min personalizada",
          "✅ Dashboard de progresso da criança",
          "✅ Sistema de níveis (1 ao 5)",
          "✅ Filtro por habilidade (atenção, fala, coordenação)",
          "✅ Acesso vitalício + atualizações inclusas",
        ].map((item) => (
          <p key={item} className="text-sm text-foreground">{item}</p>
        ))}
      </div>

      <Button variant="cta" size="xl" className="w-full mb-3 text-base animate-pulse-warm" onClick={onIrCheckout}>
        {label}
        <ArrowRight className="w-5 h-5" />
      </Button>

      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Pagamento seguro</span>
        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Acesso imediato</span>
      </div>
      <p className="text-xs text-muted-foreground mt-2">💰 Garantia de 7 dias ou seu dinheiro de volta</p>
    </div>
  );
}

export default function Vendas() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as VendasState | null;
  const nomeCrianca = state?.nomeCrianca || "seu filho(a)";
  const nomeMae = state?.nomeMae || "Você";

  function irParaCheckout() {
    navigate("/checkout", { state: { nomeMae: state?.nomeMae, nomeCrianca: state?.nomeCrianca, idadeCrianca: state?.idadeCrianca } });
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4">

        {/* ==================== HERO ==================== */}
        <section className="pt-8 pb-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge variant="default" className="mb-4 text-xs">
              🧠 Método Mente Ativa 15 Minutos
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl text-foreground leading-tight mb-4 text-balance">
              Seu filho pode ter{" "}
              <span className="gradient-text">foco, fala e coordenação</span>{" "}
              melhores em 15 min por dia
            </h1>
            <p className="text-muted-foreground text-lg mb-6 text-balance">
              Mesmo sem saber pedagogia. Mesmo com uma rotina corrida.
              Mesmo se outros métodos já falharam antes.
            </p>
            <CTABox label={`Quero o plano de ${nomeCrianca}`} onIrCheckout={irParaCheckout} />
          </motion.div>
        </section>

        {/* ==================== IDENTIFICAÇÃO ==================== */}
        <section className="pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="font-display text-2xl text-foreground mb-5 text-center">
              {nomeMae}, eu sei que você sente isso…
            </h2>
            <div className="space-y-3">
              {[
                { emoji: "😔", texto: "Culpa por não saber como ajudar seu filho a se desenvolver melhor" },
                { emoji: "😰", texto: "Medo de que o atraso agora vire dificuldade na escola e na vida" },
                { emoji: "😤", texto: "Frustração de tentar coisas que não funcionam ou que ele recusa" },
                { emoji: "😩", texto: "Exaustão de conciliar tudo isso com a rotina já corrida" },
              ].map(({ emoji, texto }) => (
                <div key={texto} className="flex items-start gap-3 bg-card rounded-2xl p-4 card-shadow border border-border">
                  <span className="text-2xl flex-shrink-0">{emoji}</span>
                  <p className="text-foreground text-sm leading-relaxed">{texto}</p>
                </div>
              ))}
            </div>
            <div className="bg-primary/10 rounded-2xl p-4 mt-4 border border-primary/20">
              <p className="text-foreground text-sm leading-relaxed text-center">
                <strong>Você não está falhando.</strong> Você está usando as ferramentas erradas para o problema certo.
              </p>
            </div>
          </motion.div>
        </section>

        {/* ==================== PROBLEMA ==================== */}
        <section className="pb-10">
          <div className="flex items-start gap-3 mb-5">
            <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
            <h2 className="font-display text-2xl text-foreground">
              O problema não é a sua dedicação
            </h2>
          </div>
          <div className="bg-card rounded-2xl p-5 card-shadow border border-border mb-4">
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              A internet está cheia de packs de atividades, vídeos no YouTube, jogos educativos.
              Mas nada disso tem <strong className="text-foreground">sequência lógica</strong>,{" "}
              <strong className="text-foreground">progressão de dificuldade</strong> ou{" "}
              <strong className="text-foreground">personalização</strong>.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              O resultado? Você tenta uma coisa hoje, outra amanhã, a criança não vê sentido,
              perde o interesse — e você fica com a sensação de que "nada funciona".
            </p>
          </div>
          <div className="bg-destructive/5 border-2 border-destructive/20 rounded-2xl p-4">
            <p className="text-foreground text-sm font-semibold text-center">
              📊 Pesquisas mostram que crianças com estimulação estruturada nos primeiros 8 anos
              têm até <strong>40% mais facilidade de aprendizado</strong> na fase escolar.
            </p>
          </div>
        </section>

        {/* ==================== QUEBRA DE CRENÇA ==================== */}
        <section className="pb-10">
          <h2 className="font-display text-2xl text-foreground mb-5 text-center">
            A verdade que ninguém conta
          </h2>
          <div className="space-y-3">
            {[
              {
                mito: "❌ Mito: preciso de horas por dia para ver resultado",
                verdade: "✅ Verdade: 15 min diários estruturados superam 2h aleatórias",
              },
              {
                mito: "❌ Mito: preciso saber pedagogia para estimular bem",
                verdade: "✅ Verdade: com o passo a passo certo, qualquer mãe consegue",
              },
              {
                mito: "❌ Mito: meu filho não vai querer participar",
                verdade: "✅ Verdade: atividades gamificadas e curtas engajam naturalmente",
              },
              {
                mito: "❌ Mito: quem tem TDAH/TEA precisa só de terapia",
                verdade: "✅ Verdade: estimulação em casa complementa e acelera o resultado",
              },
            ].map(({ mito, verdade }) => (
              <div key={mito} className="bg-card rounded-2xl p-4 card-shadow border border-border">
                <p className="text-muted-foreground text-xs mb-1 line-through">{mito}</p>
                <p className="text-foreground text-sm font-semibold">{verdade}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== APRESENTAÇÃO DO MÉTODO ==================== */}
        <section className="pb-10">
          <div className="text-center mb-6">
            <Brain className="w-10 h-10 text-primary mx-auto mb-3" />
            <h2 className="font-display text-2xl text-foreground mb-2">
              Método Mente Ativa 15 Minutos
            </h2>
            <p className="text-muted-foreground text-sm">
              Não é um pack. É um <strong className="text-foreground">sistema guiado</strong>.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                step: "01",
                icon: Zap,
                titulo: "Diagnóstico → Plano",
                desc: "O resultado do seu quiz personaliza imediatamente a rotina para o perfil e a faixa etária do seu filho.",
              },
              {
                step: "02",
                icon: BookOpen,
                titulo: "Rotina diária guiada",
                desc: "Cada dia você recebe 2-3 atividades de 5 min cada. Passo a passo completo. Sem improvisação.",
              },
              {
                step: "03",
                icon: TrendingUpIcon,
                titulo: "Sistema de evolução",
                desc: "A criança avança por 5 níveis. Quanto mais progride, mais desafiadora e divertida fica a jornada.",
              },
            ].map(({ step, icon: Icon, titulo, desc }) => (
              <div key={step} className="flex gap-4 bg-card rounded-2xl p-5 card-shadow border border-border">
                <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-primary font-bold mb-0.5">PASSO {step}</p>
                  <h3 className="font-display text-base text-foreground mb-1">{titulo}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== DEMONSTRAÇÃO ==================== */}
        <section className="pb-10">
          <h2 className="font-display text-2xl text-foreground mb-5 text-center">
            O que você vai ter acesso
          </h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { icon: "🎯", label: "Dashboard personalizado", desc: "Progresso em tempo real" },
              { icon: "📅", label: "Rotina diária", desc: "2-3 atividades por dia" },
              { icon: "⭐", label: "Sistema de níveis", desc: "5 fases de evolução" },
              { icon: "📚", label: "Biblioteca completa", desc: "80+ atividades" },
              { icon: "🧠", label: "Filtro por habilidade", desc: "Foco, fala, coordenação" },
              { icon: "📈", label: "Histórico de progresso", desc: "Veja a evolução" },
            ].map(({ icon, label, desc }) => (
              <div key={label} className="bg-card rounded-2xl p-4 card-shadow border border-border text-center">
                <span className="text-2xl mb-2 block">{icon}</span>
                <p className="font-bold text-foreground text-xs mb-0.5">{label}</p>
                <p className="text-muted-foreground text-xs">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== BENEFÍCIOS ==================== */}
        <section className="pb-10">
          <h2 className="font-display text-2xl text-foreground mb-5 text-center">
            O que você vai sentir como mãe
          </h2>
          <div className="space-y-3">
            {[
              { emoji: "💪", titulo: "Confiança", desc: "Saber exatamente o que fazer para ajudar seu filho, sem depender de palpites." },
              { emoji: "❤️", titulo: "Conexão", desc: "15 minutos juntos todo dia cria um vínculo poderoso entre mãe e filho." },
              { emoji: "🌟", titulo: "Orgulho", desc: "Ver seu filho evoluindo de semana em semana, em vez de ficar estagnado." },
              { emoji: "🕐", titulo: "Praticidade", desc: "Sem planejamento, sem pesquisa. Só abrir o app e seguir o plano do dia." },
            ].map(({ emoji, titulo, desc }) => (
              <div key={titulo} className="flex items-start gap-4 bg-card rounded-2xl p-4 card-shadow border border-border">
                <span className="text-2xl flex-shrink-0">{emoji}</span>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-0.5">{titulo}</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== PROVA SOCIAL ==================== */}
        <section className="pb-10">
          <div className="flex items-center gap-2 mb-5">
            <Users className="w-5 h-5 text-primary" />
            <h2 className="font-display text-2xl text-foreground">
              Mães que já transformaram
            </h2>
          </div>
          <div className="space-y-4">
            {DEPOIMENTOS.map(({ nome, cidade, foto, texto, estrelas }) => (
              <div key={nome} className="bg-card rounded-2xl p-5 card-shadow border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {foto}
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{nome}</p>
                    <p className="text-muted-foreground text-xs">{cidade}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: estrelas }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-foreground text-sm leading-relaxed">"{texto}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== OFERTA PRINCIPAL ==================== */}
        <section className="pb-10">
          <h2 className="font-display text-2xl text-foreground mb-5 text-center">
            Invista no desenvolvimento de {nomeCrianca}
          </h2>
          <CTABox label={`Quero o plano de ${nomeCrianca}`} />
        </section>

        {/* ==================== GARANTIA ==================== */}
        <section className="pb-10">
          <div className="bg-accent/10 border-2 border-accent/30 rounded-3xl p-6 text-center">
            <ShieldCheck className="w-12 h-12 text-accent mx-auto mb-3" />
            <h3 className="font-display text-xl text-foreground mb-2">Garantia de 7 dias</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Se em 7 dias você não achar que o Método Mente Ativa vale cada centavo,
              basta enviar uma mensagem e devolvemos <strong className="text-foreground">100% do valor</strong>.
              Sem burocracia, sem perguntas. Risco zero para você.
            </p>
          </div>
        </section>

        {/* ==================== FAQ ==================== */}
        <section className="pb-10">
          <h2 className="font-display text-2xl text-foreground mb-5 text-center">
            Perguntas frequentes
          </h2>
          <div className="space-y-3">
            {FAQ.map(({ q, a }) => (
              <FaqItem key={q} q={q} a={a} />
            ))}
          </div>
        </section>

        {/* ==================== CTA FINAL ==================== */}
        <section className="pb-16">
          <div className="text-center mb-6">
            <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
            <h2 className="font-display text-2xl text-foreground mb-2">
              {nomeMae}, o melhor momento é agora
            </h2>
            <p className="text-muted-foreground text-sm">
              Cada semana sem estimulação estruturada é uma semana de potencial perdido.
              O cérebro de {nomeCrianca} está no seu pico de plasticidade <strong className="text-foreground">agora</strong>.
            </p>
          </div>
          <CTABox label="Quero começar hoje mesmo" onIrCheckout={irParaCheckout} />
        </section>
      </div>
    </div>
  );
}

function TrendingUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}
