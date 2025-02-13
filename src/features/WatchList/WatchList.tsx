import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import classNames from 'classnames';

import { getTimezones } from '@/features';
import { useAppDispatch, useAppSelector } from '@/shared/libs/hooks';

import styles from './WatchList.module.scss';
import { Watch } from '@/shared/ui/Watch';
import { get } from 'node_modules/axios/index.cjs';

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
        <motion.ul
            className={classNames(styles.watchList, [className])}
            initial="hidden"
            animate="visible"
            viewport={{ amount: 0.2, once: true }}
        >
            {choosedTimezones.map((timezone, index) => (
                <motion.li
                    key={index}
                    className={styles.watchList__card}
                    custom={index + 1}
                    variants={cardsAnimationVariants}
                >
                    <Watch
                        name={timezone.name}
                        timezoneOffset={timezone.timezoneOffset}
                    />
                </motion.li>
            ))}
        </motion.ul>
    );
};
