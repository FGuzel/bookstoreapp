import Image from "next/image";
import styles from './styles.module.css';

async function getBooksDetails(id: number) {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
    return response.json();
}

interface PageProps<T = any> {
    params: T;
    searchParams: URLSearchParams;
}

export default async function Page({ params }: PageProps<{ id: number }>) {
    const bookDetail = await getBooksDetails(params.id);
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
                        <span>{authors[0]} | {categories}</span>
                    </div>

                    <div className={styles.bookDetailTitle}>
                        <span>{title}</span>
                    </div>

                    <div className={styles.bookDetailRating}>
                        <span><b>SKU:</b> {bookDetail.etag}</span>
                    </div>

                    <div
                        className={styles.bookDetailDescription}
                        dangerouslySetInnerHTML={{
                            __html: description
                        }}
                    />

                    {saleability === 'FOR_SALE' ? (
                        <div className={styles.bookDetailAddToBasket}>
                            <button className={styles.bookDetailAddToBasketText}>Add to Bag</button>
                            <div className={styles.bookDetailAddToBasketPrice}>
                                <span className={styles.bookDetailAddToBasketPriceSale}>{retailPrice && retailPrice.amount}</span>
                                <span className={styles.bookDetailAddToBasketPriceRetail}>{listPrice && listPrice.amount}</span>
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
                            <tr>
                                <td>Language</td>
                                <td>{language}</td>
                            </tr>
                            <tr>
                                <td>Book Name</td>
                                <td>{title}</td>
                            </tr>
                            <tr>
                                <td>Author</td>
                                <td>{authors[0]}</td>
                            </tr>
                            <tr>
                                <td>Publisher</td>
                                <td>{publisher}</td>
                            </tr>
                            <tr>
                                <td>Published Date</td>
                                <td>{publishedDate}</td>
                            </tr>
                            <tr>
                                <td>PageCount</td>
                                <td>{pageCount}</td>
                            </tr>
                        </tbody>
                    </table>

                    <table className={styles.bookDetailTable}>
                        <tbody>
                            <tr>
                                <td>Printed Page Count</td>
                                <td>{printedPageCount}</td>
                            </tr>
                            <tr>
                                <td>Dimensions</td>
                                <td>Height: {dimensions.height}, Width: {dimensions.width}</td>
                            </tr>
                            <tr>
                                <td>Categories</td>
                                <td>{categories}</td>
                            </tr>
                            <tr>
                                <td>Country</td>
                                <td>{country}</td>
                            </tr>
                            <tr>
                                <td>Saleability</td>
                                <td>{saleability}</td>
                            </tr>
                            <tr>
                                <td>Is E-book?</td>
                                <td>{isEbook}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}