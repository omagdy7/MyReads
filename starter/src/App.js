import "./App.css";
import React ,{ useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI.js"
import Header from "./Header.js"
import Shelves from "./Shelves.js"
import Book from "./Book";

function App() {

  const [showSearchPage, setShowSearchpage] = useState(false);

  const [books, setBooks] = useState([]);

  const [searchBooks, setSearchBooks] = useState([]);

  const [booksSuperSet, setBooksSuperSet] = useState([]);

  const [mapOfIdToBooks, setMapOfIdToBooks] = useState(new Map());

  const [query, setQuery] = useState("");

  useEffect(() => {
    BooksAPI.getAll().then(
      data => 
      {
        console.log(data)
        setBooks(data)
      }
    );
  }, [])

  //searching for books
  useEffect(() => {
    let isActive = true;
    if(query) {
    BooksAPI.search(query).then(
      data => {data.error ? setSearchBooks([]) : isActive && setSearchBooks(data)}
    );
    }
    return () => {
      isActive = false;
      setSearchBooks([]);
    }

  },[query])

  useEffect(() => {
    const combined = searchBooks.map(book => {
      if (mapOfIdToBooks.has(book.id)) {
        return mapOfIdToBooks.get(book.id);
      } else {
        return book;
      }
    })
    setBooksSuperSet(combined);
  }, [searchBooks])






  const createMapOfBooks = (books) => {
    const map = new Map();
    books.map(book => map.set(book.id, book));
    return map;
  }

  const handleShelfChange = (book, newShelf) => {
    const newBooks = books.map((b) => {
      if(b.id === book.id) {
        book.shelf = newShelf;
        return book;
      }
      return b;
    })
    if (!mapOfIdToBooks.has(book.id)) {
      book.shelf = newShelf;
      newBooks.push(book)
    }
    setBooks(newBooks);
    BooksAPI.update(book, newShelf);
  }



  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                value={query} onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
              {booksSuperSet.map(bk => (
                <li key={bk.id}>
                  <Book book={bk} changeBookShelf={handleShelfChange}/>
                </li>
              ))}
          </div>
        </div>
      ) : (
        <div className="list-books">
          <Header />
          <div className="list-books-content">
            <Shelves books={books} changeBookShelf={handleShelfChange}/>
            <div className="open-search">
              <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
            </div>
          </div>
      </div>
      )}
      </div>
  )
  }



export default App;
