'use client';
import Image from "next/image";
import styles from './styles.module.css';
import { useEffect, useState } from "react";

async function getBooksDetails(id: number) {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
    return response.json();
}

function TableRow({ label, value }: { label: string; value: string | number }) {
    return value && (
        <tr>
            <td>{label}</td>
            <td>{value}</td>
        </tr>
    );
}

interface PageProps<T = any> {
    params: T;
    searchParams: URLSearchParams;
}

export default function BookDetail({ params }: PageProps<{ id: number }>) {
    const [bookDetail, setBookDetail] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            const fetchedBookDetail = await getBooksDetails(params.id);
            setBookDetail(fetchedBookDetail);
        }
        fetchData();
    }, [params.id]);

    if (!bookDetail) {
        return null;
    }

    const {
        title,
        authors,
        publisher,
        publishedDate,
        description,
        pageCount,
        printedPageCount,
        dimensions,
        categories,
        language,
        infoLink
    } = bookDetail.volumeInfo;
    const {
        country,
        saleability,
        isEbook,
        listPrice,
        retailPrice,
    } = bookDetail.saleInfo;
    const readLink = bookDetail.accessInfo.webReaderLink;

    return (
        <div className={styles.bookDetailWrapper}>
            <div className={styles.bookDetailWrapperTop}>
                <div className={styles.bookDetailImage}>
                    <Image
                        src={`http://books.google.com/books/content?id=${bookDetail.id}&printsec=frontcover&img=1&zoom=3`}
                        alt={title}
                        width={840}
                        height={100}
                        unoptimized
                    />
                </div>

                <div className={styles.bookDetailInfo}>
                    <div className={styles.bookDetailSubTitle}>
                        <span>{authors?.[0]} {categories?.[0] && `| ${categories[0]}`}</span>
                    </div>

                    <div className={styles.bookDetailTitle}>
                        <span>{title}</span>
                    </div>

                    <div className={styles.bookDetailRating}>
                        <span><b>SKU:</b> {bookDetail.etag}</span>
                    </div>

                    {description &&
                        <div
                            className={styles.bookDetailDescription}
                            dangerouslySetInnerHTML={{
                                __html: description
                            }}
                        />
                    }

                    {saleability === 'FOR_SALE' ? (
                        <div className={styles.bookDetailAddToBasket}>
                            <button className={styles.bookDetailAddToBasketText}>Add to Bag</button>
                            <div className={styles.bookDetailAddToBasketPrice}>
                                <span className={styles.bookDetailAddToBasketPriceSale}>{retailPrice?.amount && `$${retailPrice.amount}`}</span>
                                {retailPrice?.amount !== listPrice?.amount &&
                                    <span className={styles.bookDetailAddToBasketPriceRetail}>{listPrice?.amount && `$${listPrice.amount}`}</span>
                                }
                            </div>
                        </div>
                    ) : (
                        <div className={styles.bookDetailAddToBasket}>
                            <span className={styles.bookDetailAddToBasketText}>Out of Stock</span>
                        </div>
                    )}

                    <div className={styles.bookDetailDiscount}>
                        <span>{publisher} | {publishedDate}</span>
                    </div>

                    <div className={styles.bookDetailRating}>
                        <span><b>Info Link:</b> {infoLink}</span>
                    </div>
                </div>
            </div>

            <div className={styles.bookDetailWrapperBottom}>
                <div className={styles.bookDetailTabWrapper}>
                    <span className={styles.bookDetailTabItemLink}>Information</span>
                </div>
                <div className={styles.bookDetailTableContent}>
                    <table className={styles.bookDetailTable}>
                        <tbody>
                            <TableRow label="Language" value={language} />
                            <TableRow label="Book Name" value={title} />
                            <TableRow label="Author" value={authors?.[0] ?? 'None'} />
                            <TableRow label="Publisher" value={publisher} />
                            <TableRow label="Published Date" value={publishedDate} />
                            <TableRow label="PageCount" value={pageCount} />
                        </tbody>
                    </table>
                    <table className={styles.bookDetailTable}>
                        <tbody>
                            <TableRow label="Printed Page Count" value={printedPageCount} />
                            <TableRow label="Categories" value={categories?.[0] ?? 'None'} />
                            <TableRow label="Country" value={country} />
                            <TableRow label="Saleability" value={saleability === 'NOT_FOR_SALE' ? 'No' : 'Yes'} />
                            <TableRow label="Is E-book?" value="Yes" />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}