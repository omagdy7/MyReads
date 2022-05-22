import react from "react";
import Shelf from "./Shelf.js";

const Shelves = ({books, changeBookShelf}) => {

  const currentlyReading = books.filter((book) => 
    book.shelf === "currentlyReading"
  );
  const wantToRead = books.filter((book) => 
    book.shelf === "wantToRead"
  );
  const read = books.filter((book) => 
    book.shelf === "read"
  );

  return (
    <div>
      <Shelf title="Currently Reading" books={currentlyReading} changeBookShelf={changeBookShelf}/>
      <Shelf title="Want To Read" books={wantToRead} changeBookShelf={changeBookShelf}/>
      <Shelf title="Read" books={read} changeBookShelf={changeBookShelf}/>
    </div>

  )
}

export default Shelves;
