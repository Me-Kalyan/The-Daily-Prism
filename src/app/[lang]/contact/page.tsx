import ContactPageClient from './ContactPageClient';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'te' }];
}

interface ContactPageProps {
    params: Promise<{ lang: string }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
    const { lang } = await params;
    const typedLang = (lang === 'te' ? 'te' : 'en') as 'en' | 'te';

    return <ContactPageClient lang={typedLang} />;
}
