import React from 'react';
import PropTypes from 'prop-types';

const Book = (props) => {
  const {
    authors,
    id,
    imageLinks: { thumbnail },
    shelf,
    title,
    shelves,
    onUpdateBook
  } = props;

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail}` }} />
        <div className="book-shelf-changer">
          <select value={shelf} onChange={(e) => onUpdateBook({ id }, e.target.value)}>
            <option value="none" disabled>Move to...</option>
            {shelves.map(shelf =>
              <option key={shelf} value={shelf}>{breakWord(shelf)}</option>
            )}
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors.join(", ")}</div>
    </div>
  );
};

Book.defaultProps = {
  authors: [],
  imageLinks: { thumbnail: "http://books.google.com/books/content?id=notfound&printsec=frontcover&img=1&zoom=1&source=gbs_api" },
  shelf: "none"
};

Book.propTypes = {
  info: PropTypes.shape({
    authors: PropTypes.array,
    id: PropTypes.string.isRequired,
    imageLinks: PropTypes.object,
    shelf: PropTypes.string,
    title: PropTypes.string.isRequired
  }),
  shelves: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired
};

export const sortBooks = (books, shelf) =>
books.filter(book => book.shelf === shelf)

export const breakWord = (word) =>
word
  .replace(/([A-Z])/g, ' $1')
  .replace(/^./, function(str){ return str.toUpperCase(); })

export default Book;
