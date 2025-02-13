import React from 'react';
import classNames from 'classnames';

import { toolsEnum } from '@/shared/libs/enums';

import styles from './CircleChip.module.scss';

interface CircleChipProps {
    className?: string;
    tool: toolsEnum;
}

export const CircleChip = (props: CircleChipProps) => {
    const { className = '', tool } = props;

    return (
        <div className={classNames(styles.circleChip, [className])}>
            <img
                className={styles.img}
                src={`/icons/${tool}.svg`}
                alt={tool}
                title={tool}
                draggable={false}
            />
        </div>
    );
};
