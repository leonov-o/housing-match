import $api from "@/shared/http/index.js";


export class TagService {

    static async getTags() {
        const response = await $api.get("/tags");
        return response.data
    }


}
