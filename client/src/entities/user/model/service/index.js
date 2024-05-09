import $api from "@/shared/http";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export class UserService {

    static async registration(values) {
        const response = await $api.post(`/register`, values);
        return response.data
    }

    static async login(values) {
        const response = await $api.post(`/login`, values);
        return response.data;
    }

    static async refresh() {
        const response = await $api.get(`/refresh`, {withCredentials: true});
        return response.data
    }

    static async logout() {
        const response = await $api.post(`/logout`);
        return response.data;
    }

    static async update(id, values) {
        const response = await $api.put(`/users/${id}`, values);
        return response.data
    }

    static async delete(id) {
        const response = await $api.delete(`/users/${id}`);
        return response.data
    }
}
