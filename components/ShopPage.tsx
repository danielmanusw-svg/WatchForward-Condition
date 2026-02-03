
import React from 'react';
import { motion } from 'framer-motion';

interface Product {
    id: string;
    name: string;
    price: string;
    category: string;
    image: string;
    description: string;
}

const shopProducts: Product[] = [
    {
        id: "collagen",
        name: "Collagen Powder",
        price: "$45.00",
        category: "Supplements",
        image: "/collagen.png",
        description: "Bio-available bovine collagen peptides for joint longevity."
    },
    {
        id: "vitaminc",
        name: "Vitamin C",
        price: "$25.00",
        category: "Supplements",
        image: "/vitamin-c.png",
        description: "Essential co-factor for collagen synthesis and immune support."
    }
];

interface ShopPageProps {
    onProductSelect?: (id: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onProductSelect }) => {
    return (
        <div className="w-full max-w-7xl mx-auto py-32 px-6 animate-fade-in min-h-screen">
            <header className="mb-20 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-7xl font-heading font-bold text-foreground mb-6"
                >
                    The <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Conditioning</span> Shop
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-foreground/60 max-w-2xl mx-auto"
                >
                    Systematic tools and validated formulas for peak human optimization.
                </motion.p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {shopProducts.map((product, idx) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -10 }}
                        onClick={() => onProductSelect?.(product.id)}
                        className="group glass-card p-10 flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl cursor-pointer"
                    >
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-8">
                            <motion.img
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.8 }}
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="px-4 py-1.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/10">
                                    {product.category}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-3xl font-heading font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                {product.name}
                            </h3>
                            <span className="text-2xl font-bold text-foreground">{product.price}</span>
                        </div>

                        <p className="text-foreground/60 leading-relaxed mb-8 flex-grow">
                            {product.description}
                        </p>

                        <button
                            onClick={() => onProductSelect?.(product.id)}
                            className="group/btn relative w-full py-5 bg-primary text-white rounded-2xl font-heading font-bold text-lg overflow-hidden transition-all duration-500 hover:scale-[1.02] shadow-lg shadow-primary/20"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-shine"></div>
                            Buy Now
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
