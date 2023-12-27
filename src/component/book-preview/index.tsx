import { useState } from "react";
import { Modal } from "@/component/modal";
import styles from './styles.module.css';

type BookPreviewProps = {
    title: string;
    link: string;
}

const BookPreview = ({ title, link }: BookPreviewProps) => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    return (
        <>
            <button
                className={styles.bookDetailPreviewButton}
                onClick={handleModalOpen}
            >
                <span className={styles.bookDetailPreviewButtonSpan}>Preview</span>
            </button>

            <Modal
                portalId="bookPreview"
                open={modalOpen}
                setOpen={setModalOpen}
                title={`${title} Preview`}
            >
                <iframe
                    src={link}
                    title={title}
                    className={styles.bookDetailPreviewIframe}
                ></iframe>
            </Modal>
        </>
    );
};

export default BookPreview;