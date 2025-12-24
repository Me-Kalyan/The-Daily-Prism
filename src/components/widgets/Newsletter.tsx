'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Check } from 'lucide-react';

interface NewsletterProps {
    lang?: 'en' | 'te';
}

export default function Newsletter({ lang = 'en' }: NewsletterProps) {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubmitted(true);
            setEmail('');
        }
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="bg-foreground text-background p-8 md:p-12 border-2 border-border shadow-hard"
        >
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-[#FACC15] flex items-center justify-center">
                    <Mail className="w-7 h-7 text-black" />
                </div>
                <div>
                    <h3 className={`text-2xl font-black uppercase ${lang === 'te' ? 'normal-case' : ''}`}>
                        {lang === 'te' ? 'న్యూస్‌లెటర్' : 'Newsletter'}
                    </h3>
                    <p className="text-sm opacity-70">
                        {lang === 'te' ? 'రోజువారీ వార్తలు మీ ఇన్‌బాక్స్‌లో' : 'Daily news in your inbox'}
                    </p>
                </div>
            </div>

            {/* Description */}
            <p className={`text-sm opacity-80 mb-6 max-w-xl ${lang === 'te' ? '' : ''}`}>
                {lang === 'te'
                    ? 'ప్రతిరోజూ ఉదయం ముఖ్యమైన వార్తలు, విశ్లేషణలు మీ ఇన్‌బాక్స్‌కు.'
                    : 'Get the most important news and analysis delivered every morning.'}
            </p>

            {/* Form */}
            {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={lang === 'te' ? 'మీ ఇమెయిల్' : 'Enter your email'}
                        className="flex-1 px-4 py-3 bg-background text-foreground border-2 border-background text-sm font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                        required
                    />
                    <motion.button
                        type="submit"
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-3 bg-[#FACC15] text-black font-black uppercase text-sm flex items-center justify-center gap-2 border-2 border-[#FACC15] hover:bg-[#EAB308] transition-colors"
                    >
                        {lang === 'te' ? 'సబ్‌స్క్రైబ్' : 'Subscribe'}
                        <ArrowRight className="w-4 h-4" />
                    </motion.button>
                </form>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 p-4 bg-[#059669]"
                >
                    <div className="w-8 h-8 bg-white flex items-center justify-center">
                        <Check className="w-5 h-5 text-[#059669]" />
                    </div>
                    <p className="text-sm font-black uppercase text-white">
                        {lang === 'te' ? 'సబ్‌స్క్రైబ్ అయ్యారు!' : 'Subscribed!'}
                    </p>
                </motion.div>
            )}

            {/* Footer note */}
            <p className="mt-4 text-xs opacity-50 font-medium">
                {lang === 'te'
                    ? '🔒 ఎప్పుడైనా అన్‌సబ్‌స్క్రైబ్ చేయండి'
                    : '🔒 Unsubscribe anytime'}
            </p>
        </motion.section>
    );
}
