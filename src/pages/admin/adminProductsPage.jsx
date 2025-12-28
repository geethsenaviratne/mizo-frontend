import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminProductsPage() {

 const [products, setProducts] = useState([
    {
        "_id": "6946cc7f318514710534d7a0",
        "productId": "BEAUTY002",
        "productName": "Herbal Strength Shampoo",
        "altNames": [
            "Herbal Shampoo",
            "Hair Strength Shampoo"
        ],
        "images": [
            "https://example.com/images/herbal-shampoo.jpg"
        ],
        "price": 1800,
        "lastPrice": 2000,
        "description": "Sulfate-free herbal shampoo formulated with aloe vera and coconut extracts to strengthen hair and reduce breakage.",
        "stock": 85,
        "__v": 0
    },
    {
        "_id": "6948e648aa2d40065b52b2c6",
        "productId": "BEAUTY003",
        "productName": "Shampoo",
        "altNames": [
            "Herbal Shampoo",
            "Hair Strength Shampoo"
        ],
        "images": [
            "https://example.com/images/herbal-shampoo.jpg"
        ],
        "price": 1900,
        "lastPrice": 2020,
        "description": "Sulfate-free herbal shampoo formulated with aloe vera and coconut extracts to strengthen hair and reduce breakage.",
        "stock": 85,
        "__v": 0
    }
])


  useEffect(
    ()=>{
      axios.get("http://localhost:5000/api/products")
      .then((res)=>{
        console.log(res.data)
        setProducts(res.data)
      })

  },[]
)
   
  

  

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products Management</h1>
      <p className="text-1xl font-bold mb-4">Here you can manage all the products in the inventory.</p>
      {
      products.map((product, index) => (
        <div key={product._id}>
          {index}
          {product.productName}

        </div>
      ))
      }
    </div>
  );
}


