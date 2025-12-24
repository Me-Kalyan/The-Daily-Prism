'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { featuredNews, categoryColors } from '@/lib/data/news';
import Link from 'next/link';
import { Search as SearchIcon, ArrowLeft } from 'lucide-react';
import { formatDate } from '@/lib/dateUtils';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const params = useParams();
    const lang = (params?.lang as string) || 'en';

    // Simple client-side filtering logic
    const results = featuredNews.filter(item => {
        if (!query) return false;
        const lowerQuery = query.toLowerCase();
        return (
            item.title.toLowerCase().includes(lowerQuery) ||
            (item.titleTe && item.titleTe.includes(query)) ||
            item.excerpt.toLowerCase().includes(lowerQuery) ||
            (item.excerptTe && item.excerptTe.includes(query)) ||
            item.category.includes(lowerQuery)
        );
    });

    return (
        <main className="min-h-screen bg-background">
            {/* Search Header */}
            <div className="bg-black text-white py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <Link
                        href={`/${lang}`}
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 text-sm font-bold uppercase"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {lang === 'te' ? 'హోమ్' : 'Home'}
                    </Link>
                    <h1
                        className="text-4xl font-black uppercase mb-6"
                        style={{ fontFamily: "'Archivo Black', sans-serif" }}
                    >
                        {lang === 'te' ? 'శోధన' : 'Search Archive'}
                    </h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Search Input */}
                <div className="relative mb-12">
                    <input
                        type="text"
                        placeholder={lang === 'te' ? 'వార్తలను వెతకండి...' : 'Search for news, topics, or authors...'}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full p-6 pl-14 text-xl md:text-2xl font-bold border-4 border-black bg-card shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:translate-x-1 focus:translate-y-1 focus:shadow-none transition-all placeholder:text-muted-foreground"
                        autoFocus
                    />
                    <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 text-muted-foreground" />
                </div>

                {/* Results Count */}
                {query && (
                    <div className="mb-6 pb-4 border-b-2 border-border">
                        <p className="text-lg font-bold">
                            {results.length === 0 ? (
                                <span className="text-muted-foreground">
                                    {lang === 'te'
                                        ? `"${query}" కోసం ఫలితాలు లేవు`
                                        : `No results found for "${query}"`
                                    }
                                </span>
                            ) : (
                                <span>
                                    {lang === 'te'
                                        ? `"${query}" కోసం ${results.length} ఫలితాలు`
                                        : `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
                                    }
                                </span>
                            )}
                        </p>
                    </div>
                )}

                {/* Empty State */}
                {!query && (
                    <div className="text-center py-16">
                        <SearchIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                        <p className="text-xl font-bold text-muted-foreground">
                            {lang === 'te'
                                ? 'వార్తలు, అంశాలు లేదా రచయితలను వెతకండి'
                                : 'Search for news, topics, or authors'
                            }
                        </p>
                    </div>
                )}

                {/* Results Grid */}
                <div className="space-y-4">
                    {results.map(item => {
                        const categoryColor = categoryColors[item.category as keyof typeof categoryColors] || '#000000';

                        return (
                            <Link
                                key={item.id}
                                href={`/${lang}/${item.category}/${lang === 'te' && item.slugTe ? item.slugTe : item.slug}`}
                                className="block p-6 bg-card border-2 border-black hover:bg-[#FACC15]/10 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                            >
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex-1">
                                        <span
                                            className="inline-block text-xs font-black uppercase text-white px-2 py-0.5 mb-2"
                                            style={{ backgroundColor: categoryColor }}
                                        >
                                            {lang === 'te' ? item.categoryLabelTe : item.categoryLabel}
                                        </span>
                                        <h3
                                            className={`text-xl font-bold mb-2 ${lang === 'te' ? 'normal-case' : ''}`}
                                            style={{ fontFamily: lang === 'te' ? "'Ramabhadra', sans-serif" : "'Merriweather', serif" }}
                                        >
                                            {lang === 'te' ? item.titleTe : item.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {lang === 'te' ? item.excerptTe : item.excerpt}
                                        </p>
                                    </div>
                                    <span className="text-muted-foreground text-xs font-mono whitespace-nowrap">
                                        {formatDate(item.publishedAt, lang as 'en' | 'te')}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
