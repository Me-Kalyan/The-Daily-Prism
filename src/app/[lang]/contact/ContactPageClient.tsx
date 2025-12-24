'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactPageClientProps {
    lang: 'en' | 'te';
}

export default function ContactPageClient({ lang }: ContactPageClientProps) {
    const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('sending');

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        setFormState('sent');
        setFormData({ name: '', email: '', subject: '', message: '' });

        // Reset after 3 seconds
        setTimeout(() => setFormState('idle'), 3000);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="bg-black text-white py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <Link
                        href={`/${lang}`}
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 text-sm font-bold uppercase"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {lang === 'te' ? 'హోమ్' : 'Home'}
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-black uppercase">
                        {lang === 'te' ? 'సంప్రదించండి' : 'Contact Us'}
                    </h1>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-2xl font-black uppercase mb-6">
                            {lang === 'te' ? 'మమ్మల్ని చేరుకోండి' : 'Get in Touch'}
                        </h2>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#FACC15] flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-black uppercase mb-1">
                                        {lang === 'te' ? 'ఇమెయిల్' : 'Email'}
                                    </h3>
                                    <a href="mailto:contact@dailyprism.com" className="text-muted-foreground hover:underline">
                                        contact@dailyprism.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#FACC15] flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-black uppercase mb-1">
                                        {lang === 'te' ? 'ఫోన్' : 'Phone'}
                                    </h3>
                                    <p className="text-muted-foreground">+91 40 1234 5678</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#FACC15] flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-black uppercase mb-1">
                                        {lang === 'te' ? 'చిరునామా' : 'Address'}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        The Daily Prism<br />
                                        123 Media House, Banjara Hills<br />
                                        Hyderabad, Telangana 500034
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <h2 className="text-2xl font-black uppercase mb-6">
                            {lang === 'te' ? 'సందేశం పంపండి' : 'Send a Message'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder={lang === 'te' ? 'మీ పేరు' : 'Your Name'}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 border-2 border-black bg-background font-bold focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder={lang === 'te' ? 'ఇమెయిల్ చిరునామా' : 'Email Address'}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 border-2 border-black bg-background font-bold focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder={lang === 'te' ? 'విషయం' : 'Subject'}
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 border-2 border-black bg-background font-bold focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                                />
                            </div>
                            <div>
                                <textarea
                                    placeholder={lang === 'te' ? 'మీ సందేశం' : 'Your Message'}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 border-2 border-black bg-background font-bold resize-none focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={formState !== 'idle'}
                                whileHover={{ scale: formState === 'idle' ? 1.02 : 1 }}
                                whileTap={{ scale: formState === 'idle' ? 0.98 : 1 }}
                                className={`w-full py-4 font-black uppercase flex items-center justify-center gap-2 transition-colors ${formState === 'sent'
                                        ? 'bg-[#059669] text-white'
                                        : 'bg-black text-white hover:bg-black/80'
                                    }`}
                            >
                                {formState === 'idle' && (
                                    <>
                                        <Send className="w-5 h-5" />
                                        {lang === 'te' ? 'సందేశం పంపండి' : 'Send Message'}
                                    </>
                                )}
                                {formState === 'sending' && (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        {lang === 'te' ? 'పంపుతోంది...' : 'Sending...'}
                                    </>
                                )}
                                {formState === 'sent' && (
                                    <>
                                        ✓ {lang === 'te' ? 'పంపబడింది!' : 'Sent!'}
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
