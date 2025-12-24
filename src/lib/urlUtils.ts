// URL utilities for multilingual slugs

/**
 * Encode a slug for URL usage
 * For Telugu, use UTF-8 encoding for SEO-friendly URLs
 */
export function encodeSlug(slug: string, lang: 'en' | 'te'): string {
    if (lang === 'te') {
        // Telugu slugs should be URL-encoded UTF-8
        return encodeURIComponent(slug);
    }
    // English slugs are already URL-safe
    return slug;
}

/**
 * Decode a slug from URL
 */
export function decodeSlug(encodedSlug: string): string {
    try {
        return decodeURIComponent(encodedSlug);
    } catch {
        return encodedSlug;
    }
}

/**
 * Generate article URL for a given language
 */
export function getArticleUrl(
    category: string,
    slug: string,
    slugTe: string | undefined,
    lang: 'en' | 'te'
): string {
    const articleSlug = lang === 'te' && slugTe ? slugTe : slug;
    return `/${lang}/${category}/${encodeSlug(articleSlug, lang)}`;
}

/**
 * Generate category URL
 */
export function getCategoryUrl(category: string, lang: 'en' | 'te'): string {
    return `/${lang}/${category}`;
}

/**
 * Generate static params for all articles in both languages
 * This would typically fetch from a CMS/database
 */
export async function generateArticleParams() {
    // In production, fetch from your CMS
    const { featuredNews } = await import('./data/news');

    const params: { lang: string; category: string; slug: string }[] = [];

    for (const article of featuredNews) {
        // English version
        params.push({
            lang: 'en',
            category: article.category,
            slug: article.slug,
        });

        // Telugu version (using slugTe if available, otherwise English slug)
        params.push({
            lang: 'te',
            category: article.category,
            slug: article.slugTe || article.slug,
        });
    }

    return params;
}

/**
 * Find article by slug (works for both languages)
 */
export function findArticleBySlug(
    articles: Array<{ slug: string; slugTe?: string }>,
    slug: string,
    lang: 'en' | 'te'
) {
    const decodedSlug = decodeSlug(slug);

    return articles.find(article => {
        if (lang === 'te' && article.slugTe) {
            return article.slugTe === decodedSlug;
        }
        return article.slug === decodedSlug;
    });
}

/**
 * Get alternate language URL for lang switcher
 */
export function getAlternateUrl(
    currentUrl: string,
    currentLang: 'en' | 'te',
    article?: { slug: string; slugTe?: string }
): string {
    const newLang = currentLang === 'en' ? 'te' : 'en';

    if (article) {
        const category = currentUrl.split('/')[2];
        return getArticleUrl(
            category,
            article.slug,
            article.slugTe,
            newLang
        );
    }

    // For non-article pages, just swap the language
    return currentUrl.replace(`/${currentLang}/`, `/${newLang}/`);
}
