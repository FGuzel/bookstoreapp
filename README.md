This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To start the development server, run the following command:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then, open http://localhost:3000 in your browser to view the result.

## Project Overview
Before starting the project, I created a bookshelf in my Google Books account with more than 10 books. Although I'm not a seller, I simulated being one to filter the books I wanted to display on the website.

You can view my bookshelf [here](https://books.google.com/books?uid=107913319159418324569&as_coll=1001).

For Google Books API documentation, refer to [this link](https://developers.google.com/books/docs/v1/using?hl=en).

## Features Included
- Filtered books are listed on the homepage, with a maximum of 20 books displayed (similar to a product list page of an e-commerce site).
- Redirection to a detail page is enabled for each book item, showing specific book details based on the URL-specified ID.
- The detail page presents general and detailed book information. Additionally, an embedded iframe in a modal allows users to view the first few pages of books in PDF format.
- Completed the search functionality enabling users to search for book names, categories, or authors within the Google Books database. The search displays a maximum of 3 results within a modal, limited to a maximum of 3 displayed items. Clicking on a search result directs the user to the book detail page, regardless of library registration.

## Project Status
The project is still in its draft stage. Despite the ease of coding the design, I lack design skills. I apologize in advance for any parts of the project that may be visually challenging as it was developed without a designer.

Note: Tailwind CSS is used as the UI framework for the project.