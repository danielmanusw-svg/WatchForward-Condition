
import React from 'react';
import { motion } from 'framer-motion';

export const PerformanceMenu: React.FC<{ onButtonClick?: () => void }> = ({ onButtonClick }) => {
    return (
        <div className="w-full max-w-7xl mx-auto py-32 px-6 flex flex-col items-center justify-center animate-fade-in min-h-[60vh]">
            <motion.button
                onClick={onButtonClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 bg-primary text-white rounded-2xl font-heading font-bold text-xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(32,45,125,0.3)]"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-shine"></div>
                Performance Menu Button
            </motion.button>
        </div>
    );
};
