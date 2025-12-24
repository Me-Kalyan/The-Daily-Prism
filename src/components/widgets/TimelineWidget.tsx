export default function TimelineWidget({ lang }: { lang: 'en' | 'te' }) {
    // Mock Data
    const events = [
        { date: "Oct 20", label: "Bill introduced", labelTe: "బిల్లు ప్రవేశపెట్టబడింది" },
        { date: "Nov 05", label: "Passed in Lower House", labelTe: "దిగువ సభలో ఆమోదం" },
        { date: "Dec 02", label: "Passed in Upper House", labelTe: "ఎగువ సభలో ఆమోదం" },
        { date: "Today", label: "Signed into Law", labelTe: "చట్టంగా మారింది", isLatest: true },
    ];

    return (
        <div className="border-2 border-black bg-card p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-black uppercase text-xl mb-6 border-b-2 border-black pb-2">
                {lang === 'te' ? 'ఇప్పటివరకు జరిగిన కథ' : 'The Story So Far'}
            </h3>

            <div className="space-y-0 relative">
                {/* Vertical Line */}
                <div className="absolute left-[3.5rem] top-2 bottom-2 w-1 bg-black" />

                {events.map((event, i) => (
                    <div key={i} className="flex gap-4 relative z-10 items-center mb-6 last:mb-0">
                        {/* Date Box */}
                        <div className={`w-14 shrink-0 text-center py-1 text-xs font-black uppercase ${event.isLatest ? 'bg-red-600 text-white' : 'bg-black text-white'}`}>
                            {event.date}
                        </div>

                        {/* Connector Line */}
                        <div className="w-4 h-1 bg-black" />

                        {/* Label */}
                        <div className={`text-sm font-bold ${event.isLatest ? 'text-red-600' : ''}`}>
                            {lang === 'te' ? event.labelTe : event.label}
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-6 py-2 border-2 border-black font-bold text-xs uppercase hover:bg-black hover:text-white transition-colors">
                {lang === 'te' ? 'పూర్తి టైమ్‌లైన్ చూడండి' : 'View Full Timeline'}
            </button>
        </div>
    );
}
