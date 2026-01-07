import Header from "../components/header";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./loginPage";
import ProductOverview from "./home/productOverview";


export default function HomePage() {
  return (
    <div className="h-screen w-full">
      <Header />

      <div className="width-full h-[calc(100vh-80px)] bg-amber-100">
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/productInfo/:id" element={<ProductOverview />} />
        </Routes>
      </div>
      
      
    </div>
  );
}
