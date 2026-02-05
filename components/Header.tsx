
import React, { useState } from 'react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isLogoHovered: boolean;
  setLogoHovered: (hovered: boolean) => void;
  onHomeClick: () => void;
  onShopClick?: () => void;
  onSupplementsClick?: () => void;
  onPerformanceClick?: () => void;
  onArticlesClick?: () => void;
  onContactClick?: () => void;
  onBasketClick?: () => void;
  basketCount?: number;
  isSupplementsPage?: boolean;
  isAnimationFinished?: boolean;
  isScrolled?: boolean;
  isArticleDetailPage?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  toggleDarkMode,
  isLogoHovered,
  setLogoHovered,
  onHomeClick,
  onShopClick,
  onSupplementsClick,
  onPerformanceClick,
  onArticlesClick,
  onContactClick,
  onBasketClick,
  basketCount = 0,
  isSupplementsPage,
  isAnimationFinished,
  isScrolled,
  isArticleDetailPage
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const forcesDarkModeColors = (isSupplementsPage || isArticleDetailPage) && !isAnimationFinished;

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Shop', href: '#' },
    { name: 'Supplements', href: '#' },
    { name: 'Performance', href: '#' },
    { name: 'Articles', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
      <nav className={`max-w-7xl mx-auto flex items-center justify-between px-6 py-4 mt-4 transition-all duration-700 rounded-2xl ${(isSupplementsPage && isAnimationFinished) || (!isSupplementsPage && isScrolled) || isArticleDetailPage
        ? 'bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
        : 'bg-transparent border-transparent'
        }`}>
        {/* Logo */}
        <div
          className="flex items-center gap-1 group cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          onClick={onHomeClick}
        >
          <span className={`text-xl font-heading font-bold tracking-tight transition-all duration-500 ${forcesDarkModeColors ? 'text-white' : 'text-foreground'}`}>
            WatchForward
          </span>
          <span
            className="text-xl font-heading font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-secondary via-primary to-secondary bg-[length:200%_auto] transition-all duration-500 animate-gradient-flow"
            style={{ animationPlayState: isLogoHovered ? 'running' : 'paused' }}
          >
            Conditioning
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                if (item.name === 'Home') onHomeClick();
                if (item.name === 'Shop') onShopClick?.();
                if (item.name === 'Supplements') onSupplementsClick?.();
                if (item.name === 'Performance') onPerformanceClick?.();
                if (item.name === 'Articles') onArticlesClick?.();
                if (item.name === 'Contact') onContactClick?.();
              }}
              className={`group relative text-sm font-medium transition-colors py-1 ${forcesDarkModeColors ? 'text-white/80 hover:text-white' : 'text-foreground/80 hover:text-primary'}`}
            >
              {item.name}
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${forcesDarkModeColors ? 'bg-white' : 'bg-primary'}`}></span>
            </a>
          ))}
        </div>

        {/* Icons & Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-all duration-300 hover:text-primary active:scale-95`}
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={forcesDarkModeColors ? "white" : "currentColor"}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={forcesDarkModeColors ? "white" : "currentColor"}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <button
            onClick={onBasketClick}
            className={`relative p-2 rounded-lg hover:bg-white/10 transition-colors ${forcesDarkModeColors ? 'text-white' : 'text-foreground'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {basketCount > 0 && (
              <span className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${isSupplementsPage ? 'bg-secondary' : 'bg-primary'} animate-fade-in`}>
                {basketCount}
              </span>
            )}
            <span className="sr-only">Basket</span>
          </button>

          <button className={`text-sm font-medium transition-colors ${forcesDarkModeColors ? 'text-white/80 hover:text-white' : 'text-foreground/80 hover:text-primary'}`}>
            Sign In
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 glass-card border border-border/50 p-6 animate-fade-in">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-lg font-medium text-foreground py-2 border-b border-border/50 last:border-0"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onBasketClick?.();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg text-foreground font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Basket
              </button>
              <button className="px-6 py-2 bg-primary text-white rounded-lg font-bold">
                Log In
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
