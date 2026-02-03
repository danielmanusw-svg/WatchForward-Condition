
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-lg font-heading font-bold tracking-tight text-foreground">
                WatchForward<span className="text-primary">.</span>
              </span>
            </div>
            <p className="text-muted-foreground max-w-sm">
              The industry standard for high-performance conditioning. Built for athletes who demand more from their training.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-foreground mb-6">Links</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Home</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Shop</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Articles</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-foreground mb-6">Support</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Returns</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} WatchForward Conditioning. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {/* Social Icons Placeholder */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-5 h-5 bg-muted-foreground/20 rounded hover:bg-primary transition-colors cursor-pointer"></div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
