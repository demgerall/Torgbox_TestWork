import React from 'react';
import { motion, Variants } from 'framer-motion';
import classNames from 'classnames';

import styles from './WatchList.module.css';

interface WatchListProps {
    className?: string;
}

export const WatchList = (props: WatchListProps) => {
    const { className = '' } = props;

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
