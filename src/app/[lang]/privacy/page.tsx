import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'te' }];
}

interface PrivacyPageProps {
    params: Promise<{ lang: string }>;
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
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
                        {typedLang === 'te' ? 'గోప్యతా విధానం' : 'Privacy Policy'}
                    </h1>
                    <p className="mt-4 text-white/60 font-mono text-sm">
                        {typedLang === 'te' ? 'చివరిసారి నవీకరించబడింది: డిసెంబర్ 2024' : 'Last updated: December 2024'}
                    </p>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-12">
                <div
                    className="prose prose-lg max-w-none"
                    style={{ fontFamily: typedLang === 'te' ? "'Mandali', sans-serif" : "'Merriweather', serif" }}
                >
                    <section className="mb-12">
                        <h2 className="text-xl font-black uppercase mb-4">
                            {typedLang === 'te' ? 'సమాచార సేకరణ' : 'Information We Collect'}
                        </h2>
                        <p className="mb-4">
                            {typedLang === 'te'
                                ? 'మేము మీ అనుభవాన్ని మెరుగుపరచడానికి సమాచారాన్ని సేకరిస్తాము. ఇందులో మీరు మా న్యూస్‌లెటర్‌కు చేరినప్పుడు అందించే ఇమెయిల్ చిరునామాలు ఉన్నాయి.'
                                : 'We collect information to improve your experience. This includes email addresses you provide when subscribing to our newsletter, browsing data to personalize content, and cookies for site functionality.'
                            }
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-xl font-black uppercase mb-4">
                            {typedLang === 'te' ? 'మేము డేటాను ఎలా ఉపయోగిస్తాము' : 'How We Use Your Data'}
                        </h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>{typedLang === 'te' ? 'న్యూస్‌లెటర్‌లు పంపడానికి' : 'To send newsletters and updates'}</li>
                            <li>{typedLang === 'te' ? 'సైట్ అనుభవాన్ని వ్యక్తిగతీకరించడానికి' : 'To personalize your site experience'}</li>
                            <li>{typedLang === 'te' ? 'సైట్ పనితీరును మెరుగుపరచడానికి' : 'To improve site performance'}</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-xl font-black uppercase mb-4">
                            {typedLang === 'te' ? 'కుకీలు' : 'Cookies'}
                        </h2>
                        <p>
                            {typedLang === 'te'
                                ? 'మేము సైట్ కార్యాచరణ కోసం అవసరమైన కుకీలను ఉపయోగిస్తాము. మీరు మీ బ్రౌజర్ సెట్టింగ్‌లలో కుకీలను నిర్వహించవచ్చు.'
                                : 'We use cookies essential for site functionality, analytics to understand our audience, and preferences to remember your settings. You can manage cookies in your browser settings.'
                            }
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-xl font-black uppercase mb-4">
                            {typedLang === 'te' ? 'మిమ్మల్ని సంప్రదించండి' : 'Contact Us'}
                        </h2>
                        <p>
                            {typedLang === 'te'
                                ? 'గోప్యత సంబంధిత ప్రశ్నల కోసం, దయచేసి మమ్మల్ని సంప్రదించండి:'
                                : 'For privacy-related questions, please contact us at:'
                            }
                        </p>
                        <p className="font-bold mt-2">privacy@dailyprism.com</p>
                    </section>
                </div>
            </main>
        </div>
    );
}
