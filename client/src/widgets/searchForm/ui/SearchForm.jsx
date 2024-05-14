import React, {useEffect, useState} from 'react';
import {Combobox} from "@/shared/ui/Combobox.jsx";
import {Input} from "@/shared/ui/Input.jsx";
import {SearchButton} from "@/features/searchButton/ui/SearchButton.jsx";
import {CityService} from "@/entities/index.js";
import {FiltersButton} from "@/features/filtersButton/index.js";
import {createSearchParams, useNavigate} from "react-router-dom";

export const SearchForm = ({defaultFilters}) => {
    const navigate = useNavigate();
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);

    const [filters, setFilters] = useState(defaultFilters || {
        tags: [],
        sort: "newest"
    });

    useEffect(() => {
        CityService.getRegions().then(result => setRegions(result.data));
    }, []);

    useEffect(() => {
        if (filters.region) {
            CityService.getCitiesByRegion(filters.region).then(result => setCities(result.data.map(city => city.city)));
        }
    }, [filters.region]);

    const handleChange = (name, value) => {
        if (name === "reset") {
            setFilters({
                region: "",
                city: "",
                capacity: "",
                rooms: "",
                priceFrom: "",
                priceTo: "",
                tags: [],
                sort: "newest"
            });
        } else {
            setFilters(prev => ({...prev, [name]: value}));
        }
    };

    const handleSearch = () => {
        navigate({
            pathname: "/housing",
            search: createSearchParams({...filters, tags: filters.tags.join(",")}).toString()
        });
    }

    return (
        <div className="flex space-x-11 items-center">
            <div className="flex space-x-4 items-center">
                <Combobox data={regions} title="Область" searchTitle="Введіть область..."
                          notFoundTitle="Нічого не знайдено." className="w-72" value={filters.region}
                          onSelect={(value) => handleChange("region", value)}/>
                <Combobox data={cities} title="Місто" searchTitle="Введіть місто..."
                          notFoundTitle="Нічого не знайдено." className="w-72" value={filters.city}
                          onSelect={(value) => handleChange("city", value)} disabled={!filters.region}/>
                <Input value={filters.capacity} onChange={(e) => handleChange("capacity", e.target.value)}
                       className="w-72" type="number" min={1}
                       placeholder="Кількість місць"/>
                <FiltersButton filters={filters} onChange={handleChange}/>
            </div>
            <SearchButton onClick={handleSearch}/>
        </div>
    );
};

