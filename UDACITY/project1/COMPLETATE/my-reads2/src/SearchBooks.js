import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookList from './BookList';
import { search } from './BookAPI';
import DebounceInput from 'react-debounce-input';
const ERROR_EMPTY_QUERY = "empty query";

const addShelfToBooks = (categorizedBooks, uncategorizedBooks) => {
  const shelfLookup =
    categorizedBooks.reduce((acc, book) => ({ ...acc, [book.id]: book.shelf }), {});
  return uncategorizedBooks.map(book => ({ ...book, shelf: shelfLookup[book.id] }));
};

export default class SearchBooks extends Component {
  state = {
    books: [],
    error: '',
    query: ''
  }

  static propTypes = {
    categorizedBooks: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  searchBooks(query) {
    this.setState({ query, error: '' });

    if(query.length < 1) {
      this.setState({ books: [] });
      return;
    }

    search(query, 20).then(books => {
      if (Array.isArray(books)) {
        this.setState({ books });
        return;
      }

      switch(books.error) {
        case ERROR_EMPTY_QUERY:
          this.setState({ error: "No books found." });
          break;
        default:
          this.setState({ error: books.error });
      }
    });
  }

  render() {
    const { books, error, query } = this.state;
    const { categorizedBooks, shelves, onUpdateBook } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              placeholder="Search by title or author"
              debounceTimeout={300}
              value={query}
              onChange={(e) => this.searchBooks(e.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          {error !== '' ? (
            <h2>{error}</h2>
          ) : (
            <BookList
              books={addShelfToBooks(categorizedBooks, books)}
              shelves={shelves}
              onUpdateBook={onUpdateBook} />
          )}
        </div>
      </div>
    );
  }
}

