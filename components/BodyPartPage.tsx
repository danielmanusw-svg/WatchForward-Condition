
import React from 'react';
import { motion } from 'framer-motion';

interface BodyPartPageProps {
    onBackClick?: () => void;
}

export const BodyPartPage: React.FC<BodyPartPageProps> = ({ onBackClick }) => {
    const buttons = [
        { label: 'Sport Specific', color: 'primary' },
        { label: 'Rehabilitation', color: 'secondary' },
        { label: 'Function Preservation', color: 'primary' }
    ];

    return (
        <div className="w-full max-w-7xl mx-auto pt-24 px-6 animate-fade-in relative min-h-screen">
            {/* Top Navigation Row - Positioned High and Left */}
            <div className="flex flex-row items-center gap-8 mb-16">
                {/* Back Button */}
                <motion.button
                    onClick={onBackClick}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden transition-all duration-500 hover:border-primary/50 flex items-center gap-2"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative text-sm font-heading font-bold text-foreground group-hover:text-primary transition-colors cursor-pointer">
                        &lt; Back
                    </span>
                </motion.button>

                {/* Horizontal Discipline Buttons */}
                <div className="flex flex-row gap-4">
                    {buttons.map((btn, index) => (
                        <motion.button
                            key={btn.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`group relative px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden transition-all duration-500 hover:border-${btn.color}/50 flex justify-center items-center shadow-lg`}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-r from-${btn.color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                            <span className={`relative text-sm font-heading font-bold tracking-wide text-foreground group-hover:text-${btn.color} transition-colors duration-300`}>
                                {btn.label}
                            </span>
                        </motion.button>
                    ))}
                </div>
            </div>
        </div>
    );
};
