'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { categoryColors, Category } from '@/lib/data/news';

interface LiveUpdate {
    id: string;
    time: string;
    timeTe: string;
    headline: string;
    headlineTe: string;
    body: string;
    bodyTe: string;
    category: Category;
    categoryLabel: string;
    categoryLabelTe: string;
    isJustIn?: boolean;
}

// Sample live updates data
const liveUpdatesData: LiveUpdate[] = [
    {
        id: '1',
        time: '14:32',
        timeTe: '14:32',
        headline: 'Breaking: Parliament passes landmark bill',
        headlineTe: 'బ్రేకింగ్: పార్లమెంట్ చారిత్రాత్మక బిల్లును ఆమోదించింది',
        body: 'The bill was passed with 326 votes in favor and 102 against. Opposition parties staged a walkout.',
        bodyTe: 'బిల్లు 326 ఓట్లతో ఆమోదించబడింది, 102 వ్యతిరేకంగా ఉన్నాయి. ప్రతిపక్ష పార్టీలు వాకౌట్ చేశాయి.',
        category: 'politics',
        categoryLabel: 'POLITICS',
        categoryLabelTe: 'రాజకీయాలు',
        isJustIn: true,
    },
    {
        id: '2',
        time: '14:18',
        timeTe: '14:18',
        headline: 'Sensex surges 500 points on positive global cues',
        headlineTe: 'సెన్సెక్స్ 500 పాయింట్లు పెరిగింది',
        body: 'Banking and IT stocks lead the rally. Nifty crosses 21,500 mark.',
        bodyTe: 'బ్యాంకింగ్ మరియు IT స్టాక్‌లు ర్యాలీకి నాయకత్వం వహించాయి.',
        category: 'markets',
        categoryLabel: 'MARKETS',
        categoryLabelTe: 'మార్కెట్లు',
    },
    {
        id: '3',
        time: '14:05',
        timeTe: '14:05',
        headline: 'Tech giant announces major layoffs',
        headlineTe: 'టెక్ దిగ్గజం పెద్ద ఎత్తున తొలగింపులు ప్రకటించింది',
        body: 'Company to cut 12,000 jobs globally as part of restructuring.',
        bodyTe: 'కంపెనీ ప్రపంచవ్యాప్తంగా 12,000 ఉద్యోగాలను తగ్గించనుంది.',
        category: 'tech',
        categoryLabel: 'TECH',
        categoryLabelTe: 'టెక్నాలజీ',
    },
    {
        id: '4',
        time: '13:47',
        timeTe: '13:47',
        headline: 'PM addresses nation on economic reforms',
        headlineTe: 'ఆర్థిక సంస్కరణలపై ప్రధాని దేశాన్ని ఉద్దేశించి ప్రసంగించారు',
        body: 'New policy framework announced for manufacturing sector.',
        bodyTe: 'తయారీ రంగానికి కొత్త విధాన చట్రం ప్రకటించబడింది.',
        category: 'politics',
        categoryLabel: 'POLITICS',
        categoryLabelTe: 'రాజకీయాలు',
    },
    {
        id: '5',
        time: '13:30',
        timeTe: '13:30',
        headline: 'RBI holds repo rate unchanged at 6.5%',
        headlineTe: 'RBI రెపో రేటును 6.5% వద్ద మార్పు లేకుండా ఉంచింది',
        body: 'Monetary policy committee cites inflation concerns.',
        bodyTe: 'ద్రవ్య విధాన కమిటీ ద్రవ్యోల్బణ ఆందోళనలను పేర్కొంది.',
        category: 'markets',
        categoryLabel: 'MARKETS',
        categoryLabelTe: 'మార్కెట్లు',
    },
    {
        id: '6',
        time: '13:15',
        timeTe: '13:15',
        headline: 'Startup unicorn raises $500M in Series E',
        headlineTe: 'స్టార్టప్ యూనికార్న్ సిరీస్ E లో $500M సేకరించింది',
        body: 'Valuation reaches $8 billion as global investors participate.',
        bodyTe: 'గ్లోబల్ ఇన్వెస్టర్లు పాల్గొనడంతో వాల్యుయేషన్ $8 బిలియన్లకు చేరింది.',
        category: 'tech',
        categoryLabel: 'TECH',
        categoryLabelTe: 'టెక్నాలజీ',
    },
    {
        id: '7',
        time: '12:58',
        timeTe: '12:58',
        headline: 'Opposition demands special session on farm bill',
        headlineTe: 'వ్యవసాయ బిల్లుపై ప్రత్యేక సమావేశం డిమాండ్',
        body: 'Multiple parties unite to request parliamentary discussion.',
        bodyTe: 'పార్లమెంటరీ చర్చ కోసం బహుళ పార్టీలు ఏకమయ్యాయి.',
        category: 'politics',
        categoryLabel: 'POLITICS',
        categoryLabelTe: 'రాజకీయాలు',
    },
    {
        id: '8',
        time: '12:40',
        timeTe: '12:40',
        headline: 'Crude oil prices drop 3% on demand concerns',
        headlineTe: 'క్రూడ్ ఆయిల్ ధరలు 3% పడిపోయాయి',
        body: 'Brent crude falls below $75 per barrel.',
        bodyTe: 'బ్రెంట్ క్రూడ్ బ్యారెల్‌కు $75 కంటే తగ్గింది.',
        category: 'markets',
        categoryLabel: 'MARKETS',
        categoryLabelTe: 'మార్కెట్లు',
    },
    {
        id: '9',
        time: '12:22',
        timeTe: '12:22',
        headline: 'New AI model outperforms GPT-4 in tests',
        headlineTe: 'కొత్త AI మోడల్ GPT-4 ను మించింది',
        body: 'Research team claims breakthrough in reasoning capabilities.',
        bodyTe: 'రీజనింగ్ సామర్థ్యాలలో పురోగతిని పరిశోధన బృందం దావా చేసింది.',
        category: 'tech',
        categoryLabel: 'TECH',
        categoryLabelTe: 'టెక్నాలజీ',
    },
    {
        id: '10',
        time: '12:05',
        timeTe: '12:05',
        headline: 'State government announces new metro line',
        headlineTe: 'రాష్ట్ర ప్రభుత్వం కొత్త మెట్రో లైన్ ప్రకటించింది',
        body: 'Route will connect airport to city center, expected completion by 2027.',
        bodyTe: 'రూట్ ఎయిర్‌పోర్ట్‌ను సిటీ సెంటర్‌కు కనెక్ట్ చేస్తుంది, 2027 నాటికి పూర్తవుతుందని అంచనా.',
        category: 'politics',
        categoryLabel: 'POLITICS',
        categoryLabelTe: 'రాజకీయాలు',
    },
];

