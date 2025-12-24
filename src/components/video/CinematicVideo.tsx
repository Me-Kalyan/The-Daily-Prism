'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX } from 'lucide-react';
import Image from 'next/image';

declare global {
    interface Window {
        YT: {
            Player: new (
                elementId: string,
                config: {
                    videoId: string;
                    playerVars?: Record<string, number>;
                    events?: {
                        onReady?: (event: { target: YTPlayer }) => void;
                        onStateChange?: (event: { data: number }) => void;
                    };
                }
            ) => YTPlayer;
        };
        onYouTubeIframeAPIReady: () => void;
    }
}

interface YTPlayer {
    playVideo: () => void;
    pauseVideo: () => void;
    mute: () => void;
    unMute: () => void;
    destroy: () => void;
}

interface VideoPlayerProps {
    videoId: string;
    thumbnail: string;
    title: string;
    titleTe: string;
    duration?: string; // e.g. "04:20"
    lang?: 'en' | 'te';
}

export default function VideoPlayer({
    videoId,
    thumbnail,
    title,
    titleTe,
    duration = '04:20',
    lang = 'en'
}: VideoPlayerProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const playerRef = useRef<YTPlayer | null>(null);

    useEffect(() => {
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }
    }, []);

    const initPlayer = useCallback(() => {
        if (window.YT && !playerRef.current) {
            playerRef.current = new window.YT.Player('youtube-player', {
                videoId,
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                    modestbranding: 1,
                    rel: 0,
                    mute: 1,
                },
                events: {
                    onReady: (event) => {
                        event.target.playVideo();
                        setIsPlaying(true);
                    },
                    onStateChange: (event) => {
                        if (event.data === 0) setIsPlaying(false);
                    },
                },
            });
        }
    }, [videoId]);

    useEffect(() => {
        if (isExpanded) {
            if (window.YT) {
                initPlayer();
            } else {
                window.onYouTubeIframeAPIReady = initPlayer;
            }
        }
        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
    }, [isExpanded, initPlayer]);

    const handlePlayPause = () => {
        if (playerRef.current) {
            if (isPlaying) {
                playerRef.current.pauseVideo();
            } else {
                playerRef.current.playVideo();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleMuteToggle = () => {
        if (playerRef.current) {
            if (isMuted) {
                playerRef.current.unMute();
            } else {
                playerRef.current.mute();
            }
            setIsMuted(!isMuted);
        }
    };

    const handleClose = () => {
        setIsExpanded(false);
        setIsPlaying(false);
        if (playerRef.current) {
            playerRef.current.destroy();
            playerRef.current = null;
        }
    };

    return (
        <>
            {/* Video Card - Solid Black Box */}
            <motion.div
                onClick={() => setIsExpanded(true)}
                className="relative aspect-video cursor-pointer bg-black border-2 border-border shadow-hard overflow-hidden group"
                whileHover={{ boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)' }}
            >
                {/* Thumbnail */}
                <Image
                    src={thumbnail}
                    alt={lang === 'te' ? titleTe : title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-200"
                />

                {/* Yellow Square Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        whileHover={{ y: -4, boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }}
                        className="w-20 h-20 bg-[#FACC15] flex items-center justify-center shadow-hard-sm"
                    >
                        {/* Black Triangle */}
                        <div
                            className="w-0 h-0 ml-1"
                            style={{
                                borderLeft: '24px solid #111111',
                                borderTop: '16px solid transparent',
                                borderBottom: '16px solid transparent',
                            }}
                        />
                    </motion.div>
                </div>

                {/* Duration Badge - Bottom Right */}
                <div className="absolute bottom-14 right-3 bg-black text-white text-xs font-bold px-2 py-1">
                    {duration}
                </div>

                {/* Title Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-black py-3 px-4">
                    <h4 className={`text-white font-black uppercase text-sm ${lang === 'te' ? 'normal-case' : ''}`}>
                        {lang === 'te' ? titleTe : title}
                    </h4>
                </div>
            </motion.div>

            {/* Expanded Player - Solid Black Overlay */}
            <AnimatePresence>
                {isExpanded && (
                    <>
                        {/* Solid Black Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleClose}
                            className="fixed inset-0 z-50 bg-black"
                        />

                        {/* Video Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed z-50 inset-4 md:inset-12 lg:inset-24 flex items-center justify-center"
                        >
                            <div className="relative w-full max-w-5xl">
                                <div className="relative aspect-video bg-black border-4 border-white">
                                    <div id="youtube-player" className="absolute inset-0 w-full h-full" />

                                    {/* Custom Play/Pause - Yellow Square */}
                                    <button
                                        onClick={handlePlayPause}
                                        className="absolute bottom-4 left-4 w-12 h-12 bg-[#FACC15] flex items-center justify-center shadow-hard hover:-translate-y-1 transition-transform"
                                    >
                                        {isPlaying ? (
                                            <div className="flex gap-1">
                                                <div className="w-2 h-5 bg-black" />
                                                <div className="w-2 h-5 bg-black" />
                                            </div>
                                        ) : (
                                            <div
                                                className="w-0 h-0 ml-1"
                                                style={{
                                                    borderLeft: '16px solid #111111',
                                                    borderTop: '10px solid transparent',
                                                    borderBottom: '10px solid transparent',
                                                }}
                                            />
                                        )}
                                    </button>

                                    {/* Mute Toggle */}
                                    <button
                                        onClick={handleMuteToggle}
                                        className="absolute bottom-4 left-20 w-12 h-12 bg-white border-2 border-black flex items-center justify-center shadow-hard hover:-translate-y-1 transition-transform"
                                    >
                                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                                    </button>
                                </div>

                                {/* Close Button */}
                                <button
                                    onClick={handleClose}
                                    className="absolute -top-4 -right-4 w-12 h-12 bg-white border-2 border-black flex items-center justify-center shadow-hard hover:bg-[#DC2626] hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
