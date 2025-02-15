import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './Watch.module.scss';

interface WatchProps {
    className?: string;
    timezoneOffset: number;
}

export const Watch = (props: WatchProps) => {
    const { className = '', timezoneOffset } = props;

    const getTimeUTC0 = () => {
        return new Date(
            new Date().toISOString().slice(0, 19).replace('T', ' '),
        );
    };

    const [time, setTime] = useState(
        new Date(
            getTimeUTC0().setMinutes(
                getTimeUTC0().getMinutes() + timezoneOffset,
            ),
        ),
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(
                new Date(
                    getTimeUTC0().setMinutes(
                        getTimeUTC0().getMinutes() + timezoneOffset,
                    ),
                ),
            );
        }, 1000);

        return () => clearInterval(interval);
    }, [timezoneOffset]);

    const hourDegrees =
        (time.getHours() % 12) * 30 + time.getMinutes() * 0.5 + 90;
    const minuteDegrees = time.getMinutes() * 6 + time.getSeconds() * 0.1 + 90;
    const secondDegrees = time.getSeconds() * 6 + 90;

    const clockLabels = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    return (
        <div className={classNames(styles.watchBlock, [className])}>
            <div
                className={styles.watch}
                title={time.toTimeString().slice(0, 9)}
            >
                <div className={styles.watch_face}>
                    <ul>
                        {clockLabels.map((label, index) => (
                            <li
                                key={index}
                                className={styles.watch_face_label}
                                style={{
                                    transform: `rotate(${index * 30}deg)`,
                                }}
                            >
                                <span
                                    style={{
                                        transform: `rotate(${-index * 30}deg)`,
                                    }}
                                >
                                    {label}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <div
                        className={classNames(styles.hand, styles.second_hand)}
                        style={{ transform: `rotate(${secondDegrees}deg)` }}
                    ></div>
                    <div
                        className={classNames(styles.hand, styles.minute_hand)}
                        style={{ transform: `rotate(${minuteDegrees}deg)` }}
                    ></div>
                    <div
                        className={classNames(styles.hand, styles.hour_hand)}
                        style={{ transform: `rotate(${hourDegrees}deg)` }}
                    ></div>
                    <div className={styles.center}></div>
                </div>
            </div>
            <div className={styles.time}>{time.toTimeString().slice(0, 9)}</div>
        </div>
    );
};