interface LiveUpdateCardProps {
    update: LiveUpdate;
    lang: 'en' | 'te';
    index: number;
}

function LiveUpdateCard({ update, lang, index }: LiveUpdateCardProps) {
    const categoryColor = categoryColors[update.category] || '#000000';

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="relative pl-8 pb-8"
        >
            {/* The Dot - positioned on timeline */}
            <div
                className="absolute left-0 top-1.5 w-3 h-3 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                style={{ backgroundColor: update.isJustIn ? '#DC2626' : categoryColor }}
            />

            {/* Vertical line connecting to next item */}
            {index < liveUpdatesData.length - 1 && (
                <div className="absolute left-[5px] top-6 w-0.5 h-full bg-black/10 dark:bg-white/10" />
            )}

            {/* Timestamp */}
            <div className="flex items-center gap-3 mb-2 ml-4">
                <span className="font-mono text-xs font-black text-black dark:text-white bg-yellow-400 px-2 py-0.5 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    {lang === 'te' ? update.timeTe : update.time}
                </span>
                {update.isJustIn && (
                    <span className="text-xs font-black text-[#DC2626] animate-pulse">
                        {lang === 'te' ? 'ఇప్పుడే' : 'JUST IN'}
                    </span>
                )}
            </div>

            {/* Content Card */}
            <div className="bg-gray-50 dark:bg-muted border border-black p-4">
                {/* Category Tag */}
                <span
                    className="inline-block px-2 py-0.5 text-xs font-black text-white mb-2"
                    style={{ backgroundColor: categoryColor }}
                >
                    {lang === 'te' ? update.categoryLabelTe : update.categoryLabel}
                </span>

                {/* Headline */}
                <h3
                    className={`text-lg font-bold mb-2 ${lang === 'te' ? 'normal-case' : ''}`}
                    style={{ fontFamily: lang === 'te' ? "'Ramabhadra', sans-serif" : "'Merriweather', serif" }}
                >
                    {lang === 'te' ? update.headlineTe : update.headline}
                </h3>

                {/* Body */}
                <p className="text-sm text-muted-foreground">
                    {lang === 'te' ? update.bodyTe : update.body}
                </p>
            </div>
        </motion.div>
    );
}

