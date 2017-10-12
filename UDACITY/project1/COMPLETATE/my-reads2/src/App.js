import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import { getAll, update } from './BookAPI';
import './App.css';

export default class App extends Component {
  state = {
    books: [],
    shelves: ["currentlyReading", "wantToRead", "read"]
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks() {
    getAll().then(books =>
      this.setState({ books })
    );
  }

  updateBook = (book, shelf) => {
    update(book, shelf).then(() => {
      this.getBooks();
    });
  }

  render() {
    const { books, shelves } = this.state;

    return (
      <div className="app">
        <main className="content">
          <Route exact path="/" render={() => (
            <ListBooks books={books} shelves={shelves} onUpdateBook={this.updateBook} />
           )} />
          <Route exact path="/search" render={() => (
            <SearchBooks categorizedBooks={books} shelves={shelves} onUpdateBook={this.updateBook} />
          )} />
        </main>
      </div>
    );
  }
}
