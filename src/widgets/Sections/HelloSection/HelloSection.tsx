import React from 'react';
import { motion, Variants } from 'framer-motion';
import classNames from 'classnames';

import { CircleChip } from '@/shared/ui/Chips';
import { toolsEnum } from '@/shared/libs/enums';

import styles from './HelloSection.module.scss';

interface HelloSectionProps {
    className?: string;
}

export const HelloSection = (props: HelloSectionProps) => {
    const { className = '' } = props;

    const usedToolsArray: Array<toolsEnum> = [
        toolsEnum.html,
        toolsEnum.css,
        toolsEnum.scss,
        toolsEnum.react,
        toolsEnum.typescript,
        toolsEnum.vite,
        toolsEnum.redux,
        toolsEnum.react_router,
        toolsEnum.axios,
        toolsEnum.framer_motion,
        toolsEnum.skeleton,
    ];

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

    const chipsAnimationVariants: Variants = {
        hidden: {
            x: 32,
            opacity: 0,
        },
        visible: (custom: number) => ({
            x: 0,
            opacity: 1,
            transition: { delay: custom * 0.2 },
        }),
    };

    return (
        <motion.section
            className={classNames(styles.helloSection, [className])}
            id="about"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2, once: true }}
        >
            <motion.h1
                className={styles.heading}
                variants={textAnimationVariants}
                custom={1}
            >
                <span className={styles.heading__primary}>Hello!</span>
                <br />
                My name is{' '}
                <span className={styles.heading__underlined}>
                    Demid Chebakov
                </span>
                <br />
                This is my Frontend Developer React (Junior) test work.
            </motion.h1>
            <motion.div
                className={styles.usedToolsBlock}
                variants={blockAnimationVariants}
                custom={2}
            >
                <h2 className={styles.subheading}>
                    What did I use to create this page?
                </h2>
                <ul className={styles.usedToolsList}>
                    {usedToolsArray.map((tool, index) => {
                        return (
                            <motion.li
                                key={index}
                                variants={chipsAnimationVariants}
                                custom={index + 3}
                            >
                                <CircleChip tool={tool} />
                            </motion.li>
                        );
                    })}
                </ul>
            </motion.div>
        </motion.section>
    );
};
