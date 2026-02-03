
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BasketItem } from '../App';

interface BasketSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    items: BasketItem[];
    onRemove: (id: string) => void;
    onUpdateQuantity: (id: string, delta: number) => void;
    onCheckout?: () => void;
}

export const BasketSidebar: React.FC<BasketSidebarProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity, onCheckout }) => {
    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0a0a0a]/90 backdrop-blur-2xl border-l border-white/10 shadow-2xl z-[70] flex flex-col"
                    >
                        <div className="p-8 flex items-center justify-between border-b border-white/10">
                            <div>
                                <h2 className="text-2xl font-heading font-bold text-white">Your Basket</h2>
                                <p className="text-xs text-white/40 uppercase tracking-widest mt-1">{items.length} Items Selected</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-grow overflow-y-auto p-8 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                    </div>
                                    <p className="text-xl font-medium text-white">Your basket is empty</p>
                                    <p className="text-white/40 text-sm">Looks like you haven't added any conditioning formulas yet.</p>
                                    <button
                                        onClick={onClose}
                                        className="mt-8 px-8 py-3 bg-primary text-white rounded-xl font-bold hover:scale-105 transition-transform"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex gap-6 p-4 bg-white/5 border border-white/10 rounded-2xl relative group"
                                    >
                                        <div className="w-20 h-20 bg-white/5 rounded-xl overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-grow flex flex-col justify-between py-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold text-white leading-tight">{item.name}</h3>
                                                <button
                                                    onClick={() => onRemove(item.id)}
                                                    className="p-1 text-white/20 hover:text-red-500 transition-colors"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5">
                                                    <button
                                                        onClick={() => onUpdateQuantity(item.id, -1)}
                                                        className="w-7 h-7 flex items-center justify-center hover:bg-white/10 rounded-md text-white transition-colors"
                                                    >-</button>
                                                    <span className="w-8 text-center text-xs font-bold text-white">{item.quantity}</span>
                                                    <button
                                                        onClick={() => onUpdateQuantity(item.id, 1)}
                                                        className="w-7 h-7 flex items-center justify-center hover:bg-white/10 rounded-md text-white transition-colors"
                                                    >+</button>
                                                </div>
                                                <p className="font-bold text-white">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        <div className="p-8 border-t border-white/10 bg-white/5 backdrop-blur-md">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-white/60">Subtotal</span>
                                <span className="text-3xl font-bold text-white">${subtotal.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={onCheckout}
                                className="w-full py-5 bg-white text-black font-heading font-bold text-xl rounded-2xl hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl"
                            >
                                Checkout
                            </button>
                            <p className="text-center text-[10px] text-white/30 uppercase tracking-[0.2em] mt-6">Secure Encrypted Transaction</p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
