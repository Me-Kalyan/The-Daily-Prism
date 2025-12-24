import { NewsArticle } from '@/lib/data/news';

interface ArticleSchemaProps {
    article: NewsArticle;
    url: string;
    lang?: 'en' | 'te';
}

interface WebsiteSchemaProps {
    url: string;
    name: string;
    description: string;
}

interface BreadcrumbItem {
    name: string;
    url: string;
}

// NewsArticle Schema with Speakable
export function ArticleSchema({ article, url, lang = 'en' }: ArticleSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: lang === 'te' ? article.titleTe : article.title,
        description: lang === 'te' ? article.excerptTe : article.excerpt,
        image: [
            article.image,
        ],
        datePublished: article.publishedAt,
        dateModified: article.publishedAt, // Use publishedAt as fallback
        author: {
            '@type': 'Person',
            name: lang === 'te' ? article.author.nameTe : article.author.name,
            url: `${url}/author/${article.slug}`, // Use slug instead of missing id
        },
        publisher: {
            '@type': 'Organization',
            name: 'The Daily Prism',
            logo: {
                '@type': 'ImageObject',
                url: `${url}/logo.png`,
                width: 600,
                height: 60,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${url}/article/${article.slug}`,
        },
        articleSection: article.categoryLabel,
        inLanguage: lang === 'te' ? 'te-IN' : 'en-US',
        // Speakable schema for TTS feature
        speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['.article-headline', '.article-summary'],
        },
        // Additional SEO fields
        keywords: article.categoryLabel,
        wordCount: article.excerpt.split(' ').length * 10, // Estimated
        isAccessibleForFree: true,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Organization Schema
export function OrganizationSchema({ url }: { url: string }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'NewsMediaOrganization',
        name: 'The Daily Prism',
        alternateName: 'Daily Prism',
        url: url,
        logo: {
            '@type': 'ImageObject',
            url: `${url}/logo.png`,
            width: 600,
            height: 60,
        },
        sameAs: [
            'https://twitter.com/dailyprism',
            'https://facebook.com/dailyprism',
            'https://instagram.com/dailyprism',
            'https://youtube.com/dailyprism',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            email: 'contact@dailyprism.com',
            availableLanguage: ['English', 'Telugu'],
        },
        foundingDate: '2024',
        description: 'The Daily Prism - Modern editorial news platform delivering breaking news and in-depth analysis in English and Telugu.',
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Website Schema for homepage
export function WebsiteSchema({ url, name, description }: WebsiteSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: name,
        url: url,
        description: description,
        inLanguage: ['en-US', 'te-IN'],
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${url}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
        publisher: {
            '@type': 'Organization',
            name: 'The Daily Prism',
            logo: {
                '@type': 'ImageObject',
                url: `${url}/logo.png`,
            },
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Breadcrumb Schema
export function BreadcrumbSchema({ items, url }: { items: BreadcrumbItem[]; url: string }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url.startsWith('http') ? item.url : `${url}${item.url}`,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// FAQ Schema for fact-check articles
export function FAQSchema({ questions }: { questions: { question: string; answer: string }[] }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: questions.map((q) => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: q.answer,
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Live Blog Schema
export function LiveBlogSchema({
    title,
    description,
    url,
    coverageStartTime,
    coverageEndTime,
    updates,
}: {
    title: string;
    description: string;
    url: string;
    coverageStartTime: string;
    coverageEndTime?: string;
    updates: { time: string; headline: string; text: string }[];
}) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'LiveBlogPosting',
        headline: title,
        description: description,
        url: url,
        coverageStartTime: coverageStartTime,
        coverageEndTime: coverageEndTime,
        liveBlogUpdate: updates.map((update, index) => ({
            '@type': 'BlogPosting',
            headline: update.headline,
            articleBody: update.text,
            datePublished: update.time,
            position: index + 1,
        })),
        publisher: {
            '@type': 'Organization',
            name: 'The Daily Prism',
            logo: {
                '@type': 'ImageObject',
                url: `${url}/logo.png`,
            },
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Video Schema
export function VideoSchema({
    title,
    description,
    thumbnailUrl,
    uploadDate,
    duration,
    embedUrl,
}: {
    title: string;
    description: string;
    thumbnailUrl: string;
    uploadDate: string;
    duration: string; // ISO 8601 format, e.g., "PT4M20S"
    embedUrl: string;
}) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: title,
        description: description,
        thumbnailUrl: thumbnailUrl,
        uploadDate: uploadDate,
        duration: duration,
        embedUrl: embedUrl,
        publisher: {
            '@type': 'Organization',
            name: 'The Daily Prism',
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
