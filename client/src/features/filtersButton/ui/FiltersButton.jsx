import React, {useEffect, useRef, useState} from 'react';
import {MixerHorizontalIcon} from "@radix-ui/react-icons";
import {Input} from "@/shared/ui/Input.jsx";
import {TagSelect} from "@/features/index.js";
import {Button} from "@/shared/ui/Button.jsx";

export const FiltersButton = ({filters, onChange}) => {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (buttonRef.current && !buttonRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [buttonRef]);

    return (
        <div ref={buttonRef} className="relative">
            <div
                className="w-10 h-10 bg-white rounded-full flex justify-center items-center hover:bg-gray-300 duration-300 cursor-pointer"
                onClick={() => setOpen(!open)}>
                <MixerHorizontalIcon className="text-black" width={20} height={20}/>
            </div>
            {
                open && (
                    <div className="absolute right-0 top-12 bg-white rounded-lg shadow p-4 text-black space-y-2 z-10">
                        <div className="flex space-x-3">
                            <select className="px-4 py-2 rounded-lg outline-none border-2 border-gray-300 w-56 h-10"
                                    value={filters.sort}
                                    onChange={(e) => onChange("sort", e.target.value)}>
                                <option defaultChecked>Сортувати</option>
                                <option value="priceAsc">Спочатку дешевші</option>
                                <option value="priceDesc">Спочатку дорожчі</option>
                                <option value="newest">Спочатку нові</option>
                                <option value="popular">Спочатку популярні</option>
                            </select>
                            <Input type="number" min={1} placeholder="Кількість кімнат" className="w-56 h-10"
                                   value={filters.rooms} onChange={(e) => onChange("rooms", e.target.value)}/>
                        </div>
                        <div className="flex space-x-3">
                            <Input type="number" min={1} placeholder="Ціна від" className="w-56 h-10"
                                   value={filters.priceFrom} onChange={(e) => onChange("priceFrom", e.target.value)}/>
                            <Input type="number" min={1} placeholder="Ціна до" className="w-56 h-10" value={filters.priceTo}
                                   onChange={(e) => onChange("priceTo", e.target.value)}/>
                        </div>
                        <TagSelect value={filters.tags} onSelect={(value) => onChange("tags", value)}/>
                        <div>
                            <Button variant="secondary" onClick={() => onChange("reset")}>Скинути фільтри</Button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};
