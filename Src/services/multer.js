import multer from 'multer';
// import { nanoid } from 'nanoid';
function fileUpload() {
    const storage = multer.diskStorage({});
    const types = ['image/jpeg', 'image/png', 'image/webp'];
    function fileFilter(req, file, cb) {
        if (types.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb('invalid format', false);
        }
    }
    const upload = multer({ fileFilter, storage });
    return upload;
}
export default fileUpload;

// multer.diskStorage({
//     destination: (req, res, cb) => {
//         cb(null, 'uploads');
//     },
//     filename: (req, file, cb) => {
//         cb(null, nanoid() + "-" + file.originalname);
//     }
// });

