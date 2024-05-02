import {cityService} from "../services/index.js";


class CityController {

    async getAllCities(req, res) {
        try {
            const cities = await cityService.getCities();
            res.status(200).json({
                success: true,
                data: cities
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                message: e.message
            });
        }
    }

    async getCitiesByRegion(req, res) {
        try {
            const cities = await cityService.getCitiesByRegion(req.params.region);
            res.status(200).json({
                success: true,
                data: cities
        });
        } catch (e) {
            res.status(500).json({
                success: false,
                message: e.message
            });
        }
    }

    async getAllRegions(req, res) {
        try {
            const regions = await cityService.getRegions();
            res.status(200).json({
                success: true,
                data: regions
        });
        } catch (e) {
            res.status(500).json({
                success: false,
                message: e.message
            });
        }
    }
}

export const cityController = new CityController();
