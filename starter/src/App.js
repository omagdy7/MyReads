import "./App.css";
import React ,{ useState, useEffect } from "react";
import { BrowserRouter , Routes, Route, Link } from 'react-router-dom';
import * as BooksAPI from "./BooksAPI.js"
import Header from "./Header.js"
import Shelves from "./Shelves.js"
import Book from "./Book";

function App() {

  const [books, setBooks] = useState([]);

  const [searchBooks, setSearchBooks] = useState([]);

  const [booksSuperSet, setBooksSuperSet] = useState([]);

  const [mapOfIdToBooks, setMapOfIdToBooks] = useState(new Map());

  const [query, setQuery] = useState("");

  useEffect(() => {
    BooksAPI.getAll().then(
      data => 
      {
        setBooks(data)
        setMapOfIdToBooks(createMapOfBooks(data));
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


  const Home = () => {
    return (
      <div className="Home">
        <Header />
        <div className="list-books">
          <div className="list-books-content">
            <Shelves books={books} changeBookShelf={handleShelfChange}/>
            <div className="open-search">
              <Link to="/search">
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/search" element={
          <div className="search-books">
            <div className="search-books-bar">
            <Link to="/">
                <button className="close-search">Close</button>
            </Link>
              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  placeholder="Search by title, author, or ISBN"
                  value={query} onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {booksSuperSet.map(bk => (
                  <li key={bk.id}>
                    <Book book={bk} changeBookShelf={handleShelfChange}/>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        }/>
      </Routes>
    </div>
  )
}

export default App;
