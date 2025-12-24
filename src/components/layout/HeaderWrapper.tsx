'use client';

import { useState, useEffect } from 'react';
import Header from './Header';

interface HeaderWrapperProps {
    lang: 'en' | 'te';
}

export default function HeaderWrapper({ lang }: HeaderWrapperProps) {
    const [isDark, setIsDark] = useState(false);
    const [isReadMode, setIsReadMode] = useState(false);
    const [readModeStyle, setReadModeStyle] = useState<'sepia' | 'dark'>('sepia');

    // Sync theme with localStorage on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('prism-theme');
        if (savedTheme === 'dark') {
            queueMicrotask(() => {
                setIsDark(true);
                document.documentElement.classList.add('dark');
            });
        }
    }, []);

    // Update document class when theme changes
    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
        localStorage.setItem('prism-theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    return (
        <Header
            lang={lang}
            isDark={isDark}
            onThemeToggle={() => setIsDark(!isDark)}
            isReadMode={isReadMode}
            onReadModeToggle={() => setIsReadMode(!isReadMode)}
            readModeStyle={readModeStyle}
            onReadModeStyleChange={() => setReadModeStyle(prev => prev === 'sepia' ? 'dark' : 'sepia')}
        />
    );
}
