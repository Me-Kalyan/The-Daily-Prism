'use client';

import { motion } from 'framer-motion';
import { tickerItems } from '@/lib/data/news';

interface TickerTapeProps {
    lang?: 'en' | 'te';
}

export default function TickerTape({ lang = 'en' }: TickerTapeProps) {
    const items = [...tickerItems, ...tickerItems];

    return (
        <div className="w-full bg-[#DC2626] border-b-2 border-black overflow-hidden">
            <div className="relative flex">
                <motion.div
                    className="flex whitespace-nowrap py-2"
                    animate={{ x: '-50%' }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: 'loop',
                            duration: 25,
                            ease: 'linear',
                        },
                    }}
                >
                    {items.map((item, index) => (
                        <span
                            key={`${item.id}-${index}`}
                            className="inline-flex items-center px-8 text-sm font-bold text-white uppercase tracking-wide"
                        >
                            <span className="w-2 h-2 bg-white mr-3 animate-pulse-dot" />
                            {lang === 'te' ? item.textTe : item.text}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
