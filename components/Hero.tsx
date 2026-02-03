
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative px-6 pt-12 pb-20 md:pt-24 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="space-y-8 animate-slide-up">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wide uppercase animate-pulse-subtle">
            Advanced Performance Systems
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold leading-tight text-foreground">
            WatchForward <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Conditioning.</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
            Empowering athletes with data-driven conditioning protocols, elite shop access, and technical articles to bridge the gap between effort and results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] transition-all active:scale-95">
              Explore Shop
            </button>
            <button className="px-8 py-4 glass-card border border-border/50 text-foreground rounded-xl font-bold text-lg hover:bg-muted transition-all active:scale-95">
              Read Articles
            </button>
          </div>
        </div>

        {/* Visual Element / Placeholder */}
        <div className="relative animate-fade-in [animation-delay:200ms]">
          <div className="relative z-10 glass-card p-4 aspect-square max-w-[500px] mx-auto overflow-hidden group">
            <img 
              src="https://picsum.photos/800/800?grayscale" 
              alt="Athlete conditioning" 
              className="w-full h-full object-cover rounded-lg filter transition-all duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex flex-col justify-end p-8">
              <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2">Technical Insight</span>
              <h3 className="text-2xl font-heading font-bold text-foreground">Peak State Protocols</h3>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 rounded-full blur-[80px] -z-10 animate-float"></div>
        </div>
      </div>
    </section>
  );
};
