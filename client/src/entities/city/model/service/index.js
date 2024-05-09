import $api from "@/shared/http/index.js";


export class CityService {

    static async getCities() {
        const response = await $api.get("/cities");
        return response.data
    }

    static async getRegions() {
        const response = await $api.get("/regions");
        return response.data
    }

    static async getCitiesByRegion(region) {
        const response = await $api.get(`/regions/${region}`);
        return response.data
    }


}
