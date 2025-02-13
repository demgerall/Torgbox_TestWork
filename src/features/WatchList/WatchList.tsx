import React, { useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import classNames from 'classnames';

import { getTimezones } from '@/features';
import { useAppDispatch, useAppSelector } from '@/shared/libs/hooks';

import styles from './WatchList.module.scss';

interface WatchListProps {
    className?: string;
}

export const WatchList = (props: WatchListProps) => {
    const { className = '' } = props;

    const dispatch = useAppDispatch();

    const { choosedTimezones, availableTimezones } = useAppSelector(
        ({ timezones }) => timezones,
    );

    useEffect(() => {
        dispatch(getTimezones());
    }, [dispatch]);

    const cardsAnimationVariants: Variants = {
        hidden: {
            y: 32,
            opacity: 0,
        },
        visible: (custom: number) => ({
            y: 0,
            opacity: 1,
            transition: { delay: custom * 0.3 },
        }),
    };

    return (
        <motion.div
            className={classNames(styles.watchList, [className])}
            initial="hidden"
            animate="visible"
            viewport={{ amount: 0.2, once: true }}
        >
            WatchList
        </motion.div>
    );
};
