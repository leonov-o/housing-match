import React, {useEffect, useRef, useState} from 'react';
import {Input} from "@/shared/ui/Input.jsx";
import {useSelector} from "react-redux";
import {Tag} from "@/shared/ui/Tag.jsx";
import {Cross1Icon} from "@radix-ui/react-icons";

export const TagSelect = ({value, onSelect}) => {
    const {tags} = useSelector(state => state.tags);
    const [filteredTags, setFilteredTags] = useState(tags);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const selectRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectRef]);

    useEffect(() => {
        if (tags && tags.length > 0) {
            setFilteredTags(tags.filter(tag => {
                const isSelected = value.find(selectedTag => selectedTag === tag.id);
                return !isSelected && tag.name.toLowerCase().includes(search.toLowerCase());
            }));
        }
    }, [search, tags, value]);

    const handleClick = (tag) => {
        onSelect([...value, tag])
    }

    const handleRemove = (tag) => {
        onSelect(value.filter(item => item !== tag));
    }

    return (
        <div className="" ref={selectRef}>
            <div className="ml-3 text-lg font-semibold font-montserrat mb-1.5">Ключові слова</div>
            <div tabIndex={0}
                 className="flex w-96 flex-wrap items-center rounded-lg bg-gray-100 p-4 text-lg font-medium text-black outline-none min-h-12 font-montserrat">
                {
                    value.map(item => tags.find(tag => tag.id === item)).map(tag => (
                        <div className="relative" key={tag.id}>
                            <Tag className="mr-2 mb-2" key={tag.id} tag={tag.name}/>
                            <div
                                className="absolute -top-2 right-0 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-white p-1 hover:bg-gray-100"
                                onClick={() => handleRemove(tag.id)}>
                                <Cross1Icon/>
                            </div>
                        </div>
                    ))
                }
                <div className="relative">
                    <Input placeholder="Введіть ключові слова"
                           onInput={e => setSearch(e.target.value)} value={search} onFocus={() => setOpen(true)}
                           className="p-0"/>
                    {
                        open && (<div className="absolute h-52 overflow-y-auto rounded-lg border-2 bg-white">
                            {
                                filteredTags.length > 0
                                    ? filteredTags.map(tag => <div key={tag.id}
                                                                   className="cursor-pointer border-b-2 p-2 text-lg font-normal font-montserrat hover:bg-gray-100 select-none"
                                                                   onClick={() => handleClick(tag.id)}>{tag.name}</div>)
                                    : <div className="text-іьlg font-normal font-montserrat border-b-2 p-1">Нічого не
                                        знайдено</div>
                            }
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};
