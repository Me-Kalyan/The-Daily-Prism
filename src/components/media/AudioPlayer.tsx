'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones, Play, Pause, X, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
    text: string;
    textTe?: string;
    estimatedTime?: string;
    estimatedTimeTe?: string;
    lang?: 'en' | 'te';
}

// Waveform bar component with animation
function WaveformBar({ isPlaying, delay }: { isPlaying: boolean; delay: number }) {
    return (
        <motion.div
            className="w-1 bg-black rounded-full"
            animate={isPlaying ? {
                height: ['12px', '24px', '8px', '20px', '12px'],
            } : { height: '8px' }}
            transition={isPlaying ? {
                duration: 0.5,
                repeat: Infinity,
                delay,
                ease: 'easeInOut',
            } : { duration: 0.2 }}
        />
    );
}

export default function AudioPlayer({
    text,
    textTe,
    estimatedTime = '4 MIN',
    estimatedTimeTe = '4 ని.',
    lang = 'en'
}: AudioPlayerProps) {
    const [isPlayerVisible, setIsPlayerVisible] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const contentText = lang === 'te' && textTe ? textTe : text;

    // Initialize speech synthesis
    const initSpeech = useCallback(() => {
        if (typeof window === 'undefined' || !window.speechSynthesis) return;

        const utterance = new SpeechSynthesisUtterance(contentText);
        utterance.rate = 0.9;
        utterance.pitch = 1;

        // Try to get appropriate voice
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v =>
            lang === 'te'
                ? v.lang.includes('te') || v.lang.includes('hi')
                : v.lang.includes('en') && (v.name.includes('Google') || v.name.includes('Natural'))
        );
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        utterance.onend = () => {
            setIsPlaying(false);
            setProgress(100);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };

        utterance.onerror = () => {
            setIsPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };

        utteranceRef.current = utterance;
    }, [contentText, lang]);

    useEffect(() => {
        initSpeech();

        // Load voices (they might load asynchronously)
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.onvoiceschanged = initSpeech;
        }

        return () => {
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [initSpeech]);

    const handlePlay = () => {
        if (!window.speechSynthesis || !utteranceRef.current) return;

        if (isPlaying) {
            window.speechSynthesis.pause();
            setIsPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
        } else {
            if (window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
            } else {
                setProgress(0);
                window.speechSynthesis.cancel();
                initSpeech();
                if (utteranceRef.current) {
                    window.speechSynthesis.speak(utteranceRef.current);
                }
            }
            setIsPlaying(true);

            // Simulate progress (since Web Speech API doesn't provide exact progress)
            const estimatedMs = parseInt(estimatedTime) * 60 * 1000;
            const increment = 100 / (estimatedMs / 100);
            intervalRef.current = setInterval(() => {
                setProgress(prev => Math.min(prev + increment, 99));
            }, 100);
        }
    };

    const handleClose = () => {
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
        setIsPlaying(false);
        setProgress(0);
        setIsPlayerVisible(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const handleMute = () => {
        // Web Speech API doesn't support volume control, so we pause/resume
        if (isMuted) {
            if (window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
            }
        } else {
            window.speechSynthesis.pause();
        }
        setIsMuted(!isMuted);
    };

    return (
        <>
            {/* Listen Button */}
            <motion.button
                onClick={() => setIsPlayerVisible(true)}
                whileHover={{ y: -2, boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-[#FACC15] text-black px-4 py-2 font-black uppercase text-sm border-2 border-black shadow-hard-sm hover:bg-[#FDE047] transition-colors"
            >
                <Headphones className="w-4 h-4" />
                <span>{lang === 'te' ? 'వినండి' : 'Listen'}</span>
                <span className="text-black/60">({lang === 'te' ? estimatedTimeTe : estimatedTime})</span>
            </motion.button>

            {/* Sticky Player */}
            <AnimatePresence>
                {isPlayerVisible && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 z-50 bg-[#FACC15] border-t-4 border-black"
                    >
                        <div className="max-w-7xl mx-auto px-4 py-3">
                            <div className="flex items-center gap-4">
                                {/* Play/Pause Button */}
                                <motion.button
                                    onClick={handlePlay}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-12 h-12 bg-black text-white flex items-center justify-center"
                                >
                                    {isPlaying ? (
                                        <Pause className="w-6 h-6" />
                                    ) : (
                                        <Play className="w-6 h-6 ml-1" />
                                    )}
                                </motion.button>

                                {/* Waveform Visualization */}
                                <div className="flex items-center gap-0.5 h-8 flex-1">
                                    {Array.from({ length: 30 }).map((_, i) => (
                                        <WaveformBar
                                            key={i}
                                            isPlaying={isPlaying && !isMuted}
                                            delay={i * 0.05}
                                        />
                                    ))}
                                </div>

                                {/* Progress Text */}
                                <div className="hidden sm:block text-black font-bold text-sm min-w-[80px] text-right">
                                    {Math.round(progress)}%
                                </div>

                                {/* Mute Button */}
                                <motion.button
                                    onClick={handleMute}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2"
                                >
                                    {isMuted ? (
                                        <VolumeX className="w-5 h-5 text-black/60" />
                                    ) : (
                                        <Volume2 className="w-5 h-5 text-black" />
                                    )}
                                </motion.button>

                                {/* Close Button */}
                                <motion.button
                                    onClick={handleClose}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2 bg-black text-white"
                                >
                                    <X className="w-5 h-5" />
                                </motion.button>
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-2 h-1 bg-black/20 relative">
                                <motion.div
                                    className="absolute left-0 top-0 h-full bg-black"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

// Provider component to manage global audio player state
export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
