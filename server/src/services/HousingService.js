import Housing from "../models/Housing.js";
import {ApiError} from "../exceptions/ApiError.js";
import {HousingDto} from "../dtos/index.js";
import {deleteFile} from "../utils/s3.js";


class HousingService {

    async getHousing(body) {
        const {page = 0, limit = 10, filters = {}} = body;
        const {region, city, priceFrom, priceTo, rooms, capacity, tags, ownerId, sort} = filters;

        const searchQuery = {};
        const sortQuery = {};

        if (region) searchQuery.region = region;
        if (city) searchQuery.city = city;
        if (priceFrom !== undefined) searchQuery.price = {$gte: priceFrom};
        if (priceTo !== undefined) {
            searchQuery.price = searchQuery.price || {};
            searchQuery.price.$lte = priceTo;
        }
        if (rooms !== undefined) searchQuery.rooms = rooms;
        if (capacity !== undefined) searchQuery.capacity = capacity;
        if (tags && tags.length > 0) searchQuery.tags = {$in: tags};
        if (ownerId !== undefined) searchQuery.owner_id = ownerId;

        if (sort === "priceAsc") sortQuery.price = 1;
        else if (sort === "priceDesc") sortQuery.price = -1;
        else if (sort === "newest") sortQuery.createdAt = -1;
        else if (sort === "popular") sortQuery.views = -1;


        const housing = await Housing.find(searchQuery)
            .sort(sortQuery)
            .limit(limit)
            .skip(page * limit);
        const housingDtos = await Promise.all(housing.map(item => new HousingDto(item)));
        return housingDtos;

    }

    async getHousingById(id) {
        const housing = await Housing.findById(id);
        if (!housing) {
            throw ApiError.BadRequest("Житло не знайдено");
        }
        housing.views = housing.views + 1;
        await housing.save();
        return new HousingDto(housing);
    }

    async getHousingCountByCity() {
        return Housing.aggregate([
            {
                '$group': {
                    '_id': '$city',
                    'count': {
                        '$sum': 1
                    }
                }
            }, {
                '$project': {
                    'city': '$_id',
                    'count': 1,
                    '_id': 0
                }
            }
        ]).sort({count: -1}).limit(9);
    }

    async createHousing(housing, ownerId) {
        if (!ownerId) {
            throw ApiError.UnauthorizedError();
        }
        if (!housing.name || !housing.region || !housing.city || !housing.address || housing.price < 0 || housing.rooms < 0 || housing.capacity < 0) {
            throw ApiError.BadRequest("Невірні дані про житло");
        }
        if (housing.images.length < 1) {
            throw ApiError.BadRequest("Потрібне хоча б одне зображення");
        }
        if (housing.contacts.length < 1) {
            throw ApiError.BadRequest("Потрібен хоча б одни контакт");
        }

        const newHousing = await Housing.create({...housing, owner_id: ownerId})
        return new HousingDto(newHousing);
    }

    async updateHousing(id, targetId, housing) {
        const targetHousing = await Housing.findOne({_id: targetId});
        if (!targetHousing) {
            throw ApiError.BadRequest("Житло не знайдено");
        }
        if (id !== targetHousing.owner_id.toString()) {
            throw ApiError.ForbiddenError();
        }

        const updateData = {};

        if (housing.name) {
            updateData.name = housing.name;
        }
        if (housing.region) {
            updateData.region = housing.region;
        }
        if (housing.city) {
            updateData.city = housing.city;
        }
        if (housing.address) {
            updateData.address = housing.address;
        }
        if (housing.price) {
            updateData.price = housing.price;
        }
        if (housing.description) {
            updateData.description = housing.description;
        }
        if (housing.contacts) {
            updateData.contacts = housing.contacts;
        }
        if (housing.capacity) {
            updateData.capacity = housing.capacity;
        }
        if (housing.rooms) {
            updateData.rooms = housing.rooms;
        }
        if (housing.tags) {
            updateData.tags = housing.tags;
        }

        if (housing.images) {
            updateData.images = housing.images;
            targetHousing.images.forEach(image => {
                if (!housing.images.includes(image)) {
                    deleteFile(image);
                }
            })
        }

        const updatedHousing = await Housing.findOneAndUpdate({_id: targetId}, updateData, {new: true})
        return new HousingDto(updatedHousing);
    }

    async deleteHousing(id, targetId) {
        const targetHousing = await Housing.findOne({_id: targetId});
        if (!targetHousing) {
            throw ApiError.BadRequest("Житло не знайдено");
        }
        if (id !== targetHousing.owner_id.toString()) {
            throw ApiError.ForbiddenError();
        }
        return Housing.findOneAndDelete({_id: targetId});
    }

}

export const housingService = new HousingService();
