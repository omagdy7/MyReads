import "./App.css";
import React ,{ useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI.js"
import Header from "./Header.js"
import Shelves from "./Shelves.js"
import Book from "./Book";

function App() {

  useEffect(() => {
    BooksAPI.getAll().then(
      data => 
      {
        console.log(data)
        setBooks(data)
      }
    );
  }, [])

  // const  intialBooks = [
  //   {
  //     url: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
  //     title: "To Kill a Mockingbird",
  //     author: "Harper Lee",
  //     shelf: "currentlyReading",
  //   },
  // ]

  const [showSearchPage, setShowSearchpage] = useState(false);

  const [books, setBooks] = useState([])

  const handleShelfChange = (book, newShelf) => {
    const newBooks = books.map((b) => {
      if(b.id === book.id) {
        book.shelf = newShelf;
        return book;
      }
      return b;
    })
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
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
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
