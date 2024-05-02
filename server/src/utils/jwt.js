import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
}

export const comparePasswords = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}
export const generateAccessToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h',
        }
    );
};

export const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d',
        }
    );
};

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}
