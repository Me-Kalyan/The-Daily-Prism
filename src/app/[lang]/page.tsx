import HomePageClient from './HomePageClient';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'te' }];
}

interface LangPageProps {
    params: Promise<{ lang: string }>;
}

export default async function LangHomePage({ params }: LangPageProps) {
    const { lang } = await params;
    const typedLang = (lang === 'te' ? 'te' : 'en') as 'en' | 'te';

    return <HomePageClient lang={typedLang} />;
}
