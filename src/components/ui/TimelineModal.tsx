'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar } from 'lucide-react';

interface TimelineEvent {
    id: string;
    date: string;
    dateTe: string;
    time?: string;
    title?: string;
    titleTe?: string;
    summary: string;
    summaryTe: string;
    isLatest?: boolean;
}

interface TimelineModalProps {
    isOpen: boolean;
    onClose: () => void;
    events: TimelineEvent[];
    title: string;
    titleTe: string;
    lang: 'en' | 'te';
}

export default function TimelineModal({
    isOpen,
    onClose,
    events,
    title,
    titleTe,
    lang
}: TimelineModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed inset-4 md:inset-8 lg:inset-16 bg-background border-4 border-black dark:border-white z-50 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b-4 border-black dark:border-white bg-[#FACC15]">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-6 h-6" />
                                <h2 className="text-xl font-black uppercase">
                                    {lang === 'te' ? titleTe : title}
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Timeline Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="max-w-3xl mx-auto">
                                {/* Vertical Line */}
                                <div className="relative">
                                    <div className="absolute left-4 top-0 bottom-0 w-1 bg-black dark:bg-white" />

                                    {/* Events */}
                                    <div className="space-y-8">
                                        {events.map((event, index) => (
                                            <motion.div
                                                key={event.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="relative pl-12"
                                            >
                                                {/* Node */}
                                                <div
                                                    className={`absolute left-2 w-5 h-5 border-2 border-black dark:border-white ${event.isLatest ? 'bg-[#DC2626]' : 'bg-[#FACC15]'
                                                        }`}
                                                />

                                                {/* Content */}
                                                <div className="bg-card border-2 border-black dark:border-white shadow-hard p-4">
                                                    {/* Date & Time */}
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="font-mono text-xs font-bold bg-black text-white px-2 py-0.5">
                                                            {lang === 'te' ? event.dateTe : event.date}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground font-bold">
                                                            {event.time}
                                                        </span>
                                                        {event.isLatest && (
                                                            <span className="bg-[#DC2626] text-white text-xs font-black px-2 py-0.5 uppercase">
                                                                {lang === 'te' ? 'తాజా' : 'Latest'}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Title */}
                                                    <h3 className={`font-black text-lg mb-2 ${lang === 'te' ? 'normal-case' : 'uppercase'}`}>
                                                        {lang === 'te' ? event.titleTe : event.title}
                                                    </h3>

                                                    {/* Summary */}
                                                    <p className="text-sm text-muted-foreground">
                                                        {lang === 'te' ? event.summaryTe : event.summary}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t-2 border-black dark:border-white bg-muted/50">
                            <p className="text-center text-sm font-bold text-muted-foreground">
                                {lang === 'te'
                                    ? `${events.length} సంఘటనలు చూపిస్తోంది`
                                    : `Showing ${events.length} events`
                                }
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// Export a hook model for easy usage
export function useTimelineModal() {
    const [isOpen, setIsOpen] = useState(false);

    return {
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        toggle: () => setIsOpen(prev => !prev),
    };
}
