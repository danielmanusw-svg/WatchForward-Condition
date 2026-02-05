import React, { useState, useEffect, useRef } from 'react';
import { ParticleSystem } from './components/ParticleSystem';
import { Header } from './components/Header';
import { SupplementScroll } from './components/SupplementScroll';
import { SupplementProducts } from './components/SupplementProducts';
import { PerformanceMenu } from './components/PerformanceMenu';
import { ArticlesPage } from './components/ArticlesPage';
import { BasketSidebar } from './components/BasketSidebar';
import { BodyPartPage } from './components/BodyPartPage';
import { ContactPage } from './components/ContactPage';
import { ShopPage } from './components/ShopPage';
import { ProductSalesPage } from './components/ProductSalesPage';
import { CheckoutPage } from './components/CheckoutPage';
import { ArticleDetailPage } from './components/ArticleDetailPage';
import { Article } from './components/ArticlesPage';

export interface BasketItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'supplements_list' | 'performance_menu' | 'articles' | 'article_detail' | 'body_part' | 'contact' | 'shop' | 'product_sales' | 'checkout'>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<'collagen' | 'vitaminc' | null>(null);
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5),
        y: (e.clientY / window.innerHeight - 0.5),
      });
    };
    const handleScroll = () => {
      // General scroll detection
      setIsScrolled(window.scrollY > 20);

      // Threshold: Scroll past the hero
      // Supplements track (~5.5vh) or Article Hero (~0.7vh/70vh)
      const threshold = currentPage === 'supplements_list'
        ? window.innerHeight * 5.5
        : window.innerHeight * 0.7;

      if (window.scrollY > threshold) {
        setIsAnimationFinished(true);
      } else {
        setIsAnimationFinished(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Removed explicit background color logic for supplements_list to let animation take over
    document.body.style.backgroundColor = '';
  }, [isDarkMode, currentPage]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const scrollToProducts = () => {
    if (productsRef.current) {
      const offset = 40; // Slight offset to ensure the header doesn't clip the writing
      const targetPos = productsRef.current.offsetTop - offset;
      window.scrollTo({
        top: targetPos,
        behavior: 'smooth'
      });
    }
  };

  const addToBasket = (item: BasketItem) => {
    setBasket(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
    setIsBasketOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setBasket(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeFromBasket = (id: string) => {
    setBasket(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      {/* Unified Background System - Global Persistence */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-full transition-transform duration-1000 ease-out"
          style={{
            transform: `translate3d(${mousePosition.x * -80}px, ${mousePosition.y * -80}px, 0)`
          }}
        >
          <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-primary/30 rounded-full blur-[180px] animate-float"></div>
        </div>
        <div
          className="absolute top-0 left-0 w-full h-full transition-transform duration-1000 ease-out"
          style={{
            transform: `translate3d(${mousePosition.x * 80}px, ${mousePosition.y * 80}px, 0)`
          }}
        >
          <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-secondary/30 rounded-full blur-[180px] animate-float-delayed"></div>
        </div>
      </div>
      {/* Particle System - Restricted to Home page */}
      {currentPage === 'home' && <ParticleSystem />}

      <Header
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isLogoHovered={isLogoHovered}
        setLogoHovered={setIsLogoHovered}
        onHomeClick={() => setCurrentPage('home')}
        onShopClick={() => setCurrentPage('shop')}
        onSupplementsClick={() => setCurrentPage('supplements_list')}
        onPerformanceClick={() => setCurrentPage('performance_menu')}
        onArticlesClick={() => setCurrentPage('articles')}
        onContactClick={() => setCurrentPage('contact')}
        onBasketClick={() => setIsBasketOpen(true)}
        isSupplementsPage={currentPage === 'supplements_list'}
        isArticleDetailPage={currentPage === 'article_detail'}
        isAnimationFinished={isAnimationFinished}
        isScrolled={isScrolled}
        basketCount={basket.reduce((acc, item) => acc + item.quantity, 0)}
      />

      <BasketSidebar
        isOpen={isBasketOpen}
        onClose={() => setIsBasketOpen(false)}
        items={basket}
        onRemove={removeFromBasket}
        onUpdateQuantity={updateQuantity}
        onCheckout={() => {
          setIsBasketOpen(false);
          setCurrentPage('checkout');
        }}
      />

      <main className={`flex-grow flex flex-col items-center w-full ${currentPage === 'supplements_list' || currentPage === 'article_detail'
        ? 'pt-0 px-0'
        : 'pt-24 px-0'
        }`}>
        {currentPage === 'home' ? (
          <div className="flex flex-col items-center justify-center space-y-16 py-12 flex-grow">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-center tracking-tight max-w-5xl leading-tight animate-fade-in">
              <span className="text-black dark:text-white">Defining the Ambiguity of </span>
              <br className="block md:hidden" />
              <span
                className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-secondary via-primary to-secondary bg-[length:200%_auto] px-2 animate-gradient-flow"
                style={{ animationPlayState: isLogoHovered ? 'running' : 'paused' }}
              >
                Conditioning
              </span>
              <br className="block md:hidden" />
              <span className="text-black dark:text-white"> in Concrete Solution</span>
            </h1>

            <div className="flex flex-col md:flex-row justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <button
                onClick={() => setCurrentPage('performance_menu')}
                className="group relative w-64 py-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 hover:border-primary/50 flex justify-center items-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative text-xl font-heading font-bold tracking-wide text-foreground group-hover:text-primary transition-colors duration-300">
                  Performance
                </span>
              </button>

              <button
                onClick={() => setCurrentPage('supplements_list')}
                className="group relative w-64 py-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 hover:border-secondary/50 flex justify-center items-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative text-xl font-heading font-bold tracking-wide text-foreground group-hover:text-secondary transition-colors duration-300">
                  Supplements
                </span>
              </button>
            </div>
          </div>
        ) : currentPage === 'performance_menu' ? (
          <PerformanceMenu onButtonClick={() => setCurrentPage('body_part')} />
        ) : currentPage === 'articles' ? (
          <ArticlesPage onArticleClick={(article) => {
            setSelectedArticle(article);
            setCurrentPage('article_detail');
          }} />
        ) : currentPage === 'article_detail' && selectedArticle ? (
          <ArticleDetailPage
            article={selectedArticle}
            onBack={() => setCurrentPage('articles')}
          />
        ) : currentPage === 'body_part' ? (
          <BodyPartPage onBackClick={() => setCurrentPage('performance_menu')} />
        ) : currentPage === 'contact' ? (
          <ContactPage />
        ) : currentPage === 'shop' ? (
          <ShopPage onProductSelect={(id) => {
            setSelectedProductId(id as 'collagen' | 'vitaminc');
            setCurrentPage('product_sales');
          }} />
        ) : currentPage === 'product_sales' && selectedProductId ? (
          <ProductSalesPage
            productId={selectedProductId}
            onBack={() => setCurrentPage('shop')}
            onAddToBasket={addToBasket}
            onBuyNow={(item) => {
              // Direct Buy Now logic: clear basket of similar items and add this one specifically?
              // Or just ensure this item is in the basket and go to checkout.
              addToBasket(item);
              setCurrentPage('checkout');
            }}
          />
        ) : currentPage === 'checkout' ? (
          <CheckoutPage
            items={basket}
            onBack={() => setCurrentPage('shop')}
            onOrderComplete={() => {
              alert('Order Processing Initialized');
              setBasket([]);
              setCurrentPage('home');
            }}
          />
        ) : (
          <div className="w-full flex flex-col">
            <SupplementScroll onShopNowClick={scrollToProducts} />
            <SupplementProducts
              containerRef={productsRef}
              onBuyNow={(id) => {
                setSelectedProductId(id as 'collagen' | 'vitaminc');
                setCurrentPage('product_sales');
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
