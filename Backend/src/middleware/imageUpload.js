import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";

const allowedImageTypes = {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
};

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        const extension = file.mimetype === "image/png" ? ".png" : ".jpg";
        cb(null, `${randomUUID()}${extension}`);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedExtensions = allowedImageTypes[file.mimetype];
    const extension = path.extname(file.originalname).toLowerCase();

    if (!allowedExtensions || !allowedExtensions.includes(extension)) {
        return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "displayPicture"));
    }

    cb(null, true);
};

export const imageUpload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 },
});