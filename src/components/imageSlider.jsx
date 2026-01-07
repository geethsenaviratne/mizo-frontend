import { useState } from "react";

export default function ImageSlider(props){
    const images = props.images;
    const [activeImage, setActiveImage] = useState(0);

    return (
        <div className="w-full aspect-square flex items-center flex-col relative">
            <img src={images[activeImage]} className="w-full aspect-square object-cover" />

            <div className=" absolute bottom-0 w-full h-[100px] backdrop-blur-lg">
                <div className="w-full h-full flex items-center justify-center overflow-hidden">
                    {images.map((img, index) => (
                        <img 
                        onClick = {() => setActiveImage(index)}
                            key={index}
                            src={img}
                            className="w-[75px] h-[75px] object-cover mx-2 rounded-lg cursor-pointer"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}