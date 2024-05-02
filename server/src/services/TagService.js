import Tag from "../models/Tag.js";


class TagService {

    async getTags() {
        return Tag.find({});
    }

    async getTagById(id) {
        return Tag.findOne({id});
    }

    async createTag(name) {
       const maxId = await Tag.findOne().sort({id: -1}).limit(1);
       const id = maxId ? maxId.id + 1 : 1;
       return Tag.create({id, name});
    }
}

export const tagService = new TagService();
