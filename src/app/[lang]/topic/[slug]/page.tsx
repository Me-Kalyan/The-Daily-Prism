import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Tag } from 'lucide-react';
import { featuredNews } from '@/lib/data/news';
import StackedCard from '@/components/news/StackedCard';

// Sample tags data
const topicInfo: Record<string, { name: string; nameTe: string }> = {
    'election-2025': { name: 'Election 2025', nameTe: 'ఎన్నికలు 2025' },
    'budget': { name: 'Union Budget', nameTe: 'కేంద్ర బడ్జెట్' },
    'sensex': { name: 'Sensex', nameTe: 'సెన్సెక్స్' },
    'ai': { name: 'Artificial Intelligence', nameTe: 'కృత్రిమ మేధస్సు' },
    'parliament': { name: 'Parliament', nameTe: 'పార్లమెంట్' },
    'education': { name: 'Education', nameTe: 'విద్య' },
    'climate': { name: 'Climate Change', nameTe: 'వాతావరణ మార్పు' },
};

export async function generateStaticParams() {
    const params: { lang: string; slug: string }[] = [];

    for (const slug of Object.keys(topicInfo)) {
        params.push({ lang: 'en', slug });
        params.push({ lang: 'te', slug });
    }

    return params;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;
    const info = topicInfo[slug];

    if (!info) {
        return { title: 'Topic Not Found' };
    }

    return {
        title: `${lang === 'te' ? info.nameTe : info.name} - ${lang === 'te' ? 'అంశం' : 'Topic'}`,
        description: `${lang === 'te' ? 'కథనాలు' : 'Articles about'} ${lang === 'te' ? info.nameTe : info.name}`,
    };
}

interface TopicPageProps {
    params: Promise<{ lang: string; slug: string }>;
}

export default async function TopicPage({ params }: TopicPageProps) {
    const { lang, slug } = await params;
    const typedLang = (lang === 'te' ? 'te' : 'en') as 'en' | 'te';

    const info = topicInfo[slug];

    // For demo, show all articles (in production, filter by actual tag)
    const taggedArticles = featuredNews;

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="bg-muted border-b-4 border-black">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    {/* Back Link */}
                    <Link
                        href={`/${lang}`}
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 text-sm font-bold uppercase"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {lang === 'te' ? 'హోమ్' : 'Home'}
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-black text-white flex items-center justify-center">
                            <Tag className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-sm font-black uppercase text-muted-foreground mb-1">
                                {typedLang === 'te' ? 'అంశం' : 'Topic'}
                            </p>
                            <h1
                                className={`text-3xl md:text-4xl font-black ${typedLang === 'te' ? 'normal-case' : 'uppercase'}`}
                            >
                                {info ? (typedLang === 'te' ? info.nameTe : info.name) : slug}
                            </h1>
                        </div>
                    </div>

                    <div className="mt-6">
                        <span className="bg-black text-white px-4 py-2 text-sm font-black">
                            {taggedArticles.length} {typedLang === 'te' ? 'కథనాలు' : 'Stories'}
                        </span>
                    </div>
                </div>
            </header>

            {/* Articles Grid */}
            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {taggedArticles.map((article, index) => (
                        <StackedCard
                            key={article.id}
                            article={article}
                            lang={typedLang}
                            index={index}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}
