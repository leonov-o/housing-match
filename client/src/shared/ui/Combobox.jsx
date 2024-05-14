import React, {useEffect, useRef, useState} from 'react';
import {ChevronUpIcon, ChevronDownIcon, MagnifyingGlassIcon} from "@radix-ui/react-icons";
import {twMerge} from "tailwind-merge";

export const Combobox = ({data, title, searchTitle, notFoundTitle, value, onSelect, disabled, className}) => {
    const [open, setOpen] = useState(false);
    const [filteredData, setFilteredData] = useState(data);
    const comboboxRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (comboboxRef.current && !comboboxRef.current.contains(event.target)) {
                setOpen(false);
                searchTitle && filterData("");
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [comboboxRef, searchTitle]);
    const toggleOpen = () => {
        if (disabled) return;
        setOpen(!open);
        searchTitle && filterData("");
    }

    const filterData = (search) => {
        const filtered = data.filter(item => item.toLowerCase().includes(search.toLowerCase()));
        setFilteredData(filtered);
    };

    const handleSelect = (item) => {
        onSelect(item);
        setOpen(false);
    };

    const handleInputChange = (e) => {
        filterData(e.target.value);
    };

    return (
        <div ref={comboboxRef} className={twMerge(
            "relative text-black font-inter w-64",
            className
        )}>
            <div
                className={twMerge(
                    "flex items-center h-12 justify-between rounded-lg bg-gray-100 p-4 text-lg font-medium hover:bg-gray-200 cursor-pointer",
                    disabled ? "cursor-not-allowed bg-gray-300 hover:bg-gray-300": "",
                )}
                onClick={toggleOpen}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-labelledby="combobox-label">
                <div id="combobox-label" className="select-none">
                    {value ? value : title}
                </div>
                <div>
                    {open ? <ChevronUpIcon width={20} height={20} className="text-black"/> :
                        <ChevronDownIcon width={20} height={20} className="text-black"/>}
                </div>
            </div>
            {open && (
                <div className="absolute w-full mt-2 bg-gray-100 rounded-lg shadow-md z-10">
                    {
                        searchTitle && (
                            <div className="flex items-center p-2 border-b">
                                <div className="">
                                    <MagnifyingGlassIcon width={20} height={20}/>
                                </div>
                                <input
                                    type="text"
                                    placeholder={searchTitle}
                                    className="w-36 ml-2 bg-gray-100 h-8 outline-none"
                                    onChange={handleInputChange}
                                />
                            </div>
                        )
                    }
                    <ul
                        role="listbox"
                        aria-labelledby="combobox-label"
                        className="py-2 overflow-x-auto h-64">
                        {filteredData.map((item, index) => (
                            <li
                                key={index}
                                role="option"
                                aria-selected={value === item}
                                className="hover:bg-gray-200 cursor-pointer px-4 py-2 rounded-lg"
                                onClick={() => handleSelect(item)}>
                                {item}
                            </li>
                        ))}
                        {filteredData.length === 0 && (
                            <li className="px-4 py-2">{notFoundTitle}</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

