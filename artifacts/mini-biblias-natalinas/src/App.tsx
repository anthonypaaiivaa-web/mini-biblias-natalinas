import { type MouseEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ShieldCheck, X } from 'lucide-react';
import productMockup from '@assets/Mini_Bíblias_Natalinas_para_Imprimir_1794977596812.png';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

// Configure os links de checkout aqui. Mantenha vazios até ter os links reais.
const CHECKOUT_LINKS = {
  basic: '',
  complete: '',
  upgrade17: '',
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

function CheckoutAction({
  tier,
  children,
  className,
}: {
  tier: 'basic' | 'complete' | 'upgrade17';
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
  const [upsellOpen, setUpsellOpen] = useState(false);

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
              <button
                type="button"
                className="button-secondary"
                data-testid="button-open-upsell"
                onClick={() => setUpsellOpen(true)}
              >
                QUERO ESSA OFERTA
              </button>
            </article>
            <article className="price-card complete">
              <span className="recommended">Oferta completa</span>
              <div className="price-label">A experiência completa</div>
              <div className="price-amount">R$27<small>,00</small></div>
              <p className="price-desc">O produto principal acompanhado de sete bônus especiais.</p>
              <div className="price-divider" />
              <ul className="price-includes">
                <li>Mini Bíblias Natalinas</li>
                {bonuses.map((bonus) => (
                  <li key={bonus.title}>{bonus.title}</li>
                ))}
              </ul>
              <CheckoutAction tier="complete" className="button-primary">QUERO A OFERTA COMPLETA</CheckoutAction>
            </article>
          </div>
          {upsellOpen && (
            <div
              className="checkout-notice upsell-overlay"
              role="presentation"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) setUpsellOpen(false);
              }}
            >
              <section
                className="upsell-card"
                role="dialog"
                aria-modal="true"
                aria-labelledby="upsell-title"
              >
                <button
                  className="notice-close"
                  type="button"
                  aria-label="Fechar oferta especial"
                  data-testid="button-close-upsell"
                  onClick={() => setUpsellOpen(false)}
                >
                  <X size={21} aria-hidden="true" />
                </button>
                <span className="eyebrow">Uma condição especial</span>
                <h2 id="upsell-title">Leve a oferta completa por R$17</h2>
                <p>
                  Receba as Mini Bíblias Natalinas e os sete bônus por apenas
                  <strong> R$17 no total.</strong>
                </p>
                <ul className="upsell-bonus-list">
                  {bonuses.map((bonus, index) => (
                    <li key={bonus.title} data-testid={`upsell-bonus-${index + 1}`}>
                      {bonus.title}
                    </li>
                  ))}
                </ul>
                <div className="upsell-actions">
                  <CheckoutAction tier="upgrade17" className="button-primary">
                    QUERO A OFERTA COMPLETA POR R$17
                  </CheckoutAction>
                  <CheckoutAction tier="basic" className="button-secondary">
                    NÃO, FICAREI COM A OFERTA DE R$10
                  </CheckoutAction>
                </div>
              </section>
            </div>
          )}
          <p className="safe-note">Você verá os detalhes de pagamento na página de checkout.</p>
        </div>
      </section>

      <section className="guarantee" aria-labelledby="guarantee-title">
        <div className="guarantee-box">
          <div className="seal" aria-hidden="true"><ShieldCheck size={28} /><span>COMPRA<br />SEGURA</span></div>
          <div>
            <h2 id="guarantee-title">Compre com tranquilidade</h2>
            <p>Você tem 7 dias de garantia. Consulte as condições completas na página de checkout antes de finalizar sua compra.</p>
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
