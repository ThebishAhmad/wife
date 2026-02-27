import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PerformanceContextType {
    highPerformanceMode: boolean; // if true, effects are OFF
    togglePerformanceMode: () => void;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export const PerformanceProvider = ({ children }: { children: ReactNode }) => {
    // Default to false (effects ON) - or check localStorage
    const [highPerformanceMode, setHighPerformanceMode] = useState(() => {
        const saved = localStorage.getItem('highPerformanceMode');
        return saved === 'true';
    });

    // Sync CSS class on <html> for global animation/blur kill
    useEffect(() => {
        if (highPerformanceMode) {
            document.documentElement.classList.add('perf-mode');
        } else {
            document.documentElement.classList.remove('perf-mode');
        }
    }, [highPerformanceMode]);

    const togglePerformanceMode = () => {
        setHighPerformanceMode((prev) => {
            const newValue = !prev;
            localStorage.setItem('highPerformanceMode', String(newValue));
            return newValue;
        });
    };

    return (
        <PerformanceContext.Provider value={{ highPerformanceMode, togglePerformanceMode }}>
            {children}
        </PerformanceContext.Provider>
    );
};

export const usePerformance = () => {
    const context = useContext(PerformanceContext);
    if (context === undefined) {
        throw new Error('usePerformance must be used within a PerformanceProvider');
    }
    return context;
};
