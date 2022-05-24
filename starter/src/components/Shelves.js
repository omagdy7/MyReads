import Shelf from "./Shelf.js";

const Shelves = ({books, updateBookShelf}) => {
  return (
    <div>
      <Shelf title="Currently Reading" 
        books={books.filter((bk) => bk.shelf === "currentlyReading")}
       updateBookShelf={updateBookShelf}/>
      <Shelf title="Want to read" 
        books={books.filter((bk) => bk.shelf === "wantToRead")}
       updateBookShelf={updateBookShelf}/>
      <Shelf title="Read" 
        books={books.filter((bk) => bk.shelf === "read")}
       updateBookShelf={updateBookShelf}/>
    </div>
  )
}

export default Shelves;
