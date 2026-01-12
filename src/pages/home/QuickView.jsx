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
  const [activeIndex, setActiveIndex] = useState(0);

  // Swipe/Drag handlers for mobile and desktop
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const minSwipeDistance = 50;

  useEffect(() => {
    setActive(imgs[0] || null);
    setActiveIndex(0);
  }, [product]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Touch handlers (mobile)
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    handleSwipe();
  };

  // Mouse handlers (desktop)
  const onMouseDown = (e) => {
    setIsDragging(true);
    setTouchEnd(null);
    setTouchStart(e.clientX);
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX);
  };

  const onMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    handleSwipe();
  };

  const onMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      handleSwipe();
    }
  };

  // Common swipe logic
  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && activeIndex < imgs.length - 1) {
      const newIndex = activeIndex + 1;
      setActiveIndex(newIndex);
      setActive(imgs[newIndex]);
    }
    if (isRightSwipe && activeIndex > 0) {
      const newIndex = activeIndex - 1;
      setActiveIndex(newIndex);
      setActive(imgs[newIndex]);
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Handle thumbnail click
  const handleThumbnailClick = (src, index) => {
    setActive(src);
    setActiveIndex(index);
  };

  function onAddtoCart() { 
      addToCart(product.productId, 1);
      toast.success(product.productId + " Added to cart 🛒");
    }

  return (
    // Responsive padding: smaller on mobile, items-start for mobile scroll
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center px-0 sm:px-6 overflow-y-auto">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />

      {/* Modal container - clean white background */}
      <div className="relative bg-white w-full sm:max-w-6xl min-h-screen sm:min-h-0 sm:max-h-[92vh] sm:my-6 sm:rounded-2xl shadow-2xl overflow-y-auto">
        {/* Close button - sticky on mobile for always visible */}
        <div className="sticky top-0 z-10 flex justify-end p-3 sm:absolute sm:top-5 sm:right-5 sm:p-0">
          <button
            aria-label="Close quick view"
            onClick={onClose}
            className="w-9 h-9 sm:w-10 sm:h-10 bg-rose-200 hover:bg-rose-300 rounded-full flex items-center justify-center transition shadow-md"
          >
            <FiX className="text-base" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Left: Gallery - swipeable/draggable */}
          <div className="md:w-1/2 p-4 sm:p-6 lg:p-8 bg-transparent flex flex-col items-center">
            <div 
              className="w-full flex items-center justify-center pb-2 sm:pb-4 cursor-grab active:cursor-grabbing select-none"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseLeave}
            >
              <img 
                src={active} 
                alt={product.productName} 
                className="max-w-full max-h-[50vh] sm:max-h-[50vh] lg:max-h-[62vh] object-contain drop-shadow-lg pointer-events-none" 
                draggable="false"
              />
            </div>

            {/* Mobile: Dot indicators */}
            <div className="flex sm:hidden gap-2 mt-2 py-2">
              {imgs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleThumbnailClick(imgs[i], i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeIndex === i 
                      ? 'bg-gray-800 w-3' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>

            {/* Desktop: Thumbnails */}
            <div className="hidden sm:flex gap-2 sm:gap-3 mt-2 sm:mt-4 overflow-x-auto items-center pb-2">
              {imgs.map((src, i) => (
                <button
                  key={i}
                  onClick={() => handleThumbnailClick(src, i)}
                  className={`rounded-md p-0.5 sm:p-1 bg-white/50 backdrop-blur-sm border flex-shrink-0 ${activeIndex === i ? 'ring-2 ring-pink-300' : 'border-white/30'}`}
                >
                  <img src={src} alt={`thumb-${i}`} className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Details - responsive padding and text sizing */}
          <div className="md:w-1/2 p-4 sm:p-6 lg:p-8 overflow-auto">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-1 sm:mb-2 pr-8 sm:pr-0">{product.productName}</h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-500 mb-3 sm:mb-4">{product.altNames?.[0] || 'Brand'}</p>

            <div className="mb-3 sm:mb-4">
              <div className="text-xs sm:text-sm text-gray-500">Price</div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">LKR {product.lastPrice?.toLocaleString()}</div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 sm:mb-6">{product.description || product.shortDescription || 'No description available.'}</p>

            {/* Buttons - responsive padding */}
            <div className="space-y-2 sm:space-y-3">
              <button onClick={onAddtoCart} className="w-full border border-gray-300 hover:bg-gray-50 transition cursor-pointer py-2.5 sm:py-3 rounded text-sm sm:text-base text-gray-800">Add to cart</button>
              <button className="w-full bg-rose-200 hover:bg-rose-300 text-pink-900 py-2.5 sm:py-3 rounded cursor-pointer text-sm sm:text-base">Buy it now</button>
            </div>

            {/* Info cards - responsive grid and compact on mobile */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-4 sm:mt-6">
              <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 p-2.5 sm:p-4 rounded">
                <MdLocalShipping className="text-lg sm:text-xl text-gray-600 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-sm text-gray-500">Delivery</div>
                  <div className="text-[10px] sm:text-sm font-medium truncate">LKR {product.deliveryCharge || 350}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 p-2.5 sm:p-4 rounded">
                <RiShieldCheckLine className="text-lg sm:text-xl text-gray-600 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-sm text-gray-500">Guaranteed</div>
                  <div className="text-[10px] sm:text-sm font-medium truncate">100% Authentic</div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 p-2.5 sm:p-4 rounded">
                <div className="rounded-full bg-gray-200 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 text-xs sm:text-base flex-shrink-0">🌏</div>
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-sm text-gray-500">Origin</div>
                  <div className="text-[10px] sm:text-sm font-medium truncate">{product.origin || 'South Korea'}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 p-2.5 sm:p-4 rounded">
                <MdLock className="text-lg sm:text-xl text-gray-600 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-sm text-gray-500">Payments</div>
                  <div className="text-[10px] sm:text-sm font-medium truncate">Secure</div>
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
