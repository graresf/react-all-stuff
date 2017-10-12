import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookList = (props) => {
  const { books, shelves, onUpdateBook } = props;
  return (
    <ol className="books-grid">
      {books.map(book => {
        const {
          authors,
          id,
          imageLinks,
          shelf,
          title
        } = book;

        return (
          <li key={book.id}>
            <Book
              authors={authors}
              id={id}
              imageLinks={imageLinks}
              shelf={shelf}
              title={title}
              shelves={shelves}
              onUpdateBook={onUpdateBook} />
          </li>
        );
      })}
    </ol>
  );
};

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired
};

export default BookList;
