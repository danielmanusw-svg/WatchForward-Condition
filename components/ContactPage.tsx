
import React from 'react';
import { motion } from 'framer-motion';

export const ContactPage: React.FC = () => {
    return (
        <div className="w-full max-w-7xl mx-auto py-32 px-6 animate-fade-in min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                {/* Contact Info Side */}
                <div className="flex flex-col justify-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-heading font-bold text-foreground mb-8 text-left"
                    >
                        Get in <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Touch</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-foreground/60 max-w-lg mb-12 text-left"
                    >
                        Whether you're looking for custom sport protocols or have questions about our source validation, our team is here to help.
                    </motion.p>

                    <div className="space-y-8">
                        {[
                            { icon: "📧", label: "Email", value: "hello@watchforward.co" },
                            { icon: "📍", label: "Location", value: "London, United Kingdom" },
                            { icon: "🌐", label: "Socials", value: "@watchforward" }
                        ].map((item, idx) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + (idx * 0.1) }}
                                className="flex items-center gap-6 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl group-hover:border-primary/50 transition-colors">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-1">{item.label}</p>
                                    <p className="text-lg font-medium text-foreground">{item.value}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Form Side */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card p-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

                    <form className="space-y-6 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-foreground/60 ml-1">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-foreground/60 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-foreground/60 ml-1">Department</label>
                            <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-foreground focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer">
                                <option className="bg-background">Sponsorship & Business</option>
                                <option className="bg-background">Athlete Support</option>
                                <option className="bg-background">General Inquiry</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-foreground/60 ml-1">Your Message</label>
                            <textarea
                                rows={5}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
                                placeholder="How can we help you?"
                            ></textarea>
                        </div>

                        <button className="w-full py-5 bg-primary text-white font-heading font-bold text-lg rounded-2xl relative overflow-hidden group hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-shine"></div>
                            Send Inquiry
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};
