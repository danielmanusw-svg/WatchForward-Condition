
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Article {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    image: string;
    content?: string[];
}

export const articles: Article[] = [
    {
        id: 1,
        title: "The Science of Neural Conditioning",
        excerpt: "Discover how targeted neural stimulation can enhance performance and accelerate rehabilitation protocols in high-performance athletes.",
        category: "Performance",
        date: "Feb 12, 2026",
        image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800",
        content: [
            "Systemic conditioning requires a holistic integration of mechanical load, neural recruitment, and biological support. In this detailed protocol review, we dive into the specific metrics that define the WatchForward approach.",
            "True human optimization requires more than just effort; it requires a calculated, data-driven methodology that respects biological constraints while pushing mechanical limits.",
            "Our research indicates that targeting specific neural pathways during the eccentric phase of movement can lead to a 25% increase in neuromuscular efficiency. This is the cornerstone of our proprietary neural conditioning protocol."
        ]
    },
    {
        id: 2,
        title: "Rehabilitation Transitions: From Lab to Field",
        excerpt: "Bridging the gap between clinical rehabilitation and return-to-play with data-driven conditioning metrics and objective analysis.",
        category: "Rehabilitation",
        date: "Feb 10, 2026",
        image: "https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=800",
        content: [
            "The transition from clinical rehab to high-intensity performance is where most athletes fail. At WatchForward, we use objective data to ensure every step is validated by biological readiness.",
            "By monitoring force production asymmetries in real-time, we can adjust load-bearing protocols to ensure the tissue adaptation is linear and sustainable.",
            "This article outlines our 'Return-to-Play' dashboard, which integrates heart rate variability, mechanical load data, and subjective fatigue markers to create a comprehensive recovery score."
        ]
    },
    {
        id: 3,
        title: "Functional Longevity in Modern Athletics",
        excerpt: "Mastering the preservation of movement quality through systematic adaptation and precise nutritional supplementation.",
        category: "Function Preservation",
        date: "Feb 08, 2026",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
        content: [
            "Preserving movement quality over a multi-decade career is the ultimate goal of the modern athlete. This requires a shift from 'maximal load' to 'optimal movement' strategies.",
            "We focus on the preservation of joint space and fascial elasticity through targeted mobility work and anti-inflammatory nutritional support.",
            "Discover the specific protocols we use to maintain elite-level functional range of motion, even under the stress of high-frequency competition."
        ]
    },
    {
        id: 4,
        title: "Micronutrient Density for Cellular Repair",
        excerpt: "Analyzing the role of concentrated bio-available antioxidants in accelerating systemic recovery cycles.",
        category: "Nutrition",
        date: "Feb 05, 2026",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
        content: [
            "Cellular repair is a biological bottleneck in performance. By optimizing the density of bio-available micronutrients, we can shift the recovery curve significantly.",
            "Concentrated antioxidants like Ubiquinol and high-dose Vitamin C play a critical role in mitigating oxidative stress following high-intensity training sessions.",
            "This protocol details our 'Intra-Cycle' nutrition strategy, designed to support mitochondrial health and ensure that systemic recovery matches mechanical demand."
        ]
    }
];

interface ArticlesPageProps {
    onArticleClick: (article: Article) => void;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({ onArticleClick }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const categories = ['All', 'Performance', 'Rehabilitation', 'Nutrition', 'Function Preservation'];

    const filteredArticles = selectedCategory === 'All'
        ? articles
        : articles.filter(a => a.category === selectedCategory);

    return (
        <div className="w-full max-w-7xl mx-auto py-32 px-6 animate-fade-in min-h-screen">
            {/* Page Header */}
            <header className="mb-20 text-left">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6"
                >
                    Knowledge Center
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-foreground/60 max-w-2xl"
                >
                    Deep dives into the protocols, research, and science powering the WatchForward conditioning system.
                </motion.p>
            </header>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-4 mb-16">
                {categories.map((cat, idx) => (
                    <motion.button
                        key={cat}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (idx * 0.05) }}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-6 py-3 rounded-xl font-heading font-bold text-sm transition-all duration-300 border ${selectedCategory === cat
                            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105'
                            : 'bg-white/5 text-foreground/60 border-white/10 hover:border-primary/50 hover:text-foreground'
                            }`}
                    >
                        {cat}
                    </motion.button>
                ))}
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 col-span-full"
                    >
                        {filteredArticles.map((article) => (
                            <motion.article
                                key={article.id}
                                onClick={() => onArticleClick(article)}
                                className="group relative flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer"
                            >
                                {/* Image Container */}
                                <div className="aspect-[16/10] overflow-hidden relative">
                                    <motion.img
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.8 }}
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                                            {article.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <span className="text-xs text-foreground/40 font-medium mb-3">{article.date}</span>
                                    <h3 className="text-2xl font-heading font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                                        {article.title}
                                    </h3>
                                    <p className="text-foreground/60 text-sm leading-relaxed mb-8 flex-grow">
                                        {article.excerpt}
                                    </p>

                                    <div className="group/btn relative inline-flex items-center gap-2 text-sm font-bold text-primary self-start">
                                        Open Protocol
                                        <motion.span
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                        >
                                            →
                                        </motion.span>
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover/btn:w-full"></span>
                                    </div>
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                            </motion.article>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
