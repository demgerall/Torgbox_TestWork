import type { ButtonHTMLAttributes, FC } from 'react';
import classNames from 'classnames';

import { useTheme } from '@/shared/libs/hooks';

import CloseIcon from '@/shared/assets/icons/close.svg';

import styles from './ModalControls.module.scss';

interface ModalControlsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

export const ModalControls = (props: ModalControlsProps) => {
    const { className = '', ...otherProps } = props;

    const { theme } = useTheme();

    return (
        <button
            className={classNames(styles.modalCloseButton, [className])}
            {...otherProps}
        >
            <CloseIcon />
        </button>
    );
};
