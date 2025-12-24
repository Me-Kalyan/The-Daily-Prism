'use client';

import { useState, useCallback } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion } from 'framer-motion';

// Predefined solid colors based on common image types
// In production, these would be extracted from actual images
const categoryPlaceholderColors: Record<string, string> = {
    politics: '#2563EB',      // Blue
    markets: '#059669',       // Green
    tech: '#7C3AED',          // Purple
    opinion: '#D97706',       // Orange
    breaking: '#DC2626',      // Red
    sports: '#0891B2',        // Cyan
    entertainment: '#EC4899', // Pink
    default: '#111111',       // Black
};

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad'> {
    category?: string;
    placeholderColor?: string;
    showLoadingState?: boolean;
}

export default function OptimizedImage({
    category,
    placeholderColor,
    showLoadingState = true,
    className = '',
    alt,
    ...props
}: OptimizedImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Determine placeholder color
    const bgColor = placeholderColor
        || categoryPlaceholderColors[category || 'default']
        || categoryPlaceholderColors.default;

    const handleLoad = useCallback(() => {
        setIsLoaded(true);
    }, []);

    const handleError = useCallback(() => {
        setHasError(true);
    }, []);

    return (
        <div
            className="relative overflow-hidden"
            style={{ backgroundColor: bgColor }}
        >
            {/* Solid Color Placeholder - shown until image loads */}
            {showLoadingState && !isLoaded && !hasError && (
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isLoaded ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 z-10"
                    style={{ backgroundColor: bgColor }}
                >
                    {/* Optional loading indicator */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-white/30 border-t-white/80 rounded-full animate-spin" />
                    </div>
                </motion.div>
            )}

            {/* Error State */}
            {hasError && (
                <div
                    className="absolute inset-0 flex items-center justify-center z-10"
                    style={{ backgroundColor: bgColor }}
                >
                    <div className="text-white/60 text-center">
                        <svg className="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs font-bold uppercase">Image unavailable</span>
                    </div>
                </div>
            )}

            {/* Actual Image */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <Image
                    {...props}
                    alt={alt}
                    className={className}
                    onLoad={handleLoad}
                    onError={handleError}
                />
            </motion.div>
        </div>
    );
}

// Hook to extract dominant color (simplified version)
// In production, use a proper color extraction library
export function useDominantColor(imageUrl: string): string {
    // This is a simplified version
    // In production, you'd use libraries like:
    // - node-vibrant
    // - fast-average-color
    // - color-thief

    // For now, return based on URL patterns
    const url = imageUrl.toLowerCase();

    if (url.includes('politic') || url.includes('parliament')) return '#2563EB';
    if (url.includes('market') || url.includes('stock')) return '#059669';
    if (url.includes('tech') || url.includes('digital')) return '#7C3AED';
    if (url.includes('sport') || url.includes('cricket')) return '#0891B2';

    return '#111111';
}

// Custom loader for next/image optimization
export function optimizedLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
    // For Unsplash images
    if (src.includes('unsplash.com')) {
        return `${src}&w=${width}&q=${quality || 75}&fm=webp`;
    }

    // For other images, return as-is (would use your CDN in production)
    return src;
}

// Preset sizes for responsive images
export const imageSizes = {
    thumbnail: { width: 150, height: 150 },
    card: { width: 400, height: 300 },
    hero: { width: 1200, height: 675 },
    full: { width: 1920, height: 1080 },
};
