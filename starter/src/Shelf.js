import react from "react";
import Book from "./Book.js"

const Shelf = ({title, books, changeBookShelf}) => {

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(bk => (
            <li key={bk.id}>
              <Book book={bk} changeBookShelf={changeBookShelf}/>
            </li>
          ))}
        </ol>
    </div>
    </div>
  );
}

export default Shelf;
