import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { featuredNews, factChecks } from '@/lib/data/news';
import { decodeSlug } from '@/lib/urlUtils';
import ArticleReader from '@/components/article/ArticleReader';
import FactCheckLayout from '@/components/article/FactCheckLayout';
import { ArticleSchema, BreadcrumbSchema } from '@/components/seo/StructuredData';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dailyprism.com';

interface ArticlePageProps {
    params: Promise<{
        lang: string;
        category: string;
        slug: string;
    }>;
}

// Generate static params for all articles
export async function generateStaticParams() {
    const params: { lang: string; category: string; slug: string }[] = [];

    // Regular articles
    for (const article of featuredNews) {
        // English version
        params.push({
            lang: 'en',
            category: article.category,
            slug: article.slug,
        });

        // Telugu version
        params.push({
            lang: 'te',
            category: article.category,
            slug: article.slugTe || article.slug,
        });
    }

    // Fact check articles
    for (const factCheck of factChecks) {
        params.push({ lang: 'en', category: 'fact-check', slug: factCheck.slug });
        params.push({ lang: 'te', category: 'fact-check', slug: factCheck.slug });
    }

    return params;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
    const { lang, category, slug } = await params;
    const decodedSlug = decodeSlug(slug);

    // Check if it's a fact-check article
    if (category === 'fact-check') {
        const factCheck = factChecks.find(fc => fc.slug === decodedSlug);
        if (factCheck) {
            const title = lang === 'te' ? factCheck.claimTe : factCheck.claim;
            const description = lang === 'te' ? factCheck.summaryTe : factCheck.summary;
            return { title: `Fact Check: ${title}`, description };
        }
    }

    const article = featuredNews.find(a => {
        if (lang === 'te' && a.slugTe) {
            return a.slugTe === decodedSlug;
        }
        return a.slug === decodedSlug;
    });

    if (!article) {
        return { title: 'Article Not Found' };
    }

    const title = lang === 'te' ? article.titleTe : article.title;
    const description = lang === 'te' ? article.excerptTe : article.excerpt;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            publishedTime: article.publishedAt,
            authors: [lang === 'te' ? article.author.nameTe : article.author.name],
            images: [article.image],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [article.image],
        },
    };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { lang, category, slug } = await params;
    const decodedSlug = decodeSlug(slug);
    const typedLang = lang as 'en' | 'te';

    // FACT CHECK MODE: If category is 'fact-check', use FactCheckLayout
    if (category === 'fact-check') {
        const factCheck = factChecks.find(fc => fc.slug === decodedSlug);

        if (!factCheck) {
            notFound();
        }

        // Convert fact check to the format FactCheckLayout expects
        const factCheckArticle = {
            id: factCheck.id,
            slug: factCheck.slug,
            claim: factCheck.claim,
            claimTe: factCheck.claimTe,
            source: factCheck.source,
            sourceTe: factCheck.sourceTe,
            verdict: factCheck.verdict,
            summary: factCheck.summary,
            summaryTe: factCheck.summaryTe,
            author: {
                name: 'Fact Check Desk',
                nameTe: 'వాస్తవ తనిఖీ డెస్క్',
                avatar: 'https://ui-avatars.com/api/?name=FC&background=DC2626&color=fff&size=100',
                role: 'Verification Team',
                roleTe: 'ధృవీకరణ బృందం',
            },
            publishedAt: new Date().toISOString(),
            readTime: 3,
        };

        return <FactCheckLayout article={factCheckArticle} lang={typedLang} />;
    }

    // STANDARD ARTICLE MODE
    const article = featuredNews.find(a => {
        if (lang === 'te' && a.slugTe) {
            return a.slugTe === decodedSlug;
        }
        return a.slug === decodedSlug;
    });

    if (!article || article.category !== category) {
        notFound();
    }

    // Get related articles (same category, different article)
    const relatedArticles = featuredNews
        .filter(a => a.category === category && a.id !== article.id)
        .slice(0, 3);

    // Get trending articles
    const trendingArticles = featuredNews
        .filter(a => a.id !== article.id)
        .slice(0, 5);

    return (
        <>
            {/* Structured Data */}
            <ArticleSchema article={article} url={siteUrl} lang={typedLang} />
            <BreadcrumbSchema
                url={siteUrl}
                items={[
                    { name: lang === 'te' ? 'హోమ్' : 'Home', url: `/${lang}` },
                    { name: lang === 'te' ? article.categoryLabelTe : article.categoryLabel, url: `/${lang}/${category}` },
                    { name: lang === 'te' ? article.titleTe : article.title, url: `/${lang}/${category}/${slug}` },
                ]}
            />

            {/* Article Reader Component */}
            <ArticleReader
                article={article}
                relatedArticles={relatedArticles}
                trendingArticles={trendingArticles}
                lang={typedLang}
            />
        </>
    );
}

