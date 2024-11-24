import React from "react";
import WishList from "../components/wishlist/WishList";

export default function WishListPage(props) {
  const { wishList, bookList, setWishList } = props;
  return (
    <div>
      <WishList wishList={wishList} bookList={bookList} setWishList={setWishList}/>
    </div>
  );
}