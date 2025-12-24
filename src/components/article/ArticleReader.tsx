'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Share2, Twitter, MessageCircle, Clock, ArrowLeft } from 'lucide-react';
import { NewsArticle, categoryColors } from '@/lib/data/news';
import { getArticleUrl } from '@/lib/urlUtils';
import AudioPlayer from '@/components/media/AudioPlayer';
import ScrollProgress from '@/components/ui/ScrollProgress';
import TimelineWidget from '@/components/widgets/TimelineWidget';
import PollWidget from '@/components/widgets/PollWidget';
import { formatDate } from '@/lib/dateUtils';

interface ArticleReaderProps {
    article: NewsArticle;
    relatedArticles: NewsArticle[];
    trendingArticles: NewsArticle[];
    lang: 'en' | 'te';
}

export default function ArticleReader({
    article,
    relatedArticles: _relatedArticles,
    trendingArticles,
    lang
}: ArticleReaderProps) {
    const contentRef = useRef<HTMLElement>(null);


    const handleShare = async (platform: 'twitter' | 'whatsapp' | 'copy') => {
        const url = window.location.href;
        const title = lang === 'te' ? article.titleTe : article.title;

        switch (platform) {
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, '_blank');
                break;
            case 'copy':
                await navigator.clipboard.writeText(url);
                break;
        }
    };

    // Sample article content (in production, this would come from CMS)
    const articleContent = article.content || (lang === 'te'
        ? article.excerptTe + '\n\n' + article.excerptTe + '\n\n' + article.excerptTe
        : article.excerpt + '\n\n' + article.excerpt + '\n\n' + article.excerpt);

    return (
        <div className="min-h-screen bg-background">
            {/* Progress Bar - Fixed at top */}
            <ScrollProgress color="#FACC15" />

            {/* Header is now provided by layout */}

            {/* Main Container - Max 1280px */}
            <main className="max-w-[1280px] mx-auto px-4 py-8 pb-24">
                {/* 12-Column Grid: 8 cols content + 4 cols sidebar */}
                <div className="grid grid-cols-12 gap-8 lg:gap-12">
                    {/* Main Content - 8 columns */}
                    <article ref={contentRef} className="col-span-12 lg:col-span-8">
                        {/* Back Button */}
                        <div className="mb-8">
                            <Link
                                href={`/${lang}`}
                                className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <div className="w-8 h-8 flex items-center justify-center border-2 border-border group-hover:border-black dark:group-hover:border-white group-hover:bg-black dark:group-hover:bg-white transition-all transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                    style={{ boxShadow: '0px 0px 0px 0px rgba(0,0,0,1)' }}>
                                    <ArrowLeft className="w-4 h-4 group-hover:text-white dark:group-hover:text-black" />
                                </div>
                                <span>{lang === 'te' ? 'తిరిగి హోమ్‌కి' : 'Back to News'}</span>
                            </Link>
                        </div>

                        {/* Category Tag */}
                        <div className="mb-6">
                            <span
                                className="inline-block px-4 py-2 text-sm font-black uppercase tracking-wider text-white"
                                style={{ backgroundColor: categoryColors[article.category] }}
                            >
                                {lang === 'te' ? article.categoryLabelTe : article.categoryLabel}
                            </span>
                        </div>

                        {/* Headline */}
                        <h1
                            className={`article-headline text-4xl md:text-5xl font-black leading-tight mb-8 ${lang === 'te' ? 'normal-case leading-relaxed' : 'uppercase'
                                }`}
                            style={{ fontFamily: lang === 'te' ? "'Ramabhadra', sans-serif" : "'Archivo Black', sans-serif" }}
                        >
                            {lang === 'te' ? article.titleTe : article.title}
                        </h1>

                        {/* Listen Button */}
                        <div className="mb-6">
                            <AudioPlayer
                                text={lang === 'te' ? (article.contentTe || article.excerptTe) : (article.content || article.excerpt)}
                                textTe={article.contentTe || article.excerptTe}
                                estimatedTime={`${article.readTime} MIN`}
                                estimatedTimeTe={`${article.readTime} ని.`}
                                lang={lang}
                            />
                        </div>

                        {/* Dateline Strip */}
                        <div className="flex flex-wrap items-center gap-4 py-4 border-y-2 border-black dark:border-white mb-8">
                            {/* Author */}
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

                            {/* Date */}
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-sm font-bold">
                                    {formatDate(article.publishedAt, lang)}
                                </span>
                            </div>

                            <div className="w-px h-8 bg-black/20 dark:bg-white/20" />

                            {/* Read Time */}
                            <div className="flex items-center gap-1 text-sm">
                                <Clock className="w-4 h-4" />
                                <span className="font-bold">{article.readTime} MIN</span>
                            </div>

                            {/* Share Buttons */}
                            <div className="flex items-center gap-2 ml-auto">
                                <button
                                    onClick={() => handleShare('whatsapp')}
                                    className="w-10 h-10 bg-[#25D366] text-white flex items-center justify-center hover:opacity-80 transition-opacity"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleShare('twitter')}
                                    className="w-10 h-10 bg-black text-white flex items-center justify-center hover:opacity-80 transition-opacity"
                                >
                                    <Twitter className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleShare('copy')}
                                    className="w-10 h-10 bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors border-2 border-border"
                                >
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Featured Image - with hard shadow and border */}
                        <div className="relative mb-8">
                            <div
                                className="relative aspect-[16/9] border-2 border-black overflow-hidden"
                                style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }}
                            >
                                <Image
                                    src={article.image}
                                    alt={lang === 'te' ? article.titleTe : article.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            {/* Yellow Strip Caption */}
                            <div className="bg-[#FACC15] text-black py-2 px-4 border-x-2 border-b-2 border-black">
                                <p className="text-sm font-bold">
                                    {lang === 'te' ? article.titleTe : article.title}
                                </p>
                            </div>
                        </div>

                        {/* Article Body */}
                        <div
                            className={`article-body prose prose-lg max-w-none ${lang === 'te' ? '' : ''}`}
                            style={{ fontFamily: lang === 'te' ? "'Mandali', sans-serif" : "'Merriweather', Georgia, serif" }}
                        >
                            {/* Drop Cap First Paragraph */}
                            <p className="article-summary first-letter:text-7xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                                {lang === 'te' ? article.excerptTe : article.excerpt}
                            </p>

                            {/* Additional paragraphs */}
                            <p className="mt-6 leading-relaxed">
                                {articleContent.split('\n\n').slice(1).join('\n\n')}
                            </p>

                            {/* Blockquote Example */}
                            <blockquote className="border-l-8 border-black dark:border-white pl-6 py-4 my-8 bg-muted/30 not-italic">
                                <p className="text-xl font-bold leading-relaxed">
                                    {lang === 'te'
                                        ? '"ఈ చట్టం మా దేశ చరిత్రలో ఒక మలుపు అవుతుంది."'
                                        : '"This legislation marks a turning point in our nation\'s history."'
                                    }
                                </p>
                                <cite className="block mt-2 text-sm font-bold not-italic text-muted-foreground">
                                    — {lang === 'te' ? 'ప్రధాన మంత్రి' : 'Prime Minister'}
                                </cite>
                            </blockquote>

                            {/* More content */}
                            <p className="leading-relaxed">
                                {lang === 'te' ? article.excerptTe : article.excerpt}
                            </p>
                        </div>

                        {/* Tags */}
                        <div className="mt-12 pt-8 border-t-2 border-border">
                            <p className="font-black uppercase text-sm mb-4">
                                {lang === 'te' ? 'ట్యాగ్‌లు' : 'Tags'}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {['Politics', 'Parliament', 'Legislation'].map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-muted text-sm font-bold uppercase border-2 border-border"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </article>

                    {/* Sidebar - 4 columns - Sticky */}
                    <aside className="hidden lg:block col-span-4">
                        <div className="sticky top-24 space-y-8">
                            {/* The Story So Far - Timeline Widget */}
                            <TimelineWidget lang={lang} />

                            {/* Interactive Poll Widget */}
                            <PollWidget lang={lang} />

                            {/* Trending in Category - Numbered List */}
                            <div
                                className="border-2 border-black"
                                style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }}
                            >
                                <div className="bg-[#FACC15] text-black p-4">
                                    <h3 className="font-black uppercase text-sm">
                                        {lang === 'te' ? `${article.categoryLabelTe}లో ట్రెండింగ్` : `Trending in ${article.categoryLabel}`}
                                    </h3>
                                </div>
                                <div className="p-4 space-y-4">
                                    {trendingArticles.slice(0, 5).map((trending, index) => (
                                        <Link
                                            key={trending.id}
                                            href={getArticleUrl(trending.category, trending.slug, trending.slugTe, lang)}
                                            className="block group"
                                        >
                                            <div className="flex gap-3 items-start">
                                                {/* Hard Shadow Number */}
                                                <div
                                                    className="w-8 h-8 bg-black text-white flex items-center justify-center font-black text-lg flex-shrink-0"
                                                    style={{ boxShadow: '3px 3px 0px 0px rgba(0,0,0,0.3)' }}
                                                >
                                                    {index + 1}
                                                </div>
                                                <p className={`text-sm font-bold group-hover:underline ${lang === 'te' ? 'normal-case' : 'uppercase'}`}>
                                                    {lang === 'te' ? trending.titleTe : trending.title}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
