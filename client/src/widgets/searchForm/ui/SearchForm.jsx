import React, {useEffect, useState} from 'react';
import {Combobox} from "@/shared/ui/Combobox.jsx";
import {Input} from "@/shared/ui/Input.jsx";
import {SearchButton} from "@/features/searchButton/ui/SearchButton.jsx";
import {CityService} from "@/entities/index.js";

export const SearchForm = () => {
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);

    const [region, setRegion] = useState("");
    const [city, setCity] = useState("");
    const [count, setCount] = useState(undefined);

    useEffect(() => {
        CityService.getRegions().then(result => setRegions(result.data));
    }, []);

    useEffect(() => {
        if(region) {
            CityService.getCitiesByRegion(region).then(result => setCities(result.data.map(city => city.city)));
        }
    }, [region]);

    return (
        <div className="flex space-x-11">
            <Combobox data={regions} title="Область" searchTitle="Введіть область..." notFoundTitle="Нічого не знайдено." value={region} onSelect={(value) => setRegion(value)}/>
            <Combobox data={cities} title="Місто" searchTitle="Введіть місто..." notFoundTitle="Нічого не знайдено." value={city} onSelect={(value) => setCity(value)} disabled={!region}/>
            <Input value={count} onChange={(e) => setCount(e.target.value)} type="number" min={1} placeholder="Кількість місць"/>
            <SearchButton/>
        </div>
    );
};

