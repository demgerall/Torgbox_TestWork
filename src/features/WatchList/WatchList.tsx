import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { motion, Variants } from 'framer-motion';
import classNames from 'classnames';

import { WatchCard } from '@/entities';
import { useAppDispatch, useAppSelector } from '@/shared/libs/hooks';

import styles from './WatchList.module.scss';

interface WatchListProps {
    className?: string;
    children?: React.ReactNode;
}

export const WatchList = (props: WatchListProps) => {
    const { className = '', children } = props;

    const { choosedTimezones, isLoading } = useAppSelector(
        ({ timezones }) => timezones,
    );

    const cardsAnimationVariants: Variants = {
        hidden: {
            y: 32,
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    return (
        <motion.ul
            className={classNames(styles.watchList, [className])}
            initial="hidden"
            animate="visible"
            viewport={{ amount: 0.2, once: true }}
        >
            {isLoading
                ? [...Array(5)].map(index => {
                      return (
                          <motion.li
                              key={index}
                              variants={cardsAnimationVariants}
                          >
                              <Skeleton
                                  style={{
                                      borderRadius: 32,
                                      transition: 'all 0.3s ease-in-out',
                                  }}
                                  height={350}
                                  width={250}
                                  baseColor="var(--skeleton-base-color)"
                                  highlightColor="var(--skeleton-highlight-color)"
                              />
                          </motion.li>
                      );
                  })
                : choosedTimezones.map(timezone => (
                      <motion.li
                          key={timezone.id}
                          variants={cardsAnimationVariants}
                      >
                          <WatchCard
                              timezone={timezone}
                              amountOfChoosedTimezones={choosedTimezones.length}
                          />
                      </motion.li>
                  ))}

            {children}
        </motion.ul>
    );
};
