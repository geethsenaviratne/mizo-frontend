import Header from "../components/header";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./loginPage";
import ProductOverview from "./home/productOverview";
import ProductPage from "./home/product";
import Cart from "./home/cart";


export default function HomePage() {
  return (
    <div className="w-full">
      <Header />

      <div className="w-full min-h-screen pt-30 bg-[#f9fafb] px-6 py-10">
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/productInfo/:id" element={<ProductOverview />} />
        </Routes>
      </div>
      
      
    </div>
  );
}
