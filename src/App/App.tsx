import React, { useState } from 'react';

import { AppRoutes } from './routes/AppRoutes';
import { Header } from '@/widgets';

export const App = () => {
    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        if (window.scrollY !== 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Header pageScrolled={scrolled} />
            <AppRoutes />
        </>
    );
};
