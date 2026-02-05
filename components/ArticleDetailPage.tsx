
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface Article {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    image: string;
    content?: string[];
}

interface ArticleDetailPageProps {
    article: Article;
    onBack: () => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ article, onBack }) => {
    // Smooth scroll to top when mounting
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full min-h-screen"
        >
            {/* Cinematic Hero Section */}
            <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="w-full h-full"
                    style={{
                        maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
                    }}
                >
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Subtle Top Shadow for Header/Back Visibility - No wash effect */}
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 via-black/20 to-transparent pointer-events-none"></div>

                {/* Back Button */}
                <div className="absolute top-28 left-8 md:left-12 z-20">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-[0_20px_40px_-10px_rgba(var(--primary),0.5)] hover:scale-105 active:scale-95 transition-all group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>
                </div>

                {/* Hero Title Container */}
                <div className="absolute bottom-40 left-8 right-8 md:left-12 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="p-8 md:p-10 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-xl relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-wrap items-center gap-4 mb-6"
                            >
                                <span className="px-4 py-1.5 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
                                    {article.category}
                                </span>
                                <span className="text-white/60 text-xs font-bold tracking-widest uppercase">
                                    {article.date}
                                </span>
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.2] tracking-tighter"
                            >
                                {article.title}
                            </motion.h1>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-8 py-24 md:py-32">
                <div className="space-y-16 text-foreground/70 leading-[1.8] text-xl">
                    {/* Excerpt spotlight */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-3xl md:text-4xl font-medium text-foreground italic border-l-4 border-primary pl-8 py-2 mb-20"
                    >
                        {article.excerpt}
                    </motion.p>

                    <div className="space-y-12">
                        {article.content?.map((paragraph, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                {paragraph}
                            </motion.p>
                        ))}
                    </div>

                    {/* Data Visualization / Insight blocks */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-24">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-12 bg-white/5 border border-white/10 rounded-[3rem] hover:bg-white/[0.08] transition-all duration-500 group"
                        >
                            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <span className="text-primary font-bold">01</span>
                            </div>
                            <h4 className="font-heading font-bold text-primary mb-6 uppercase tracking-[0.2em] text-sm italic">Biological Threshold</h4>
                            <p className="text-foreground/90 text-lg leading-relaxed">
                                Protocols ensure that systemic inflammation is managed through bio-available micronutrient saturation, accelerating cellular turnover.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-12 bg-white/5 border border-white/10 rounded-[3rem] hover:bg-white/[0.08] transition-all duration-500 group"
                        >
                            <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <span className="text-secondary font-bold">02</span>
                            </div>
                            <h4 className="font-heading font-bold text-secondary mb-6 uppercase tracking-[0.2em] text-sm italic">Mechanical Efficiency</h4>
                            <p className="text-foreground/90 text-lg leading-relaxed">
                                Load distribution is precisely calculated to optimize fascial recruitment while minimizing joint stress under high-intensity output.
                            </p>
                        </motion.div>
                    </div>

                    <p>
                        The data suggests that individuals who adhere to a strict adaptation cycle—where stress is precisely managed and recovery is biologically optimized—see a 40% increase in structural resilience over a 6-month period. This methodology represents the culmination of years of biomechanical research and biological testing within the WatchForward Labs.
                    </p>

                    {/* High-impact philosophy block */}
                    <div className="relative p-16 md:p-24 bg-gradient-to-br from-primary/10 to-secondary/10 border border-white/5 rounded-[4rem] overflow-hidden my-32 group">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] -z-10 group-hover:bg-primary/30 transition-colors duration-1000"></div>
                        <h4 className="font-heading font-bold text-primary mb-10 uppercase tracking-[0.5em] text-xs">The WatchForward Methodology</h4>
                        <p className="text-foreground font-bold italic text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
                            "Performance and longevity are not conflicting goals; they are the result of the same precise biological engineering."
                        </p>
                    </div>

                    <p className="pb-24">
                        As we continue to develop new methods for human optimization, the intersection of technology and biology becomes clearer. Our research indicates that using high-precision data to drive nutritional and physical choices is the only way to achieve sustainable, elite performance levels in the modern world.
                    </p>
                </div>

                {/* Article Footer */}
                <div className="pt-24 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="flex flex-col items-center md:items-start">
                        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-foreground/40 mb-3">Editor Intelligence // v2.6.0</span>
                        <span className="font-heading font-bold text-foreground text-2xl tracking-tighter">WatchForward Intelligence Lab</span>
                    </div>
                    <button
                        onClick={onBack}
                        className="px-16 py-6 bg-primary text-white rounded-2xl font-bold hover:scale-105 transition-all uppercase tracking-[0.2em] text-sm shadow-[0_20px_40px_-10px_rgba(var(--primary),0.3)] active:scale-95 group flex items-center gap-3"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Research
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
