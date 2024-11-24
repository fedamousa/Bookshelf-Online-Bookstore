import React from "react";
import Books from "../components/books/Books";


export default function BooksPage(prop) {
  const {
    bookList,
    page,
    handleChange,
    totalPages,
    searchByTitle,
    setSearchByTitle,
    wishList,
    setWishList,
    setMinPrice,
    setMaxPrice,
    cartList,
    setCartList
  } = prop;

  return (
    <div>
         
      <Books
        bookList={bookList}
        page={page}
        handleChange={handleChange}
        totalPages={totalPages}
        wishList={wishList}
        setWishList={setWishList}
        cartList={cartList}
        setCartList={setCartList}
        setSearchByTitle={setSearchByTitle} 
        searchByTitle={searchByTitle}
        setMinPrice={setMinPrice} 
        setMaxPrice={setMaxPrice}
      />
    </div>
  );
}
