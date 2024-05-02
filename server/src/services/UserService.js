import User from "../models/User.js";
import {comparePasswords, generateAccessToken, generateRefreshToken, hashPassword} from "../utils/jwt.js";
import Session from "../models/Session.js";


class UserService {

    async login({email, password}) {
        if (!email || !password) {
            throw new Error("Email and password are required");
        }

        const user = await User.findOne({email: email.toLowerCase()});
        if (!user) {
            throw new Error("User not found");
        }
        if (!comparePasswords(password, user.password)) {
            throw new Error("Password is incorrect");
        }

        return this.createSession(user);
    }

    async register({email, password, name, surname}) {
        if (!email || !password || !name || !surname) {
            throw new Error("Email, password, name and surname are required");
        }

        const existingUser = await User.findOne({email});
        if (existingUser) {
            throw new Error("User already exists");
        }
        const newUser = await this.createUser({email, password, name, surname});
        return this.createSession(newUser);
    }

    async createSession(user) {
        const tokens = {
            access_token: generateAccessToken(user),
            refresh_token: generateRefreshToken(user)
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
        return tokens;
    }


    async createUser(user) {
        const {email, password, name, surname} = user;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            throw new Error("User already exists");
        }

        return User.create({
            email: email.toLowerCase(),
            password: hashPassword(password),
            name,
            surname
        });
    }

    async getAllUsers() {
        return User.find({});
    }

    async getUserById(id) {
        return User.findOne({_id: id});
    }

    async getUserByEmail(email) {
        return User.findOne({email: email.toLowerCase()});
    }


    async updateUser(id, user) {
        const {email, password, name, surname} = user;
        return User.findOneAndUpdate({_id: id}, {
            email: email.toLowerCase(),
            password: hashPassword(password),
            name,
            surname
        }, {new: true});
    }

    async deleteUser(id) {
        return User.findOneAndDelete({_id: id});
    }
}

export const userService = new UserService()
