import React, {useState} from 'react';
import {Avatar} from "@/shared/ui/Avatar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {Input} from "@/shared/ui/Input.jsx";
import {uploadImage} from "@/shared/utils/uploadImage.js";
import {fetchUserUpdate} from "@/entities/index.js";
import {twMerge} from "tailwind-merge";
import {Button} from "@/shared/ui/Button.jsx";

export const ProfilePage = () => {
    const {user, isLoading, error} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);

    const [name, setName] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);
    const [email, setEmail] = useState(user.email);
    const [image, setImage] = useState(null)

    const handleSave = async () => {
        const filename = await uploadImage(image);
        dispatch(fetchUserUpdate({
            id: user.id,
            values: {
                name,
                surname,
                email,
                avatar: filename
            }
        }))
        setEdit(false);
    }

    const handleCancel = () => {
        setEdit(false);
        setName(user.name);
        setSurname(user.surname);
        setEmail(user.email);
        setImage(null)
    }

    return (
        <div className="flex justify-center">
            <div>
                <div className="flex justify-center">
                    <label>
                        <Avatar
                            className={twMerge(
                                "h-44 w-44",
                                edit && "hover:brightness-50 cursor-pointer hover:before:content-['Змінити'] before:absolute before:font-medium before:text-2xl before:text-white"
                            )}
                            src={image ? URL.createObjectURL(image) : user.avatar?.imageLink}/>
                        <input type="file"
                               accept="image/*"
                               onChange={(e) => setImage(e.target.files[0])}
                               hidden
                               disabled={!edit}/>
                    </label>
                </div>
                <div className="mt-5 space-y-4">
                    <Input label="Ім'я" className="w-80" value={name} disabled={!edit}
                           onInput={(e) => setName(e.target.value)}/>
                    <Input label="Прізвище" className="w-80" value={surname} disabled={!edit}
                           onInput={(e) => setSurname(e.target.value)}/>
                    <Input label="Email" className="w-80" value={email} disabled={!edit}
                           onInput={(e) => setEmail(e.target.value)}/>
                </div>
                {
                    !edit
                        ? <Button
                            variant="primary"
                            className="mx-auto mt-6 w-48"
                            onClick={() => setEdit(true)}>
                            Редагувати
                        </Button>
                        : <div className="flex space-x-4">
                            <Button
                                variant="primary"
                                className="mx-auto mt-6 w-36"
                                onClick={handleSave}>
                                Зберегти
                            </Button>
                            <Button
                                variant="secondary"
                                className="mx-auto mt-6 w-36"
                                onClick={handleCancel}>
                                Скасувати
                            </Button>
                        </div>
                }
            </div>
        </div>
    );
};
