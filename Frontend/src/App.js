import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";

import Layout from "./components/layout/LayOut";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import SingleBookPage from "./pages/SingleBookPage";
import NotFoundPage from "./pages/NotFoundPage";
import WishListPage from "./pages/WishListPage";
import UserRegister from "./components/user/UserRegister";
import UserLogin from "./components/user/UserLogin";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/user/ProtectedRoute";
import DashBoard from "./components/dashBoard/DashBoard";
import BookDashBoard from "./components/dashBoard/BookDashBoard";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import UserOrderHistory from "./components/orders/UserOrderHistory";
import UserDashBoard from "./components/dashBoard/UserDashBoard";
import OrderDashBoard from "./components/dashBoard/OrderDashBoard";

const cartLocalStorage = JSON.parse(localStorage.getItem("cartList") || "[]");
const wishListLocalStorage = JSON.parse(
  localStorage.getItem("wishList") || "[]"
);
function App() {
  // Main application state
  const [bookResponse, setBookResponse] = useState({
    books: [],
    totalBooks: 0,
  });
  const [searchByTitle, setSearchByTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishList, setWishList] = useState(wishListLocalStorage);
  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const [cartList, setCartList] = useState(cartLocalStorage);

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }, [cartList]);

  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(wishList));
  }, [wishList]);
  // User authentication state
  const [userData, setUserData] = useState(null);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);
  const isAuthenticated = Boolean(userData);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const limit = 10;
  const offset = (page - 1) * limit;
  const totalPages = Math.ceil(bookResponse.totalBooks / limit);

  const getBookUrl = (searchByTitle) => {
    let booksUrl = `https://sda-3-online-backend-teamwork-2-be3r.onrender.com/api/v1/Books?offset=${offset}&limit=${limit}`;
    if (searchByTitle) booksUrl += `&searchByTitle=${searchByTitle}`;
    if (minPrice) {
      booksUrl += `&minPrice=${minPrice}`;
    }
    if (maxPrice) {
      booksUrl += `&maxPrice=${maxPrice}`;
    }
    return booksUrl;
  };

  const getData = () => {
    setLoading(true);
    axios
      .get(getBookUrl(searchByTitle))
      .then((response) => {
        setBookResponse(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const getUserData = () => {
    setIsUserDataLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get("https://sda-3-online-backend-teamwork-2-be3r.onrender.com/api/v1/users/auth", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUserData(res.data);
        setIsUserDataLoading(false);
      })
      .catch((err) => {
        setIsUserDataLoading(false);
        console.error(err);
      });
  };

  useEffect(() => {
    getData();
  }, [offset, limit, searchByTitle, minPrice, maxPrice]);

  useEffect(() => {
    getUserData();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout
          isAuthenticated={isAuthenticated}
          userData={userData}
          wishList={wishList}
          cartList={cartList}
        />
      ),
      children: [
        { path: "/", element: <HomePage /> },
        {
          path: "/books",
          element: (
            <BooksPage
              bookList={bookResponse.books}
              page={page}
              handleChange={handleChange}
              totalPages={totalPages}
              searchByTitle={searchByTitle}
              setSearchByTitle={setSearchByTitle}
              wishList={wishList}
              setWishList={setWishList}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              cartList={cartList}
              setCartList={setCartList}
            />
          ),
        },
        {
          path: "/books/:bookId",
          element: (
            <SingleBookPage
              wishList={wishList}
              setWishList={setWishList}
              cartList={cartList}
              setCartList={setCartList}
            />
          ),
        },
        {
          path: "/wishList",
          element: (
            <WishListPage
              wishList={wishList}
              bookList={bookResponse.books}
              setWishList={setWishList}
            />
          ),
        },
        { path: "/register", element: <UserRegister /> },
        { path: "/login", element: <UserLogin getUserData={getUserData} /> },
        {
          path: "/profile",
          element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              element={
                <ProfilePage userData={userData} setUserData={setUserData} />
              }
            />
          ),
        },

        {
          path: "/dashboard",
          element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              shouldCheckAdmin={true}
              userData={userData}
              element={<DashBoard />}
            />
          ),
        },
        {
          path: "/book-dashboard",
          element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              shouldCheckAdmin={true}
              userData={userData}
              element={<BookDashBoard />}
            />
          ),
        },

        {
          path: "/cart",
          element: (
            <CartPage
              cartList={cartList}
              setCartList={setCartList}
              userData={userData}
            />
          ),
        },
        { path: "/orders", element: <UserOrderHistory userData={userData} /> },
        { path: "/order-confirmation", element: <OrderPage /> },

        {
          path: "/user-dashboard",
          element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              shouldCheckAdmin={true}
              userData={userData}
              element={<UserDashBoard />}
            />
          ),
        },
        {
          path: "/order-dashboard",
          element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              shouldCheckAdmin={true}
              userData={userData}
              element={<OrderDashBoard />}
            />
          ),
        },

        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);

  if (loading) {
    <div>
      <LinearProgress color="success" style={{ width: '50%' }} />
    </div>
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
