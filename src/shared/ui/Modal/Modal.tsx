import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type React from 'react';
import classNames from 'classnames';

import { ModalControls } from '@/shared/ui/Modal/ModalControls';
import { Portal } from '@/shared/ui/Portal';

import styles from './Modal.module.scss';

interface ModalProps {
    children?: ReactNode;
    className?: string;
    isOpen: boolean;
    onClose?: () => void;
}

const ANIMATION_DELAY = 250;

export const Modal = (props: ModalProps) => {
    const { children, className = '', isOpen = false, onClose } = props;

    const [isClosing, setIsClosing] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    const onCloseHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    const onContentHandler = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const onKeydownHandler = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onCloseHandler();
            }
        },
        [onCloseHandler],
    );

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeydownHandler);
        }

        return () => {
            window.removeEventListener('keydown', onKeydownHandler);
            clearTimeout(timerRef.current);
        };
    }, [isOpen, onKeydownHandler]);

    if (!isOpen) return null;

    return (
        <Portal>
            <div
                className={classNames(styles.modal, [
                    className,
                    isOpen ? styles.modal__opened : '',
                    isClosing ? styles.modal__is_closing : '',
                ])}
            >
                <div className={styles.overlay} onClick={onCloseHandler}>
                    <div className={styles.content} onClick={onContentHandler}>
                        <div className={classNames(styles.controls)}>
                            <ModalControls onClick={onCloseHandler} />
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
