import {housingService} from "../services/index.js";

class HousingController {
    async getHousing(req, res, next) {
        try {
            const housing = await housingService.getHousing(req.body);
            res.status(200).json({
                success: true,
                data: housing,
                totalCount: housing.length
            });
        } catch (e) {
            next(e);
        }
    }

    async getHousingById(req, res, next) {
        try {
            const housing = await housingService.getHousingById(req.params.id)
            res.status(200).json({
                success: true,
                data: housing
            });
        } catch (e) {
            next(e);
        }
    }

    async getHousingCountByCity(req, res, next) {
        try {
            const housing = await housingService.getHousingCountByCity();
            res.status(200).json({
                success: true,
                data: housing
            });
        } catch (e) {
            next(e);
        }
    }

    async createHousing(req, res, next) {
        try {
            const housing = await housingService.createHousing(req.body, req.user.id);
            res.status(200).json({
                success: true,
                data: housing
            });
        } catch (e) {
            next(e);
        }
    }

    async updateHousing(req, res, next) {
        try {
            const housing = await housingService.updateHousing(req.user.id, req.params.id, req.body)
            res.status(200).json({
                success: true,
                data: housing
            });
        } catch (e) {
            next(e);
        }
    }

    async deleteHousing(req, res, next) {
        try {
            const housing = await housingService.deleteHousing(req.user.id, req.params.id);
            res.status(200).json({
                success: true
            });
        } catch (e) {
            next(e);
        }
    }
}

export const housingController = new HousingController();
