import { ChangeEvent, useState } from 'react';
import styles from "./styles.module.css";
import BookItem from '../book-item';

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

export const Search = ({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState<BookType[]>([]);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams(
                {
                    q: searchTerm,
                    maxResults: '3'
                }
            );

            const url = `https://www.googleapis.com/books/v1/volumes?${params}`;
            const request = await fetch(url);
            const response = await request.json();
            setSearchResult(response.items || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSubmit();
    };


    return (
        <div>
            <form
                onSubmit={handleFormSubmit}
                className={styles.searchForm}
            >
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    className={styles.searchInput}
                />
                <button
                    type="submit"
                    className={styles.searchSubmit}
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Submit'}
                </button>
            </form>

            {searchResult.length > 0 &&
                <div>
                    <div className={styles.searchResultTitle}>
                        <span className={styles.searchResultTitleText}>Results for</span>
                        <span className={styles.searchResultTitleTerm}>{searchTerm}:</span>
                    </div>

                    <div
                        className={styles.searchResultItem}
                        onClick={() => setIsOpen(false)}
                    >
                        {searchResult.map((resultItem) => (
                            <BookItem key={resultItem.id} {...resultItem} />
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}