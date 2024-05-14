import React, {useEffect, useState} from 'react';
import {SearchForm} from "@/widgets";
import Slider from "react-slick";
import {HousingCard} from "@/entities/housing/ui/HousingCard.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {ChevronRightIcon} from "@radix-ui/react-icons";
import {useDispatch, useSelector} from "react-redux";
import {fetchHousingWithFilters, HousingService} from "@/entities/housing/model/index.js";
import {Button} from "@/shared/ui/Button.jsx";

let sliderOpts = {
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
};
export const MainPage = () => {
    const [totalCount, setTotalCount] = useState(0);
    const [countByCity, setCountByCity] = useState([]);
    const {housing, isLoading: isLoadingHousing, error} = useSelector(state => state.housing)
    const {tags, isLoading: isLoadingTags} = useSelector(state => state.tags);
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(fetchHousingWithFilters({
            page: 0,
            limit: 8,
            filters: {
                sort: "popular"
            }
        }))
    }, []);

    useEffect(() => {
        HousingService.getWithFilters({
            page: 0,
            limit: 9999
        }).then(result => setTotalCount(result.totalCount));
    }, []);
    useEffect(() => {
        HousingService.getCountByCity().then(result => setCountByCity(result.data));
    }, []);

    return (
        <div className="">
            <div className="pt-20 pb-20 ">
                <div className="px-40 text-white font-montserrat">
                    <h1 className="text-6xl font-bold">Знайди житло своєї Мрії</h1>
                    <div className="mt-5 mb-14 text-4xl font-semibold leading-normal">Для вас доступно на<br/> вибір {totalCount} варіантів</div>
                    <SearchForm/>
                </div>

                <div className="mt-14 px-40">
                    <div className="text-4xl font-semibold text-white font-montserrat">Рекомендовані пропозиції</div>
                    <div className="mt-8">
                        <Slider {...sliderOpts}>
                            {
                                isLoadingHousing || isLoadingTags
                                    ? new Array(8).fill(0).map((_, index) => <div key={"skeleton_" + index}
                                                                                  className="bg-white w-full h-96 rounded-3xl shadow-sm shadow-gray-300 animate-pulse"></div>)
                                    : housing.map((housing) => (
                                        <HousingCard key={housing.id} id={housing.id} image={housing.images[0].imageLink}
                                                     city={housing.city} region={housing.region}
                                                     address={housing.address} price={housing.price} rooms={housing.rooms}
                                                     capacity={housing.capacity}
                                                     tags={housing.tags.map(tag => tags.find(t => t.id === tag).name)}/>))
                            }

                        </Slider>
                    </div>
                </div>
            </div>
            <div className="px-40 py-10">
                <div className="text-center text-4xl font-semibold text-black font-montserrat">
                    Оренда квартир у різних містах України
                </div>
                <div className="mt-14 flex flex-wrap justify-between">
                    {
                        countByCity.slice(0, 9).map(({city, count}) => <CityObjectsCard key={city} city={city}
                                                                                        count={count}/>)
                    }
                </div>
                <Button
                    variant="primary"
                    className="mx-auto text-2xl w-[560px] h-[68px]">
                    Здати квартиру в оренду
                </Button>
            </div>

            <div className="px-40 bg-blue-400 py-10 text-white text-center text-lg font-inter">
                All rights reserved. © 2024
            </div>
        </div>
    );
};


const CityObjectsCard = ({city, count}) => {
    return (
        <div
            className="mb-12 flex cursor-pointer items-center justify-center rounded-xl bg-gray-100 transition duration-300 w-[500px] h-[88px] hover:bg-gray-200">
            <div className="text-center text-2xl font-medium font-montserrat">
                {city} <br/> {count} об’єктів
            </div>
            <div className="relative left-24">
                <ChevronRightIcon width={30} height={30}/>
            </div>
        </div>
    );
};
