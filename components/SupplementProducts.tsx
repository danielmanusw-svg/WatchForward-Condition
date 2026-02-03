
import React from 'react';
import { motion } from 'framer-motion';

export const SupplementProducts: React.FC<{
    containerRef?: React.RefObject<HTMLDivElement>;
    onBuyNow?: (id: string) => void;
}> = ({ containerRef, onBuyNow }) => {
    return (
        <section ref={containerRef} className="relative py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">Premium Formulas</h2>
                    <p className="text-lg text-foreground/60 max-w-xl mx-auto">Designed for systemic conditioning and peak performance recovery.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Collagen Box */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -15, scale: 1.01 }}
                        transition={{ duration: 0.8 }}
                        onClick={() => onBuyNow?.('collagen')}
                        className="group glass-card p-10 flex flex-col items-center text-center space-y-8 bg-white/5 border-white/10 hover:border-white/20 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 cursor-pointer"
                    >
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                            <img src="/collagen.png" alt="Collagen" className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-3xl font-heading font-bold text-foreground">Collagen Powder</h3>
                            <p className="text-foreground/60">Bio-available bovine collagen peptides for joint longevity.</p>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onBuyNow?.('collagen');
                                }}
                                className="group/btn relative px-10 py-4 bg-primary text-white dark:bg-white dark:text-primary rounded-full font-bold text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 ease-in-out"></span>
                                <span className="relative z-10">Buy Now</span>
                            </button>
                        </div>
                    </motion.div>

                    {/* Vitamin C Box */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -15, scale: 1.01 }}
                        transition={{ duration: 0.8 }}
                        onClick={() => onBuyNow?.('vitaminc')}
                        className="group glass-card p-10 flex flex-col items-center text-center space-y-8 bg-white/5 border-white/10 hover:border-white/20 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 cursor-pointer"
                    >
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                            <img src="/vitamin-c.png" alt="Vitamin C" className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-3xl font-heading font-bold text-foreground">Vitamin C</h3>
                            <p className="text-foreground/60">Essential co-factor for collagen synthesis and immune support.</p>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onBuyNow?.('vitaminc');
                                }}
                                className="group/btn relative px-10 py-4 bg-primary text-white dark:bg-white dark:text-primary rounded-full font-bold text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 ease-in-out"></span>
                                <span className="relative z-10">Buy Now</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
