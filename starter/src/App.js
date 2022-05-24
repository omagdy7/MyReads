import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import * as BooksAPI from "./BooksAPI.js"
import Header from "./components/Header.js"
import Shelves from "./components/Shelves.js"
import Book from "./components/Book";

function App() {

  const [books, setBooks] = useState([]);

  const [searchBooks, setSearchBooks] = useState([]);

  const [booksSuperSet, setBooksSuperSet] = useState([]);

  const [idToBooks, setIdToBooks] = useState(new Map());

  const [query, setQuery] = useState("");


  //Fetching books from the database
  useEffect(() => {
    BooksAPI.getAll().then(
      data => 
      {
        setBooks(data)
        setIdToBooks(generateBooksDictionary(data));
      }
    );
  }, [])

  //searching for books
  useEffect(() => {
    let flag = true;
    if(query) {
    BooksAPI.search(query).then(
      data => {data.error ? setSearchBooks([]) : flag && setSearchBooks(data)}
    );
    }
    return () => {
      flag = false;
      setSearchBooks([]);
    }

  },[query])


  useEffect(() => {
    const superSet = searchBooks.map(book => {
      if (idToBooks.has(book.id)) {
        return idToBooks.get(book.id);
      } else {
        return book;
      }
    })
    setBooksSuperSet(superSet);
  }, [searchBooks])



  const handleShelfChange = (book, newShelf) => {
    const newBooks = books.map((b) => {
      if(b.id === book.id) {
        book.shelf = newShelf;
        return book;
      }
      return b;
    })
    if (!idToBooks.has(book.id)) {
      book.shelf = newShelf;
      newBooks.push(book)
    }
    setBooks(newBooks);
    BooksAPI.update(book, newShelf);
  }

  const generateBooksDictionary = (books) => {
    const dict = new Map();
    books.map(bk => dict.set(bk.id, bk));
    return dict;
  }

  const Home = () => {
    return (
      <div className="Home">
        <Header />
        <div className="list-books">
          <div className="list-books-content">
            <Shelves books={books} updateBookShelf={handleShelfChange}/>
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
        <Route path="/search" element=
        {
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
                    <Book book={bk} updateBookShelf={handleShelfChange}/>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        }
          />
      </Routes>
    </div>
  )
}

export default App;
