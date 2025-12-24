'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { featuredNews } from '@/lib/data/news';
import StackedCard from '@/components/news/StackedCard';

interface SearchPageClientProps {
    lang: 'en' | 'te';
}

export default function SearchPageClient({ lang }: SearchPageClientProps) {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') || '';
    const [query, setQuery] = useState(initialQuery);
    const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);
        return () => clearTimeout(timer);
    }, [query]);

    // Filter articles based on search query
    const results = useMemo(() => {
        if (!debouncedQuery.trim()) return [];

        const searchTerm = debouncedQuery.toLowerCase();

        return featuredNews.filter(article => {
            const titleMatch = article.title.toLowerCase().includes(searchTerm) ||
                article.titleTe.toLowerCase().includes(searchTerm);
            const excerptMatch = article.excerpt.toLowerCase().includes(searchTerm) ||
                article.excerptTe.toLowerCase().includes(searchTerm);
            const categoryMatch = article.categoryLabel.toLowerCase().includes(searchTerm);

            return titleMatch || excerptMatch || categoryMatch;
        });
    }, [debouncedQuery]);

    // Update URL with search query
    useEffect(() => {
        if (debouncedQuery) {
            const url = new URL(window.location.href);
            url.searchParams.set('q', debouncedQuery);
            window.history.replaceState({}, '', url.toString());
        }
    }, [debouncedQuery]);

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="bg-black text-white py-8 sticky top-0 z-40">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href={`/${lang}`}
                            className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-white/20"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>

                        {/* Search Input */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={lang === 'te' ? 'వార్తలు వెతకండి...' : 'Search news...'}
                                autoFocus
                                className="w-full pl-12 pr-12 py-4 bg-white/10 text-white placeholder-white/50 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                            />
                            {query && (
                                <button
                                    onClick={() => setQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/20 flex items-center justify-center hover:bg-white/30"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Results Count */}
                {debouncedQuery && (
                    <div className="mb-8 pb-4 border-b-2 border-border">
                        <p className="text-lg font-bold">
                            {results.length === 0 ? (
                                <>
                                    {lang === 'te'
                                        ? `"${debouncedQuery}" కోసం ఫలితాలు లేవు`
                                        : `No results for "${debouncedQuery}"`
                                    }
                                </>
                            ) : (
                                <>
                                    {lang === 'te'
                                        ? `"${debouncedQuery}" కోసం ${results.length} ఫలితాలు`
                                        : `${results.length} result${results.length !== 1 ? 's' : ''} for "${debouncedQuery}"`
                                    }
                                </>
                            )}
                        </p>
                    </div>
                )}

                {/* Empty State */}
                {!debouncedQuery && (
                    <div className="text-center py-16">
                        <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                        <p className="text-xl font-bold text-muted-foreground">
                            {lang === 'te'
                                ? 'వార్తలు, అంశాలు లేదా రచయితలను వెతకండి'
                                : 'Search for news, topics, or authors'
                            }
                        </p>
                    </div>
                )}

                {/* No Results */}
                {debouncedQuery && results.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 mx-auto bg-muted flex items-center justify-center mb-4">
                            <X className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <p className="text-lg text-muted-foreground mb-4">
                            {lang === 'te'
                                ? 'మీ శోధనకు సరిపోయే కథనాలు కనుగొనబడలేదు'
                                : 'No articles match your search'
                            }
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {lang === 'te'
                                ? 'వేరే పదాలతో ప్రయత్నించండి'
                                : 'Try different keywords or browse categories'
                            }
                        </p>
                    </div>
                )}

                {/* Results Grid */}
                <AnimatePresence mode="wait">
                    {results.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {results.map((article, index) => (
                                <StackedCard
                                    key={article.id}
                                    article={article}
                                    lang={lang}
                                    index={index}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
