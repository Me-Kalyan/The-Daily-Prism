'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ChevronDown, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { navCategories, featuredNews, categoryColors } from '@/lib/data/news';

interface HeaderProps {
    lang: 'en' | 'te';
    onLangChange?: (lang: 'en' | 'te') => void; // Optional now, handled by URL
    isDark: boolean;
    onThemeToggle: () => void;
    isReadMode: boolean;
    onReadModeToggle: () => void;
    readModeStyle: 'sepia' | 'dark';
    onReadModeStyleChange: () => void;
}

export default function Header({ lang, isDark, onThemeToggle, isReadMode, onReadModeToggle }: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const pathname = usePathname();
    const router = useRouter();

    const latestHeadlines = featuredNews.slice(0, 3);

    // FIX: Switch language by changing URL path
    const handleLangSwitch = (newLang: 'en' | 'te') => {
        if (!pathname) return;
        // Replaces /en/ with /te/ in the current URL
        const segments = pathname.split('/');
        segments[1] = newLang; // The first segment is empty string, second is lang
        const newPath = segments.join('/');
        router.push(newPath);
    };

    return (
        <header className="sticky top-0 z-50 bg-background border-b-4 border-black dark:border-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo - Wired to Language Home */}
                    <Link href={`/${lang}`} className="flex items-center">
                        <motion.h1
                            className="text-2xl md:text-3xl font-black tracking-tighter uppercase"
                            whileHover={{ x: 2 }}
                            style={{ fontWeight: 900 }}
                        >
                            <span className="text-[#DC2626]">THE</span> DAILY PRISM
                        </motion.h1>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center border-l-2 border-black dark:border-white">
                        {navCategories.slice(0, 4).map((category) => (
                            <div
                                key={category.name}
                                className="relative"
                                onMouseEnter={() => setActiveMenu(category.name)}
                                onMouseLeave={() => setActiveMenu(null)}
                            >
                                {/* FIX: Correct Link Structure: /[lang]/[category] */}
                                <Link
                                    href={`/${lang}/${category.category}`}
                                    className="px-5 py-4 text-sm font-black uppercase tracking-wide flex items-center gap-1 border-r-2 border-black dark:border-white hover:bg-foreground hover:text-background transition-colors duration-200"
                                    style={{ '--category-color': categoryColors[category.category] } as React.CSSProperties}
                                >
                                    {lang === 'te' ? category.nameTe : category.name}
                                    <ChevronDown className="w-3 h-3" />
                                </Link>

                                {/* Mega Menu */}
                                <AnimatePresence>
                                    {activeMenu === category.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute left-0 top-full w-[500px] bg-card border-2 border-border shadow-hard p-6"
                                            style={{ marginLeft: '-100px' }}
                                        >
                                            <div className="grid grid-cols-2 gap-6">
                                                <div>
                                                    <h3 className="text-lg font-black uppercase mb-4 pb-2 border-b-4" style={{ borderColor: categoryColors[category.category] }}>
                                                        {lang === 'te' ? category.nameTe : category.name}
                                                    </h3>
                                                    <ul className="space-y-2">
                                                        <li><Link href={`/${lang}/${category.category}`} className="hover:underline">Latest</Link></li>
                                                        <li><Link href={`/${lang}/${category.category}`} className="hover:underline">Analysis</Link></li>
                                                    </ul>
                                                </div>
                                                <div className="border-l-2 border-border pl-6">
                                                    <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3">Headlines</h4>
                                                    <ul className="space-y-3">
                                                        {latestHeadlines
                                                            .filter(news => news.category === category.category)
                                                            .slice(0, 3)
                                                            .map((news) => (
                                                                <li key={news.id}>
                                                                    {/* FIX: Correct Article Link: /[lang]/[category]/[slug] */}
                                                                    <Link
                                                                        href={`/${lang}/${news.category}/${lang === 'te' && news.slugTe ? news.slugTe : news.slug}`}
                                                                        className="text-sm font-medium hover:underline line-clamp-2"
                                                                    >
                                                                        {lang === 'te' ? news.titleTe : news.title}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </nav>

                    {/* Right Controls */}
                    <div className="flex items-center gap-0">
                        {/* Language Switcher - URL based */}
                        <div className="flex border-2 border-border">
                            <button
                                onClick={() => handleLangSwitch('en')}
                                className={`px-3 py-1.5 text-sm font-bold uppercase ${lang === 'en' ? 'bg-foreground text-background' : 'bg-background hover:bg-muted'}`}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => handleLangSwitch('te')}
                                className={`px-3 py-1.5 text-sm font-bold border-l-2 border-border ${lang === 'te' ? 'bg-foreground text-background' : 'bg-background hover:bg-muted'}`}
                            >
                                తెలుగు
                            </button>
                        </div>

                        {/* Theme Toggle */}
                        <button onClick={onThemeToggle} className="p-2 border-2 border-border border-l-0 hover:bg-foreground hover:text-background">
                            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>

                        {/* Read Mode Toggle */}
                        <button
                            onClick={onReadModeToggle}
                            className={`p-2 border-2 border-border border-l-0 hover:bg-foreground hover:text-background ${isReadMode ? 'bg-foreground text-background' : ''}`}
                        >
                            <BookOpen className="w-4 h-4" />
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 border-2 border-border border-l-0 hover:bg-foreground hover:text-background"
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="lg:hidden border-t-2 border-border bg-card overflow-hidden"
                    >
                        <nav className="p-4 space-y-2">
                            {navCategories.map((category) => (
                                <Link
                                    key={category.name}
                                    href={`/${lang}/${category.category}`}
                                    className="block px-4 py-3 text-sm font-black uppercase border-2 border-border hover:bg-foreground hover:text-background"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {lang === 'te' ? category.nameTe : category.name}
                                </Link>
                            ))}

                            {/* Mobile Live Link */}
                            <Link
                                href={`/${lang}/live`}
                                className="block px-4 py-3 text-sm font-black uppercase border-2 border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626] hover:text-white"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-[#DC2626] rounded-full animate-pulse" />
                                    {lang === 'te' ? 'లైవ్ వైర్' : 'Live Wire'}
                                </span>
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
