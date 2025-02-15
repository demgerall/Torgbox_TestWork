import React, { useCallback, useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import classNames from 'classnames';

import { addTimezoneById, getTimezones, WatchList } from '@/features';
import { Modal } from '@/shared/ui/Modal';
import { Button } from '@/shared/ui/Buttons';
import { ErrorBlock } from '@/shared/ui/Error';
import { useAppDispatch, useAppSelector } from '@/shared/libs/hooks';

import PlusIcon from '@/shared/assets/icons/plus.svg';

import styles from './ClockSection.module.scss';

interface ClockSectionProps {
    className?: string;
}

export const ClockSection = (props: ClockSectionProps) => {
    const { className = '' } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const onShowModal = useCallback(() => setIsModalOpen(true), []);
    const onCloseModal = useCallback(() => setIsModalOpen(false), []);

    const dispatch = useAppDispatch();

    const { choosedTimezones, availableTimezones } = useAppSelector(
        ({ timezones }) => timezones,
    );

    useEffect(() => {
        dispatch(getTimezones());
    }, [dispatch]);

    const addWatchHandler = (id: number) => {
        dispatch(addTimezoneById(id));
        onCloseModal();
    };

    const clearWatchHandler = () => {
        if (localStorage.choosedTimezones) {
            delete localStorage.choosedTimezones;
            dispatch(getTimezones());
        }
    };

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
        <>
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
                <motion.div
                    className={styles.watchBlock}
                    variants={blockAnimationVariants}
                    custom={2}
                >
                    <WatchList>
                        {choosedTimezones.length < 10 && (
                            <Button onClick={() => onShowModal()}>
                                <PlusIcon />
                            </Button>
                        )}
                    </WatchList>
                </motion.div>
                <motion.div
                    className={styles.buttonsBlock}
                    variants={blockAnimationVariants}
                    custom={3}
                >
                    <Button onClick={() => clearWatchHandler()}>
                        Clear watches storage
                    </Button>
                </motion.div>
            </motion.section>

            <Modal isOpen={isModalOpen} onClose={onCloseModal}>
                <h2 className={styles.modal_title}>
                    Choose timezone and add new watch
                </h2>
                <hr
                    style={{
                        backgroundColor: 'var(--color-primary)',
                        height: '2px',
                    }}
                />
                <div className={styles.modal_availableTimezonesBlock}>
                    {availableTimezones.map((timezone, index) => {
                        return (
                            <Button
                                key={index}
                                onClick={() => addWatchHandler(timezone.id)}
                            >
                                {timezone.name}
                            </Button>
                        );
                    })}
                </div>
            </Modal>
        </>
    );
};
