'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import TimelineModal from '@/components/ui/TimelineModal';

interface TimelineEvent {
    id: string;
    date: string;
    dateTe: string;
    time?: string;
    title?: string;
    titleTe?: string;
    summary: string;
    summaryTe: string;
    isToday?: boolean;
    isLatest?: boolean;
}

interface StoryTimelineProps {
    title?: string;
    titleTe?: string;
    events: TimelineEvent[];
    lang?: 'en' | 'te';
}

// Extended sample data for the modal
const fullTimelineEvents: TimelineEvent[] = [
    {
        id: '1',
        date: 'Oct 20',
        dateTe: 'అక్టో 20',
        time: '10:00 AM',
        title: 'Bill Introduction',
        titleTe: 'బిల్లు పరిచయం',
        summary: 'Bill introduced in Parliament by Finance Minister',
        summaryTe: 'ఆర్థిక మంత్రి పార్లమెంట్‌లో బిల్లు ప్రవేశపెట్టారు',
    },
    {
        id: '2',
        date: 'Oct 25',
        dateTe: 'అక్టో 25',
        time: '2:00 PM',
        title: 'Committee Review',
        titleTe: 'కమిటీ సమీక్ష',
        summary: 'Standing Committee begins review',
        summaryTe: 'స్టాండింగ్ కమిటీ సమీక్ష ప్రారంభం',
    },
    {
        id: '3',
        date: 'Nov 5',
        dateTe: 'నవం 5',
        time: '11:30 AM',
        title: 'Lower House Vote',
        titleTe: 'లోక్‌సభ ఓటింగ్',
        summary: 'Passed in Lower House with amendments',
        summaryTe: 'సవరణలతో లోక్‌సభలో ఆమోదం',
    },
    {
        id: '4',
        date: 'Nov 18',
        dateTe: 'నవం 18',
        time: '3:00 PM',
        title: 'Upper House Debate',
        titleTe: 'రాజ్యసభ చర్చ',
        summary: 'Upper House debate begins',
        summaryTe: 'ఎగువ సభలో చర్చ ప్రారంభం',
    },
    {
        id: '5',
        date: 'Dec 2',
        dateTe: 'డిసెం 2',
        time: '4:00 PM',
        title: 'Upper House Vote',
        titleTe: 'రాజ్యసభ ఓటింగ్',
        summary: 'Passed in Upper House unanimously',
        summaryTe: 'ఏకగ్రీవంగా రాజ్యసభలో ఆమోదం',
    },
    {
        id: '6',
        date: 'Today',
        dateTe: 'ఈరోజు',
        time: '6:00 PM',
        title: 'Signed into Law',
        titleTe: 'చట్టంగా సంతకం',
        summary: 'Signed into Law by President',
        summaryTe: 'రాష్ట్రపతి చేత చట్టంగా సంతకం',
        isToday: true,
        isLatest: true,
    },
];

// Sample data for sidebar (abbreviated)
export const sampleTimelineEvents: TimelineEvent[] = fullTimelineEvents.slice(-5);

export default function StoryTimeline({
    title = 'The Story So Far',
    titleTe = 'కథ ఇప్పటివరకు',
    events,
    lang = 'en'
}: StoryTimelineProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="bg-card border-2 border-border shadow-hard"
            >
                {/* Header */}
                <div className="p-4 border-b-2 border-border bg-foreground text-background">
                    <h3 className={`text-sm font-black uppercase tracking-wider ${lang === 'te' ? 'normal-case' : ''}`}>
                        {lang === 'te' ? titleTe : title}
                    </h3>
                </div>

                {/* Timeline */}
                <div className="p-5">
                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-[23px] top-0 bottom-0 w-1 bg-black dark:bg-white" />

                        {/* Events */}
                        <div className="space-y-6">
                            {events.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.3 }}
                                    className="relative flex gap-4"
                                >
                                    {/* Square Timestamp Node */}
                                    <div
                                        className={`relative z-10 flex-shrink-0 px-2 py-1 text-xs font-black ${event.isToday
                                            ? 'bg-[#DC2626] text-white'
                                            : 'bg-black dark:bg-white text-white dark:text-black'
                                            }`}
                                    >
                                        {lang === 'te' ? event.dateTe : event.date}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 pt-0.5">
                                        <p className={`text-sm font-medium leading-snug ${event.isToday ? 'font-bold' : ''
                                            } ${lang === 'te' ? '' : ''}`}>
                                            {lang === 'te' ? event.summaryTe : event.summary}
                                        </p>
                                    </div>

                                    {/* "Latest" indicator for today */}
                                    {event.isToday && (
                                        <div className="flex-shrink-0">
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#DC2626] text-white text-xs font-black uppercase">
                                                <span className="w-1.5 h-1.5 bg-white animate-pulse-dot" />
                                                {lang === 'te' ? 'తాజా' : 'Latest'}
                                            </span>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Link - Opens Modal */}
                <div className="px-5 pb-5">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 text-xs font-black uppercase hover:underline"
                    >
                        {lang === 'te' ? 'పూర్తి టైమ్‌లైన్ చూడండి' : 'View Full Timeline'}
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </motion.div>

            {/* Timeline Modal */}
            <TimelineModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                events={fullTimelineEvents}
                title={title}
                titleTe={titleTe}
                lang={lang}
            />
        </>
    );
}

