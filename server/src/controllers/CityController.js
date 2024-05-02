import {cityService} from "../services/index.js";


class CityController {

    async getAll(req, res) {
        try {
            const cities = await cityService.getCities();
            res.status(200).json(cities);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
}

export const cityController = new CityController();
