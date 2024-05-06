import {uploadFile} from "../utils/s3.js";
import { v4 as uuidv4 } from 'uuid';


class FileController {

    async uploadFile(req, res, next) {
        try {
            const fileBuffer = req.file.buffer;
            const mimetype = req.file.mimetype;
            const fileName = uuidv4();
            const result = await uploadFile(fileBuffer, fileName, mimetype);
            if(result.$metadata.httpStatusCode === 200) {
                res.status(200).json({
                    success: true,
                    image: fileName
                });
            }
        } catch (e) {
            next(e);
        }
    }



}

export const fileController = new FileController();
