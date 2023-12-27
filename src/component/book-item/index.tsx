import Link from "next/link";
import styles from "./styles.module.css";
import Image from "next/image";

export interface BookType {
    id: number;
    volumeInfo: {
        title: string;
        authors: string[];
        categories: string[];
        imageLinks?: {
            thumbnail: string;
        };
    };
    saleInfo: {
        listPrice?: {
            amount: number;
        };
        retailPrice?: {
            amount: number;
        };
    };
}

function BookItem(props: BookType) {
    const { id, volumeInfo, saleInfo } = props;
    const { title, authors, categories } = volumeInfo;
    const listPrice = saleInfo?.listPrice?.amount;
    const retailPrice = saleInfo?.retailPrice?.amount;

    return (
        <Link
            href={`/${id}`}
            passHref
            className={styles.bookitem}
        >
            <div className={styles.bookitemImage}>
                <Image
                    src={`http://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=3`}
                    alt={title}
                    width={281}
                    height={384}
                    priority={true}
                    style={{ aspectRatio: 281 / 384 }}
                />
                {categories && (
                    <div className={styles.cardBadge}>
                        <span>{categories[0]}</span>
                    </div>
                )}
            </div>

            <div className={styles.bookItemInfo}>
                <div className={styles.cardLineOne}>
                    <div className={styles.bookName}>
                        <span>{title}</span>
                    </div>

                    <div className={styles.bookPrice}>
                        {retailPrice && (
                            <span className={styles.bookPriceSale}>
                                ${retailPrice}
                            </span>
                        )}
                        {retailPrice !== listPrice && listPrice && (
                            <span className={styles.bookPriceRetail}>
                                ${listPrice}
                            </span>
                        )}
                    </div>
                </div>

                {authors && (
                    <div className={styles.bookAuthor}>
                        <span>{authors[0]}</span>
                    </div>
                )}
            </div>
        </Link>
    );
}

export default BookItem;