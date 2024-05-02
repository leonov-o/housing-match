import User from "../models/User.js";
import {hashPassword} from "../utils/jwt.js";


class UserService {

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
