import React from 'react';
import {Tag} from "@/shared/ui/Tag.jsx";
import {Link} from "react-router-dom";

export const HousingCard = ({id, image, city, region, address, price, rooms, capacity, tags }) => {
    return (
        <Link to={"/housing/" + id}>
            <div className="rounded-lg bg-white px-4 py-3 w-[360px] h-[420px] font-inter">
                <div className="mx-auto h-56 w-80 overflow-hidden rounded">
                    <img className="h-full w-full duration-300 hover:scale-110" src={image} alt=""/>
                </div>
                <div className="p-1">
                    <div className="text-lg font-normal">{city} • {region}</div>
                    <div className="text-lg font-light">{address}</div>
                    <div className="mt-3 text-2xl font-medium">{price} <span
                        className="text-lg font-light">₴ / місяць</span></div>
                    <div className="text-lg font-normal">Кімнати: {rooms} • Кількість місць: {capacity}</div>
                </div>
                <div className="mt-2 flex space-x-2">
                    {
                        tags.slice(0, 3).map(tag => <Tag key={tag} tag={tag}/>)
                    }
                </div>
            </div>
        </Link>
    );
};
