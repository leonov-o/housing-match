import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {fetchHousingWithFilters} from "@/entities/index.js";
import {SearchForm} from "@/widgets/index.js";
import {EyeOpenIcon} from "@radix-ui/react-icons";
import {Tag} from "@/shared/ui/Tag.jsx";

export const SearchPage = () => {
    const {housing, isLoading, error} = useSelector(state => state.housing)
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParams = Object.fromEntries(searchParams.entries());
    queryParams.tags = queryParams.tags ? queryParams.tags.split(",").map(item => parseInt(item)) : [];

    const [page, setPage] = useState(0);

    useEffect(() => {
        dispatch(fetchHousingWithFilters({
            page,
            limit: 10,
            filters: queryParams
        }))
    }, [searchParams]);

    if (isLoading) return (
        <div
            className="mx-40 mt-10 flex h-screen items-center justify-center rounded-t-lg bg-white px-20 py-10 space-x-14">
            <div className="h-48 w-48 animate-spin rounded-full border-t-2 border-blue-400"></div>
        </div>)

    if (error) return (
        <div
            className="mx-40 mt-10 flex h-screen items-center justify-center rounded-t-lg bg-white px-20 py-10 space-x-14">
            <div className="">{error}</div>
        </div>)

    return (
        <div className="relative mx-40 mt-10 flex justify-center rounded-t-lg bg-white px-20 py-10 min-h-[87vh]">
            <div className="">
                <div className="flex justify-center">
                    <SearchForm defaultFilters={queryParams}/>
                </div>
                <div className="mt-10">
                    {
                        housing.length > 0
                            ? housing.map(h => <HousingCard key={h.id} housing={h} onClick={() => handleView(h.id)}/>)
                            : <div className="mt-12 text-center text-2xl">Нічого не знайдено</div>
                    }
                </div>
            </div>

        </div>
    );
};


const HousingCard = ({housing}) => {
    const {tags} = useSelector(state => state.tags);
    const navigate = useNavigate();

    const handleView = () => {
        navigate(`/housing/${housing.id}`)
    }

    return (
        <div className="flex justify-between border-b-2 border-gray-300 bg-white px-10 py-5">
            <div className="overflow-hidden rounded-lg">
                <img src={housing.images[0].imageLink} alt=""/>
            </div>

            <div className="relative w-3/4 px-6 space-y-2 font-inter">
                <div className="cursor-pointer text-2xl font-bold duration-300 hover:text-blue-400"
                     onClick={handleView}>{housing.name}</div>
                <div className="text-3xl font-bold">
                    <span>{housing.price}</span>
                    <span className="ml-2 text-lg font-normal">₴ / місяць</span>
                </div>
                <div className="">{housing.city}, {housing.region}</div>
                <div className="">{housing.address}</div>
                <div
                    className="text-gray-500">{housing.description.length > 200 ? housing.description.slice(0, 200) + "..." : housing.description}</div>
                <div className="flex space-x-4">
                    <div className="">
                        Кількість місць: {housing.capacity}
                    </div>
                    <div className="">
                        Кількість кімнат: {housing.rooms}
                    </div>
                </div>
                <div className="mt-6 flex flex-wrap">
                    {
                        housing.tags.slice(0, 5).map(tag => tags.find(t => t.id === tag).name).map(tag => <Tag key={tag}
                                                                                                               tag={tag}
                                                                                                               className="mr-2 mb-2"/>)
                    }
                </div>
                <div className="absolute right-0 bottom-0">
                    <div className="flex items-center space-x-2">
                        <div className="text-lg font-light font-inter">Дата
                            публікації: {new Date(housing.createdAt).toLocaleString()}</div>
                        <EyeOpenIcon className="text-gray-500" width={25} height={25}/>
                        <div className="text-lg font-normal font-inter">{housing.views}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
