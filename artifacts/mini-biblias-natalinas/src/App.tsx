import { type MouseEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ShieldCheck, Star, X } from 'lucide-react';
import productMockup from '@assets/Mini_Bíblias_Natalinas_para_Imprimir_1794977596812.png';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

// Configure os dois links de checkout aqui. Mantenha a string vazia até ter o link real.
const CHECKOUT_LINKS = {
  basic: '',
  complete: '',
};

const bonuses = [
  { title: 'Mini Bíblias Padrão', detail: 'Mais uma versão para imprimir e compartilhar.' },
  { title: 'Wallpapers Cristãos', detail: 'Mensagens de fé para levar com você.' },
  { title: 'Manual de Evangelismo', detail: 'Um material de apoio para compartilhar a Palavra.' },
  { title: 'Guia de Estudo Bíblico', detail: 'Um convite a conhecer melhor as Escrituras.' },
  { title: 'Dicionário Bíblico', detail: 'Termos e significados para acompanhar seus estudos.' },
  { title: '365 Versículos Bíblicos', detail: 'Uma leitura inspiradora para cada dia do ano.' },
  { title: '+1.000 Esboços Bíblicos', detail: 'Conteúdo de apoio para seus momentos de estudo.' },
];

const questions = [
  {
    question: 'Como vou receber o material?',
    answer: 'O material é digital. O formato de envio e as instruções de acesso precisam ser confirmados no checkout da oferta antes da publicação.',
  },
  {
    question: 'É um produto digital ou físico?',
    answer: 'É um material digital para imprimir. Nenhum produto físico é enviado.',
  },
  {
    question: 'Quantas vezes posso imprimir?',
    answer: 'A quantidade de impressões depende das condições de uso definidas para o material. Confirme essa permissão antes de publicar a oferta.',
  },
  {
    question: 'Preciso saber montar ou ter experiência?',
    answer: 'O material é voltado para impressão. As instruções de montagem devem ser informadas conforme o conteúdo que acompanha os arquivos.',
  },
  {
    question: 'Como funciona o pagamento?',
    answer: 'O pagamento é realizado na página segura do checkout. As opções disponíveis serão mostradas lá antes da confirmação.',
  },
  {
    question: 'Consigo acessar pelo celular?',
    answer: 'Sim. Por ser digital, você pode acessar o material em um celular ou outro dispositivo compatível. Para imprimir, use uma impressora disponível.',
  },
];

function NativityArt({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 120" fill="none" aria-hidden="true">
      <path d="M25 76 70 34l45 42" stroke="#B4934C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 72v33h72V72" fill="#DCC99C" />
      <path d="M70 22c1.8 4.3 4.4 6.9 8.8 8.7-4.4 1.8-7 4.5-8.8 8.8-1.8-4.3-4.5-7-8.8-8.8 4.3-1.8 7-4.4 8.8-8.7Z" fill="#C1A258" />
      <path d="M52 72c0-9.2 7.3-16.5 16.5-16.5S85 62.8 85 72v12H52V72Z" fill="#F6EBD2" />
      <circle cx="68.5" cy="52" r="8" fill="#BD8A65" />
      <path d="M43 101c6-11 14.6-16.5 25.7-16.5s20.4 5.5 28.3 16.5H43Z" fill="#A83D35" />
      <path d="M52 85c-12.1-1.4-19 4-22.2 14.8h27.4M84 85c11.4-1.4 18.3 4 22 14.8H80" stroke="#557451" strokeWidth="6" strokeLinecap="round" />
      <path d="m20 104 4-5m94 5-4-5" stroke="#B4934C" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CheckoutAction({
  tier,
  children,
  className,
}: {
  tier: 'basic' | 'complete';
  children: ReactNode;
  className: string;
}) {
  const [noticeOpen, setNoticeOpen] = useState(false);
  const checkoutUrl = CHECKOUT_LINKS[tier].trim();

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!checkoutUrl) {
      event.preventDefault();
      setNoticeOpen(true);
    }
  };

  return (
    <>
      <a
        className={className}
        href={checkoutUrl || '#'}
        onClick={onClick}
        target={checkoutUrl ? '_blank' : undefined}
        rel={checkoutUrl ? 'noopener noreferrer' : undefined}
        data-testid={`link-checkout-${tier}`}
        aria-label={checkoutUrl ? undefined : `${typeof children === 'string' ? children : 'Comprar'} — link de checkout ainda não configurado`}
      >
        {children}
      </a>
      {noticeOpen && (
        <div className="checkout-notice" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setNoticeOpen(false);
        }}>
          <section className="notice-card" role="dialog" aria-modal="true" aria-labelledby="notice-title">
            <button className="notice-close" type="button" aria-label="Fechar aviso" data-testid={`button-close-checkout-${tier}`} onClick={() => setNoticeOpen(false)}>
              <X size={21} aria-hidden="true" />
            </button>
            <span className="eyebrow">Quase lá</span>
            <h2 id="notice-title">Estamos preparando o acesso</h2>
            <p>O link seguro desta oferta ainda precisa ser configurado. Volte em breve para concluir sua compra.</p>
            <button className="button-primary" type="button" data-testid={`button-dismiss-checkout-${tier}`} onClick={() => setNoticeOpen(false)}>
              Entendi
            </button>
          </section>
        </div>
      )}
    </>
  );
}

