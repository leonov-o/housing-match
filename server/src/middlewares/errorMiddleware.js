import {ApiError} from "../exceptions/ApiError.js";


export default function (err, req, res, next) {
    console.log(err);
    if (err instanceof ApiError) {
        return res.status(err.status).json({success: false,message: err.message, errors: err.errors})
    }
    return res.status(500).json({success: false, message: 'Непередбачена помилка'})

};
