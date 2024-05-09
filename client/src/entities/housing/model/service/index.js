import $api from "@/shared/http/index.js";


export class HousingService {

    static async getWithFilters(values) {
        const response = await $api.get('/housing', {
            params: values
        });
        return response.data;
    }

    static async getCountByCity() {
        const response = await $api.get('/housing-count');
        return response.data
    }

    static async getById(id) {
        const response = await $api.get(`/housing/${id}`);
        return response.data
    }

    static async create(values) {
        const response = await $api.post(`/housing`, values);
        return response.data
    }

    static async update(id, values) {
        const response = await $api.put(`/housing/${id}`, values);
        return response.data
    }

    static async delete(id) {
        const response = await $api.delete(`/housing/${id}`);
        return response.data
    }


}
