import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Home from "./Components/Home";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import DashBoard from "./Components/DashBoard";
import ProductList from "./Components/ProductList";
import UpdateProduct from "./Components/UpdateProduct";
import Navbar from "./Components/Navbar";
import CreateProducts from "./Components/CreateProducts";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/dashboard" element={<DashBoard />} />
          {/* Product Routes */}
          <Route path="/products-list" element={<ProductList />} />
          <Route path="/create-product" element={<CreateProducts />} />
          <Route path="/update-product/:id" element={<UpdateProduct />} />{" "}
          {/* Add this route */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
