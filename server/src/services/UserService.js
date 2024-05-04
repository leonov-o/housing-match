import User from "../models/User.js";
import {comparePasswords, generateAccessToken, generateRefreshToken, hashPassword} from "../utils/jwt.js";
import Session from "../models/Session.js";
import {UserDto} from "../dtos/UserDto.js";
import {ApiError} from "../exceptions/ApiError.js";


class UserService {

    async login({email, password}) {
        if (!email || !password) {
            throw ApiError.BadRequest("Необхідно ввести електронну пошту та пароль");

        }

        const user =  await User.findOne({email: email.toLowerCase()});
        if (!user) {
            throw ApiError.BadRequest("Користувача не знайдено");
        }
        if (!comparePasswords(password, user.password)) {
            throw ApiError.BadRequest("Невірний пароль");
        }

        return this.createSession(user);
    }

    async register({email, password, name, surname}) {
        if (!email || !password || !name || !surname) {
            throw ApiError.BadRequest("Необхідно ввести електронну пошту, пароль, ім'я та прізвище");
        }

        const existingUser =  await User.findOne({email: email.toLowerCase()})
        if (existingUser) {
            throw ApiError.BadRequest("Користувач вже існує");
        }

        //TODO generate activation link
        //TODO send mail

        const newUser = await this.createUser({email, password, name, surname});
        return this.createSession(newUser);
    }

    async logout(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        return Session.deleteOne({refresh_token: refreshToken});
    }


    async createSession(user) {
        const userDto = new UserDto(user);
        const tokens = {
            access_token: generateAccessToken({...userDto}),
            refresh_token: generateRefreshToken({...userDto})
        }

        const existingSessions = await Session.find({user_id: user._id});
        if (existingSessions.length >= 5) {
            await Session.deleteMany({user_id: user._id});
        }

        await Session.create({
            user_id: user._id,
            refresh_token: tokens.refresh_token,
            expires_in: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
        });
        return {
            ...tokens,
            user: userDto
        };
    }


    async createUser(user) {
        const {email, password, name, surname} = user;

        return User.create({
            email: email.toLowerCase(),
            password: hashPassword(password),
            name,
            surname
        });
    }

    async getAllUsers() {
        const users = await User.find({});
        return users.map(user => new UserDto(user));
    }

    async getUserById(id) {
        const user = await User.findOne({_id: id});
        return new UserDto(user);
    }

    async getUserByEmail(email) {
        const user = await User.findOne({email: email.toLowerCase()});
        return new UserDto(user);
    }


    async updateUser(id, targetId, user) {
        const targetUser =  await User.findOne({_id: targetId});
        if (!targetUser) {
            throw ApiError.BadRequest("Користувача не знайдено");
        }
        if (id !== targetId) {
            throw ApiError.ForbiddenError();
        }

        const updateData = {};
        if(user.email){
            const existingUser =  await User.findOne({email: user.email.toLowerCase()});
            if (existingUser) {
                throw ApiError.BadRequest("Адрес електронної пошти вже занято");
            }
            updateData.email = user.email.toLowerCase();
            updateData.is_activated = false;
            //TODO generate activation link
            //TODO send mail
        }
        if (user.password) {
            updateData.password = hashPassword(user.password);
        }
        if(user.name) {
            updateData.name = user.name;
        }
        if(user.surname) {
            updateData.surname = user.surname;
        }
        if(user.avatar) {
            updateData.avatar = user.avatar;
        }

        return User.findOneAndUpdate({_id: targetId}, updateData, {new: true});
    }

    async deleteUser(id, targetId) {
        if (id !== targetId) {
            throw ApiError.ForbiddenError();
        }
        return User.findOneAndDelete({_id: id});
    }
}

export const userService = new UserService()
