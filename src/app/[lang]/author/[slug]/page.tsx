import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { featuredNews } from '@/lib/data/news';
import { Mail, Twitter, ArrowLeft } from 'lucide-react';
import { formatDate } from '@/lib/dateUtils';

// Mock function to find author data
function getAuthorData(slug: string) {
    const article = featuredNews.find(n => n.author.name.toLowerCase().replace(/\s+/g, '-') === slug);
    return article ? article.author : null;
}

export async function generateStaticParams() {
    const authorSlugs = new Set(
        featuredNews.map(n => n.author.name.toLowerCase().replace(/\s+/g, '-'))
    );

    const params: { lang: string; slug: string }[] = [];
    authorSlugs.forEach(slug => {
        params.push({ lang: 'en', slug });
        params.push({ lang: 'te', slug });
    });

    return params;
}

interface AuthorPageProps {
    params: Promise<{ lang: string; slug: string }>;
}

export default async function AuthorPage({ params }: AuthorPageProps) {
    const { lang, slug } = await params;
    const author = getAuthorData(slug);

    if (!author) return notFound();

    // Get all articles by this author
    const authorArticles = featuredNews.filter(
        n => n.author.name === author.name
    );

    return (
        <main className="min-h-screen pb-20 bg-background">
            {/* 1. The "ID Card" Header */}
            <div className="bg-muted border-b-2 border-black py-16 md:py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href={`/${lang}`}
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-sm font-bold uppercase"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {lang === 'te' ? 'హోమ్' : 'Home'}
                    </Link>

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        {/* Avatar */}
                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
                            <Image
                                src={author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&size=160`}
                                alt={author.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Bio Info */}
                        <div className="text-center md:text-left">
                            <h1
                                className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-2"
                                style={{ fontFamily: "'Archivo Black', sans-serif" }}
                            >
                                {lang === 'te' ? author.nameTe : author.name}
                            </h1>
                            <div className="inline-block bg-black text-white px-4 py-1 text-sm font-bold uppercase tracking-widest mb-4">
                                {lang === 'te' ? author.roleTe : author.role}
                            </div>
                            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                                {lang === 'te'
                                    ? 'రాజకీయాలు మరియు విధానాన్ని కవర్ చేసే సీనియర్ కరస్పాండెంట్. గతంలో ది హిందూ మరియు రాయిటర్స్‌లో పనిచేశారు.'
                                    : 'Senior correspondent covering politics and policy. Previously at The Hindu and Reuters. Based in New Delhi.'
                                }
                            </p>

                            <div className="mt-6 flex gap-3 justify-center md:justify-start">
                                <button className="px-5 py-2 border-2 border-black font-bold uppercase text-sm hover:bg-black hover:text-white transition-colors flex items-center gap-2">
                                    <Twitter className="w-4 h-4" />
                                    {lang === 'te' ? 'ఫాలో' : 'Follow'}
                                </button>
                                <button className="px-5 py-2 border-2 border-black font-bold uppercase text-sm hover:bg-black hover:text-white transition-colors flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    {lang === 'te' ? 'ఇమెయిల్' : 'Email'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. The Author's Work */}
            <div className="max-w-4xl mx-auto px-4 mt-12 md:mt-16">
                <h3 className="text-xl md:text-2xl font-black uppercase border-b-4 border-black pb-4 mb-8">
                    {lang === 'te'
                        ? `ఇటీవలి కథనాలు (${authorArticles.length})`
                        : `Recent Stories (${authorArticles.length})`
                    }
                </h3>

                <div className="grid gap-4">
                    {authorArticles.map(article => (
                        <Link
                            key={article.id}
                            href={`/${lang}/${article.category}/${lang === 'te' && article.slugTe ? article.slugTe : article.slug}`}
                            className="group block bg-card border-2 border-border hover:border-black p-5 md:p-6 transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2">
                                <h4
                                    className={`text-lg md:text-xl font-bold group-hover:underline decoration-2 underline-offset-4 ${lang === 'te' ? 'normal-case' : ''}`}
                                    style={{ fontFamily: lang === 'te' ? "'Ramabhadra', sans-serif" : "'Merriweather', serif" }}
                                >
                                    {lang === 'te' ? article.titleTe : article.title}
                                </h4>
                                <span className="text-muted-foreground font-mono text-xs shrink-0">
                                    {formatDate(article.publishedAt, lang as 'en' | 'te')}
                                </span>
                            </div>
                            <p className="text-muted-foreground mt-2 line-clamp-2">
                                {lang === 'te' ? article.excerptTe : article.excerpt}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
