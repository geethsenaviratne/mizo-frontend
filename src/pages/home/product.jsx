import axios from "axios";
import { useState, useEffect } from "react"

import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";



export default function ProductPage(){
    const [products, setProducts] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState("loading...");
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (loadingStatus === "loading...") {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/")
       .then((res) => {
        console.log(res.data);
        setProducts(res.data);
        setLoadingStatus("loaded");
    })
       .catch((err) =>
        toast.error("Error fetching products")
        )

        }
       
    },
[]);

function search (e){
    const query = e.target.value;
    setQuery(query);
    if (query == "") {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
            console.log(res.data);
            setProducts(res.data);
            setLoadingStatus("loaded")
        })
        .catch((err) =>
         toast.error("Error searching products")
         )
    }else{
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/search/" + query)
        .then((res) => {
            console.log(res.data);
            setProducts(res.data);
            setLoadingStatus("loaded")
        })
        .catch((err) =>
         toast.error("Error searching products")
         )
    }
    
}
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8">
            {/* Search bar above the grid */}
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-400 text-gray-700 transition"
                    placeholder="Search products..."
                    onChange={search}
                    value={query}

                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.productId} product={product} />
                ))}
            </div>
            {loadingStatus === "loading..." && (<div className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-5 bg-[#f9fafb]">
    
    <div className="relative">
     <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-200 border-b-rose-400"></div>
    </div>

    <p className="text-gray-600 text-sm tracking-wide">
      Loading products, please wait...
    </p>
  </div>)}
        </div>
    )

}