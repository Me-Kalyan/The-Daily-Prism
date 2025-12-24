'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type VerdictType = 'true' | 'misleading' | 'false';

interface VerdictCardProps {
    id: string;
    slug: string;
    claim: string;
    claimTe: string;
    source: string;
    sourceTe: string;
    verdict: VerdictType;
    summary: string;
    summaryTe: string;
    image?: string;
    lang?: 'en' | 'te';
}

const verdictConfig = {
    true: {
        label: 'VERIFIED',
        labelTe: 'ధృవీకరించబడింది',
        borderColor: 'border-[#059669]',
        stampColor: 'text-[#059669]',
        bgColor: 'bg-[#059669]',
    },
    misleading: {
        label: 'CONTEXT MISSING',
        labelTe: 'సందర్భం లేదు',
        borderColor: 'border-[#D97706]',
        stampColor: 'text-[#D97706]',
        bgColor: 'bg-[#D97706]',
    },
    false: {
        label: 'DEBUNKED',
        labelTe: 'తిరస్కరించబడింది',
        borderColor: 'border-[#DC2626]',
        stampColor: 'text-[#DC2626]',
        bgColor: 'bg-[#DC2626]',
    },
};

// Sample data for demonstration
export const sampleFactChecks: VerdictCardProps[] = [
    {
        id: '1',
        slug: 'fact-check-economic-growth',
        claim: '"India\'s economy grew 12% last quarter"',
        claimTe: '"భారతదేశ ఆర్థిక వ్యవస్థ గత త్రైమాసికంలో 12% వృద్ధి చెందింది"',
        source: 'Viral WhatsApp Forward',
        sourceTe: 'వైరల్ వాట్సాప్ ఫార్వర్డ్',
        verdict: 'misleading',
        summary: 'The actual growth was 7.8%. The 12% figure refers to nominal GDP, not real GDP growth.',
        summaryTe: 'వాస్తవ వృద్ధి 7.8%. 12% గణాంకం నామీనల్ GDP ని సూచిస్తుంది, రియల్ GDP వృద్ధిని కాదు.',
    },
    {
        id: '2',
        slug: 'fact-check-new-policy',
        claim: '"Government to provide free laptops to all students"',
        claimTe: '"ప్రభుత్వం విద్యార్థులందరికీ ఉచిత ల్యాప్‌టాప్‌లు అందిస్తుంది"',
        source: 'Social Media Post',
        sourceTe: 'సోషల్ మీడియా పోస్ట్',
        verdict: 'false',
        summary: 'No such policy has been announced. The circulating message is a fabrication.',
        summaryTe: 'అలాంటి పాలసీ ప్రకటించబడలేదు. సర్క్యులేట్ అవుతున్న సందేశం కల్పితం.',
    },
    {
        id: '3',
        slug: 'fact-check-election-results',
        claim: '"Record voter turnout of 68% in state elections"',
        claimTe: '"రాష్ట్ర ఎన్నికల్లో 68% రికార్డు ఓటింగ్"',
        source: 'Election Commission',
        sourceTe: 'ఎన్నికల సంఘం',
        verdict: 'true',
        summary: 'Official EC data confirms 68.3% turnout, the highest in the state\'s history.',
        summaryTe: 'అధికారిక EC డేటా 68.3% ఓటింగ్‌ను ధృవీకరిస్తుంది, ఇది రాష్ట్ర చరిత్రలో అత్యధికం.',
    },
];

export default function VerdictCard({
    slug,
    claim,
    claimTe,
    source,
    sourceTe,
    verdict,
    summary,
    summaryTe,
    image,
    lang = 'en'
}: VerdictCardProps) {
    const config = verdictConfig[verdict];

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -4, boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)' }}
            className={`relative bg-card border-4 ${config.borderColor} shadow-hard overflow-hidden`}
        >
            <Link href={`/fact-check/${slug}`} className="block">
                {/* Optional Image */}
                {image && (
                    <div className="relative aspect-[2/1] border-b-4 border-inherit">
                        <Image
                            src={image}
                            alt={lang === 'te' ? claimTe : claim}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                {/* Content */}
                <div className="p-5 relative">
                    {/* Fact Check Label */}
                    <div className="flex items-center gap-2 mb-3">
                        <span className={`${config.bgColor} text-white text-xs font-black uppercase px-2 py-1`}>
                            {lang === 'te' ? 'వాస్తవ తనిఖీ' : 'Fact Check'}
                        </span>
                        <span className="text-xs text-muted-foreground font-medium">
                            {lang === 'te' ? sourceTe : source}
                        </span>
                    </div>

                    {/* The Claim */}
                    <blockquote className={`text-lg font-black leading-tight mb-4 ${lang === 'te' ? 'normal-case' : ''}`}>
                        {lang === 'te' ? claimTe : claim}
                    </blockquote>

                    {/* Summary */}
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {lang === 'te' ? summaryTe : summary}
                    </p>

                    {/* Read More */}
                    <div className="mt-4 pt-4 border-t-2 border-border">
                        <span className="text-xs font-black uppercase flex items-center gap-2 hover:underline">
                            {lang === 'te' ? 'పూర్తి విశ్లేషణ చదవండి' : 'Read Full Analysis'}
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </div>

                {/* THE STAMP - Rotated in corner */}
                <div className="absolute top-4 right-4 pointer-events-none">
                    <div
                        className={`${config.stampColor} transform rotate-12 opacity-90`}
                        style={{
                            fontFamily: "'Black Ops One', cursive",
                            fontSize: '1.5rem',
                            letterSpacing: '0.05em',
                            textShadow: '2px 2px 0px rgba(0,0,0,0.1)',
                            border: `3px solid currentColor`,
                            padding: '4px 12px',
                            borderRadius: '4px',
                        }}
                    >
                        {lang === 'te' ? config.labelTe : config.label}
                    </div>
                </div>

                {/* Corner Accent */}
                <div className={`absolute bottom-0 right-0 w-8 h-8 ${config.bgColor}`}>
                    <svg className="w-full h-full text-white p-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {verdict === 'true' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        )}
                        {verdict === 'misleading' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01" />
                        )}
                        {verdict === 'false' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        )}
                    </svg>
                </div>
            </Link>
        </motion.article>
    );
}
