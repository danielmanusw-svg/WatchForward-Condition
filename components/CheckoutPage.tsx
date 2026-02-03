
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BasketItem } from '../App';

interface CheckoutPageProps {
    items: BasketItem[];
    onBack: () => void;
    onOrderComplete: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ items, onBack, onOrderComplete }) => {
    const [step, setStep] = useState(1);
    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = 5.00;
    const total = subtotal + shipping;

    return (
        <div className="w-full max-w-7xl mx-auto py-24 px-6 animate-fade-in min-h-screen">
            {/* Header */}
            <header className="mb-16">
                <motion.button
                    onClick={onBack}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="group flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors mb-8"
                >
                    <span className="text-xl">←</span>
                    <span className="font-bold uppercase tracking-widest text-xs">Return to Platform</span>
                </motion.button>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-heading font-bold text-foreground"
                >
                    Systemic <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Checkout</span>
                </motion.h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Checkout Forms */}
                <div className="lg:col-span-7 space-y-12">
                    {/* Shipping Section */}
                    <div className="glass-card p-10 bg-white/5 border-white/10 rounded-3xl space-y-8">
                        <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-white">1</div>
                            <h2 className="text-2xl font-heading font-bold text-white">Shipping Logistics</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-full space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Full Name</label>
                                <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Email Protocol</label>
                                <input type="email" placeholder="john@watchforward.co" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Contact Number</label>
                                <input type="tel" placeholder="+44 000 000 0000" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors" />
                            </div>
                            <div className="col-span-full space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Delivery Address</label>
                                <input type="text" placeholder="123 Conditioning Way" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="glass-card p-10 bg-white/5 border-white/10 rounded-3xl space-y-8">
                        <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-bold text-white">2</div>
                            <h2 className="text-2xl font-heading font-bold text-white">Payment Protocol</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="p-6 bg-white/5 border border-primary/30 rounded-2xl flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-8 bg-white/10 rounded-md flex items-center justify-center font-bold text-[8px] tracking-tighter text-white/40 underline">CARD</div>
                                    <span className="text-white font-medium">Credit / Debit Card</span>
                                </div>
                                <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="col-span-full space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Card Number</label>
                                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Expiry</label>
                                    <input type="text" placeholder="MM/YY" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">CVC</label>
                                    <input type="text" placeholder="***" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary Column */}
                <div className="lg:col-span-5">
                    <div className="glass-card p-10 bg-white/5 border-white/10 rounded-3xl space-y-8 lg:sticky lg:top-32">
                        <h2 className="text-2xl font-heading font-bold text-white border-b border-white/10 pb-6 uppercase tracking-wider">Order Manifest</h2>

                        <div className="space-y-6 max-h-[30vh] overflow-y-auto pr-2 custom-scrollbar">
                            {items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center group">
                                    <div className="flex gap-4">
                                        <div className="w-16 h-16 bg-white/5 rounded-xl flex-shrink-0 p-2 border border-white/5">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-white group-hover:text-primary transition-colors">{item.name}</p>
                                            <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Units: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-white">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4 pt-8 border-t border-white/10">
                            <div className="flex justify-between text-white/60">
                                <span>Subtotal</span>
                                <span className="text-white">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-white/60">
                                <span>Shipping (Express)</span>
                                <span className="text-white">${shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-end pt-4 border-t border-white/10">
                                <span className="font-heading font-bold text-white text-xl uppercase tracking-widest">Total</span>
                                <span className="text-4xl font-bold text-primary">${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            onClick={onOrderComplete}
                            className="group/btn relative w-full py-6 bg-primary text-white rounded-2xl font-heading font-bold text-xl overflow-hidden transition-all duration-500 hover:scale-[1.03] shadow-2xl shadow-primary/30"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-shine"></div>
                            Complete Purchase
                        </button>

                        <p className="text-center text-[10px] text-white/30 uppercase tracking-[0.2em]">Verified System Authentication Required</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
