import {cityService} from "../services/index.js";


class CityController {

    async getAllCities(req, res, next) {
        try {
            const cities = await cityService.getCities();
            res.status(200).json({
                success: true,
                data: cities
            });
        } catch (e) {
            next(e);
        }
    }

    async getCitiesByRegion(req, res, next) {
        try {
            const cities = await cityService.getCitiesByRegion(req.params.region);
            res.status(200).json({
                success: true,
                data: cities
        });
        } catch (e) {
            next(e);
        }
    }

    async getAllRegions(req, res, next) {
        try {
            const regions = await cityService.getRegions();
            res.status(200).json({
                success: true,
                data: regions
        });
        } catch (e) {
            next(e);
        }
    }
}

export const cityController = new CityController();
