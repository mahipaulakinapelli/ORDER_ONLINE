import "./App.css";
import Header from "./component/layout/Header/Header.js"
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom"
import WebFont from "webfontloader";
import React, { useState } from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/layout/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import About from "./component/layout/About/About";
import Contact from "./component/layout/Contact/Contact";


function App() {

  const { isAuthenticated , user } = useSelector((state)=>state.user);

  const [stripeApiKey , setStripeApiKey] = useState("");

  async function getStripeApiKey(){
      const { data } = await axios.get("/api/v1/stripeapikey");

      setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();

  },[]);

  window.addEventListener("contextmenu",(e)=> e.preventDefault());

  return <Router>
    <Header />

    { isAuthenticated && <UserOptions user={user} />}

    <Routes>
        <Route path='/' element={<Home/>} exact />

        <Route path='/product/:id' element={<ProductDetails/>} exact/>

        <Route path='/products' element={<Products/>} exact/>

        <Route path="/login" element={<LoginSignUp />} exact/>

        <Route path="/account" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />

        <Route path="/me/update" element={isAuthenticated ? <UpdateProfile /> : <Navigate to="/login" />} />

        <Route path="/password/update" element={isAuthenticated ? <UpdatePassword /> : <Navigate to="/login" />} />

        <Route path="/cart" element={isAuthenticated ? <Cart /> : <Navigate to="/login" />} />

        <Route path="/login/shipping" element={isAuthenticated ? <Shipping /> : <Navigate to="/login/shipping" />} />

        <Route path="/order/confirm" element={isAuthenticated ? <ConfirmOrder /> : <Navigate to="/order/confirm" />} />


        {stripeApiKey && isAuthenticated && (
          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            }
          />
        )}

        <Route path="/success" element={isAuthenticated ? <OrderSuccess /> : <Navigate to="/success" />} />

        <Route path="/orders" element={isAuthenticated ? <MyOrders /> : <Navigate to="/orders" />} />

        <Route path="/order/:id" element={isAuthenticated ? <OrderDetails /> : <Navigate to="/order/:id" />} />

        <Route path='/admin/dashboard' element={<Dashboard/>} />

        <Route path='/admin/products' element={<ProductList/>} />

        <Route path='/admin/product' element={<NewProduct/>} />

        <Route path='/admin/product/:id' element={<UpdateProduct/>} />

        <Route path='/admin/orders' element={<OrderList/>} />

        <Route path='/admin/order/:id' element={<ProcessOrder/>} />

        <Route path='/admin/users' element={<UsersList/>} />

        <Route path='/admin/user/:id' element={<UpdateUser/>} />

        <Route path='/about' element={<About/>} />

        <Route path='/contact' element={<Contact/>} />


    </Routes>

    <Footer />
  </Router>

}

export default App;