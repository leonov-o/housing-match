import {userService} from "../services/index.js";


class UserController {

    async login(req, res) {
        try {
            const tokens = await userService.login(req.body);
            res.cookie("refreshToken", tokens.refresh_token, {
                httpOnly: true,
                domain: "localhost",
                maxAge: 1000 * 60 * 60 * 24 * 30
            });
            res.status(200).json({
                success: true,
                tokens
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                message: e.message
            });
        }
    }

    async register(req, res) {
        try {
            const tokens = await userService.register(req.body);
            res.cookie("refreshToken", tokens.refresh_token, {
                httpOnly: true,
                domain: "localhost",
                maxAge: 1000 * 60 * 60 * 24 * 30
            });
            res.status(200).json({
                success: true,
                tokens
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                message: e.message
            });
        }
    }
    async createUser(req, res) {
        try {
            const user = await userService.createUser(req.body);
            res.status(200).json({
                success: true,
                data: user
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                message: e.message
            });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json({
                success: true,
                data: users
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                message: e.message
            });
        }
    }

    async getUserById(req, res) {
        try {
            const user = await userService.getUserById(req.params.id);
            res.status(200).json({
                success: true,
                data: user
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                message: e.message
            });
        }
    }

    async getUserByEmail(req, res) {
        try {
            const user = await userService.getUserByEmail(req.params.email);
            res.status(200).json({
                success: true,
                data: user
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                message: e.message
            });
        }
    }

    async updateUser(req, res) {
        try {
            const user = await userService.updateUser(req.params.id, req.body);
            res.status(200).json({
                success: true,
                data: user
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                message: e.message
            });
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await userService.deleteUser(req.params.id);
            res.status(200).json({
                success: true
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                message: e.message
            });
        }
    }

}

export const userController = new UserController();
