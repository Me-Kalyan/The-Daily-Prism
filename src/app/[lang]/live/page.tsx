'use client';

import { useState, use } from 'react';
import { RefreshCw, ArrowUpRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LivePage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = use(params);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [filter, setFilter] = useState('ALL');

    // Simulated Refresh
    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    // Mock Live Data
    const updates = [
        { id: 1, time: "14:35", category: "BREAKING", text: "Supreme Court announces landmark decision on fundamental rights case.", textTe: "ప్రాథమిక హక్కుల కేసులో సుప్రీంకోర్టు సంచలన తీర్పు.", color: "bg-red-600", isNew: true },
        { id: 2, time: "14:05", category: "MARKETS", text: "Sensex crosses 75,000 mark for the first time in history.", textTe: "చరిత్రలో తొలిసారిగా 75,000 మార్కును దాటిన సెన్సెక్స్.", color: "bg-emerald-600", isNew: false },
        { id: 3, time: "13:45", category: "POLITICS", text: "Parliament session adjourned until Monday amid protests.", textTe: "నిరసనల మధ్య పార్లమెంట్ సమావేశాలు సోమవారానికి వాయిదా.", color: "bg-blue-600", isNew: false },
        { id: 4, time: "13:30", category: "TECH", text: "OpenAI announces new partnership with Indian startups.", textTe: "భారతీయ స్టార్టప్‌లతో కొత్త భాగస్వామ్యాన్ని ప్రకటించిన OpenAI.", color: "bg-violet-600", isNew: false },
        { id: 5, time: "13:10", category: "ECONOMY", text: "RBI keeps repo rate unchanged at 6.5% citing inflation concerns.", textTe: "ద్రవ్యోల్బణ ఆందోళనల కారణంగా ఆర్‌బిఐ రెపో రేటును 6.5% వద్దే ఉంచింది.", color: "bg-orange-500", isNew: false },
    ];

    const filteredUpdates = filter === 'ALL' ? updates : updates.filter(u => u.category === filter);

    return (
        <main className="min-h-screen bg-[#FDFCF8] dark:bg-black pb-20 transition-colors">

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

            {/* 2. CONTROL BAR */}
            <div className="bg-muted/30 border-b border-black dark:border-white">
                <div className="max-w-4xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">

                    {/* Filters */}
                    <div className="flex gap-2 overflow-x-auto no-scrollbar">
                        {['ALL', 'BREAKING', 'MARKETS', 'POLITICS'].map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setFilter(tag)}
                                className={`px-4 py-1 font-black text-xs uppercase border-2 transition-all ${filter === tag
                                    ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                                    : 'bg-white text-black border-black dark:bg-zinc-900 dark:text-white dark:border-white hover:bg-gray-100 dark:hover:bg-zinc-800'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    {/* Refresh Button */}
                    <button
                        onClick={handleRefresh}
                        className="flex items-center gap-2 font-mono text-xs font-bold uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-3 py-1.5 border-2 border-transparent hover:border-black dark:hover:border-white transition-colors rounded-sm text-black dark:text-white"
                    >
                        <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                        {isRefreshing ? 'UPDATING...' : (lang === 'te' ? 'రిఫ్రెష్' : 'REFRESH DATA')}
                    </button>
                </div>
            </div>

            {/* 3. THE FEED STREAM */}
            <div className="max-w-4xl mx-auto px-4 mt-8 relative">
                {/* Vertical Rail (The "Wire") */}
                <div className="absolute left-6 md:left-32 top-0 bottom-0 w-1 bg-black/10 dark:bg-white/20" />

                <div className="space-y-8">
                    {filteredUpdates.map((item) => (
                        <div key={item.id} className="relative pl-16 md:pl-48 group">

                            {/* Timeline Node - Adjusted to not block time */}
                            <div className="absolute left-[1.1rem] md:left-[7.65rem] top-6 w-4 h-4 bg-white dark:bg-zinc-900 border-4 border-black dark:border-white rounded-full z-10 group-hover:scale-125 transition-transform shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />

                            {/* Timestamp (Mobile: Top, Desktop: Left) */}
                            <div className="md:absolute md:left-4 md:top-6 md:w-24 md:text-right mb-2 md:mb-0">
                                <span className="font-mono font-black text-black dark:text-white text-xs bg-yellow-400 px-2 py-0.5 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors">
                                    {item.time}
                                </span>
                            </div>

                            {/* THE CARD */}
                            <div className={`bg-white dark:bg-zinc-900 border-2 border-black dark:border-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all relative overflow-hidden ${item.isNew ? 'ring-2 ring-red-500 ring-offset-2 dark:ring-offset-black' : ''}`}>

                                {/* "NEW" Flash Badge */}
                                {item.isNew && (
                                    <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-black px-2 py-1 uppercase animate-pulse">
                                        JUST IN
                                    </div>
                                )}

                                <div className="flex items-center gap-2 mb-3">
                                    <span className={`text-[10px] font-black text-white px-2 py-0.5 uppercase tracking-wider ${item.color}`}>
                                        {item.category}
                                    </span>
                                </div>

                                <h3 className="text-xl md:text-2xl font-bold leading-tight mb-2 text-black dark:text-white">
                                    {lang === 'te' ? item.textTe : item.text}
                                </h3>

                                {/* Action Link */}
                                <div className="mt-4 flex items-center gap-1 text-xs font-black uppercase tracking-wide text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white cursor-pointer transition-colors">
                                    {lang === 'te' ? 'పూర్తి కథనం' : 'Read Context'} <ArrowUpRight className="w-3 h-3" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* End of Stream */}
                <div className="mt-12 pl-12 md:pl-24 flex items-center gap-4 opacity-50">
                    <div className="w-2 h-2 bg-black dark:bg-white rounded-full" />
                    <div className="w-2 h-2 bg-black dark:bg-white rounded-full" />
                    <div className="w-2 h-2 bg-black dark:bg-white rounded-full" />
                    <span className="font-mono text-xs font-bold text-black dark:text-white">END OF CURRENT FEED</span>
                </div>

            </div>
        </main>
    );
}
