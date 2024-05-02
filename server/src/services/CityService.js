import City from "../models/City.js";


class CityService {

    async getCities() {
        return City.find({});
    }

}

export const cityService = new CityService();
