import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: React.ReactNode;
    onClick: () => void;
    isWarn?: boolean;
    isAccept?: boolean;
}

export const Button = (props: ButtonProps) => {
    const {
        className = '',
        children,
        onClick,
        isWarn = false,
        isAccept = false,
    } = props;

    return (
        <button
            className={classNames(
                styles.button,
                [className],
                isWarn ? styles.button__warn : '',
                isAccept ? styles.button__accept : '',
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
