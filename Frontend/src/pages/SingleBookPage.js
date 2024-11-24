import React from 'react'
import BookDetails from '../components/books/BookDetails'

export default function SingleBookPage(prop) {
  const { wishList,
  setWishList,
  cartList,
  setCartList} = prop;
  return (
    <div>
      <BookDetails  wishList={wishList}
              setWishList={setWishList}
              cartList={cartList}
              setCartList={setCartList} />
    </div>
  )
}
