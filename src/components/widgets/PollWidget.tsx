'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function PollWidget({ lang }: { lang: 'en' | 'te' }) {
    const [voted, setVoted] = useState(false);
    const [selected, setSelected] = useState<number | null>(null);

    const question = lang === 'te' ? "కొత్త విధానంపై మీ అభిప్రాయం?" : "Do you support the new policy?";
    const options = [
        { id: 1, label: "Strongly Support", labelTe: "పూర్తిగా మద్దతిస్తున్నాను", color: "bg-blue-600", percent: 45 },
        { id: 2, label: "Neutral", labelTe: "తటస్థం", color: "bg-gray-400", percent: 20 },
        { id: 3, label: "Oppose", labelTe: "వ్యతిరేకిస్తున్నాను", color: "bg-red-600", percent: 35 },
    ];

    return (
        <div className="border-2 border-black bg-card p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-black uppercase text-xl">
                    {lang === 'te' ? 'పోల్' : 'Poll'}
                </h3>
                <span className="text-xs font-mono text-muted-foreground">12,405 votes</span>
            </div>

            <p className="font-bold mb-6 text-lg leading-tight">{question}</p>

            <div className="space-y-3">
                {options.map((opt) => (
                    <button
                        key={opt.id}
                        disabled={voted}
                        onClick={() => { setSelected(opt.id); setVoted(true); }}
                        className="w-full relative h-12 border-2 border-black bg-card overflow-hidden group disabled:cursor-default"
                    >
                        {/* Result Bar Animation */}
                        {voted && (
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${opt.percent}%` }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                                className={`absolute inset-y-0 left-0 ${opt.color} opacity-20`}
                            />
                        )}

                        <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
                            <span className={`font-bold text-sm ${selected === opt.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {lang === 'te' ? opt.labelTe : opt.label}
                            </span>
                            {voted && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="font-black"
                                >
                                    {opt.percent}%
                                </motion.span>
                            )}
                        </div>

                        {/* Hover Effect (only if not voted) */}
                        {!voted && (
                            <div className={`absolute inset-0 ${opt.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
