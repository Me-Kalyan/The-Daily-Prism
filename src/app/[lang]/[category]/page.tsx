'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { featuredNews, categoryColors } from '@/lib/data/news';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { formatDate } from '@/lib/dateUtils';

// Mock Trending Data for Sidebar
const trending = [
    { id: 1, title: "Opposition demands vote on new bill", time: "2 hrs ago" },
    { id: 2, title: "PM to address the nation tonight", time: "4 hrs ago" },
    { id: 3, title: "Election commission releases new guidelines", time: "6 hrs ago" },
];

interface CategoryPageProps {
    params: Promise<{ lang: string; category: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
    const { lang, category } = use(params);
    const [activeFilter, setActiveFilter] = useState('Latest');

    // Filter logic: In a real app, 'newsType' or 'tag' would be used.
    // For this demo, we'll shuffle/filter based on mock logic.
    const allNews = featuredNews.filter(news => news.category === category);

    const filteredNewsItems = allNews.filter((item, index) => {
        if (activeFilter === 'Latest') return true;
        // Mocking filter types using index since item.id is a string
        if (activeFilter === 'Analysis') return index % 2 === 0;
        if (activeFilter === 'Opinion') return index % 3 === 0;
        if (activeFilter === 'Videos') return index % 4 === 0;
        return true;
    });

    const categoryColor = categoryColors[category as keyof typeof categoryColors] || '#000000';
    const filters = ['Latest', 'Analysis', 'Opinion', 'Videos'];

    return (
        <main className="min-h-screen bg-[#FDFCF8] dark:bg-black pb-20 transition-colors">
            {/* Minimalist Swiss Category Header */}
            <div className="bg-background border-b-2 border-black dark:border-white sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
                        {/* Left: Breadcrumb & Title */}
                        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                            <Link
                                href={`/${lang}`}
                                className="inline-flex items-center gap-2 text-black dark:text-white font-black uppercase text-[10px] tracking-widest px-3 py-1.5 border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                            >
                                <ArrowLeft className="w-3 h-3" />
                                {lang === 'te' ? 'హోమ్' : 'HOME'}
                            </Link>

                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4" style={{ backgroundColor: categoryColor, border: '2px solid black' }} />
                                <h1 className="text-3xl md:text-5xl font-black text-black dark:text-white uppercase tracking-tighter leading-none" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                                    {lang === 'te' ? 'వార్తలు' : category}
                                </h1>
                            </div>
                        </div>

                        {/* Right: Sub-Nav / Filter Bar */}
                        <div className="flex flex-wrap gap-2">
                            {filters.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveFilter(tab)}
                                    className={`px-4 py-1.5 font-bold uppercase text-[10px] border-2 border-black dark:border-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${activeFilter === tab
                                        ? 'bg-black text-white dark:bg-white dark:text-black'
                                        : 'bg-white text-black hover:bg-black hover:text-white dark:bg-zinc-900 dark:text-white dark:hover:bg-white dark:hover:text-black'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* 2. MAIN FEED (Left Column - 8 Cols) */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="flex justify-between items-end border-b-4 border-black dark:border-white pb-2 mb-6 text-black dark:text-white">
                        <h2 className="text-2xl font-black uppercase">
                            {activeFilter} Stories
                        </h2>
                        <span className="text-xs font-black bg-black text-white dark:bg-white dark:text-black px-2 py-0.5 mb-1">
                            {filteredNewsItems.length} RESULTS
                        </span>
                    </div>

                    {filteredNewsItems.length > 0 ? (
                        filteredNewsItems.map((item, index) => (
                            <Link
                                key={item.id}
                                href={`/${lang}/${category}/${lang === 'te' && item.slugTe ? item.slugTe : item.slug}`}
                                className="group block"
                            >
                                {/* THE "ANTI-SLOP" CARD */}
                                <article className="flex flex-col md:flex-row bg-white dark:bg-zinc-900 border-2 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-200">

                                    {/* Image Section */}
                                    <div className="relative w-full md:w-5/12 aspect-video md:aspect-auto border-b-2 md:border-b-0 md:border-r-2 border-black dark:border-white overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Number Badge (Optional for ranking) */}
                                        <div className="absolute top-0 left-0 bg-black text-white w-10 h-10 flex items-center justify-center font-black text-xl border-r-2 border-b-2 border-white">
                                            {index + 1}
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="w-full md:w-7/12 p-6 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <span
                                                    className="text-xs font-black text-white px-2 py-1 uppercase"
                                                    style={{ backgroundColor: categoryColor }}
                                                >
                                                    {item.category}
                                                </span>
                                                <span className="text-xs font-mono font-bold text-gray-500 dark:text-gray-400 uppercase">
                                                    {formatDate(item.publishedAt, lang as 'en' | 'te')}
                                                </span>
                                            </div>

                                            <h3 className="text-2xl font-bold leading-tight mb-3 text-black dark:text-white group-hover:underline decoration-4 decoration-black dark:decoration-white underline-offset-4 transition-colors">
                                                {lang === 'te' ? item.titleTe : item.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed line-clamp-3">
                                                {lang === 'te' ? item.excerptTe : item.excerpt}
                                            </p>
                                        </div>

                                        <div className="mt-6 flex items-center gap-2 text-sm font-black uppercase tracking-wide text-black dark:text-white">
                                            {lang === 'te' ? 'పూర్తి కథనం' : 'Read Story'}
                                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))
                    ) : (
                        <div className="p-12 text-center border-2 border-dashed border-gray-400 dark:border-gray-600 bg-gray-50 dark:bg-zinc-950">
                            <p className="text-xl font-bold text-gray-500 dark:text-gray-400">No {activeFilter.toLowerCase()} stories found in this section yet.</p>
                            <button
                                onClick={() => setActiveFilter('Latest')}
                                className="mt-4 px-6 py-2 bg-black text-white dark:bg-white dark:text-black font-black uppercase text-xs"
                            >
                                Back to Latest
                            </button>
                        </div>
                    )}
                </div>

                {/* 3. SIDEBAR (Right Column - 4 Cols) */}
                <aside className="lg:col-span-4 space-y-12">

                    {/* Widget: Most Popular */}
                    <div className="border-2 border-black dark:border-white bg-white dark:bg-zinc-900 p-6 shadow-[4px_4px_0px_0px_black] dark:shadow-[4px_4px_0px_0px_white]">
                        <h3 className="font-black uppercase text-xl mb-6 flex items-center gap-2 text-black dark:text-white">
                            <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                            Trending in {category}
                        </h3>
                        <div className="space-y-6">
                            {trending.map((t, i) => (
                                <div key={t.id} className="flex gap-4 items-start group cursor-pointer text-black dark:text-white">
                                    <span className="text-3xl font-black text-gray-200 dark:text-zinc-700 group-hover:text-black dark:group-hover:text-white transition-colors">0{i + 1}</span>
                                    <div>
                                        <h4 className="font-bold text-lg leading-tight group-hover:underline decoration-2">{t.title}</h4>
                                        <span className="text-xs text-gray-500 dark:text-zinc-500 font-mono mt-1 block uppercase">{t.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Widget: Newsletter (Mini) */}
                    <div className="bg-yellow-400 border-2 border-black p-6 shadow-[4px_4px_0px_0px_black] rotate-1 hover:rotate-0 transition-transform dark:text-black">
                        <h3 className="font-black uppercase text-2xl mb-2">Don&apos;t Miss Out.</h3>
                        <p className="font-bold text-sm mb-4">Get the top political analysis delivered to your inbox.</p>
                        <input type="email" placeholder="Email address" className="w-full p-3 border-2 border-black mb-2 font-bold focus:outline-none" />
                        <button className="w-full bg-black text-white font-black uppercase py-3 border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-colors">
                            Subscribe
                        </button>
                    </div>

                </aside>

            </div>
        </main>
    );
}
