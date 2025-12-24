'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Share2, Twitter, MessageCircle, Clock, ArrowLeft, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import AudioPlayer from '@/components/media/AudioPlayer';
import { formatDate } from '@/lib/dateUtils';

type VerdictType = 'true' | 'misleading' | 'false';

interface FactCheckArticle {
    id: string;
    slug: string;
    claim: string;
    claimTe: string;
    source: string;
    sourceTe: string;
    verdict: VerdictType;
    summary: string;
    summaryTe: string;
    fullAnalysis?: string;
    fullAnalysisTe?: string;
    image?: string;
    author: {
        name: string;
        nameTe: string;
        avatar: string;
        role: string;
        roleTe: string;
    };
    publishedAt: string;
    readTime: number;
}

interface FactCheckLayoutProps {
    article: FactCheckArticle;
    lang: 'en' | 'te';
}

const verdictConfig = {
    true: {
        label: 'VERIFIED TRUE',
        labelTe: 'ధృవీకరించబడింది - నిజం',
        color: '#059669',
        bgColor: 'bg-[#059669]',
        borderColor: 'border-[#059669]',
        icon: CheckCircle,
        description: 'This claim has been verified as accurate.',
        descriptionTe: 'ఈ వాదన ఖచ్చితమైనదిగా ధృవీకరించబడింది.',
    },
    misleading: {
        label: 'MISLEADING',
        labelTe: 'తప్పుదోవ పట్టించే',
        color: '#D97706',
        bgColor: 'bg-[#D97706]',
        borderColor: 'border-[#D97706]',
        icon: AlertTriangle,
        description: 'This claim lacks important context or is partially false.',
        descriptionTe: 'ఈ వాదనకు ముఖ్యమైన సందర్భం లేదు లేదా పాక్షికంగా తప్పు.',
    },
    false: {
        label: 'FALSE',
        labelTe: 'తప్పు',
        color: '#DC2626',
        bgColor: 'bg-[#DC2626]',
        borderColor: 'border-[#DC2626]',
        icon: XCircle,
        description: 'This claim has been debunked as false.',
        descriptionTe: 'ఈ వాదన తప్పుగా తిరస్కరించబడింది.',
    },
};

