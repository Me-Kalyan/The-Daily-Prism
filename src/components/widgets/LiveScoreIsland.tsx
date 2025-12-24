'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, TrendingUp, TrendingDown } from 'lucide-react';

interface LiveScoreIslandProps {
    lang?: 'en' | 'te';
}

// Sample cricket match data
const cricketMatch = {
    isLive: true,
    matchType: 'T20 World Cup',
    matchTypeTe: 'T20 ప్రపంచ కప్',
    venue: 'Sydney Cricket Ground',
    venueTe: 'సిడ్నీ క్రికెట్ గ్రౌండ్',
    team1: {
        name: 'IND',
        nameFull: 'India',
        nameFullTe: 'భారతదేశం',
        score: '240/3',
        overs: '20.0',
        flag: '🇮🇳',
    },
    team2: {
        name: 'AUS',
        nameFull: 'Australia',
        nameFullTe: 'ఆస్ట్రేలియా',
        score: '180/10',
        overs: '18.2',
        flag: '🇦🇺',
    },
    status: 'India won by 60 runs',
    statusTe: 'భారతదేశం 60 పరుగుల తేడాతో విజయం',
    topBatsmen: [
        { name: 'V. Kohli', runs: 92, balls: 58, fours: 8, sixes: 4 },
        { name: 'R. Sharma', runs: 68, balls: 42, fours: 6, sixes: 3 },
    ],
    topBowlers: [
        { name: 'J. Bumrah', overs: '4.0', wickets: 3, runs: 24 },
        { name: 'M. Shami', overs: '4.0', wickets: 2, runs: 32 },
    ],
};

// Sample stock data
const stockData = [
    { symbol: 'NIFTY', value: '24,857', change: '+1.24%', isUp: true },
    { symbol: 'SENSEX', value: '81,523', change: '+0.89%', isUp: true },
];

