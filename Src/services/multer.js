import multer from 'multer';
import { nanoid } from 'nanoid';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

export const fileValidation = {
    image: ['image/png', 'image/webp', 'image/jpeg', 'image/jpg'],
    file: ['application/pdf'],
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function fileUpload(customValidation = [], customPath = 'Public') {
    const fullPath = path.join(__dirname, `../../uploads/${customPath}`);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
    }
    const storage = multer.diskStorage({
        destination: (req, res, cb) => {
            cb(null, fullPath);
        },
        filename: (req, file, cb) => {
            const suffixName = nanoid() + "-" + file.originalname;
            file.dest = `uploads/${customPath}/${suffixName}`;
            cb(null, suffixName);
        }
    });
    function fileFilter(req, file, cb) {
        if (customValidation.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb("invalid format", false);
        }
    }
    const upload = multer({ fileFilter, storage });
    return upload;
}
export default fileUpload;