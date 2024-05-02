import {tagService} from "../services/TagService.js";


class TagController {

    async getAllTags(req, res) {
        try {
            const tags = await tagService.getTags();
            res.status(200).json({
                data: tags
            });
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async getTagById(req, res) {
        try {
            const tag = await tagService.getTagById(req.params.id);
            res.status(200).json({
                data: tag
            });
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async createTag(req, res) {
        try {
            const tag = await tagService.createTag(req.body.name);
            res.status(200).json({
                data: tag
            });
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

}

export const tagController = new TagController();