export default function LiveScoreIsland({ lang = 'en' }: LiveScoreIslandProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-md w-full px-4">
            <motion.div
                layout
                className="bg-black text-white shadow-hard border-2 border-black overflow-hidden"
            >
                {/* Compact Island */}
                <motion.div
                    layout
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center justify-between gap-2 p-2 cursor-pointer hover:bg-white/5 transition-colors"
                >
                    {/* Live Indicator */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-red-600">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            <span className="text-xs font-black">LIVE</span>
                        </div>
                    </div>

                    {/* Cricket Score Badges */}
                    <div className="flex items-center gap-1">
                        {/* Team 1 (India) - Black bg */}
                        <div className="flex items-center gap-1 bg-black border border-white px-2 py-1">
                            <span className="text-sm">{cricketMatch.team1.flag}</span>
                            <span className="text-xs font-black">{cricketMatch.team1.name}</span>
                            <span className="text-xs font-bold text-[#FACC15]">{cricketMatch.team1.score}</span>
                        </div>

                        <span className="text-xs font-bold text-white/60">vs</span>

                        {/* Team 2 (Australia) - White bg */}
                        <div className="flex items-center gap-1 bg-white text-black px-2 py-1">
                            <span className="text-sm">{cricketMatch.team2.flag}</span>
                            <span className="text-xs font-black">{cricketMatch.team2.name}</span>
                            <span className="text-xs font-bold">{cricketMatch.team2.score}</span>
                        </div>
                    </div>

                    {/* Stock Ticker */}
                    <div className="hidden sm:flex items-center gap-2">
                        {stockData.map((stock) => (
                            <div key={stock.symbol} className="flex items-center gap-1 text-xs">
                                <span className="font-bold text-white/60">{stock.symbol}</span>
                                <span className={`font-black ${stock.isUp ? 'text-green-400' : 'text-red-400'}`}>
                                    {stock.change}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Expand Toggle */}
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        className="p-1"
                    >
                        <ChevronUp className="w-4 h-4" />
                    </motion.div>
                </motion.div>

                {/* Expanded Drawer */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                        >
                            <div className="border-t border-white/20 p-4 space-y-4">
                                {/* Match Info */}
                                <div className="text-center">
                                    <p className="text-xs text-white/60 uppercase tracking-wider">
                                        {lang === 'te' ? cricketMatch.matchTypeTe : cricketMatch.matchType}
                                    </p>
                                    <p className="text-xs text-white/40">
                                        {lang === 'te' ? cricketMatch.venueTe : cricketMatch.venue}
                                    </p>
                                </div>

                                {/* Full Score */}
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Team 1 */}
                                    <div className="text-center p-3 bg-white/5 border border-white/20">
                                        <div className="text-2xl mb-1">{cricketMatch.team1.flag}</div>
                                        <p className="font-black text-lg">{lang === 'te' ? cricketMatch.team1.nameFullTe : cricketMatch.team1.nameFull}</p>
                                        <p className="text-2xl font-black text-[#FACC15]">{cricketMatch.team1.score}</p>
                                        <p className="text-xs text-white/60">({cricketMatch.team1.overs} ov)</p>
                                    </div>

                                    {/* Team 2 */}
                                    <div className="text-center p-3 bg-white/10 border border-white/20">
                                        <div className="text-2xl mb-1">{cricketMatch.team2.flag}</div>
                                        <p className="font-black text-lg">{lang === 'te' ? cricketMatch.team2.nameFullTe : cricketMatch.team2.nameFull}</p>
                                        <p className="text-2xl font-black">{cricketMatch.team2.score}</p>
                                        <p className="text-xs text-white/60">({cricketMatch.team2.overs} ov)</p>
                                    </div>
                                </div>

                                {/* Result */}
                                <div className="text-center py-2 bg-[#FACC15] text-black">
                                    <p className="text-sm font-black uppercase">
                                        {lang === 'te' ? cricketMatch.statusTe : cricketMatch.status}
                                    </p>
                                </div>

                                {/* Top Performers */}
                                <div className="grid grid-cols-2 gap-4 text-xs">
                                    {/* Top Batsmen */}
                                    <div>
                                        <p className="font-black uppercase text-white/60 mb-2">
                                            {lang === 'te' ? 'టాప్ బ్యాట్స్‌మెన్' : 'Top Batsmen'}
                                        </p>
                                        {cricketMatch.topBatsmen.map((b, i) => (
                                            <div key={i} className="flex justify-between py-1 border-b border-white/10">
                                                <span>{b.name}</span>
                                                <span className="font-bold">{b.runs}({b.balls})</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Top Bowlers */}
                                    <div>
                                        <p className="font-black uppercase text-white/60 mb-2">
                                            {lang === 'te' ? 'టాప్ బౌలర్లు' : 'Top Bowlers'}
                                        </p>
                                        {cricketMatch.topBowlers.map((b, i) => (
                                            <div key={i} className="flex justify-between py-1 border-b border-white/10">
                                                <span>{b.name}</span>
                                                <span className="font-bold">{b.wickets}/{b.runs}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Stock Details */}
                                <div className="border-t border-white/20 pt-4">
                                    <p className="font-black uppercase text-white/60 text-xs mb-2">
                                        {lang === 'te' ? 'మార్కెట్లు' : 'Markets'}
                                    </p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {stockData.map((stock) => (
                                            <div key={stock.symbol} className={`p-2 flex items-center justify-between ${stock.isUp ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
                                                <span className="font-bold">{stock.symbol}</span>
                                                <div className="text-right">
                                                    <p className="font-black">{stock.value}</p>
                                                    <p className={`text-xs font-bold ${stock.isUp ? 'text-green-400' : 'text-red-400'}`}>
                                                        {stock.isUp ? <TrendingUp className="inline w-3 h-3" /> : <TrendingDown className="inline w-3 h-3" />}
                                                        {stock.change}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
