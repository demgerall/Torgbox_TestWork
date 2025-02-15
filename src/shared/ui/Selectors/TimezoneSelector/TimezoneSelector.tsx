import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { changeTimezoneById } from '@/features';
import { useAppDispatch, useAppSelector } from '@/shared/libs/hooks';
import { timezoneType } from '@/shared/libs/types';

import styles from './TimezoneSelector.module.scss';

interface TimezoneSelectorProps {
    className?: string;
    choosedTimezone: timezoneType;
}

export const TimezoneSelector = (props: TimezoneSelectorProps) => {
    const { className = '', choosedTimezone } = props;

    const dispatch = useAppDispatch();

    const { availableTimezones } = useAppSelector(({ timezones }) => timezones);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedTimezone, setSelectedTimezone] =
        useState<timezoneType>(choosedTimezone);

    const selectorRef = useRef<HTMLDivElement>(null);

    const handleTimezoneChange = (timezone: timezoneType) => {
        setSelectedTimezone(timezone);
        dispatch(changeTimezoneById([selectedTimezone.id, timezone.id]));
        console.log(selectedTimezone);
        setIsOpen(false);
    };

    const onKeydownHandler = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        },
        [setIsOpen],
    );

    const handleClickOutside = (event: MouseEvent) => {
        if (
            selectorRef.current &&
            !selectorRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeydownHandler);
        }

        return () => {
            window.removeEventListener('keydown', onKeydownHandler);
        };
    }, [isOpen, onKeydownHandler]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            className={classNames(styles.timezoneSelector, [className])}
            ref={selectorRef}
        >
            <div
                className={styles.timezoneSelector__selected}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{choosedTimezone.name}</span>
            </div>

            {isOpen && (
                <ul className={styles.options}>
                    {availableTimezones.map((timezone, index) => (
                        <li
                            key={index}
                            className={styles.options_option}
                            onClick={() => handleTimezoneChange(timezone)}
                        >
                            <span>{timezone.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
