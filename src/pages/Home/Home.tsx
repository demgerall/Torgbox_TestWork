import React from 'react';

import { ClockSection, ContactsSection, HelloSection } from '@/widgets';

export const Home = () => {
    return (
        <main>
            <HelloSection />
            <ClockSection />
            <ContactsSection />
        </main>
    );
};
