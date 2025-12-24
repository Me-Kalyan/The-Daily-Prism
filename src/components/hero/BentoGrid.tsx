'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { featuredNews, categoryColors } from '@/lib/data/news';
import { getArticleUrl } from '@/lib/urlUtils';

interface BentoGridProps {
    lang?: 'en' | 'te';
}

export default function BentoGrid({ lang = 'en' }: BentoGridProps) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const mainFeature = featuredNews[0];
    const secondFeature = featuredNews[1];
    const thirdFeature = featuredNews[2];
    const fourthFeature = featuredNews[3];
    const fifthFeature = featuredNews[4];

    return (
        <section className="max-w-7xl mx-auto px-4 py-8">
            {/* Mondrian Grid with visible borders */}
            <div className="mondrian-grid grid-cols-1 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px]">

                {/* Main Feature (2x2) */}
                <motion.article
                    className={`mondrian-cell md:col-span-2 md:row-span-2 relative overflow-hidden cursor-pointer category-${mainFeature.category}`}
                    style={{ '--category-color': categoryColors[mainFeature.category] } as React.CSSProperties}
                    onMouseEnter={() => setHoveredId(mainFeature.id)}
                    onMouseLeave={() => setHoveredId(null)}
                >
                    <Link href={getArticleUrl(mainFeature.category, mainFeature.slug, mainFeature.slugTe, lang)} className="block h-full relative">
                        <Image
                            src={mainFeature.image}
                            alt={lang === 'te' ? mainFeature.titleTe : mainFeature.title}
                            fill
                            className={`object-cover transition-opacity duration-200 ${hoveredId === mainFeature.id ? 'opacity-20' : 'opacity-100'}`}
                        />

                        {/* Content Overlay */}
                        <div className={`absolute inset-0 p-6 flex flex-col justify-end transition-colors duration-200 ${hoveredId === mainFeature.id ? '' : 'bg-gradient-to-t from-black/80 via-black/20 to-transparent'
                            }`}>
                            {/* Category Tag */}
                            <span
                                className="inline-block px-2 py-1 text-xs font-black uppercase tracking-wider text-white mb-3 w-fit"
                                style={{ backgroundColor: categoryColors[mainFeature.category] }}
                            >
                                {lang === 'te' ? mainFeature.categoryLabelTe : mainFeature.categoryLabel}
                            </span>

                            <h2
                                className={`text-2xl md:text-3xl font-black uppercase leading-tight mb-3 ${hoveredId === mainFeature.id ? 'text-white' : 'text-white'
                                    } ${lang === 'te' ? 'normal-case' : ''}`}
                            >
                                {lang === 'te' ? mainFeature.titleTe : mainFeature.title}
                            </h2>

                            <div className={`flex items-center gap-4 text-xs font-bold uppercase ${hoveredId === mainFeature.id ? 'text-white/80' : 'text-white/70'
                                }`}>
                                <span>{lang === 'te' ? mainFeature.author.nameTe : mainFeature.author.name}</span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {mainFeature.readTime} MIN
                                </span>
                            </div>
                        </div>
                    </Link>
                </motion.article>

                {/* Tech Article (1x2) */}
                <motion.article
                    className={`mondrian-cell md:row-span-2 relative p-5 flex flex-col cursor-pointer category-${secondFeature.category} bg-white dark:bg-zinc-950`}
                    style={{ '--category-color': categoryColors[secondFeature.category] } as React.CSSProperties}
                    onMouseEnter={() => setHoveredId(secondFeature.id)}
                    onMouseLeave={() => setHoveredId(null)}
                >
                    <Link href={getArticleUrl(secondFeature.category, secondFeature.slug, secondFeature.slugTe, lang)} className="flex flex-col h-full">
                        <span
                            className="inline-block px-2 py-1 text-xs font-black uppercase tracking-wider text-white mb-4 w-fit"
                            style={{ backgroundColor: categoryColors[secondFeature.category] }}
                        >
                            {lang === 'te' ? secondFeature.categoryLabelTe : secondFeature.categoryLabel}
                        </span>

                        <h3 className={`text-lg font-black uppercase leading-tight flex-1 text-black dark:text-white ${lang === 'te' ? 'normal-case' : ''}`}>
                            {lang === 'te' ? secondFeature.titleTe : secondFeature.title}
                        </h3>

                        <p className={`text-sm mt-4 line-clamp-3 text-gray-700 dark:text-gray-300 ${lang === 'te' ? '' : ''}`}>
                            {lang === 'te' ? secondFeature.excerptTe : secondFeature.excerpt}
                        </p>

                        <div className="mt-4 pt-4 border-t-2 border-black dark:border-white flex items-center text-xs font-bold uppercase text-black dark:text-white">
                            <Clock className="w-3 h-3 mr-1" />
                            {secondFeature.readTime} MIN
                        </div>
                    </Link>
                </motion.article>

                {/* Markets Article (1x1) */}
                <motion.article
                    className={`mondrian-cell relative p-4 flex flex-col cursor-pointer category-${thirdFeature.category} bg-white dark:bg-zinc-950`}
                    style={{ '--category-color': categoryColors[thirdFeature.category] } as React.CSSProperties}
                    onMouseEnter={() => setHoveredId(thirdFeature.id)}
                    onMouseLeave={() => setHoveredId(null)}
                >
                    <Link href={getArticleUrl(thirdFeature.category, thirdFeature.slug, thirdFeature.slugTe, lang)} className="flex flex-col h-full">
                        <span
                            className="inline-block px-2 py-0.5 text-xs font-black uppercase tracking-wider text-white mb-2 w-fit"
                            style={{ backgroundColor: categoryColors[thirdFeature.category] }}
                        >
                            {lang === 'te' ? thirdFeature.categoryLabelTe : thirdFeature.categoryLabel}
                        </span>

                        <h3 className={`text-base font-black uppercase leading-tight flex-1 text-black dark:text-white ${lang === 'te' ? 'normal-case' : ''}`}>
                            {lang === 'te' ? thirdFeature.titleTe : thirdFeature.title}
                        </h3>

                        <div className="mt-2 text-xs font-bold uppercase flex items-center text-black dark:text-white">
                            <Clock className="w-3 h-3 mr-1" />
                            {thirdFeature.readTime} MIN
                        </div>
                    </Link>
                </motion.article>

                {/* Opinion Article (1x1) */}
                <motion.article
                    className={`mondrian-cell relative p-4 flex flex-col cursor-pointer category-${fourthFeature.category} bg-white dark:bg-zinc-950`}
                    style={{ '--category-color': categoryColors[fourthFeature.category] } as React.CSSProperties}
                    onMouseEnter={() => setHoveredId(fourthFeature.id)}
                    onMouseLeave={() => setHoveredId(null)}
                >
                    <Link href={getArticleUrl(fourthFeature.category, fourthFeature.slug, fourthFeature.slugTe, lang)} className="flex flex-col h-full">
                        <span
                            className="inline-block px-2 py-0.5 text-xs font-black uppercase tracking-wider text-white mb-2 w-fit"
                            style={{ backgroundColor: categoryColors[fourthFeature.category] }}
                        >
                            {lang === 'te' ? fourthFeature.categoryLabelTe : fourthFeature.categoryLabel}
                        </span>

                        <h3 className={`text-base font-black uppercase leading-tight flex-1 text-black dark:text-white ${lang === 'te' ? 'normal-case' : ''}`}>
                            {lang === 'te' ? fourthFeature.titleTe : fourthFeature.title}
                        </h3>

                        <div className="mt-2 text-xs font-bold uppercase flex items-center text-black dark:text-white">
                            <Clock className="w-3 h-3 mr-1" />
                            {fourthFeature.readTime} MIN
                        </div>
                    </Link>
                </motion.article>

                {/* Politics Article (2x1) - Full Width Bottom */}
                {fifthFeature && (
                    <motion.article
                        className={`mondrian-cell md:col-span-2 relative overflow-hidden cursor-pointer category-${fifthFeature.category} bg-white dark:bg-zinc-950`}
                        style={{ '--category-color': categoryColors[fifthFeature.category] } as React.CSSProperties}
                        onMouseEnter={() => setHoveredId(fifthFeature.id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <Link href={getArticleUrl(fifthFeature.category, fifthFeature.slug, fifthFeature.slugTe, lang)} className="flex h-full">
                            <div className="w-1/3 relative">
                                <Image
                                    src={fifthFeature.image}
                                    alt={lang === 'te' ? fifthFeature.titleTe : fifthFeature.title}
                                    fill
                                    className={`object-cover transition-opacity duration-200 ${hoveredId === fifthFeature.id ? 'opacity-20' : 'opacity-100'}`}
                                />
                            </div>
                            <div className="w-2/3 p-4 flex flex-col">
                                <span
                                    className="inline-block px-2 py-0.5 text-xs font-black uppercase tracking-wider text-white mb-2 w-fit"
                                    style={{ backgroundColor: categoryColors[fifthFeature.category] }}
                                >
                                    {lang === 'te' ? fifthFeature.categoryLabelTe : fifthFeature.categoryLabel}
                                </span>

                                <h3 className={`text-lg font-black uppercase leading-tight flex-1 text-black dark:text-white ${lang === 'te' ? 'normal-case' : ''}`}>
                                    {lang === 'te' ? fifthFeature.titleTe : fifthFeature.title}
                                </h3>

                                <div className="mt-2 text-xs font-bold uppercase flex items-center text-black dark:text-white">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {fifthFeature.readTime} MIN
                                </div>
                            </div>
                        </Link>
                    </motion.article>
                )}
            </div>
        </section>
    );
}
