import React from 'react';
import classNames from 'classnames';

import { deleteTimezoneById } from '@/features';
import { Watch } from '@/shared/ui/Watch';
import { TimezoneSelector } from '@/shared/ui/Selectors';
import { Button } from '@/shared/ui/Buttons';
import { useAppDispatch, useAppSelector } from '@/shared/libs/hooks';
import { timezoneType } from '@/shared/libs/types';

import DeleteIcon from '@/shared/assets/icons/delete.svg';

import styles from './WatchCard.module.scss';

interface WatchCardProps {
    className?: string;
    timezone: timezoneType;
    amountOfChoosedTimezones: number;
}

export const WatchCard = (props: WatchCardProps) => {
    const { className = '', timezone, amountOfChoosedTimezones } = props;

    const dispatch = useAppDispatch();

    const deleteWatchHandle = (id: number) => {
        dispatch(deleteTimezoneById(id));
    };

    return (
        <div className={classNames(styles.watchCard, [className])}>
            <Watch timezoneOffset={timezone.timezoneOffset} />
            <TimezoneSelector choosedTimezone={timezone} />
            {amountOfChoosedTimezones - 1 > 0 ? (
                <Button
                    onClick={() => {
                        deleteWatchHandle(timezone.id);
                    }}
                >
                    <DeleteIcon />
                </Button>
            ) : (
                ''
            )}
        </div>
    );
};
