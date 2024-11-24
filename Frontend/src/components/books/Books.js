import React from "react";
import SingleBook from "./SingleBook";
import BooksPagination from "./BooksPagination";
import "./Books.css";
import Form from "../form/Form";
import PriceRangeForm from "../form/PriceRangeForm";



export default function Books(prop) {
  const {
    bookList,
    page,
    handleChange,
    totalPages,
    wishList,
    setWishList,
    cartList,
    setCartList,
    setSearchByTitle,
    searchByTitle,
    setMinPrice,
    setMaxPrice,
  } = prop;
  return (
    <div>
      <div className="book-list-header">
        <div className="quote-overlay">
          <p>
            "The more that you read, the more things you will know. <br />
            The more that you learn, the more places you'll go."
          </p>
        </div>
      </div>


      <div className="form-container">
  <h3>Dive into the World of Books</h3>
  <div className="form-section">
    <Form setSearchByTitle={setSearchByTitle} searchByTitle={searchByTitle} />
    <PriceRangeForm setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
  </div>
</div>
     
      <div className="bookList">
        {bookList.map((book) => {
          return (
            <SingleBook
              key={book.bookId}
              book={book}
              wishList={wishList}
              setWishList={setWishList}
              cartList={cartList}
              setCartList={setCartList}
            />
          );
        })}
      </div>
      <BooksPagination
        page={page}
        handleChange={handleChange}
        totalPages={totalPages}
      />
    </div>
  );
}
