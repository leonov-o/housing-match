import {getObjectSignedUrl} from "../utils/s3.js";

export class UserDto {
    id;
    email;
    name;
    surname;
    avatar;
    is_activated;

    constructor(model) {
        this.id = model._id;
        this.email = model.email;
        this.name = model.name;
        this.surname = model.surname;
        this.avatar = model.avatar;
        this.is_activated = model.is_activated;
        if (this.avatar) {
            return getObjectSignedUrl(this.avatar).then(url => {
                this.avatar = {
                    image: this.avatar,
                    imageLink: url
                };
                return this;
            });
        } else {
            return Promise.resolve(this);
        }
    }
}
