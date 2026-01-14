import { Link } from "react-router-dom";
import { FiSearch, FiPlus } from "react-icons/fi";
import { openQuickView } from "../utils/quickViewService";

export default function ProductCard({ product }) {
  const handleIconClick = (e, action) => {
    e.stopPropagation();
    e.preventDefault();
    if (action === "view") {
      openQuickView(product);
      return;
    }
    console.log(action, product.productId);
  };
  function onAddtoCart() { 
      addToCart(product.productId, 1);
      toast.success(product.productId + " Added to cart 🛒");
    }

  return (
    <Link to={`/productInfo/${product.productId}`} className="group">
      <div className="bg-white rounded-2xl p-3 hover:shadow-lg transition duration-300 relative">

        {/* IMAGE */}
          <div className="rounded-xl overflow-hidden aspect-square flex items-center justify-center bg-white">
          <img
            src={product.images?.[0]}
            alt={product.productName}
              className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* FLOATING ICONS: positioned relative to card so they can sit outside the image's overflow */}
        <div className="absolute top-4 -right-5 flex flex-col gap-3 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none">
          <button
            aria-label="Quick view"
            onClick={(e) => handleIconClick(e, "view")}
            className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center hover:bg-pink-200 transition shadow-md ring-4 ring-white pointer-events-auto"
          >
            <FiSearch className="text-[#1e3a5f]" />
          </button>
          <button
          
            aria-label="Add"
            onClick={onAddtoCart}
            className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center hover:bg-pink-200 transition shadow-md ring-4 ring-white pointer-events-auto"
          >
            <FiPlus className="text-[#1e3a5f]" />
          </button>
        </div>

        {/* DETAILS */}
        <div className="mt-4 space-y-1">

          {/* PRODUCT NAME */}
          <h3 className="text-1xl text-[#1e3a5f] leading-snug line-clamp-2 font-bold">
            {product.productName}
          </h3>

          {/* BRAND */}
          <p className="text-xs text-[#1e3a5f]">
            {product.altNames?.[0] || "Brand"}
          </p>

          {/* PRICE */}
          <div className="flex items-center gap-2 mt-1">
            {product.price > product.lastPrice && (
              <span className="text-sm text-[#1e3a5f] line-through">
                Rs {product.price.toLocaleString()}
              </span>
            )}
            <span className="text-base font-semibold text-[#1e3a5f]">
              Rs {product.lastPrice.toLocaleString()}
            </span>
          </div>

        </div>
        {/* PRODUCT ID (bottom-right) */}
        <div className="absolute bottom-3 right-3 pointer-events-none">
          <span className="text-xs text-gray-400 bg-white/60 backdrop-blur-sm px-2 py-0.5 rounded">
            {product.productId}
          </span>
        </div>
      </div>
    </Link>
  );
}