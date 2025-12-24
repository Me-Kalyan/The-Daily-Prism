'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TickerTape from '@/components/layout/TickerTape';
import BentoGrid from '@/components/hero/BentoGrid';
import StackedCard from '@/components/news/StackedCard';
import LiveWidget from '@/components/widgets/LiveWidget';
import VideoPlayer from '@/components/video/CinematicVideo';
import CardstockPoll from '@/components/widgets/PulsePolls';
import StoryTimeline, { sampleTimelineEvents } from '@/components/widgets/StoryTimeline';
import VerdictCard, { sampleFactChecks } from '@/components/news/VerdictCard';
import DashboardStrip from '@/components/widgets/DashboardStrip';
import MasonryGallery from '@/components/gallery/MasonryGallery';
import BeforeAfterSlider, { sampleBeforeAfter } from '@/components/media/BeforeAfterSlider';
import LiveScoreIsland from '@/components/widgets/LiveScoreIsland';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { featuredNews } from '@/lib/data/news';

interface HomePageClientProps {
    lang: 'en' | 'te';
}

export default function HomePageClient({ lang }: HomePageClientProps) {
    const [isReadMode, setIsReadMode] = useState(false);
    const [readModeStyle, setReadModeStyle] = useState<'sepia' | 'dark'>('sepia');
    const [isLoading, setIsLoading] = useState(true);

    // Simulate initial load
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('read-mode-sepia', 'read-mode-dark', 'read-mode-active');

        if (isReadMode) {
            root.classList.add('read-mode-active');
            root.classList.add(`read-mode-${readModeStyle}`);
        }
    }, [isReadMode, readModeStyle]);

    return (
        <div className={`min-h-screen read-mode-transition ${lang === 'te' ? 'lang-te' : ''}`}>
            {/* Ticker Tape - always visible */}
            <TickerTape lang={lang} />

            {/* Header is now provided by layout */}

            {/* Loading State: Show Skeleton */}
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="skeleton"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <PageSkeleton />
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Dashboard Utility Strip - hide in read mode */}
                        {!isReadMode && <DashboardStrip lang={lang} />}

                        <main>
                            {/* Hero: Mondrian Bento Grid - hide in read mode */}
                            {!isReadMode && (
                                <AnimatePresence mode="wait">
                                    <BentoGrid key={lang} lang={lang} />
                                </AnimatePresence>
                            )}

                            {/* Video Section */}
                            <section className="max-w-7xl mx-auto px-4 py-8">
                                <h2
                                    className="text-xl font-black uppercase mb-6 inline-block pb-2 text-black dark:text-white"
                                    style={{ borderBottom: '4px solid #DC2626' }}
                                >
                                    {lang === 'te' ? 'ఫీచర్ వీడియో' : 'Featured Video'}
                                </h2>
                                <div className={isReadMode ? 'max-w-3xl mx-auto' : 'max-w-2xl'}>
                                    <VideoPlayer
                                        videoId="dQw4w9WgXcQ"
                                        thumbnail="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=450&fit=crop"
                                        title="Special Report: Inside Parliament"
                                        titleTe="ప్రత్యేక రిపోర్ట్: పార్లమెంట్ లో"
                                        duration="4:32"
                                        lang={lang}
                                    />
                                </div>
                            </section>

                            {/* News Feed + Sidebar */}
                            <section className="max-w-7xl mx-auto px-4 py-8">
                                <div className={`grid gap-8 ${isReadMode ? 'grid-cols-1 max-w-3xl mx-auto' : 'grid-cols-1 lg:grid-cols-3'}`}>
                                    {/* News Feed */}
                                    <div className={isReadMode ? '' : 'lg:col-span-2'}>
                                        <h2
                                            className="text-xl font-black uppercase mb-6 inline-block pb-2 text-black dark:text-white"
                                            style={{ borderBottom: '4px solid #2563EB' }}
                                        >
                                            {lang === 'te' ? 'తాజా వార్తలు' : 'Latest News'}
                                        </h2>
                                        <div className={`grid gap-6 ${isReadMode ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                                            {featuredNews.map((article, index) => (
                                                <StackedCard
                                                    key={article.id}
                                                    article={article}
                                                    lang={lang}
                                                    index={index}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Sidebar - hide in read mode */}
                                    {!isReadMode && (
                                        <div className="space-y-8 sidebar-content sidebar-transition">
                                            <LiveWidget lang={lang} />
                                            <StoryTimeline events={sampleTimelineEvents} lang={lang} />
                                            <CardstockPoll lang={lang} />
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Fact Check Section */}
                            <section className="max-w-7xl mx-auto px-4 py-8">
                                <h2
                                    className="text-xl font-black uppercase mb-6 inline-block pb-2 text-black dark:text-white"
                                    style={{ borderBottom: '4px solid #DC2626' }}
                                >
                                    {lang === 'te' ? 'వాస్తవ తనిఖీ' : 'Fact Check'}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {sampleFactChecks.map((factCheck) => (
                                        <VerdictCard
                                            key={factCheck.id}
                                            {...factCheck}
                                            lang={lang}
                                        />
                                    ))}
                                </div>
                            </section>

                            {/* Before & After Visual Comparison */}
                            <section className="max-w-7xl mx-auto px-4 py-8">
                                <h2
                                    className="text-xl font-black uppercase mb-6 inline-block pb-2 text-black dark:text-white"
                                    style={{ borderBottom: '4px solid #7C3AED' }}
                                >
                                    {lang === 'te' ? 'దృశ్య పోలిక' : 'Visual Comparison'}
                                </h2>
                                <div className="max-w-4xl">
                                    <BeforeAfterSlider
                                        beforeImage={sampleBeforeAfter.beforeImage}
                                        afterImage={sampleBeforeAfter.afterImage}
                                        alt={sampleBeforeAfter.alt}
                                        altTe={sampleBeforeAfter.altTe}
                                        lang={lang}
                                    />
                                    <p className={`mt-4 text-sm text-muted-foreground ${lang === 'te' ? '' : 'uppercase'} font-bold`}>
                                        {lang === 'te' ? 'హైదరాబాద్ స్కైలైన్: అభివృద్ధి ముందు & తర్వాత' : 'Hyderabad Skyline: Before & After Development'}
                                    </p>
                                </div>
                            </section>

                            {/* Photo Gallery */}
                            <MasonryGallery lang={lang} />
                        </main>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Live Score Island - Fixed at bottom */}
            <LiveScoreIsland lang={lang} />
        </div>
    );
}
