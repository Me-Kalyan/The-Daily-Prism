'use client';

import { motion } from 'framer-motion';

// Skeleton pulse animation
const pulseClass = "animate-pulse bg-muted";

// BentoGrid Skeleton - matches exact layout
export function BentoGridSkeleton() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] border-2 border-border">
                {/* Main Feature (2x2) */}
                <div className="md:col-span-2 md:row-span-2 border border-border p-6">
                    <div className={`${pulseClass} h-4 w-20 mb-4`} />
                    <div className={`${pulseClass} h-8 w-3/4 mb-2`} />
                    <div className={`${pulseClass} h-8 w-1/2 mb-4`} />
                    <div className="mt-auto flex gap-4">
                        <div className={`${pulseClass} h-3 w-24`} />
                        <div className={`${pulseClass} h-3 w-16`} />
                    </div>
                </div>

                {/* Tech Article (1x2) */}
                <div className="md:row-span-2 border border-border p-5">
                    <div className={`${pulseClass} h-4 w-16 mb-4`} />
                    <div className={`${pulseClass} h-5 w-full mb-2`} />
                    <div className={`${pulseClass} h-5 w-3/4 mb-4`} />
                    <div className={`${pulseClass} h-3 w-full mb-1`} />
                    <div className={`${pulseClass} h-3 w-2/3`} />
                </div>

                {/* Markets Article (1x1) */}
                <div className="border border-border p-4">
                    <div className={`${pulseClass} h-3 w-14 mb-2`} />
                    <div className={`${pulseClass} h-4 w-full mb-1`} />
                    <div className={`${pulseClass} h-4 w-2/3`} />
                </div>

                {/* Opinion Article (1x1) */}
                <div className="border border-border p-4">
                    <div className={`${pulseClass} h-3 w-14 mb-2`} />
                    <div className={`${pulseClass} h-4 w-full mb-1`} />
                    <div className={`${pulseClass} h-4 w-3/4`} />
                </div>

                {/* Politics Article (2x1) */}
                <div className="md:col-span-2 border border-border flex">
                    <div className={`w-1/3 ${pulseClass}`} />
                    <div className="w-2/3 p-4">
                        <div className={`${pulseClass} h-3 w-16 mb-2`} />
                        <div className={`${pulseClass} h-5 w-full mb-1`} />
                        <div className={`${pulseClass} h-5 w-2/3`} />
                    </div>
                </div>
            </div>
        </section>
    );
}

// StackedCard Skeleton
export function CardSkeleton() {
    return (
        <div className="bg-card border-2 border-border shadow-hard overflow-hidden">
            {/* Image placeholder */}
            <div className={`aspect-[4/3] ${pulseClass}`} />

            {/* Content */}
            <div className="p-5">
                <div className={`${pulseClass} h-5 w-full mb-2`} />
                <div className={`${pulseClass} h-5 w-3/4 mb-4`} />
                <div className={`${pulseClass} h-3 w-full mb-1`} />
                <div className={`${pulseClass} h-3 w-2/3 mb-4`} />
                <div className="flex justify-between pt-4 border-t-2 border-border">
                    <div className={`${pulseClass} h-3 w-20`} />
                    <div className={`${pulseClass} h-3 w-12`} />
                </div>
            </div>
        </div>
    );
}

// Sidebar Widget Skeleton
export function WidgetSkeleton() {
    return (
        <div className="bg-card border-2 border-border shadow-hard">
            <div className="p-4 border-b-2 border-border">
                <div className={`${pulseClass} h-4 w-24`} />
            </div>
            <div className="p-5 space-y-3">
                <div className={`${pulseClass} h-4 w-full`} />
                <div className={`${pulseClass} h-4 w-3/4`} />
                <div className={`${pulseClass} h-4 w-5/6`} />
                <div className={`${pulseClass} h-4 w-2/3`} />
            </div>
        </div>
    );
}

// Dashboard Skeleton
export function DashboardSkeleton() {
    return (
        <div className="bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-4 flex items-center justify-between border-r border-white/20">
                            <div>
                                <div className="h-3 w-16 bg-white/20 animate-pulse mb-2" />
                                <div className="h-5 w-24 bg-white/20 animate-pulse" />
                            </div>
                            <div className="h-8 w-20 bg-white/20 animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Video Skeleton
export function VideoSkeleton() {
    return (
        <div className="aspect-video bg-black border-2 border-border shadow-hard overflow-hidden">
            <div className={`w-full h-full ${pulseClass} flex items-center justify-center`}>
                <div className="w-20 h-20 bg-muted-foreground/20 animate-pulse" />
            </div>
        </div>
    );
}

// Full Page Loading Skeleton
export function PageSkeleton() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen"
        >
            {/* Dashboard */}
            <DashboardSkeleton />

            {/* BentoGrid */}
            <BentoGridSkeleton />

            {/* Video Section */}
            <section className="max-w-7xl mx-auto px-4 py-8">
                <div className={`${pulseClass} h-6 w-40 mb-6`} />
                <div className="max-w-2xl">
                    <VideoSkeleton />
                </div>
            </section>

            {/* Main Content */}
            <section className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className={`${pulseClass} h-6 w-32 mb-6`} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <CardSkeleton key={i} />
                            ))}
                        </div>
                    </div>
                    <div className="space-y-8">
                        <WidgetSkeleton />
                        <WidgetSkeleton />
                        <WidgetSkeleton />
                    </div>
                </div>
            </section>
        </motion.div>
    );
}

export default PageSkeleton;
