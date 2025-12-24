import type { Metadata } from "next";
import "../globals.css";
import { OrganizationSchema, WebsiteSchema } from "@/components/seo/StructuredData";
import Footer from "@/components/layout/Footer";
import HeaderWrapper from "@/components/layout/HeaderWrapper";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dailyprism.com';

// Font configuration based on language
const fontConfig = {
    en: {
        heading: "'Archivo Black', sans-serif",
        body: "'Merriweather', Georgia, serif",
        ui: "'Public Sans', sans-serif",
    },
    te: {
        heading: "'Ramabhadra', sans-serif",
        body: "'Mandali', sans-serif",
        ui: "'Mandali', sans-serif",
    },
};

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'te' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;

    return {
        title: lang === 'te'
            ? 'ది డైలీ ప్రిజం | ఆధునిక ఎడిటోరియల్ న్యూస్'
            : 'The Daily Prism | Modern Editorial News',
        description: lang === 'te'
            ? 'బ్రేకింగ్ న్యూస్, లోతైన విశ్లేషణ మరియు ఎడిటోరియల్ కవరేజ్'
            : 'Breaking news, in-depth analysis, and editorial coverage',
    };
}

export default async function LangLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const fonts = fontConfig[lang as keyof typeof fontConfig] || fontConfig.en;
    const typedLang = (lang === 'te' ? 'te' : 'en') as 'en' | 'te';

    return (
        <div
            className={`min-h-screen ${lang === 'te' ? 'lang-te' : 'lang-en'}`}
            style={{
                '--font-heading': fonts.heading,
                '--font-body': fonts.body,
                '--font-ui': fonts.ui,
            } as React.CSSProperties}
        >
            {/* Schema for this language */}
            <OrganizationSchema url={siteUrl} />
            <WebsiteSchema
                url={`${siteUrl}/${lang}`}
                name={lang === 'te' ? 'ది డైలీ ప్రిజం' : 'The Daily Prism'}
                description={lang === 'te'
                    ? 'బ్రేకింగ్ న్యూస్, లోతైన విశ్లేషణ'
                    : 'Breaking news, in-depth analysis'
                }
            />

            {/* Global Header - appears on all pages */}
            <HeaderWrapper lang={typedLang} />

            {children}

            {/* Footer */}
            <Footer lang={typedLang} />
        </div>
    );
}
