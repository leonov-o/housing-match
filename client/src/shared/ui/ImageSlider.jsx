import React from 'react';
import {twMerge} from "tailwind-merge";
import Slider from "react-slick";

let sliderOpts = {
    arrows: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow/>,
    prevArrow: <SamplePrevArrow/>
};

export const ImageSlider = ({images, className}) => {
    return (
        <Slider {...sliderOpts} className={twMerge(
            "w-96 h-64 rounded-3xl",
            !images.length && "bg-gray-100",
            className
        )}>
            {
                images.length > 0 && Array.from(images).map(image => <div key={image}
                                                                          className={twMerge(
                                                                              "w-96 h-64 rounded-3xl overflow-hidden",
                                                                              className
                                                                          )}>
                    <img className=" mx-auto h-full" src={image.hasOwnProperty("imageLink") ? image.imageLink : URL.createObjectURL(image)} alt=""/></div>)
            }
        </Slider>
    );
};


function SampleNextArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style, display: "block", background: "gray", borderRadius: "100%"}}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style, display: "block", background: "gray", borderRadius: "100%"}}
            onClick={onClick}
        />
    );
}
