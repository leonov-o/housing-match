import {getObjectSignedUrl} from "../utils/s3.js";

export class HousingDto {
    id
    name;
    region;
    city;
    address;
    images;
    price;
    description;
    contacts;
    rooms;
    capacity;
    tags;
    views;
    owner_id;
    createdAt;

    constructor(model) {
        this.id = model._id;
        this.name = model.name;
        this.region = model.region;
        this.city = model.city;
        this.address = model.address;
        this.images = model.images;
        this.price = model.price;
        this.description = model.description;
        this.contacts = model.contacts;
        this.rooms = model.rooms;
        this.capacity = model.capacity;
        this.tags = model.tags;
        this.views = model.views;
        this.owner_id = model.owner_id;
        this.createdAt = model.createdAt;

        if (this.images && this.images.length > 0) {
            const promises = this.images.map(async image => ({image, imageLink: await getObjectSignedUrl(image)}));

            return Promise.all(promises).then(urls => {
                this.images = urls;
                return this;
            });
        } else {
            return Promise.resolve(this);
        }
    }

}
