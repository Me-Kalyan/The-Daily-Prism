'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, User } from 'lucide-react';
import { NewsArticle, categoryColors, Category } from '@/lib/data/news';
import { getArticleUrl } from '@/lib/urlUtils';

interface SplitCardProps {
    article: NewsArticle;
    lang?: 'en' | 'te';
    index?: number;
}

/**
 * Split Card Component for Category Pages
 * Left: Square Image | Right: Title + Excerpt + Meta
 * Optimized for quick scanning of headlines
 */
export default function SplitCard({ article, lang = 'en', index = 0 }: SplitCardProps) {
    const articleUrl = getArticleUrl(article.category, article.slug, article.slugTe, lang);
    const categoryColor = categoryColors[article.category as Category] || '#000000';

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)' }}
            className="bg-card border-2 border-border overflow-hidden"
        >
            <Link href={articleUrl} className="flex flex-col md:flex-row">
                {/* Left: Square Image */}
                <div className="relative w-full md:w-48 lg:w-56 flex-shrink-0">
                    <div className="aspect-square md:aspect-auto md:h-full relative">
                        <Image
                            src={article.image}
                            alt={lang === 'te' ? article.titleTe : article.title}
                            fill
                            className="object-cover"
                        />
                        {/* Category Badge */}
                        <div
                            className="absolute top-2 left-2 px-2 py-1 text-xs font-black text-white uppercase"
                            style={{ backgroundColor: categoryColor }}
                        >
                            {lang === 'te' ? article.categoryLabelTe : article.categoryLabel}
                        </div>
                    </div>
                </div>

                {/* Right: Content */}
                <div className="flex-1 p-4 md:p-5 flex flex-col justify-between">
                    {/* Title */}
                    <div>
                        <h2
                            className={`text-lg md:text-xl font-black leading-tight mb-2 group-hover:underline ${lang === 'te' ? 'normal-case' : ''
                                }`}
                            style={{ fontFamily: lang === 'te' ? "'Ramabhadra', sans-serif" : "'Archivo Black', sans-serif" }}
                        >
                            {lang === 'te' ? article.titleTe : article.title}
                        </h2>

                        {/* Excerpt */}
                        <p
                            className="text-sm text-muted-foreground line-clamp-2 mb-4"
                            style={{ fontFamily: lang === 'te' ? "'Mandali', sans-serif" : "inherit" }}
                        >
                            {lang === 'te' ? article.excerptTe : article.excerpt}
                        </p>
                    </div>

                    {/* Meta Row */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {/* Author */}
                        <div className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5" />
                            <span className="font-bold">
                                {lang === 'te' ? article.author.nameTe : article.author.name}
                            </span>
                        </div>

                        <span className="text-muted-foreground/50">•</span>

                        {/* Read Time */}
                        <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="font-bold">
                                {article.readTime} {lang === 'te' ? 'ని.' : 'min'}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
