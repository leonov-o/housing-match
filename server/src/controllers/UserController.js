import {userService} from "../services/index.js";


class UserController {

    async login(req, res, next) {
        try {
            const tokens = await userService.login(req.body);
            res.cookie("refreshToken", tokens.refresh_token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 30
            });
            res.status(200).json({
                success: true,
                tokens
            });
        } catch (e) {
            next(e);
        }
    }

    async register(req, res, next) {
        try {
            const tokens = await userService.register(req.body);
            res.cookie("refreshToken", tokens.refresh_token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 30
            });
            res.status(200).json({
                success: true,
                tokens
            });
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async createUser(req, res, next) {
        try {
            const user = await userService.createUser(req.body);
            res.status(200).json({
                success: true,
                data: user
            });
        } catch (e) {
            next(e);
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json({
                success: true,
                data: users
            });
        } catch (e) {
            next(e);
        }
    }

    async getUserById(req, res, next) {
        try {
            const user = await userService.getUserById(req.params.id);
            res.status(200).json({
                success: true,
                data: user
            });
        } catch (e) {
            next(e);
        }
    }

    async getUserByEmail(req, res, next) {
        try {
            const user = await userService.getUserByEmail(req.params.email);
            res.status(200).json({
                success: true,
                data: user
            });
        } catch (e) {
            next(e);
        }
    }

    async updateUser(req, res, next) {
        try {
            const user = await userService.updateUser(req.user.id, req.params.id, req.body);
            res.status(200).json({
                success: true,
                data: user
            });
        } catch (e) {
            next(e);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const user = await userService.deleteUser(req.user.id, req.params.id);
            res.status(200).json({
                success: true
            });
        } catch (e) {
            next(e);
        }
    }

}

export const userController = new UserController();
