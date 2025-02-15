import { SerializedError } from '@reduxjs/toolkit';
import classNames from 'classnames';
import React from 'react';

import ErrorIcon from '@/shared/assets/icons/error.svg';

import styles from './ErrorBlock.module.scss';

interface ErrorBlockProps {
    className?: string;
    errorMessage: SerializedError | undefined;
}

export const ErrorBlock = (props: ErrorBlockProps) => {
    const { className = '', errorMessage } = props;

    return (
        <div className={classNames(styles.errorBlock)}>
            <ErrorIcon />
            <div className={styles.textBlock}>
                <h2>{errorMessage?.code + ' ' + errorMessage?.name}</h2>
                <p>{errorMessage?.message}</p>
            </div>
        </div>
    );
};
