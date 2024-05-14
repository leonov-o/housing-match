import React, {useEffect} from 'react';
import {Button} from "@/shared/ui/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchHousingDelete, fetchUserHousing} from "@/entities/index.js";
import {Link, useNavigate} from "react-router-dom";

export const MyHousingPage = () => {
    const {user} = useSelector(state => state.user);
    const {userHousing, isLoading, error, refresh} = useSelector(state => state.housing);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserHousing(user.id))
    }, [refresh]);


    return (
        <div>
            <div className="flex justify-end">
                <Link to="/profile/housing/create">
                    <Button variant="primary">Додати оголошення</Button>
                </Link>
            </div>
            <div className="mt-8 overflow-y-auto h-[47vh] rounded-lg">
                {
                    userHousing && userHousing.length > 0
                        ? (
                            userHousing.map(housing => (
                                <HousingItem key={housing.id} housing={housing}/>
                            ))
                        )
                        : (
                            !isLoading &&<div className="text-xl text-center mt-7">У Вас ще немає оголошень.</div>
                        )
                }
                {
                    isLoading && <div className="text-xl text-center mt-7">Завантаження...</div>
                }
            </div>
        </div>
    );
};

const HousingItem = ({housing}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleView = () => {
        navigate(`/housing/${housing.id}`)
    }

    const handleUpdate = () => {
        navigate(`/profile/housing/create/${housing.id}`)
    }
    const handleDelete = () => {
        dispatch(fetchHousingDelete(housing.id))
    }

    return (
        <div className="group border-b-2 border-gray-200">
            <div className="p-4 flex justify-between items-center space-x-6">
                <div className="w-48 rounded-xl overflow-hidden">
                    <img src={housing.images[0].imageLink} className="w-full h-full group-hover:scale-110 duration-300"
                         alt="housingImage"/>
                </div>
                <div className="ml-4 font-montserrat font-medium text-sm space-y-1">
                    <div className="w-96">{housing.name}</div>
                    <div className="">{housing.address}</div>
                    <div className="">{housing.city}, {housing.region}</div>
                    <div className="">Кімнати: {housing.rooms} • Місць: {housing.capacity}</div>
                </div>
                <div className="ml-4 font-montserrat font-medium text-2xl text-center">
                    {housing.price} <span className="text-lg font-light">₴ / місяць</span>
                </div>
                <div className="space-y-1">
                    <Button variant="primary" className="h-8 text-sm" onClick={handleView}>Переглянути</Button>
                    <Button variant="primary" className="h-8 text-sm" onClick={handleUpdate}>Редагувати</Button>
                    <Button variant="destructive" className="h-8 text-sm" onClick={handleDelete}>Видалити</Button>
                    <div className="text-xs font-light">Дата публікації: {new Date(housing.createdAt).toLocaleString()}</div>
                </div>
            </div>
        </div>
    )
}