function Home() {
  useEffect(() => {
    document.title = 'Mini Bíblias Natalinas para imprimir | Um Natal de fé';
    const description = 'Celebre o Natal cristão com mini Bíblias para imprimir, mensagens sobre o nascimento de Jesus e sete bônus especiais.';
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
    const setProperty = (property: string, content: string) => {
      let tag = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };
    setProperty('og:title', 'Mini Bíblias Natalinas para imprimir');
    setProperty('og:description', description);
    setProperty('og:type', 'website');
  }, []);

  return (
    <main className="site-shell">
      <div className="offer-ribbon">🎄 OFERTA ESPECIAL DE NATAL — SOMENTE HOJE!</div>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">A história mais bonita do Natal</span>
            <h1 id="hero-title">Um Natal ainda mais especial com lindas <em>Mini Bíblias</em> para imprimir!</h1>
            <p>Encante crianças, familiares e pessoas especiais com mini Bíblias natalinas cheias de mensagens e ensinamentos sobre o nascimento de Jesus.</p>
            <a href="#ofertas" className="button-primary" data-testid="link-hero-offers">QUERO MINHAS MINI BÍBLIAS 🎄</a>
            <div className="micro-trust">Material digital para imprimir, compartilhar e presentear.</div>
          </div>
          <div className="hero-art">
            <img
              className="hero-product-image"
              src={productMockup}
              alt="Mockup das Mini Bíblias Natalinas para imprimir, com capas e páginas internas."
              data-testid="img-product-mockup"
            />
          </div>
        </div>
        <a className="sr-only" href="#conteudo">Pular para o conteúdo</a>
      </section>

      <section className="section benefits" id="conteudo" aria-labelledby="benefits-title">
        <div className="section-inner benefit-layout">
          <div>
            <span className="eyebrow">O encanto está nos detalhes</span>
            <h2 id="benefits-title" className="sr-only">Um presente simples, cheio de significado</h2>
            <blockquote className="benefit-quote">“Que a história do primeiro Natal encontre um cantinho especial na sua celebração.”<small>Para viver e compartilhar em família</small></blockquote>
          </div>
          <div className="benefit-list">
            <article className="benefit-item"><span className="number">01 / PARA IMPRIMIR</span><h3>Mini Bíblias natalinas</h3><p>Um material delicado para celebrar a história do nascimento de Jesus.</p></article>
            <article className="benefit-item"><span className="number">02 / DIGITAL</span><h3>Acesso fácil</h3><p>Conteúdo digital para acessar e imprimir quando quiser.</p></article>
            <article className="benefit-item"><span className="number">03 / ESPECIAL</span><h3>Conteúdo de Natal</h3><p>Mensagens e ensinamentos para tornar a data ainda mais significativa.</p></article>
            <article className="benefit-item"><span className="number">04 / PARA PARTILHAR</span><h3>Feito para estar junto</h3><p>Ideal para presentear, compartilhar ou incluir nas atividades natalinas.</p></article>
          </div>
        </div>
      </section>

      <section className="section preview" aria-labelledby="preview-title">
        <div className="section-inner preview-grid">
          <div className="preview-copy">
            <span className="eyebrow">Um pedacinho da história</span>
            <h2 id="preview-title">Uma leitura pequena. Um significado imenso.</h2>
            <p>Capas delicadas e páginas pensadas para aproximar crianças e adultos da mensagem central do Natal cristão, com ternura e simplicidade.</p>
            <div className="preview-note">Exemplos visuais do material</div>
          </div>
          <div className="open-pages" role="img" aria-label="Exemplo ilustrativo de duas páginas internas do material">
            <article className="open-leaf left">
              <span className="cover-kicker">Capítulo 01</span>
              <h3>Uma grande notícia</h3>
              <p>Uma promessa de esperança florescia naquela noite tão especial.</p>
              <div className="page-lines" /><div className="page-lines" /><div className="page-lines short" />
              <div className="page-lines" /><div className="page-lines short" />
            </article>
            <article className="open-leaf right">
              <span className="cover-kicker">A noite de Natal</span>
              <NativityArt className="nativity" />
              <h3>Nasceu o Salvador</h3>
              <p>Uma história de amor para contar e recordar.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section bonus" aria-labelledby="bonus-title">
        <div className="section-inner">
          <div className="section-heading">
            <span className="eyebrow">Um presente dentro do presente</span>
            <h2 id="bonus-title">Escolha a oferta completa e receba também</h2>
            <p>Sete materiais extras acompanham a oferta completa de R$27.</p>
          </div>
          <div className="bonus-grid">
            {bonuses.map((bonus, index) => (
              <article className="bonus-card" key={bonus.title} data-testid={`card-bonus-${index + 1}`}>
                <span className="bonus-number">BÔNUS 0{index + 1}</span>
                <h3>{bonus.title}</h3>
                <p>{bonus.detail}</p>
              </article>
            ))}
          </div>
          <div className="bonus-footer"><strong>Todos os sete bônus</strong> acompanham a oferta completa por <strong>R$27.</strong></div>
        </div>
      </section>

      <section className="section pricing" id="ofertas" aria-labelledby="pricing-title">
        <div className="section-inner">
          <div className="section-heading">
            <span className="eyebrow">Seu Natal, do seu jeito</span>
            <h2 id="pricing-title">Escolha como quer presentear</h2>
            <p>Uma opção essencial ou a experiência completa, com todos os materiais extras.</p>
          </div>
          <div className="price-grid">
            <article className="price-card">
              <div className="price-label">Oferta essencial</div>
              <div className="price-amount">R$10<small>,00</small></div>
              <p className="price-desc">Para começar com a história que dá sentido ao Natal.</p>
              <div className="price-divider" />
              <ul className="price-includes">
                <li>Mini Bíblias Natalinas</li>
                <li>Material digital para imprimir</li>
              </ul>
              <CheckoutAction tier="basic" className="button-secondary">QUERO ESSA OFERTA</CheckoutAction>
            </article>
            <article className="price-card complete">
              <span className="recommended">Oferta completa</span>
              <div className="price-label">A experiência completa</div>
              <div className="price-amount">R$27<small>,00</small></div>
              <p className="price-desc">O produto principal acompanhado de sete bônus especiais.</p>
              <div className="price-divider" />
              <ul className="price-includes">
                <li>Mini Bíblias Natalinas</li>
                <li>Os sete bônus listados acima</li>
                <li>Mais materiais para celebrar e compartilhar</li>
              </ul>
              <CheckoutAction tier="complete" className="button-primary">QUERO A OFERTA COMPLETA</CheckoutAction>
            </article>
          </div>
          <p className="safe-note">Você verá os detalhes de pagamento na página de checkout.</p>
        </div>
      </section>

      <section className="guarantee" aria-labelledby="guarantee-title">
        <div className="guarantee-box">
          <div className="seal" aria-hidden="true"><ShieldCheck size={28} /><span>COMPRA<br />SEGURA</span></div>
          <div>
            <h2 id="guarantee-title">Compre com tranquilidade</h2>
            <p>O prazo de garantia será informado aqui: <strong>INSERIR PRAZO</strong>. Consulte as condições completas na página de checkout antes de finalizar sua compra.</p>
          </div>
        </div>
      </section>

      <section className="section faq" aria-labelledby="faq-title">
        <div className="section-inner">
          <div className="section-heading">
            <span className="eyebrow">Pode perguntar</span>
            <h2 id="faq-title">Dúvidas de coração tranquilo</h2>
            <p>O que você precisa saber antes de escolher sua oferta.</p>
          </div>
          <div className="faq-list">
            {questions.map((item, index) => (
              <details className="faq-item" key={item.question} data-testid={`faq-item-${index + 1}`}>
                <summary data-testid={`summary-faq-${index + 1}`}>{item.question}</summary>
                <div className="faq-answer">{item.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-brand">Pequenos gestos, grande fé</div>
        <p>Um material digital para celebrar o verdadeiro sentido do Natal.</p>
      </footer>
    </main>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
