import React, {useEffect, useState} from 'react';
import {HousingService} from "@/entities/index.js";
import {useParams} from "react-router-dom";
import {ImageSlider} from "@/shared/ui/ImageSlider.jsx";
import {Tag} from "@/shared/ui/Tag.jsx";
import {useSelector} from "react-redux";
import {EyeOpenIcon} from "@radix-ui/react-icons";

export const HousingPage = () => {
    const [housing, setHousing] = useState(null);
    const {tags, isLoading: isLoadingTags} = useSelector(state => state.tags);


    const {id} = useParams();

    useEffect(() => {
        HousingService.getById(id).then(result => setHousing(result.data));
    }, []);

    if (!housing) return (
        <div className="mt-10 rounded-t-lg px-20 py-10 bg-white mx-40 flex justify-center items-center space-x-14 h-screen">
            <div className="rounded-full border-t-2 border-blue-400 animate-spin w-48 h-48"></div>
        </div>)

    return (
        <div className="mt-10 rounded-t-lg px-20 py-10 bg-white mx-40 min-h-[87vh] relative font-montserrat">
            <div className="flex justify-around space-x-14">
                <div className="w-[810px]">
                    <ImageSlider images={housing.images} className="w-[810px] h-[540px]"/>

                    <div className="mt-16 font-inter ">
                        <div className=" text-xl">Опис</div>
                        <div className="mt-5 text-justify font-light">{housing.description}</div>
                    </div>
                </div>
                <div className="flex-grow">
                    <div className="text-4xl font-medium flex items-center space-x-2">
                        <span>{housing.price}</span>
                        <span className="text-lg font-normal">₴ / місяць</span>
                    </div>
                    <div className="mt-2">
                        <div className="text-3xl font-medium">{housing.name}</div>
                        <div className="mt-0.5 text-lg font-normal">{housing.city}, {housing.region}</div>
                        <div className="mt-0.5 text-lg font-normal">{housing.address}</div>
                    </div>
                    <div className="mt-5">
                        <div className="text-2xl">Характеристики</div>
                        <div className="mt-1">
                            <div className="text-lg font-normal">Кількість кімнат: {housing.rooms}</div>
                            <div className="text-lg font-normal">Кількість місць: {housing.capacity}</div>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-wrap ">
                        {
                            housing.tags.map(tag => tags.find(t => t.id === tag).name).map(tag => <Tag key={tag}
                                                                                                       tag={tag}
                                                                                                       className="mr-2 mb-2"/>)
                        }
                    </div>
                    <div className="mt-6">
                        <div className="text-2xl">Контакти</div>
                        {
                            housing.contacts.map((contact, index) => <div key={index}
                                                                          className="mt-1 text-lg font-normal">{contact}</div>)
                        }

                    </div>
                </div>
            </div>
            <div className="absolute right-6 bottom-2">
                <div className="flex items-center space-x-2">
                    <div className="font-light text-lg font-inter">Дата публікації: {new Date(housing.createdAt).toLocaleString()}</div>
                    <EyeOpenIcon className="text-gray-500" width={25} height={25}/>
                    <div className="font-normal text-lg font-inter">{housing.views}</div>
                </div>
            </div>
        </div>
    );
};
