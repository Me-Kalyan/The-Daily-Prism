'use client';

import { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { poll as pollData, Poll, PollOption } from '@/lib/data/news';

interface CardstockPollProps {
    lang?: 'en' | 'te';
}

interface AnimatedCounterProps {
    value: number;
}

function AnimatedCounter({ value }: AnimatedCounterProps) {
    const spring = useSpring(0, { stiffness: 100, damping: 20 });
    const display = useTransform(spring, (current) => `${Math.round(current)}%`);

    useEffect(() => {
        spring.set(value);
    }, [spring, value]);

    return <motion.span>{display}</motion.span>;
}

export default function CardstockPoll({ lang = 'en' }: CardstockPollProps) {
    const [poll, setPoll] = useState<Poll>(pollData);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [hasVoted, setHasVoted] = useState(false);

    useEffect(() => {
        const storedVote = localStorage.getItem(`poll-${poll.id}`);
        if (storedVote) {
            queueMicrotask(() => {
                setSelectedOption(storedVote);
                setHasVoted(true);
            });
        }
    }, [poll.id]);

    const handleVote = (optionId: string) => {
        if (hasVoted) return;

        const updatedOptions = poll.options.map((opt) =>
            opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
        );

        setPoll({
            ...poll,
            options: updatedOptions,
            totalVotes: poll.totalVotes + 1,
        });

        setSelectedOption(optionId);
        setHasVoted(true);
        localStorage.setItem(`poll-${poll.id}`, optionId);
    };

    const getPercentage = (option: PollOption) => {
        return Math.round((option.votes / poll.totalVotes) * 100);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="bg-card border-2 border-border shadow-hard"
        >
            {/* Header */}
            <div className="p-5 border-b-2 border-border">
                <h3 className="text-sm font-black uppercase tracking-wider">
                    {lang === 'te' ? 'పోల్' : 'Poll'}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                    {poll.totalVotes.toLocaleString()} {lang === 'te' ? 'ఓట్లు' : 'votes'}
                </p>
            </div>

            {/* Question */}
            <div className="p-5">
                <h4 className={`text-lg font-black uppercase mb-6 ${lang === 'te' ? 'normal-case' : ''}`}>
                    {lang === 'te' ? poll.questionTe : poll.question}
                </h4>

                {/* Options */}
                <div className="space-y-4">
                    {poll.options.map((option, index) => {
                        const percentage = getPercentage(option);
                        const isSelected = selectedOption === option.id;

                        // Assign category colors to options
                        const optionColors = ['#2563EB', '#059669', '#D97706', '#DC2626'];

                        return (
                            <motion.button
                                key={option.id}
                                onClick={() => handleVote(option.id)}
                                disabled={hasVoted}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={!hasVoted ? { x: 4 } : {}}
                                className={`w-full text-left transition-all duration-200 ${hasVoted ? 'cursor-default' : 'cursor-pointer'}`}
                            >
                                {/* Label ABOVE the bar */}
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`font-bold text-sm ${lang === 'te' ? '' : 'uppercase'}`}>
                                        {lang === 'te' ? option.textTe : option.text}
                                    </span>

                                    {/* Selected checkmark */}
                                    {isSelected && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-5 h-5 bg-foreground flex items-center justify-center"
                                        >
                                            <svg className="w-3 h-3 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Bar container with percentage outside */}
                                <div className="flex items-center gap-3">
                                    {/* Progress Bar - visual only */}
                                    <div className={`relative flex-1 h-8 border-2 overflow-hidden ${isSelected ? 'border-foreground' : 'border-border'}`}>
                                        {hasVoted && (
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percentage}%` }}
                                                transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
                                                className="absolute inset-y-0 left-0"
                                                style={{ backgroundColor: optionColors[index] }}
                                            />
                                        )}
                                        {/* Hover state for unvoted */}
                                        {!hasVoted && (
                                            <div
                                                className="absolute inset-0 bg-muted opacity-0 hover:opacity-100 transition-opacity"
                                            />
                                        )}
                                    </div>

                                    {/* Percentage OUTSIDE the bar, on the right */}
                                    <span className={`font-black text-xl w-14 text-right ${hasVoted ? '' : 'text-muted-foreground'}`}>
                                        {hasVoted ? <AnimatedCounter value={percentage} /> : '—'}
                                    </span>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Footer */}
                {hasVoted && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-4 text-xs font-bold uppercase text-center text-muted-foreground"
                    >
                        {lang === 'te' ? 'ధన్యవాదాలు!' : 'Thanks for voting!'}
                    </motion.p>
                )}
            </div>
        </motion.div>
    );
}
