'use client';
import React, { useEffect, useState } from 'react';
import BookItem from '@/component/book-item';
import { BookType } from '@/component/types/allTypes';

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
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

export default Home;