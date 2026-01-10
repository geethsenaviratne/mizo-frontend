import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import { MdLocalShipping, MdLock } from "react-icons/md";
import { RiShieldCheckLine } from "react-icons/ri";
import { subscribe, closeQuickView } from "../../utils/quickViewService";
import { addToCart } from "../../utils/cartFunction";
import toast from "react-hot-toast";

function QuickViewModal({ product, onClose }) {
  if (!product) return null;

  const imgs = product.images || [];
  const [active, setActive] = useState(imgs[0] || null);

  useEffect(() => {
    setActive(imgs[0] || null);
  }, [product]);

  function onAddtoCart() { 
      addToCart(product.productId, 1);
      toast.success(product.productId + " Added to cart 🛒");
    }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white w-full max-w-6xl max-h-[92vh] overflow-hidden rounded-2xl shadow-2xl">
        <div className="absolute top-5 right-5">
          <button
            aria-label="Close quick view"
            onClick={onClose}
            className="w-10 h-10 bg-rose-200 hover:bg-rose-300 rounded-full flex items-center justify-center transition shadow-md"
          >
            <FiX />
          </button>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Left: Gallery */}
          <div className="md:w-1/2 p-8 bg-white flex flex-col items-center">
            <div className="w-full flex items-center justify-center pb-4">
              <img src={active} alt={product.productName} className="max-w-full max-h-[62vh] object-contain drop-shadow-lg" />
            </div>

            <div className="flex gap-3 mt-4 overflow-x-auto items-center">
              {imgs.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActive(src)}
                  className={`rounded-md p-1 bg-white border ${active === src ? 'ring-2 ring-pink-300' : 'border-transparent'}`}
                >
                  <img src={src} alt={`thumb-${i}`} className="w-20 h-20 object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="md:w-1/2 p-8 overflow-auto">
            <h2 className="text-3xl font-semibold text-gray-900 mb-2">{product.productName}</h2>
            <p className="text-lg text-gray-500 mb-4">{product.altNames?.[0] || 'Brand'}</p>

            <div className="mb-4">
              <div className="text-sm text-gray-500">Price</div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">LKR {product.lastPrice?.toLocaleString()}</div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-6">{product.description || product.shortDescription || 'No description available.'}</p>

            <div className="space-y-3">
              <button onClick={onAddtoCart} className="w-full border border-gray-300  hover:bg-gray-50 transition cursor-pointer py-3 rounded text-gray-800">Add to cart</button>
              <button className="w-full bg-rose-200 hover:bg-rose-300 text-pink-900 py-3 rounded cursor-pointer">Buy it now</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded">
                <MdLocalShipping className="text-xl text-gray-600" />
                <div>
                  <div className="text-sm text-gray-500">Delivery Charge</div>
                  <div className="text-sm font-medium">LKR {product.deliveryCharge || 350}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded">
                <RiShieldCheckLine className="text-xl text-gray-600" />
                <div>
                  <div className="text-sm text-gray-500">Guaranteed</div>
                  <div className="text-sm font-medium">100% Authentic Products</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded">
                <div className="rounded-full bg-gray-200 w-8 h-8 flex items-center justify-center text-gray-600">🌏</div>
                <div>
                  <div className="text-sm text-gray-500">Origin</div>
                  <div className="text-sm font-medium">{product.origin || 'Imported from South Korea'}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded">
                <MdLock className="text-xl text-gray-600" />
                <div>
                  <div className="text-sm text-gray-500">Payments</div>
                  <div className="text-sm font-medium">Secure Payments</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuickView() {
  const [state, setState] = useState({ open: false, product: null });

  useEffect(() => {
    const unsub = subscribe((s) => {
      if (!s) return setState({ open: false, product: null });
      setState(s);
    });
    return unsub;
  }, []);

  // close on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') closeQuickView();
    }
    if (state.open) {
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
  }, [state.open]);

  if (!state.open) return null;

  return createPortal(
    <QuickViewModal product={state.product} onClose={closeQuickView} />,
    document.body
  );
}
