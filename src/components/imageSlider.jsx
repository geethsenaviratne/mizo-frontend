import { useState } from "react";

export default function ImageSlider(props){
    const images = props.images || [];
    const [activeImage, setActiveImage] = useState(0);

    // Swipe/Drag handlers for mobile and desktop
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const minSwipeDistance = 50;

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
        
        if (isLeftSwipe && activeImage < images.length - 1) {
            setActiveImage(activeImage + 1);
        }
        if (isRightSwipe && activeImage > 0) {
            setActiveImage(activeImage - 1);
        }
        setTouchStart(null);
        setTouchEnd(null);
    };

    return (
        <div className="w-full flex items-center flex-col">
            {/* Main image - swipeable/draggable */}
            <div 
                className="w-full flex items-center justify-center bg-white rounded-lg overflow-hidden relative cursor-grab active:cursor-grabbing select-none"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseLeave}
            >
                <img
                    src={images[activeImage]}
                    alt={`product-${activeImage}`}
                    className="max-w-full max-h-[50vh] sm:max-h-[50vh] lg:max-h-[60vh] object-contain pointer-events-none"
                    draggable="false"
                />
            </div>

            {/* Mobile: Dot indicators */}
            <div className="flex sm:hidden gap-2 mt-4 py-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                            activeImage === index 
                                ? 'bg-gray-800 w-3' 
                                : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                    />
                ))}
            </div>

            {/* Desktop: Thumbnail images */}
            <div className="hidden sm:block w-full mt-4">
                <div className="w-full flex items-center justify-center overflow-x-auto py-3">
                    {images.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveImage(index)}
                            className={`mx-1 sm:mx-2 p-0.5 sm:p-1 rounded-md sm:rounded-lg ${activeImage === index ? 'ring-2 ring-pink-300' : ''}`}
                        >
                            <img
                                src={img}
                                alt={`thumb-${index}`}
                                className="w-[50px] h-[50px] sm:w-[65px] sm:h-[65px] lg:w-[75px] lg:h-[75px] object-cover rounded-md sm:rounded-lg cursor-pointer"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}