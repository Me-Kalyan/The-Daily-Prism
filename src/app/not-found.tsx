import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#FACC15] flex flex-col items-center justify-center p-4 text-center">
            {/* Big 404 Text */}
            <h1
                className="text-[120px] md:text-[180px] leading-none font-black tracking-tighter text-black opacity-20 select-none"
                style={{ fontFamily: "'Archivo Black', sans-serif" }}
            >
                404
            </h1>

            <div className="-mt-8 md:-mt-16 relative z-10">
                <h2
                    className="text-3xl md:text-5xl lg:text-6xl font-black uppercase mb-6 bg-black text-white px-4 md:px-6 py-2 rotate-1 inline-block"
                    style={{ fontFamily: "'Archivo Black', sans-serif" }}
                >
                    Page Not Found
                </h2>
                <p className="text-lg md:text-xl font-bold mb-8 max-w-md mx-auto px-4">
                    The story you are looking for has been moved, deleted, or never existed.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/en"
                        className="inline-block px-6 md:px-8 py-3 md:py-4 bg-white border-4 border-black font-black uppercase tracking-wide text-sm md:text-base hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                    >
                        English Home
                    </Link>
                    <Link
                        href="/te"
                        className="inline-block px-6 md:px-8 py-3 md:py-4 bg-black border-4 border-black text-white font-black uppercase tracking-wide text-sm md:text-base hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] transition-all"
                    >
                        తెలుగు హోమ్
                    </Link>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-black/30 text-xs font-mono uppercase tracking-widest">
                The Daily Prism
            </div>
        </div>
    );
}
