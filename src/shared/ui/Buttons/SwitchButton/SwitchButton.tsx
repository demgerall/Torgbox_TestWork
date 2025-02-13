import React, { ButtonHTMLAttributes, useState } from 'react';
import classNames from 'classnames';

import styles from './SwitchButton.module.scss';

interface SwitchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    startPosition?: 'left' | 'right';
    onClick: () => void;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
}

export const SwitchButton = (props: SwitchButtonProps) => {
    const {
        className = '',
        onClick,
        startPosition = 'left',
        iconLeft = '',
        iconRight = '',
        ...otherProps
    } = props;

    const [pressed, setPressed] = useState(
        startPosition === 'left' ? false : true,
    );

    const switchButtonClick = () => {
        onClick();
        if (!pressed) {
            setPressed(true);
        } else {
            setPressed(false);
        }
    };

    return (
        <button
            className={classNames(styles.switchButton, [className])}
            onClick={switchButtonClick}
            {...otherProps}
        >
            <div
                className={classNames(styles.switchButton_switcher, [
                    pressed
                        ? styles.switchButton_switcher__pressed
                        : styles.switchButton_switcher__notPressed,
                ])}
            ></div>
            <div className={styles.switchButton_iconLeft}>{iconLeft || ''}</div>
            <div className={styles.switchButton_iconRight}>
                {iconRight || ''}
            </div>
        </button>
    );
};
