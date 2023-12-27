'use client';
import React, { useEffect, useState } from 'react';

type BookType = {
  id: number;
  volumeInfo: {
      title: string;
      authors: string[];
      categories: string[];
      imageLinks: {
          thumbnail: string;
      };
  },
  saleInfo: {
      listPrice: {
          amount: number;
      },
      retailPrice: {
          amount: number;
      }
  }
}

async function fetchBooks() {
  const params = new URLSearchParams({
    maxResults: '20',
    startIndex: '0',
  });
  const userId = process.env.USER_ID;
  const shelfId = process.env.SHELF_ID;

  const url = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves/${shelfId}/volumes?${params}`;

  try {
    const response = await fetch(url);
    const { items = [] } = await response.json();
    return items;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}

const Home = () => {
  const [books, setBooks] = useState<BookType[]>([]);

  useEffect(() => {
    const fetchBooksData = async () => {
      const booksData = await fetchBooks();
      setBooks(booksData);
    };

    fetchBooksData();
  }, []);

  return (
    <div>
      {books.map((book, bookIndex) => (
        <div key={bookIndex}>{book.id}</div>
      ))}
    </div>
  );
};

export default Home;