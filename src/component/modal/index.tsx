import { useEffect } from 'react';
import styles from './styles.module.css';
import ReactPortal from '../react-portal';

export interface ModalProps {
    portalId: string;
    children?: React.ReactNode;
    open?: boolean;
    setOpen?: (open: boolean) => void;
    title?: React.ReactNode;
}

export const Modal = ({
    children,
    portalId,
    open,
    setOpen,
    title = '',
}: ModalProps) => {
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : 'auto';
    }, [open]);

    const handleClose = () => {
        setOpen?.(false);
    };

    if (!open) return null;

    return (
        <ReactPortal wrapperId={portalId}>
            <div
                className={styles.modal}
                onClick={handleClose}
            />
            <section className={styles.modalWrapper}>
                {title && (
                    <div className={styles.modalHeader}>
                        <span>{title}</span>
                    </div>
                )}

                <div className={styles.modalContent}>
                    {children}
                </div>

                <div>
                    <button
                        type="button"
                        className={styles.modalFooter}
                        onClick={handleClose}
                    >
                        Close
                    </button>
                </div>
            </section>
        </ReactPortal>
    );
};