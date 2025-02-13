import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { contactsEnum } from '@/shared/libs/enums';

import styles from './ContactChip.module.scss';

interface ContactChipProps {
    className?: string;
    contact: contactsEnum;
    link: string;
}

export const ContactChip = (props: ContactChipProps) => {
    const { className = '', contact, link } = props;

    return (
        <Link
            to={link}
            target="_blank"
            className={classNames(styles.contactChip, [className])}
        >
            <img
                className={styles.contactChip_img}
                src={`/icons/${contact}.svg`}
                alt={contact}
                title={contact}
                draggable={false}
            />
        </Link>
    );
};
