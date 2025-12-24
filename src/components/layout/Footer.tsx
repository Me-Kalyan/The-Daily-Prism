import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer({ lang }: { lang: 'en' | 'te' }) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-white pt-20 pb-32 px-4 border-t-8 border-blue-600">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                {/* Col 1: Brand & Newsletter */}
                <div className="col-span-1 md:col-span-2 pr-8">
                    <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">
                        <span className="text-red-600">THE</span> DAILY PRISM
                    </h2>
                    <p className="text-gray-400 mb-8 max-w-sm text-lg">
                        {lang === 'te'
                            ? 'నిజాయితీ గల వార్తలు, లోతైన విశ్లేషణ. ప్రతి ఉదయం మీ ఇన్‌బాక్స్‌లో.'
                            : 'Unbiased reporting, in-depth analysis, and the stories that matter. Delivered to your inbox.'}
                    </p>

                    {/* Newsletter Input */}
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder={lang === 'te' ? 'మీ ఈమెయిల్...' : 'Your email address...'}
                            className="bg-gray-900 border-2 border-gray-700 text-white px-4 py-3 w-full focus:outline-none focus:border-yellow-400 focus:text-white transition-colors placeholder:text-gray-600"
                        />
                        <button className="bg-yellow-400 text-black font-black px-6 py-3 uppercase hover:bg-white transition-colors">
                            {lang === 'te' ? 'సబ్స్క్రయిబ్' : 'Join'}
                        </button>
                    </div>
                </div>

                {/* Col 2: Sections */}
                <div>
                    <h4 className="text-gray-500 font-bold uppercase tracking-widest mb-6 text-sm">
                        {lang === 'te' ? 'విభాగాలు' : 'Sections'}
                    </h4>
                    <ul className="space-y-4 font-bold text-lg">
                        <li><Link href={`/${lang}/politics`} className="hover:text-blue-500 transition-colors">Politics</Link></li>
                        <li><Link href={`/${lang}/markets`} className="hover:text-green-500 transition-colors">Markets</Link></li>
                        <li><Link href={`/${lang}/tech`} className="hover:text-violet-500 transition-colors">Technology</Link></li>
                        <li><Link href={`/${lang}/opinion`} className="hover:text-orange-500 transition-colors">Opinion</Link></li>
                        <li><Link href={`/${lang}/live`} className="text-red-500 hover:text-red-400 animate-pulse">Live Wire</Link></li>
                    </ul>
                </div>

                {/* Col 3: Company */}
                <div>
                    <h4 className="text-gray-500 font-bold uppercase tracking-widest mb-6 text-sm">
                        {lang === 'te' ? 'సంస్థ' : 'Company'}
                    </h4>
                    <ul className="space-y-4 text-gray-400">
                        <li><Link href={`/${lang}/about`} className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link href={`/${lang}/contact`} className="hover:text-white transition-colors">Contact</Link></li>
                        <li><Link href={`/${lang}/privacy`} className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        <li><Link href={`/${lang}/search`} className="hover:text-white transition-colors">Search Archive</Link></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">
                    © {currentYear} THE DAILY PRISM. All rights reserved.
                </p>

                {/* Language Switcher */}
                <div className="flex items-center gap-4">
                    <span className="text-[10px] uppercase font-black text-gray-600 tracking-tighter">Available in</span>
                    <div className="flex border border-gray-800">
                        <Link
                            href="/en"
                            className={`px-3 py-1 text-[10px] font-black tracking-tighter transition-colors ${lang === 'en' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
                        >
                            EN
                        </Link>
                        <Link
                            href="/te"
                            className={`px-3 py-1 text-[10px] font-black tracking-tighter border-l border-gray-800 transition-colors ${lang === 'te' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
                        >
                            తెలుగు
                        </Link>
                    </div>
                </div>

                <div className="flex gap-6">
                    <Facebook className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                    <Twitter className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                    <Instagram className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                    <Linkedin className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                </div>
            </div>
        </footer>
    );
}
