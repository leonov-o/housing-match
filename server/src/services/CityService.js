import City from "../models/City.js";


class CityService {

    async getCities() {
        return City.find({});
    }

    async getRegions() {
        return City.distinct("region");
    }

    async getCitiesByRegion(region) {
        return City.find({region});
    }

}

export const cityService = new CityService();
