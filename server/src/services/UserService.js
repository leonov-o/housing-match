import User from "../models/User.js";
import {comparePasswords, generateAccessToken, generateRefreshToken, hashPassword, verifyToken} from "../utils/jwt.js";
import Session from "../models/Session.js";
import {UserDto} from "../dtos/UserDto.js";
import {ApiError} from "../exceptions/ApiError.js";
import {v4 as uuidv4} from 'uuid';
import {mailService} from "./MailService.js";
import {deleteFile} from "../utils/s3.js";


class UserService {

    async login({email, password}) {
        if (!email || !password) {
            throw ApiError.BadRequest("Необхідно ввести електронну пошту та пароль");
        }

        const user = await User.findOne({email: email.toLowerCase()});
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

        const existingUser = await User.findOne({email: email.toLowerCase()})
        if (existingUser) {
            throw ApiError.BadRequest("Користувач вже існує");
        }

        const activation_link = uuidv4();

        const newUser = await this.createUser({email, password, name, surname, activation_link});
        mailService.sendActivationMail(email, `${process.env.SERVER_URL}/api/activate/${activation_link}`);
        return this.createSession(newUser);
    }

    async activate(activationLink) {
        const user = await User.findOne({activation_link: activationLink})
        if (!user) {
            throw ApiError.BadRequest('Некоректне посилання активації')
        }
        user.is_activated = true;
        await user.save();
    }

    async logout(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        return Session.deleteOne({refresh_token: refreshToken});
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = verifyToken(refreshToken);
        const tokenFromDb = await Session.findOne({refresh_token: refreshToken});
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await User.findById(userData.id);

        return this.createSession(user)
    }


    async createSession(user) {
        const userDto = await new UserDto(user);
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
        const {email, password, name, surname, activation_link} = user;

        return User.create({
            email: email.toLowerCase(),
            password: hashPassword(password),
            name,
            surname,
            activation_link
        });
    }

    async getAllUsers() {
        const users = await User.find({});
        return Promise.all(users.map(async user => await new UserDto(user)));
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
        const targetUser = await User.findOne({_id: targetId});
        if (!targetUser) {
            throw ApiError.BadRequest("Користувача не знайдено");
        }
        if (id !== targetId) {
            throw ApiError.ForbiddenError();
        }

        const updateData = {};
        if (user.email) {
            const existingUser = await User.findOne({email: user.email.toLowerCase()});
            if (existingUser) {
                throw ApiError.BadRequest("Адрес електронної пошти вже занято");
            }
            updateData.email = user.email.toLowerCase();
            updateData.is_activated = false;

            const activation_link = uuidv4();
            updateData.activation_link = activation_link;
            mailService.sendActivationMail(user.email, `${process.env.SERVER_URL}/api/activate/${activation_link}`);
        }
        if (user.password) {
            updateData.password = hashPassword(user.password);
        }
        if (user.name) {
            updateData.name = user.name;
        }
        if (user.surname) {
            updateData.surname = user.surname;
        }
        if (user.avatar) {
            updateData.avatar = user.avatar;
            if (targetUser.avatar) {
                deleteFile(targetUser.avatar);
            }
        }

        return new UserDto(await User.findOneAndUpdate({_id: targetId}, updateData, {new: true}));
    }

    async deleteUser(id, targetId) {
        if (id !== targetId) {
            throw ApiError.ForbiddenError();
        }
        return User.findOneAndDelete({_id: targetId});
    }
}

export const userService = new UserService()
