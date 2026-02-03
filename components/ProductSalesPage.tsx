
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BasketItem } from '../App';

interface ProductData {
    id: string;
    name: string;
    tagline: string;
    price: string;
    numericPrice: number;
    description: string;
    benefits: string[];
    details: { label: string; value: string }[];
    image: string;
    accentColor: 'primary' | 'secondary';
}

const productContent: Record<string, ProductData> = {
    collagen: {
        id: 'collagen',
        name: 'Structural Collagen',
        tagline: 'Architectural integrity for the human frame.',
        price: '$45.00',
        numericPrice: 45,
        image: '/collagen.png',
        accentColor: 'primary',
        description: 'Our Bio-available Bovine Collagen represents the pinnacle of structural conditioning. Sourced from grass-fed, validated origins, this formula provides the essential amino acid profile required to maintain joint longevity, skin elasticity, and systemic connective tissue health under high-performance load.',
        benefits: [
            'Enhanced Joint Recoil & Resilience',
            'Accelerated Connective Tissue Repair',
            'Optimized Skin & Fascial Integrity',
            'Validated Grass-Fed Source Verification'
        ],
        details: [
            { label: 'Serving Size', value: '1 Scoop (10g)' },
            { label: 'Type', value: 'Bovine Peptides I & III' },
            { label: 'Purity', value: '99.8% Bio-available' }
        ]
    },
    vitaminc: {
        id: 'vitaminc',
        name: 'Systemic Vitamin C',
        tagline: 'The essential co-factor for synthesis and defense.',
        price: '$25.00',
        numericPrice: 25,
        image: '/vitamin-c.png',
        accentColor: 'secondary',
        description: 'Movement is a synthesis of biology and mechanics. Our Systemic Vitamin C is engineered as the critical catalyst for collagen production and immune optimization. Utilizing high-absorption ascorbic acid, it ensures that your body has the necessary defense and synthesis capabilities to maintain the WatchForward conditioning standard.',
        benefits: [
            'Catalytic Collagen Synthesis Support',
            'High-Potency Antioxidant Shield',
            'Systemic Immune Optimization',
            'Proprietary Absorption Matrix'
        ],
        details: [
            { label: 'Quantity', value: '60 Capsules' },
            { label: 'Dosage', value: '1000mg per serving' },
            { label: 'Storage', value: 'Cool, Dry Environment' }
        ]
    }
};

interface ProductSalesPageProps {
    productId: 'collagen' | 'vitaminc';
    onBack: () => void;
    onAddToBasket?: (item: BasketItem) => void;
    onBuyNow?: (item: BasketItem) => void;
}

export const ProductSalesPage: React.FC<ProductSalesPageProps> = ({ productId, onBack, onAddToBasket, onBuyNow }) => {
    const data = productContent[productId];
    const [quantity, setQuantity] = useState(1);

    const handleAction = (action: 'add' | 'buy') => {
        const item = {
            id: data.id,
            name: data.name,
            price: data.numericPrice,
            quantity: quantity,
            image: data.image
        };

        if (action === 'add') onAddToBasket?.(item);
        if (action === 'buy') onBuyNow?.(item);
    };

    return (
        <div className="w-full max-w-7xl mx-auto py-24 px-6 animate-fade-in">
            {/* Back Navigation */}
            <motion.button
                onClick={onBack}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="group flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors mb-12"
            >
                <span className="text-xl">←</span>
                <span className="font-bold uppercase tracking-widest text-xs">Back to Shop</span>
            </motion.button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Left Column: Product Viz & Pricing */}
                <div className="space-y-8 lg:sticky lg:top-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -15, scale: 1.01 }}
                        transition={{ duration: 0.8 }}
                        className="group relative aspect-[4/3] rounded-3xl overflow-hidden glass-card p-10 bg-white/5 border-white/10 hover:border-white/20 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-500"
                    >
                        <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-2xl">
                            <img
                                src={data.image}
                                alt={data.name}
                                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>
                    </motion.div>

                    {/* Pricing under the image */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-end justify-between px-2"
                    >
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Unit Price</span>
                            <span className="text-3xl font-bold text-foreground">{data.price}</span>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Total Investment</span>
                            <p className="text-4xl font-bold text-primary">
                                ${(data.numericPrice * quantity).toFixed(2)}
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Sales Copy & Actions */}
                <div className="flex flex-col">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <span className={`inline-flex px-4 py-1.5 rounded-full bg-${data.accentColor}/20 text-${data.accentColor === 'primary' ? 'primary' : 'secondary'} text-[10px] font-bold uppercase tracking-widest border border-${data.accentColor === 'primary' ? 'primary' : 'secondary'}/30`}>
                            Validated Formula
                        </span>
                        <h1 className="text-5xl md:text-7xl font-heading font-bold text-foreground leading-tight">
                            {data.name}
                        </h1>
                        <p className="text-2xl font-medium text-foreground/40 italic">
                            "{data.tagline}"
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 space-y-8"
                    >
                        <p className="text-lg leading-relaxed text-foreground/80">
                            {data.description}
                        </p>

                        <div className="grid grid-cols-1 gap-4 py-8 border-y border-white/10">
                            {data.benefits.map((benefit, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className={`w-1.5 h-1.5 rounded-full ${data.accentColor === 'primary' ? 'bg-primary' : 'bg-secondary'}`}></div>
                                    <span className="font-bold text-foreground/80 text-sm tracking-wide">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-8">
                            {data.details.map((detail, i) => (
                                <div key={i} className="flex flex-col">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">{detail.label}</span>
                                    <span className="text-lg font-bold text-foreground">{detail.value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-4 pt-10">
                            {/* Buy Now & Quantity Row */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleAction('buy')}
                                    className="flex-grow py-5 bg-primary text-white rounded-2xl font-heading font-bold text-xl relative overflow-hidden group hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-2xl shadow-primary/20"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-shine"></div>
                                    Buy Now
                                </button>

                                {/* Refined Compact Quantity Selector */}
                                <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-1 gap-1">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-8 h-10 flex items-center justify-center hover:bg-white/10 rounded-xl transition-colors text-foreground font-bold"
                                    >-</button>
                                    <span className="w-8 text-center font-bold text-foreground text-sm">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-8 h-10 flex items-center justify-center hover:bg-white/10 rounded-xl transition-colors text-foreground font-bold"
                                    >+</button>
                                </div>
                            </div>

                            <button
                                onClick={() => handleAction('add')}
                                className={`w-full py-5 bg-white/5 border border-white/10 text-foreground rounded-2xl font-heading font-bold text-xl relative overflow-hidden group hover:bg-white/10 transition-all duration-300`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-${data.accentColor}/10 to-transparent -translate-x-full group-hover:animate-shine"></div>
                                Add to Basket
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
