'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Mail, Hash } from 'lucide-react';
import { NewsArticle } from '@/lib/data/news';
import FeedCard from '@/components/news/FeedCard';

interface CategoryPageClientProps {
    lang: 'en' | 'te';
    category: string;
    categoryName: string;
    categoryNameTe: string;
    description: string;
    descriptionTe: string;
    articles: NewsArticle[];
    color: string;
}

// Sample topics for sidebar
const topTopics = [
    { slug: 'election-2025', name: '#Election2025', nameTe: '#ఎన్నికలు2025' },
    { slug: 'budget', name: '#Budget', nameTe: '#బడ్జెట్' },
    { slug: 'sensex', name: '#Sensex', nameTe: '#సెన్సెక్స్' },
    { slug: 'parliament', name: '#Parliament', nameTe: '#పార్లమెంట్' },
    { slug: 'climate', name: '#Climate', nameTe: '#వాతావరణం' },
];

export default function CategoryPageClient({
    lang,
    category: _category,
    categoryName,
    categoryNameTe,
    description,
    descriptionTe,
    articles,
    color
}: CategoryPageClientProps) {
    return (
        <div className="min-h-screen bg-background">
            {/* Solid Colored Header */}
            <header
                className="text-white py-16 md:py-20"
                style={{ backgroundColor: color }}
            >
                <div className="max-w-6xl mx-auto px-4">
                    {/* Back Link */}
                    <Link
                        href={`/${lang}`}
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 text-sm font-bold uppercase"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {lang === 'te' ? 'హోమ్' : 'Home'}
                    </Link>

                    {/* Huge Category Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black uppercase mb-4"
                        style={{ fontFamily: "'Archivo Black', sans-serif" }}
                    >
                        {lang === 'te' ? categoryNameTe : categoryName}
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="text-lg md:text-xl opacity-80 max-w-xl"
                        style={{ fontFamily: lang === 'te' ? "'Mandali', sans-serif" : "'Merriweather', serif" }}
                    >
                        {lang === 'te' ? descriptionTe : description}
                    </motion.p>

                    {/* Article Count Badge */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8"
                    >
                        <span className="bg-white/20 backdrop-blur-sm px-5 py-2 text-sm font-black uppercase tracking-wide">
                            {articles.length} {lang === 'te' ? 'కథనాలు' : 'Stories'}
                        </span>
                    </motion.div>
                </div>
            </header>

            {/* Main Content: 2-Column Grid */}
            <main className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

                    {/* Main Feed Column (2/3) */}
                    <div className="lg:col-span-2">
                        {articles.length > 0 ? (
                            <div className="space-y-6" style={{ maxWidth: '800px' }}>
                                {articles.map((article, index) => (
                                    <FeedCard
                                        key={article.id}
                                        article={article}
                                        lang={lang}
                                        index={index}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 border-2 border-dashed border-border">
                                <p className="text-2xl font-black uppercase text-muted-foreground mb-4">
                                    {lang === 'te' ? 'ఈ కేటగిరీలో కథనాలు లేవు' : 'No stories in this category yet'}
                                </p>
                                <Link
                                    href={`/${lang}`}
                                    className="inline-block px-6 py-3 bg-black text-white font-black uppercase hover:bg-black/80"
                                >
                                    {lang === 'te' ? 'హోమ్‌కి వెళ్ళండి' : 'Go to Homepage'}
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Sidebar (1/3) - Desktop Only */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-24 space-y-8">

                            {/* Top Topics */}
                            <div
                                className="border-2 border-black bg-card"
                                style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }}
                            >
                                <div className="bg-black text-white p-4 flex items-center gap-2">
                                    <Hash className="w-5 h-5" />
                                    <h3 className="font-black uppercase text-sm">
                                        {lang === 'te' ? 'టాప్ టాపిక్స్' : 'Top Topics'}
                                    </h3>
                                </div>
                                <div className="p-4">
                                    <div className="flex flex-wrap gap-2">
                                        {topTopics.map((topic) => (
                                            <Link
                                                key={topic.slug}
                                                href={`/${lang}/topic/${topic.slug}`}
                                                className="px-3 py-1.5 bg-muted border-2 border-border text-sm font-bold hover:bg-black hover:text-white hover:border-black transition-colors"
                                            >
                                                {lang === 'te' ? topic.nameTe : topic.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Newsletter Box */}
                            <div
                                className="border-2 border-black bg-[#FACC15]"
                                style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }}
                            >
                                <div className="p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Mail className="w-5 h-5" />
                                        <h3 className="font-black uppercase text-sm">
                                            {lang === 'te' ? 'న్యూస్‌లెటర్' : 'Newsletter'}
                                        </h3>
                                    </div>
                                    <p className="text-sm font-bold mb-4">
                                        {lang === 'te'
                                            ? 'తాజా వార్తలు మీ ఇన్‌బాక్స్‌లో పొందండి'
                                            : 'Get the latest news delivered to your inbox'
                                        }
                                    </p>
                                    <div className="flex gap-2">
                                        <input
                                            type="email"
                                            placeholder={lang === 'te' ? 'ఇమెయిల్' : 'Email'}
                                            className="flex-1 px-3 py-2 border-2 border-black bg-white text-sm font-bold focus:outline-none"
                                        />
                                        <button className="px-4 py-2 bg-black text-white font-black uppercase text-sm hover:bg-black/80">
                                            {lang === 'te' ? 'చేరండి' : 'Join'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Category Color Bar - Decorative */}
                            <div
                                className="h-2"
                                style={{ backgroundColor: color }}
                            />

                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
