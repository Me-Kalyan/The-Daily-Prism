'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface BeforeAfterSliderProps {
    beforeImage: string;
    afterImage: string;
    beforeLabel?: string;
    afterLabel?: string;
    beforeLabelTe?: string;
    afterLabelTe?: string;
    alt: string;
    altTe?: string;
    lang?: 'en' | 'te';
}

export default function BeforeAfterSlider({
    beforeImage,
    afterImage,
    beforeLabel = 'THEN',
    afterLabel = 'NOW',
    beforeLabelTe = 'అప్పుడు',
    afterLabelTe = 'ఇప్పుడు',
    alt,
    altTe,
    lang = 'en'
}: BeforeAfterSliderProps) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = useCallback((clientX: number) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPosition(percentage);
    }, []);

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            handleMove(e.clientX);
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        handleMove(e.touches[0].clientX);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="relative border-2 border-black dark:border-white shadow-hard overflow-hidden select-none"
        >
            {/* Container */}
            <div
                ref={containerRef}
                className="relative aspect-[16/9] cursor-ew-resize"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
            >
                {/* After Image (Bottom Layer - Full) */}
                <div className="absolute inset-0">
                    <Image
                        src={afterImage}
                        alt={`${lang === 'te' ? altTe : alt} - After`}
                        fill
                        className="object-cover"
                        draggable={false}
                    />
                </div>

                {/* Before Image (Top Layer - Clipped) */}
                <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                    <Image
                        src={beforeImage}
                        alt={`${lang === 'te' ? altTe : alt} - Before`}
                        fill
                        className="object-cover"
                        draggable={false}
                    />
                </div>

                {/* Thick Neon-Yellow Divider Line */}
                <div
                    className="absolute top-0 bottom-0 w-1 bg-[#FACC15] z-10"
                    style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                />

                {/* Massive Handle Circle */}
                <div
                    className="absolute top-1/2 z-20 cursor-grab active:cursor-grabbing"
                    style={{ left: `${sliderPosition}%`, transform: 'translate(-50%, -50%)' }}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleMouseDown}
                >
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-16 h-16 bg-black rounded-full flex items-center justify-center shadow-hard border-4 border-[#FACC15]"
                    >
                        {/* Arrows < > */}
                        <div className="flex items-center gap-1 text-white font-black text-xl">
                            <span>‹</span>
                            <div className="w-px h-5 bg-white/50" />
                            <span>›</span>
                        </div>
                    </motion.div>
                </div>

                {/* THEN Label (Top Left) */}
                <div className="absolute top-4 left-4 z-10">
                    <span className="bg-black text-white text-xs font-black uppercase px-3 py-1.5 tracking-wider">
                        {lang === 'te' ? beforeLabelTe : beforeLabel}
                    </span>
                </div>

                {/* NOW Label (Top Right) */}
                <div className="absolute top-4 right-4 z-10">
                    <span className="bg-black text-white text-xs font-black uppercase px-3 py-1.5 tracking-wider">
                        {lang === 'te' ? afterLabelTe : afterLabel}
                    </span>
                </div>

                {/* Instruction hint */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-black/80 text-white text-xs font-bold px-3 py-1 flex items-center gap-2">
                        <span>←</span>
                        {lang === 'te' ? 'పోల్చడానికి లాగండి' : 'Drag to compare'}
                        <span>→</span>
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

// Sample usage data
export const sampleBeforeAfter = {
    beforeImage: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&h=675&fit=crop&sat=-100',
    afterImage: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&h=675&fit=crop',
    alt: 'Hyderabad Skyline Transformation',
    altTe: 'హైదరాబాద్ స్కైలైన్ పరివర్తన',
};
