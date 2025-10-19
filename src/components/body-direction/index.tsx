'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const BodyDirection = () => {
    const { i18n } = useTranslation();

    useEffect(() => {
        // Set body direction based on current language
        const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';
        document.body.setAttribute('dir', direction);

        // Also set the html lang attribute
        document.documentElement.setAttribute('lang', i18n.language);
    }, [i18n.language]);

    return null; // This component doesn't render anything
};

export default BodyDirection;
