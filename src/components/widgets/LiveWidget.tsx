'use client';

import { motion } from 'framer-motion';
import { liveUpdates } from '@/lib/data/news';

interface LiveWidgetProps {
    lang?: 'en' | 'te';
}

export default function LiveWidget({ lang = 'en' }: LiveWidgetProps) {
    return (
        <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-card border-2 border-border shadow-hard p-5"
        >
            {/* Header */}
            <div className="flex items-center gap-2 mb-5 pb-4 border-b-2 border-border">
                <span className="w-3 h-3 bg-[#DC2626] animate-pulse-dot" />
                <h3 className="text-sm font-black uppercase tracking-wider">
                    {lang === 'te' ? 'లైవ్ అప్‌డేట్స్' : 'Live Updates'}
                </h3>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
                {liveUpdates.map((update, index) => (
                    <motion.div
                        key={update.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-6"
                    >
                        {/* Timeline line */}
                        {index !== liveUpdates.length - 1 && (
                            <div className="absolute left-[5px] top-4 w-0.5 h-full bg-border" />
                        )}

                        {/* Dot - Solid square for new items */}
                        <div className={`absolute left-0 top-1.5 w-3 h-3 ${update.isNew
                            ? 'bg-[#DC2626]'
                            : 'bg-muted border-2 border-border'
                            }`} />

                        {/* Content */}
                        <div>
                            <time className="text-xs font-bold uppercase text-muted-foreground">
                                {lang === 'te' ? update.timeTe : update.time}
                            </time>
                            <p className={`text-sm mt-1 font-medium ${lang === 'te' ? '' : ''}`}>
                                {lang === 'te' ? update.textTe : update.text}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* View All Link */}
            <a
                href={`/${lang}/live`}
                className="mt-5 inline-block text-sm font-black uppercase underline hover:no-underline"
            >
                {lang === 'te' ? 'అన్నీ చూడండి →' : 'View All →'}
            </a>
        </motion.aside>
    );
}
