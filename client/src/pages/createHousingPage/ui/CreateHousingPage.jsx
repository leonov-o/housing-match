import React, {useEffect, useState} from 'react';
import {Input} from "@/shared/ui/Input.jsx";
import {Combobox} from "@/shared/ui/Combobox.jsx";
import {CityService, fetchHousingCreate, fetchHousingUpdate, HousingService} from "@/entities/index.js";
import {TextArea} from "@/shared/ui/TextArea.jsx";
import Slider from "react-slick";
import {Button} from "@/shared/ui/Button.jsx";
import {twMerge} from "tailwind-merge";
import {Cross1Icon} from "@radix-ui/react-icons";
import {TagSelect} from "@/features/index.js";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {uploadImage} from "@/shared/utils/uploadImage.js";

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

export const CreateHousingPage = () => {
    const {error} = useSelector(state => state.housing);
    const dispatch = useDispatch();
    const {id} = useParams();
    const navigate = useNavigate();

    const [isEdit, setIsEdit] = useState(false);

    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(undefined);
    const [region, setRegion] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [rooms, setRooms] = useState(undefined);
    const [capacity, setCapacity] = useState(undefined);
    const [images, setImages] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [tags, setTags] = useState([]);


    useEffect(() => {
        CityService.getRegions().then(result => setRegions(result.data));
    }, []);

    useEffect(() => {
        if (region) {
            CityService.getCitiesByRegion(region).then(result => setCities(result.data.map(city => city.city)));
        }
    }, [region]);

    useEffect(() => {
        if (id) {
            HousingService.getById(id).then(result => {
                setName(result.data.name);
                setDescription(result.data.description);
                setPrice(result.data.price);
                setRegion(result.data.region);
                setCity(result.data.city);
                setAddress(result.data.address);
                setRooms(result.data.rooms);
                setCapacity(result.data.capacity);
                setImages(result.data.images);
                setContacts(result.data.contacts);
                setTags(result.data.tags);
                setIsEdit(true);
            });
        }
    }, []);


    const handleSave = async () => {
        const filenames = await Promise.all(Array.from(images).map(image => uploadImage(image)));
        const values = {
            name,
            description,
            price,
            region,
            city,
            address,
            rooms,
            capacity,
            images: filenames,
            contacts,
            tags
        }

        if(!isEdit) {
            await dispatch(fetchHousingCreate(values));
        } else {
            await dispatch(fetchHousingUpdate({id, values}));
        }
        if(!error) navigate("/profile/housing")
    }


    return (
        <div >
            {
                error && (
                    <div className="bg-red-100 p-4 rounded-lg mb-5 text-inter text-red-600">
                        Помилка! {error}.
                    </div>
                )
            }
            <div className="flex justify-between">
                <div className="px-12">
                    <div className="text-lg font-semibold font-montserrat ml-3 mb-1.5">Зображення</div>
                    <Slider {...sliderOpts} className={twMerge(
                        "w-96 h-64 rounded-3xl",
                        !images.length && "bg-gray-100"
                    )}>
                        {
                            images.length > 0 && Array.from(images).map(image => <div key={image}
                                                                                      className="w-96 h-64 rounded-3xl overflow-hidden">
                                <img className=" mx-auto h-full" src={image.hasOwnProperty("imageLink") ? image.imageLink : URL.createObjectURL(image)} alt=""/></div>)
                        }
                    </Slider>
                    <div className="mt-8">
                        <label>
                            <Button variant="primary" className="w-80 mx-auto">Завантажити зображення</Button>
                            <input type="file" multiple onChange={(e) => setImages(e.target.files)} hidden
                                   accept="image/*"/>
                        </label>
                    </div>
                </div>
                <div className="">
                    <div className="flex justify-between space-x-4">
                        <div className="">
                            <Input label="Заголовок" placeholder="Введіть текст заголовку" className="w-96"
                                   maxLength={64} value={name} onChange={(e) => setName(e.target.value)}/>
                            <TextArea label="Опис" placeholder="Введіть текст опису" className="w-96 h-36"
                                      maxLength={500} value={description}
                                      onChange={(e) => setDescription(e.target.value)}/>
                            <TagSelect value={tags} onSelect={(value) => setTags(value)}/>

                        </div>
                        <div className="mt-9 space-y-3 w-72">
                            <Input value={price} onChange={(e) => setPrice(e.target.value)} type="number" min={1}
                                   placeholder="Ціна грн / місяць"/>
                            <Combobox data={regions} title="Область" searchTitle="Введіть область..."
                                      notFoundTitle="Нічого не знайдено." value={region}
                                      onSelect={(value) => setRegion(value)}/>
                            <Combobox data={cities} title="Місто" searchTitle="Введіть місто..."
                                      notFoundTitle="Нічого не знайдено." value={city}
                                      onSelect={(value) => setCity(value)}
                                      disabled={!region}/>
                            <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Адреса"/>
                            <Input value={rooms} onChange={(e) => setRooms(e.target.value)} type="number" min={1}
                                   placeholder="Кількість кімнат"/>
                            <Input value={capacity} onChange={(e) => setCapacity(e.target.value)} type="number" min={1}
                                   placeholder="Кількість місць"/>

                            <div className="mt-2.5">
                                <div className="text-lg font-semibold font-montserrat ml-3 mb-1.5">Контакти</div>
                                <div className="space-y-3">
                                    {
                                        contacts.map((contact, index) => (
                                            <div key={index} className="flex space-x-4 items-center">
                                                <Input value={contact}
                                                       onChange={(e) => setContacts(contacts.map((_, i) => i === index ? e.target.value : _))}
                                                       placeholder="Контакт"/>
                                                <Cross1Icon
                                                    onClick={() => setContacts(contacts.filter((_, i) => i !== index))}/>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <Button variant="primary" className="w-28 h-10 text-sm mt-5"
                                    onClick={() => setContacts([...contacts, ""])}>Додати</Button>
                        </div>

                    </div>
                </div>
            </div>
            <div className="flex  mt-12 space-x-4 px-8">
                <Button variant="primary" onClick={handleSave}>{isEdit ? "Зберегти" : "Додати"}</Button>
                <Link to="/profile/housing">
                    <Button variant="secondary">Скасувати</Button>
                </Link>
            </div>
        </div>
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

