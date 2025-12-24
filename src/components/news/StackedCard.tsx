'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { NewsArticle, categoryColors } from '@/lib/data/news';
import { getArticleUrl } from '@/lib/urlUtils';
import AudioPlayer from '@/components/media/AudioPlayer';

interface StackedCardProps {
    article: NewsArticle;
    lang?: 'en' | 'te';
    index?: number;
}

export default function StackedCard({ article, lang = 'en', index = 0 }: StackedCardProps) {
    // Create article content for TTS
    const articleContent = `${article.title}. ${article.excerpt}`;
    const articleContentTe = `${article.titleTe}. ${article.excerptTe}`;

    // Generate proper dynamic URL
    const articleUrl = getArticleUrl(article.category, article.slug, article.slugTe, lang);

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ y: -4, boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)' }}
            className="group bg-card border-2 border-border shadow-hard overflow-hidden"
        >
            <Link href={articleUrl} className="block">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                        src={article.image}
                        alt={lang === 'te' ? article.titleTe : article.title}
                        fill
                        className="object-cover"
                    />

                    {/* Category Badge - Solid */}
                    <div className="absolute top-0 left-0">
                        <span
                            className="block px-3 py-1 text-xs font-black uppercase tracking-wider text-white"
                            style={{ backgroundColor: categoryColors[article.category] }}
                        >
                            {lang === 'te' ? article.categoryLabelTe : article.categoryLabel}
                        </span>
                    </div>

                    {article.isBreaking && (
                        <div className="absolute top-0 right-0 flex items-center gap-1.5 px-2 py-1 bg-[#DC2626] text-white text-xs font-black uppercase">
                            <span className="w-2 h-2 bg-white animate-pulse-dot" />
                            LIVE
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-5">
                    {/* Headline */}
                    <h3 className={`text-lg font-black uppercase leading-tight mb-3 group-hover:underline ${lang === 'te' ? 'normal-case' : ''}`}>
                        {lang === 'te' ? article.titleTe : article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className={`text-sm text-muted-foreground line-clamp-2 mb-4 ${lang === 'te' ? '' : ''}`}>
                        {lang === 'te' ? article.excerptTe : article.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs font-bold uppercase text-muted-foreground border-t-2 border-border pt-4">
                        <span>{lang === 'te' ? article.author.nameTe : article.author.name}</span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime} MIN
                        </span>
                    </div>
                </div>
            </Link>

            {/* Listen Button - Outside link */}
            <div className="px-5 pb-5 pt-0" onClick={(e) => e.stopPropagation()}>
                <AudioPlayer
                    text={articleContent}
                    textTe={articleContentTe}
                    estimatedTime={`${article.readTime} MIN`}
                    estimatedTimeTe={`${article.readTime} ని.`}
                    lang={lang}
                />
            </div>
        </motion.article>
    );
}
