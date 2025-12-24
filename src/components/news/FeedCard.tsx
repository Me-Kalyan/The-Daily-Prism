'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Calendar } from 'lucide-react';
import { NewsArticle } from '@/lib/data/news';
import { getArticleUrl } from '@/lib/urlUtils';
import { formatDate } from '@/lib/dateUtils';

interface FeedCardProps {
    article: NewsArticle;
    lang?: 'en' | 'te';
    index?: number;
}

/**
 * Feed Card Component for Category Pages
 * Split layout: 30% square image | 70% content
 * Hover: Translate + shadow grows
 */
export default function FeedCard({ article, lang = 'en', index = 0 }: FeedCardProps) {
    const articleUrl = getArticleUrl(article.category, article.slug, article.slugTe, lang);


    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ x: -2, y: -2 }}
            className="group"
        >
            <Link
                href={articleUrl}
                className="flex bg-card border-2 border-black overflow-hidden transition-shadow duration-200"
                style={{
                    boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '6px 6px 0px 0px rgba(0,0,0,1)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '4px 4px 0px 0px rgba(0,0,0,1)';
                }}
            >
                {/* Left: Square Image (30%) */}
                <div className="relative w-[30%] flex-shrink-0 border-r-2 border-black">
                    <div className="aspect-square relative">
                        <Image
                            src={article.image}
                            alt={lang === 'te' ? article.titleTe : article.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Right: Content (70%) */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                    {/* Headline - Serif */}
                    <div>
                        <h2
                            className={`text-xl font-bold leading-tight mb-3 group-hover:underline ${lang === 'te' ? 'normal-case' : ''
                                }`}
                            style={{
                                fontFamily: lang === 'te'
                                    ? "'Ramabhadra', sans-serif"
                                    : "'Merriweather', 'Fraunces', Georgia, serif"
                            }}
                        >
                            {lang === 'te' ? article.titleTe : article.title}
                        </h2>

                        {/* Excerpt - Sans-serif, Gray, 2 lines max */}
                        <p
                            className="text-sm text-muted-foreground line-clamp-2 mb-4"
                            style={{ fontFamily: lang === 'te' ? "'Mandali', sans-serif" : "inherit" }}
                        >
                            {lang === 'te' ? article.excerptTe : article.excerpt}
                        </p>
                    </div>

                    {/* Meta Row - Monospace */}
                    <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span className="font-bold">
                                {article.readTime} {lang === 'te' ? 'ని.' : 'MIN READ'}
                            </span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span className="font-bold">
                                {formatDate(article.publishedAt, lang)}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
