'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Skull, IndianRupee, ArrowUp, Wind, Loader2 } from 'lucide-react';

interface DashboardData {
    market: {
        value: string;
        change: string;
        label: string;
    };
    weather: {
        value: number;
        status: string;
        color: string;
        city: string;
    };
    currency: {
        pair: string;
        value: string;
        change: string;
        isUp: boolean;
    };
}

export default function DashboardStrip({ lang }: { lang: 'en' | 'te' }) {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/dashboard');
                const json = await res.json();
                setData(json);
            } catch (e) {
                console.error("Dashboard fetch error", e);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 mt-8 mb-12 relative z-20 h-32 flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300">
                <Loader2 className="animate-spin w-6 h-6 text-gray-400" />
            </div>
        );
    }

    // Fallback if API fails
    const market = data?.market || { value: "24,850", change: "+0.00%", label: "NIFTY 50" };
    const weather = data?.weather || { value: 150, status: "Moderate", color: "bg-orange-500", city: "Hyderabad" };
    const currency = data?.currency || { value: "₹83.50", change: "+0.00", pair: "USD/INR", isUp: true };

    return (
        <section className="max-w-7xl mx-auto px-4 mt-8 mb-12 relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* 1. MARKET CARD (NSE) */}
                <div className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-white p-4 shadow-[4px_4px_0px_0px_#059669] hover:-translate-y-1 transition-transform flex flex-col justify-between h-32 group">
                    <div className="flex justify-between items-start">
                        <span className="bg-emerald-600 text-white text-xs font-black px-2 py-1 uppercase tracking-wider">
                            {lang === 'te' ? 'మార్కెట్' : 'MARKETS'}
                        </span>
                        <TrendingUp className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform" />
                    </div>

                    <div className="flex items-end gap-3 mt-2">
                        <h3 className="text-4xl font-black tracking-tighter leading-none text-black dark:text-white">
                            {market.value}
                        </h3>
                        <div className="flex items-center text-emerald-600 font-bold mb-1 text-sm">
                            <ArrowUp className="w-4 h-4" strokeWidth={3} />
                            {market.change}
                        </div>
                    </div>
                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">
                        {market.label}
                    </p>
                </div>

                {/* 2. WEATHER CARD (Open-Meteo) */}
                <div className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-white p-4 shadow-[4px_4px_0px_0px_#57534E] hover:-translate-y-1 transition-transform flex flex-col justify-between h-32 group">
                    <div className="flex justify-between items-start">
                        <span className="bg-stone-600 text-white text-xs font-black px-2 py-1 uppercase tracking-wider flex items-center gap-1">
                            <Wind className="w-3 h-3" /> {lang === 'te' ? 'గాలి నాణ్యత' : 'AIR QUALITY'}
                        </span>
                        <Skull className="w-6 h-6 text-stone-600 group-hover:rotate-12 transition-transform" />
                    </div>

                    <div className="flex items-end gap-3 mt-2">
                        <h3 className="text-4xl font-black tracking-tighter leading-none text-black dark:text-white">
                            {weather.value}
                        </h3>
                        <span className={`${weather.color} text-white text-[10px] font-black px-2 py-1 uppercase border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]`}>
                            {lang === 'te' && weather.status === 'POOR' ? 'పేలవమైన' : weather.status}
                        </span>
                    </div>
                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">
                        {lang === 'te' ? 'హైదరాబాద్' : weather.city}
                    </p>
                </div>

                {/* 3. CURRENCY CARD (Frankfurter) */}
                <div className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-white p-4 shadow-[4px_4px_0px_0px_#2563EB] hover:-translate-y-1 transition-transform flex flex-col justify-between h-32 group">
                    <div className="flex justify-between items-start">
                        <span className="bg-blue-600 text-white text-xs font-black px-2 py-1 uppercase tracking-wider">
                            {lang === 'te' ? 'కరెన్సీ' : 'FOREX'}
                        </span>
                        <IndianRupee className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                    </div>

                    <div className="flex items-end gap-3 mt-2">
                        <h3 className="text-4xl font-black tracking-tighter leading-none text-black dark:text-white">
                            {currency.value}
                        </h3>
                        <div className="flex items-center text-gray-500 font-bold mb-1 text-sm">
                            <span>USD/INR</span>
                        </div>
                    </div>
                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">
                        {currency.pair}
                    </p>
                </div>

            </div>
        </section>
    );
}
