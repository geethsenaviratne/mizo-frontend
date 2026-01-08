import axios from "axios";
import { useState, useEffect } from "react"
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";


export default function ProductPage(){
    const [products, setProducts] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState("loading...");

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
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.productId} product={product} />
                ))}
            </div>
        </div>
    )

}