import React from 'react';
import { motion, Variants } from 'framer-motion';
import classNames from 'classnames';

import { WatchList } from '@/features';

import styles from './ClockSection.module.scss';

interface ClockSectionProps {
    className?: string;
}

export const ClockSection = (props: ClockSectionProps) => {
    const { className = '' } = props;

    const textAnimationVariants: Variants = {
        hidden: {
            x: -128,
            opacity: 0,
        },
        visible: (custom: number) => ({
            x: 0,
            opacity: 1,
            transition: { delay: custom * 0.3 },
        }),
    };

    const blockAnimationVariants: Variants = {
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
        <motion.section
            className={classNames(styles.clockSection, [className])}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2, once: true }}
        >
            <motion.h1
                className={styles.title}
                variants={textAnimationVariants}
                custom={1}
            >
                <span className={styles.title__primary}>Watch </span>
                List
            </motion.h1>
            <WatchList />
        </motion.section>
    );
};
