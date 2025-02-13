import React from 'react';
import { HashLink } from 'react-router-hash-link';
import classNames from 'classnames';

import { SwitchButton } from '@/shared/ui/Buttons';
import { useTheme } from '@/shared/libs/hooks';

import MoonIconBlack from '@/shared/assets/icons/moon_black.svg';
import SunIconWhite from '@/shared/assets/icons/sun_white.svg';

import styles from './Header.module.scss';

interface HeaderProps {
    className?: string;
    pageScrolled: boolean;
}

export const Header = (props: HeaderProps) => {
    const { className = '', pageScrolled = false } = props;

    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    };

    return (
        <header
            className={classNames(
                styles.header,
                [className],
                pageScrolled ? styles.header__scrolled : '',
            )}
        >
            <HashLink smooth to={'/#about'} className={styles.header_logo_link}>
                <span
                    className={classNames(
                        styles.header_logo_link,
                        styles.header_logo_link__primary,
                    )}
                >
                    dem
                </span>
                gerall
                <span
                    className={classNames(
                        styles.header_logo_link,
                        styles.header_logo_link__small,
                    )}
                >
                    prod.
                </span>
            </HashLink>
            <SwitchButton
                startPosition={theme === 'dark' ? 'right' : 'left'}
                onClick={toggleTheme}
                iconLeft={<SunIconWhite />}
                iconRight={<MoonIconBlack />}
            />
        </header>
    );
};