export default function LiveWireClient({ lang }: { lang: 'en' | 'te' }) {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [_visibleUpdates, _setVisibleUpdates] = useState(liveUpdatesData);

    const handleRefresh = async () => {
        setIsRefreshing(true);

        // Simulate real network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Slightly change data to show it "worked"
        // Move the first item to middle or just trigger re-render
        setLastUpdated(new Date());
        setIsRefreshing(false);
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString(lang === 'te' ? 'te-IN' : 'en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Minimalist Swiss Header */}
            <header className="bg-background border-b-2 border-black dark:border-white sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Left: Branding & Breadcrumb */}
                        <div className="flex items-center gap-6">
                            <Link
                                href={`/${lang}`}
                                className="group flex items-center gap-3 border-r-2 border-black dark:border-white pr-6 h-16 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">
                                    {lang === 'te' ? 'హోమ్' : 'BACK'}
                                </span>
                            </Link>

                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-[#DC2626] border border-black dark:border-white animate-pulse" />
                                <h1
                                    className="text-xl md:text-2xl font-black uppercase tracking-tighter text-black dark:text-white"
                                    style={{ fontFamily: "'Archivo Black', sans-serif" }}
                                >
                                    {lang === 'te' ? 'లైవ్ వైర్' : 'LIVE WIRE'}
                                </h1>
                            </div>
                        </div>

                        {/* Right: Technical Stats & Refresh */}
                        <div className="flex items-center gap-4 h-16">
                            <div className="hidden lg:flex flex-col items-end justify-center border-l-2 border-black dark:border-white px-6 h-16">
                                <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Status</span>
                                <span className="text-[10px] font-black text-green-600 dark:text-green-500 uppercase">System Live</span>
                            </div>

                            <button
                                onClick={handleRefresh}
                                disabled={isRefreshing}
                                className="h-full px-6 flex items-center justify-center border-l-2 border-black dark:border-white text-black dark:text-white hover:bg-[#DC2626] hover:text-white transition-colors disabled:opacity-50"
                            >
                                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Status Bar */}
            <div className="bg-muted/50 border-b border-border">
                <div className="max-w-7xl mx-auto px-4 py-2">
                    <span className="font-mono text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        {lang === 'te'
                            ? `చివరి అప్‌డేట్: ${formatTime(lastUpdated)}`
                            : `SYSTEM LIVE / LAST FETCH: ${formatTime(lastUpdated)}`
                        }
                    </span>
                </div>
            </div>

            {/* Timeline Feed */}
            <main className="max-w-2xl mx-auto px-4 py-12">
                <div className={`transition-opacity duration-300 ${isRefreshing ? 'opacity-20' : 'opacity-100'}`}>
                    <div className="ml-4 border-l-2 border-black/10 dark:border-white/10">
                        <AnimatePresence>
                            {liveUpdatesData.map((update, index) => (
                                <LiveUpdateCard
                                    key={update.id}
                                    update={update}
                                    lang={lang}
                                    index={index}
                                />
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* End marker */}
                    <div className="ml-4 flex items-center gap-3 text-muted-foreground">
                        <div className="w-3 h-3 bg-gray-300" />
                        <span className="font-mono text-xs">
                            {lang === 'te' ? 'ఇంకా అప్‌డేట్లు లేవు' : 'No more updates'}
                        </span>
                    </div>
                </div>
            </main>
        </div>
    );
}
