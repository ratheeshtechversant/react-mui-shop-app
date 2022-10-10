import './App.css';
import Login from './components/authentication/Login';
import Home from './components/Home';
import Signup from './components/authentication/Signup';
import MainNavBar from './components/MainNavBar';
import Products from './components/product/Products';
import Profile from './components/user_profile/Profile';
import BuyNow from './components/BuyNow';
import Footer from './components/Footer';
import MyCart from './components/cart/MyCart';
import SignupForm from './components/authentication/SignupForm';
import OrderDetails from './components/order/OrderDetails';
import OrderItems from './components/order/OrderItems';
import ReOrder from './components/order/ReOrder';
import Payment from './components/payment/Payment';
import { Routes, Route, Link } from "react-router-dom";
import { Box, height } from '@mui/system';
import { useDispatch,useSelector } from 'react-redux';
import { getProduct } from './features/products/productSlice';
import { useEffect } from 'react';

function App() {

  const dispatch = useDispatch()
  useEffect(() =>{
    dispatch(getProduct())
  },[])
  // const products = useSelector((state) => state.products)
  // console.log(products.products)

  return (
    <>
      <Box>
      {/* <Login /> */}
      <MainNavBar />
      </Box>
      <Box
      
      sx={{
        backgroundColor: "#eeeeee",
        padding: "30px",
        height: "100%",
        minWidth: "985px"
      }}
      >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="Signup" element={<Signup />} />
        <Route path="products" element={<Products />} />
        <Route path="profile" element={<Profile />} />
        <Route path="buynow" element={<BuyNow />} />
        <Route path="mycart" element={<MyCart />} />
        <Route path="signupform" element={<SignupForm />} />
        <Route path="orderdetails" element={<OrderDetails />} />
        <Route path="orderitems" element={<OrderItems />} />
        <Route path="reorder" element={<ReOrder />} />
        <Route path="payment" element={<Payment />} />

      </Routes>
      </Box>
      <Box
      sx={{
        backgroundColor: "#eeeeee",
        padding: "32px",
        height: "100%",
        minWidth: "981px"
      }}>
        <Footer />
      </Box>
    </>
  );
}

export default App;
