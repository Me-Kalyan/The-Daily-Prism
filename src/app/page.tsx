'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TickerTape from '@/components/layout/TickerTape';
import Header from '@/components/layout/Header';
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

export default function HomePage() {
  const [lang, setLang] = useState<'en' | 'te'>('en');
  const [isDark, setIsDark] = useState(false);
  const [isReadMode, setIsReadMode] = useState(false);
  const [readModeStyle, setReadModeStyle] = useState<'sepia' | 'dark'>('sepia');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial load - in production, this would be actual data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Brief skeleton display for perceived performance
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Handle read mode classes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('read-mode-sepia', 'read-mode-dark', 'read-mode-active');

    if (isReadMode) {
      root.classList.add('read-mode-active');
      root.classList.add(readModeStyle === 'sepia' ? 'read-mode-sepia' : 'read-mode-dark');
    }
  }, [isReadMode, readModeStyle]);

  useEffect(() => {
    const savedLang = localStorage.getItem('prism-lang') as 'en' | 'te' | null;
    const savedTheme = localStorage.getItem('prism-theme');

    queueMicrotask(() => {
      if (savedLang) setLang(savedLang);
      if (savedTheme === 'dark') setIsDark(true);
    });
  }, []);

  const handleLangChange = (newLang: 'en' | 'te') => {
    setLang(newLang);
    localStorage.setItem('prism-lang', newLang);
  };

  const handleThemeToggle = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('prism-theme', newTheme ? 'dark' : 'light');
  };

  const handleReadModeToggle = () => {
    setIsReadMode(!isReadMode);
  };

  const handleReadModeStyleChange = () => {
    setReadModeStyle(readModeStyle === 'sepia' ? 'dark' : 'sepia');
  };

  return (
    <div className={`min-h-screen read-mode-transition ${lang === 'te' ? 'lang-te' : ''}`}>
      {/* Ticker Tape - always visible */}
      <TickerTape lang={lang} />

      {/* Header - always visible */}
      <Header
        lang={lang}
        onLangChange={handleLangChange}
        isDark={isDark}
        onThemeToggle={handleThemeToggle}
        isReadMode={isReadMode}
        onReadModeToggle={handleReadModeToggle}
        readModeStyle={readModeStyle}
        onReadModeStyleChange={handleReadModeStyleChange}
      />

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
                  <motion.div
                    key={lang}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BentoGrid lang={lang} />
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Video Section */}
              <section className="max-w-7xl mx-auto px-4 py-8">
                <h2
                  className="text-xl font-black uppercase mb-6 inline-block pb-2"
                  style={{ borderBottom: '4px solid #DC2626' }}
                >
                  {lang === 'te' ? 'వీడియో' : 'Featured Video'}
                </h2>
                <div className={`${isReadMode ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
                  <VideoPlayer
                    videoId="dQw4w9WgXcQ"
                    thumbnail="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=675&fit=crop"
                    title="Inside Parliament: The Historic Vote"
                    titleTe="పార్లమెంట్ లోపల: చారిత్రాత్మక ఓటు"
                    lang={lang}
                  />
                </div>
              </section>

              {/* Main Content Grid */}
              <section className="max-w-7xl mx-auto px-4 py-8">
                <div className={`grid gap-8 ${isReadMode ? 'grid-cols-1 max-w-3xl mx-auto' : 'grid-cols-1 lg:grid-cols-3'}`}>
                  {/* News Feed */}
                  <div className={isReadMode ? '' : 'lg:col-span-2'}>
                    <h2
                      className="text-xl font-black uppercase mb-6 inline-block pb-2"
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

                  {/* Sidebar - slides away in read mode */}
                  <div className={`space-y-8 sidebar-transition ${isReadMode ? 'hidden' : ''}`}>
                    <LiveWidget lang={lang} />
                    <StoryTimeline events={sampleTimelineEvents} lang={lang} />
                    <CardstockPoll lang={lang} />
                  </div>
                </div>
              </section>

              {/* Fact Check Section */}
              <section className="max-w-7xl mx-auto px-4 py-8">
                <h2
                  className="text-xl font-black uppercase mb-6 inline-block pb-2"
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
                  className="text-xl font-black uppercase mb-6 inline-block pb-2"
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

            {/* Fat Footer - Black background for visual anchor */}
            <footer className="bg-black text-white mt-12">
              {/* Newsletter Integration - at top of footer */}
              <div className="border-b-2 border-white/20">
                <div className="max-w-7xl mx-auto px-4 py-10">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-12">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-[#FACC15] flex items-center justify-center flex-shrink-0">
                        <svg className="w-7 h-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className={`text-xl font-black uppercase ${lang === 'te' ? 'normal-case' : ''}`}>
                          {lang === 'te' ? 'న్యూస్‌లెటర్' : 'Daily Newsletter'}
                        </h3>
                        <p className="text-sm text-white/60">
                          {lang === 'te' ? 'ప్రతిరోజూ ఉదయం ముఖ్యమైన వార్తలు' : 'Most important news every morning'}
                        </p>
                      </div>
                    </div>
                    <form className="flex flex-1 max-w-xl gap-0">
                      <input
                        type="email"
                        placeholder={lang === 'te' ? 'మీ ఇమెయిల్' : 'Enter your email'}
                        className="flex-1 px-4 py-3 bg-white text-black border-2 border-white text-sm font-medium placeholder:text-gray-500 focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="px-6 py-3 bg-[#FACC15] text-black font-black uppercase text-sm border-2 border-[#FACC15] hover:bg-[#EAB308] transition-colors flex items-center gap-2"
                      >
                        {lang === 'te' ? 'సబ్‌స్క్రైబ్' : 'Subscribe'}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Main Footer Content */}
              <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">

                  {/* Brand */}
                  <div className="col-span-2 md:col-span-1">
                    <h3 className="text-2xl font-black uppercase mb-4">
                      <span className="text-[#DC2626]">THE</span> DAILY<br />PRISM
                    </h3>
                    <p className="text-sm text-white/60 mb-6">
                      {lang === 'te'
                        ? 'మీ నమ్మకమైన వార్తా వనరు.'
                        : 'Your trusted news source.'}
                    </p>
                    {/* Social Icons */}
                    <div className="flex gap-0">
                      {['X', 'FB', 'IG', 'YT'].map((social) => (
                        <a
                          key={social}
                          href="#"
                          className="w-10 h-10 border-2 border-white/30 flex items-center justify-center text-xs font-black hover:bg-white hover:text-black transition-colors duration-200"
                        >
                          {social}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Top Categories */}
                  <div>
                    <h4 className="font-black uppercase mb-4 text-sm border-b-2 border-[#DC2626] pb-2 inline-block">
                      {lang === 'te' ? 'కేటగిరీలు' : 'Categories'}
                    </h4>
                    <ul className="space-y-2 text-sm text-white/70">
                      <li><a href="#" className="hover:text-white hover:underline transition-colors">{lang === 'te' ? 'రాజకీయాలు' : 'Politics'}</a></li>
                      <li><a href="#" className="hover:text-white hover:underline transition-colors">{lang === 'te' ? 'మార్కెట్లు' : 'Markets'}</a></li>
                      <li><a href="#" className="hover:text-white hover:underline transition-colors">{lang === 'te' ? 'టెక్నాలజీ' : 'Technology'}</a></li>
                      <li><a href="#" className="hover:text-white hover:underline transition-colors">{lang === 'te' ? 'అభిప్రాయం' : 'Opinion'}</a></li>
                      <li><a href="#" className="hover:text-white hover:underline transition-colors">{lang === 'te' ? 'క్రీడలు' : 'Sports'}</a></li>
                    </ul>
                  </div>

                  {/* Editions */}
                  <div>
                    <h4 className="font-black uppercase mb-4 text-sm border-b-2 border-[#2563EB] pb-2 inline-block">
                      {lang === 'te' ? 'ఎడిషన్లు' : 'Editions'}
                    </h4>
                    <ul className="space-y-2 text-sm text-white/70">
                      <li><a href="#" className="hover:text-white hover:underline transition-colors flex items-center gap-2">🇮🇳 {lang === 'te' ? 'భారతదేశం' : 'India'}</a></li>
                      <li><a href="#" className="hover:text-white hover:underline transition-colors flex items-center gap-2">🇺🇸 {lang === 'te' ? 'అమెరికా' : 'United States'}</a></li>
                      <li><a href="#" className="hover:text-white hover:underline transition-colors flex items-center gap-2">🇬🇧 {lang === 'te' ? 'యుకె' : 'United Kingdom'}</a></li>
                      <li><a href="#" className="hover:text-white hover:underline transition-colors flex items-center gap-2">🌍 {lang === 'te' ? 'గ్లోబల్' : 'Global'}</a></li>
                    </ul>
                  </div>

                  {/* Quick Links */}
                  <div>
                    <h4 className="font-black uppercase mb-4 text-sm border-b-2 border-[#059669] pb-2 inline-block">
                      {lang === 'te' ? 'లింక్‌లు' : 'Company'}
                    </h4>
                    <ul className="space-y-2 text-sm text-white/70">
                      <li><a href="#" className="hover:text-white hover:underline transition-colors">{lang === 'te' ? 'మా గురించి' : 'About Us'}</a></li>
                      <li><a href="#" className="hover:text-white hover:underline transition-colors">{lang === 'te' ? 'సంప్రదించండి' : 'Contact'}</a></li>
                      <li><a href="#" className="hover:text-white hover:underline transition-colors">{lang === 'te' ? 'కెరీర్లు' : 'Careers'}</a></li>
                      <li><a href="#" className="hover:text-white hover:underline transition-colors">{lang === 'te' ? 'ప్రెస్ కిట్' : 'Press Kit'}</a></li>
                    </ul>
                  </div>

                  {/* Legal */}
                  <div>
                    <h4 className="font-black uppercase mb-4 text-sm border-b-2 border-[#D97706] pb-2 inline-block">
                      {lang === 'te' ? 'చట్టపరమైన' : 'Legal'}
                    </h4>
                    <ul className="space-y-2 text-sm text-white/70">
                      <li><a href="#" className="hover:text-white hover:underline transition-colors">{lang === 'te' ? 'నిబంధనలు' : 'Terms'}</a></li>
                      <li><a href="#" className="hover:text-white hover:underline transition-colors">{lang === 'te' ? 'గోప్యత' : 'Privacy'}</a></li>
                      <li><a href="#" className="hover:text-white hover:underline transition-colors">{lang === 'te' ? 'కుకీలు' : 'Cookies'}</a></li>
                      <li><a href="#" className="hover:text-white hover:underline transition-colors">{lang === 'te' ? 'యాక్సెసిబిలిటీ' : 'Accessibility'}</a></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Copyright Bar */}
              <div className="border-t-2 border-white/20">
                <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm font-bold text-white/60">© 2024 THE DAILY PRISM. All rights reserved.</p>
                  <div className="flex items-center gap-4">
                    <span className="text-xs uppercase tracking-wider text-white/40">Available in</span>
                    <div className="flex border-2 border-white/30">
                      <span className="px-3 py-1 text-xs font-bold bg-white text-black">EN</span>
                      <span className="px-3 py-1 text-xs font-bold text-white/70 border-l-2 border-white/30">తెలుగు</span>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Score Island - Fixed at bottom */}
      <LiveScoreIsland lang={lang} />
    </div>
  );
}
