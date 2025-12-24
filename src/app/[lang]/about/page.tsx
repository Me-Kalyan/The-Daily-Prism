import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { authors } from '@/lib/data/news';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'te' }];
}

interface AboutPageProps {
    params: Promise<{ lang: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
    const { lang } = await params;
    const typedLang = lang as 'en' | 'te';

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="bg-black text-white py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <Link
                        href={`/${lang}`}
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 text-sm font-bold uppercase"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {typedLang === 'te' ? 'హోమ్' : 'Home'}
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-black uppercase">
                        {typedLang === 'te' ? 'మా గురించి' : 'About Us'}
                    </h1>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-12">
                {/* Mission */}
                <section className="mb-16">
                    <h2 className="text-2xl font-black uppercase mb-6 pb-2 border-b-4 border-[#FACC15] inline-block">
                        {typedLang === 'te' ? 'మా మిషన్' : 'Our Mission'}
                    </h2>
                    <p className="text-lg leading-relaxed" style={{ fontFamily: typedLang === 'te' ? "'Mandali', sans-serif" : "'Merriweather', serif" }}>
                        {typedLang === 'te'
                            ? 'ది డైలీ ప్రిజం ఆధునిక భారతీయులకు నాణ్యమైన జర్నలిజం అందించడానికి అంకితం చేయబడింది. మేము ఇంగ్లీష్ మరియు తెలుగులో బ్రేకింగ్ న్యూస్, లోతైన విశ్లేషణ మరియు ఎడిటోరియల్ కవరేజ్ అందిస్తాము.'
                            : 'The Daily Prism is dedicated to delivering quality journalism to modern Indians. We provide breaking news, in-depth analysis, and editorial coverage in both English and Telugu, bridging the gap between national and regional reporting.'
                        }
                    </p>
                </section>

                {/* Values */}
                <section className="mb-16">
                    <h2 className="text-2xl font-black uppercase mb-6 pb-2 border-b-4 border-[#2563EB] inline-block">
                        {typedLang === 'te' ? 'మా విలువలు' : 'Our Values'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: 'Truth', titleTe: 'నిజం', desc: 'Factual, verified reporting', descTe: 'వాస్తవ, ధృవీకరించబడిన రిపోర్టింగ్' },
                            { title: 'Balance', titleTe: 'సమతుల్యత', desc: 'All perspectives represented', descTe: 'అన్ని దృక్కోణాలు ప్రాతినిధ్యం' },
                            { title: 'Accessibility', titleTe: 'అందుబాటు', desc: 'News in your language', descTe: 'మీ భాషలో వార్తలు' },
                        ].map((value) => (
                            <div key={value.title} className="p-6 border-2 border-black shadow-hard">
                                <h3 className="text-xl font-black uppercase mb-2">
                                    {typedLang === 'te' ? value.titleTe : value.title}
                                </h3>
                                <p className="text-muted-foreground">
                                    {typedLang === 'te' ? value.descTe : value.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Team */}
                <section>
                    <h2 className="text-2xl font-black uppercase mb-6 pb-2 border-b-4 border-[#DC2626] inline-block">
                        {typedLang === 'te' ? 'మా బృందం' : 'Our Team'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {authors.map((author) => (
                            <Link
                                key={author.name}
                                href={`/${lang}/author/${author.name.toLowerCase().replace(/\s+/g, '-')}`}
                                className="group p-6 border-2 border-black shadow-hard hover:shadow-hard-lg transition-shadow"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <Image
                                        src={author.avatar}
                                        alt={typedLang === 'te' ? author.nameTe : author.name}
                                        width={60}
                                        height={60}
                                        className="border-2 border-black"
                                    />
                                    <div>
                                        <h3 className="font-black group-hover:underline">
                                            {typedLang === 'te' ? author.nameTe : author.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {typedLang === 'te' ? author.roleTe : author.role}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
