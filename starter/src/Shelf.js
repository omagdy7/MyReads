import react from "react";
import Book from "./Book.js"

const Shelf = ({books}) => {

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Currently Reading</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(bk => (
            <li>
              <Book book={bk} />
            </li>
          ))}
        </ol>
    </div>
    </div>
  );
}

export default Shelf;