export default function FactCheckLayout({ article, lang }: FactCheckLayoutProps) {
    const [scrollProgress, setScrollProgress] = useState(0);
    const contentRef = useRef<HTMLElement>(null);
    const config = verdictConfig[article.verdict];
    const VerdictIcon = config.icon;

    // Update scroll progress
    useEffect(() => {
        const handleScroll = () => {
            if (!contentRef.current) return;

            const element = contentRef.current;
            const scrollTop = window.scrollY;
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const viewportHeight = window.innerHeight;

            const progress = Math.min(
                100,
                Math.max(0, ((scrollTop - elementTop + viewportHeight) / (elementHeight + viewportHeight)) * 100)
            );

            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const handleShare = async (platform: 'twitter' | 'whatsapp' | 'copy') => {
        const url = window.location.href;
        const claim = lang === 'te' ? article.claimTe : article.claim;

        switch (platform) {
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`🔍 Fact Check: ${claim}`)}&url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(`🔍 Fact Check: ${claim} ${url}`)}`, '_blank');
                break;
            case 'copy':
                await navigator.clipboard.writeText(url);
                break;
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 h-2 bg-muted">
                <motion.div
                    className="h-full"
                    style={{ width: `${scrollProgress}%`, backgroundColor: config.color }}
                />
            </div>

            {/* Back Button */}
            <div className="fixed top-4 left-4 z-40">
                <Link
                    href={`/${lang}`}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 font-bold uppercase text-sm hover:bg-black/80 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {lang === 'te' ? 'వెనుకకు' : 'Back'}
                </Link>
            </div>

            {/* MASSIVE VERDICT HEADER */}
            <header
                className={`${config.bgColor} text-white py-16 md:py-24`}
                style={{ borderBottom: `8px solid ${config.color}` }}
            >
                <div className="max-w-4xl mx-auto px-4 text-center">
                    {/* Fact Check Label */}
                    <div className="flex justify-center mb-6">
                        <span className="bg-black text-white px-4 py-2 text-sm font-black uppercase tracking-wider">
                            {lang === 'te' ? 'వాస్తవ తనిఖీ' : 'Fact Check'}
                        </span>
                    </div>

                    {/* THE MASSIVE VERDICT STAMP */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                        className="mb-8"
                    >
                        <div
                            className="inline-flex items-center gap-4 bg-white text-black px-8 py-6 shadow-hard"
                            style={{
                                fontFamily: "'Black Ops One', cursive",
                                transform: 'rotate(-2deg)',
                            }}
                        >
                            <VerdictIcon className="w-16 h-16" style={{ color: config.color }} />
                            <span
                                className="text-4xl md:text-6xl font-black tracking-wider"
                                style={{ color: config.color }}
                            >
                                {lang === 'te' ? config.labelTe : config.label}
                            </span>
                        </div>
                    </motion.div>

                    {/* Verdict Description */}
                    <p className="text-lg md:text-xl font-bold opacity-90 max-w-2xl mx-auto">
                        {lang === 'te' ? config.descriptionTe : config.description}
                    </p>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-12" ref={contentRef}>
                {/* The Claim */}
                <section className="mb-12">
                    <h2 className="text-sm font-black uppercase text-muted-foreground mb-4 flex items-center gap-2">
                        <span className="w-8 h-0.5 bg-current" />
                        {lang === 'te' ? 'వాదన' : 'The Claim'}
                    </h2>
                    <blockquote
                        className={`text-2xl md:text-3xl font-black leading-tight p-6 border-l-8 ${config.borderColor} bg-muted/30 ${lang === 'te' ? 'normal-case' : ''}`}
                        style={{ fontFamily: lang === 'te' ? "'Ramabhadra', sans-serif" : "'Archivo Black', sans-serif" }}
                    >
                        {lang === 'te' ? article.claimTe : article.claim}
                    </blockquote>
                    <p className="mt-4 text-sm font-bold text-muted-foreground">
                        {lang === 'te' ? 'మూలం' : 'Source'}: {lang === 'te' ? article.sourceTe : article.source}
                    </p>
                </section>

                {/* Listen Button */}
                <div className="mb-8">
                    <AudioPlayer
                        text={article.fullAnalysis || article.summary}
                        textTe={article.fullAnalysisTe || article.summaryTe}
                        estimatedTime={`${article.readTime} MIN`}
                        estimatedTimeTe={`${article.readTime} ని.`}
                        lang={lang}
                    />
                </div>

                {/* Dateline */}
                <div className="flex flex-wrap items-center gap-4 py-4 border-y-2 border-black dark:border-white mb-8">
                    <div className="flex items-center gap-3">
                        <Image
                            src={article.author.avatar}
                            alt={lang === 'te' ? article.author.nameTe : article.author.name}
                            width={40}
                            height={40}
                            className="rounded-full border-2 border-black"
                        />
                        <div>
                            <p className="font-bold text-sm">
                                {lang === 'te' ? article.author.nameTe : article.author.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {lang === 'te' ? article.author.roleTe : article.author.role}
                            </p>
                        </div>
                    </div>

                    <div className="w-px h-8 bg-black/20 dark:bg-white/20" />

                    <span className="font-mono text-sm font-bold">
                        {formatDate(article.publishedAt, lang)}
                    </span>

                    <div className="w-px h-8 bg-black/20 dark:bg-white/20" />

                    <div className="flex items-center gap-1 text-sm">
                        <Clock className="w-4 h-4" />
                        <span className="font-bold">{article.readTime} MIN</span>
                    </div>

                    {/* Share Buttons */}
                    <div className="flex items-center gap-2 ml-auto">
                        <button
                            onClick={() => handleShare('whatsapp')}
                            className="w-10 h-10 bg-[#25D366] text-white flex items-center justify-center"
                        >
                            <MessageCircle className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => handleShare('twitter')}
                            className="w-10 h-10 bg-black text-white flex items-center justify-center"
                        >
                            <Twitter className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => handleShare('copy')}
                            className="w-10 h-10 bg-muted flex items-center justify-center border-2 border-border"
                        >
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Image if available */}
                {article.image && (
                    <div className="relative mb-8">
                        <div className="relative aspect-[16/9] border-2 border-black shadow-hard overflow-hidden">
                            <Image
                                src={article.image}
                                alt={lang === 'te' ? article.claimTe : article.claim}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                )}

                {/* The Analysis */}
                <section className="mb-12">
                    <h2 className="text-sm font-black uppercase text-muted-foreground mb-4 flex items-center gap-2">
                        <span className="w-8 h-0.5 bg-current" />
                        {lang === 'te' ? 'మా విశ్లేషణ' : 'Our Analysis'}
                    </h2>
                    <div
                        className="prose prose-lg max-w-none"
                        style={{ fontFamily: lang === 'te' ? "'Mandali', sans-serif" : "'Merriweather', Georgia, serif" }}
                    >
                        <p className="text-lg leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                            {lang === 'te' ? article.summaryTe : article.summary}
                        </p>

                        {(article.fullAnalysis || article.fullAnalysisTe) && (
                            <p className="mt-6 leading-relaxed">
                                {lang === 'te' ? article.fullAnalysisTe : article.fullAnalysis}
                            </p>
                        )}
                    </div>
                </section>

                {/* Verdict Summary Box */}
                <div className={`p-6 ${config.bgColor} text-white`}>
                    <div className="flex items-center gap-4">
                        <VerdictIcon className="w-12 h-12" />
                        <div>
                            <p className="font-black text-xl uppercase">
                                {lang === 'te' ? 'తీర్పు' : 'Verdict'}
                            </p>
                            <p className="font-bold">
                                {lang === 'te' ? config.labelTe : config.label}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
