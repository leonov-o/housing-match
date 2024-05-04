import {tagService} from "../services/index.js";


class TagController {

    async getAllTags(req, res, next) {
        try {
            const tags = await tagService.getTags();
            res.status(200).json({
                success: true,
                data: tags
            });
        } catch (e) {
            next(e);
        }
    }

    async getTagById(req, res, next) {
        try {
            const tag = await tagService.getTagById(req.params.id);
            res.status(200).json({
                success: true,
                data: tag
            });
        } catch (e) {
            next(e);
        }
    }

    async createTag(req, res, next) {
        try {
            const tag = await tagService.createTag(req.body.name);
            res.status(200).json({
                success: true,
                data: tag
            });
        } catch (e) {
            next(e);
        }
    }

}

export const tagController = new TagController();
