'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ScrollProgressProps {
    color?: string;
}

/**
 * Reading Progress Bar Component
 * Fixed at top of viewport, grows from 0% to 100% as user scrolls
 */
export default function ScrollProgress({ color = '#FACC15' }: ScrollProgressProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const calculateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setProgress(Math.min(100, Math.max(0, scrollProgress)));
        };

        // Initial calculation
        calculateProgress();

        // Listen to scroll events
        window.addEventListener('scroll', calculateProgress, { passive: true });
        window.addEventListener('resize', calculateProgress, { passive: true });

        return () => {
            window.removeEventListener('scroll', calculateProgress);
            window.removeEventListener('resize', calculateProgress);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 h-2 bg-muted z-50">
            <motion.div
                className="h-full"
                style={{ backgroundColor: color }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'linear' }}
            />
        </div>
    );
}
