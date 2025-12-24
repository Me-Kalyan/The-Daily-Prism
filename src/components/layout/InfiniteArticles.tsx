'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { NewsArticle } from '@/lib/data/news';
import { getArticleUrl } from '@/lib/urlUtils';

interface InfiniteArticlesProps {
    initialArticles: NewsArticle[];
    loadMore: () => Promise<NewsArticle[]>;
    renderArticle: (article: NewsArticle, index: number) => React.ReactNode;
    lang?: 'en' | 'te';
}

export default function InfiniteArticles({
    initialArticles,
    loadMore,
    renderArticle,
    lang = 'en'
}: InfiniteArticlesProps) {
    const [articles, setArticles] = useState<NewsArticle[]>(initialArticles);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadingRef = useRef<HTMLDivElement>(null);
    const articleRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    // Update URL when article comes into view
    const updateUrlForArticle = useCallback((article: NewsArticle) => {
        const newUrl = getArticleUrl(article.category, article.slug, article.slugTe, lang);
        const title = lang === 'te' ? article.titleTe : article.title;

        // Only update if different from current URL
        if (window.location.pathname !== newUrl) {
            window.history.pushState(
                { articleId: article.id, slug: article.slug },
                title,
                newUrl
            );

            // Update document title
            document.title = `${title} | The Daily Prism`;
        }
    }, [lang]);

    // Observe articles for URL updates
    useEffect(() => {
        const urlObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                        const articleId = entry.target.getAttribute('data-article-id');
                        const article = articles.find(a => a.id === articleId);
                        if (article) {
                            updateUrlForArticle(article);
                        }
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.5, // Trigger when 50% visible
            }
        );

        // Observe all article elements
        articleRefs.current.forEach((ref) => {
            urlObserver.observe(ref);
        });

        return () => {
            urlObserver.disconnect();
        };
    }, [articles, updateUrlForArticle]);

    // Handle browser back/forward
    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            if (event.state?.slug) {
                const article = articles.find(a => a.slug === event.state.slug);
                if (article) {
                    const ref = articleRefs.current.get(article.id);
                    if (ref) {
                        ref.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [articles]);

    // Load more articles when reaching bottom
    useEffect(() => {
        if (!hasMore) return;

        observerRef.current = new IntersectionObserver(
            async (entries) => {
                if (entries[0].isIntersecting && !isLoading && hasMore) {
                    setIsLoading(true);
                    try {
                        const newArticles = await loadMore();
                        if (newArticles.length === 0) {
                            setHasMore(false);
                        } else {
                            setArticles(prev => [...prev, ...newArticles]);
                        }
                    } catch (error) {
                        console.error('Failed to load more articles:', error);
                    } finally {
                        setIsLoading(false);
                    }
                }
            },
            { threshold: 0.1 }
        );

        if (loadingRef.current) {
            observerRef.current.observe(loadingRef.current);
        }

        return () => {
            observerRef.current?.disconnect();
        };
    }, [isLoading, hasMore, loadMore]);

    const setArticleRef = useCallback((id: string) => (el: HTMLDivElement | null) => {
        if (el) {
            articleRefs.current.set(id, el);
        } else {
            articleRefs.current.delete(id);
        }
    }, []);

    return (
        <div className="space-y-8">
            {articles.map((article, index) => (
                <div
                    key={article.id}
                    ref={setArticleRef(article.id)}
                    data-article-id={article.id}
                    className="article-container"
                >
                    {renderArticle(article, index)}

                    {/* Separator between articles */}
                    {index < articles.length - 1 && (
                        <div className="my-12 border-t-4 border-black dark:border-white opacity-20" />
                    )}
                </div>
            ))}

            {/* Loading indicator */}
            <div ref={loadingRef} className="py-8">
                {isLoading && (
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-black dark:bg-white animate-pulse" />
                        <div className="w-2 h-2 bg-black dark:bg-white animate-pulse delay-75" />
                        <div className="w-2 h-2 bg-black dark:bg-white animate-pulse delay-150" />
                        <span className="text-sm font-bold uppercase ml-2">
                            {lang === 'te' ? 'లోడ్ అవుతోంది...' : 'Loading...'}
                        </span>
                    </div>
                )}

                {!hasMore && articles.length > 1 && (
                    <p className="text-center text-muted-foreground text-sm font-bold uppercase">
                        {lang === 'te' ? 'అన్ని కథనాలు లోడ్ అయ్యాయి' : 'All articles loaded'}
                    </p>
                )}
            </div>
        </div>
    );
}

// Hook for using infinite scroll with URL updates
export function useInfiniteScroll(
    containerRef: React.RefObject<HTMLElement | null>,
    callback: () => void,
    options = { threshold: 0.1 }
) {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    callback();
                }
            },
            options
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [containerRef, callback, options]);
}

// Hook for updating URL based on scroll position
export function useScrollUrlUpdate(
    articles: NewsArticle[],
    lang: 'en' | 'te' = 'en'
) {
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            for (const article of articles) {
                const element = document.querySelector(`[data-article-id="${article.id}"]`);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const elementTop = rect.top + window.scrollY;
                    const elementBottom = elementTop + rect.height;

                    if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
                        const newUrl = getArticleUrl(article.category, article.slug, article.slugTe, lang);
                        if (window.location.pathname !== newUrl) {
                            const title = lang === 'te' ? article.titleTe : article.title;
                            window.history.replaceState(
                                { articleId: article.id },
                                title,
                                newUrl
                            );
                            document.title = `${title} | The Daily Prism`;
                        }
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [articles, lang]);
}
