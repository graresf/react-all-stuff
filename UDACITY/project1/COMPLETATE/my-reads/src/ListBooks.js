import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookList from './BookList';
import { sortBooks, breakWord } from './Book';

const ListBooks = (props) => {
  const { books, shelves, onUpdateBook } = props;
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {shelves.map(shelf => (
          <div key={shelf} className="bookshelf">
            <h2 className="bookshelf-title">{breakWord(shelf)}</h2>
            <div className="bookshelf-books">
              <BookList
                books={sortBooks(books, shelf)}
                shelves={shelves}
                onUpdateBook={onUpdateBook} />
            </div>
          </div>
        ))}
      </div>
      <div className="open-search">
        <Link to="/search" className="search-books">Add a book</Link>
      </div>
    </div>
  );
};

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired
};

export default ListBooks;
