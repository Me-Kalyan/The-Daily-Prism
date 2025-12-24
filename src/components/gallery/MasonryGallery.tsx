'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages, GalleryImage } from '@/lib/data/news';

interface MasonryGalleryProps {
    lang?: 'en' | 'te';
}

export default function MasonryGallery({ lang = 'en' }: MasonryGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const handleImageClick = (image: GalleryImage, index: number) => {
        setSelectedImage(image);
        setSelectedIndex(index);
    };

    const handleClose = () => {
        setSelectedImage(null);
    };

    const handlePrevious = () => {
        const newIndex = selectedIndex === 0 ? galleryImages.length - 1 : selectedIndex - 1;
        setSelectedIndex(newIndex);
        setSelectedImage(galleryImages[newIndex]);
    };

    const handleNext = () => {
        const newIndex = selectedIndex === galleryImages.length - 1 ? 0 : selectedIndex + 1;
        setSelectedIndex(newIndex);
        setSelectedImage(galleryImages[newIndex]);
    };

    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            {/* Section Header */}
            <div className="mb-8">
                <h2
                    className="text-2xl font-black uppercase inline-block pb-2"
                    style={{ borderBottom: '4px solid #DC2626' }}
                >
                    {lang === 'te' ? 'ఫోటో గ్యాలరీ' : 'Photo Gallery'}
                </h2>
            </div>

            {/* Grid - Square thumbnails with gaps */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryImages.map((image, index) => (
                    <motion.div
                        key={image.id}
                        onClick={() => handleImageClick(image, index)}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        whileHover={{ y: -4, boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)' }}
                        className="relative aspect-square cursor-pointer border-2 border-black dark:border-white overflow-hidden group shadow-hard"
                    >
                        <Image
                            src={image.src}
                            alt={lang === 'te' ? image.altTe : image.alt}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Yellow Caption Strip - slides up on hover */}
                        <div className="absolute bottom-0 left-0 right-0 bg-[#FACC15] py-3 px-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out">
                            <p className="text-black text-xs font-black uppercase truncate">
                                {lang === 'te' ? image.captionTe : image.caption}
                            </p>
                        </div>

                        {/* Subtle overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
                    </motion.div>
                ))}
            </div>

            {/* Lightbox - Solid Black Overlay (100% opacity) */}
            <AnimatePresence>
                {selectedImage && (
                    <>
                        {/* Solid Black Backdrop - NO transparency */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleClose}
                            className="fixed inset-0 z-50 bg-black"
                        />

                        {/* Lightbox Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-8 pointer-events-none"
                        >
                            <div className="relative max-w-4xl w-full pointer-events-auto">
                                {/* Image */}
                                <div className="relative aspect-[4/3] bg-black border-4 border-white">
                                    <Image
                                        src={selectedImage.src}
                                        alt={lang === 'te' ? selectedImage.altTe : selectedImage.alt}
                                        fill
                                        className="object-contain"
                                    />
                                </div>

                                {/* Caption - Solid strip below image */}
                                <div className="bg-white text-black py-4 px-6 border-4 border-t-0 border-white">
                                    <p className={`text-lg font-bold ${lang === 'te' ? '' : 'uppercase'}`}>
                                        {lang === 'te' ? selectedImage.captionTe : selectedImage.caption}
                                    </p>
                                    <p className="text-sm font-bold text-gray-600 mt-1">
                                        {selectedIndex + 1} / {galleryImages.length}
                                    </p>
                                </div>

                                {/* Navigation */}
                                <button
                                    onClick={handlePrevious}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-12 h-12 bg-white border-2 border-black flex items-center justify-center shadow-hard hover:bg-yellow-400 transition-colors hidden md:flex"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>

                                <button
                                    onClick={handleNext}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-12 h-12 bg-white border-2 border-black flex items-center justify-center shadow-hard hover:bg-yellow-400 transition-colors hidden md:flex"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>

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
        </section>
    );
}
