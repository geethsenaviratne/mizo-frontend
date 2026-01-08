import { useState } from "react";

export default function ImageSlider(props){
    const images = props.images || [];
    const [activeImage, setActiveImage] = useState(0);

    return (
        <div className="w-full flex items-center flex-col">
            <div className="w-full flex items-center justify-center bg-white rounded-lg overflow-hidden">
                <img
                    src={images[activeImage]}
                    alt={`product-${activeImage}`}
                    className="max-w-full max-h-[60vh] object-contain"
                />
            </div>

            <div className="w-full mt-4">
                <div className="w-full flex items-center justify-center overflow-x-auto py-3">
                    {images.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveImage(index)}
                            className={`mx-2 p-1 rounded-lg ${activeImage === index ? 'ring-2 ring-pink-300' : ''}`}
                        >
                            <img
                                src={img}
                                alt={`thumb-${index}`}
                                className="w-[75px] h-[75px] object-cover rounded-lg cursor-pointer"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}