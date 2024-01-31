import { NextFunction, Response, Request } from "express";
import multer from "multer";
import path from "path";

export interface MulterRequest extends Request {
  file: any;
  uploadedFileName: string;
}

export function saveFile(folder: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, `./uploads/${folder}`); // Use the provided folder
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Or use a custom filename logic
      },
    });

    const upload = multer({ storage: storage });

    upload.single("image")(req, res, (err) => {
      if (err) {
        return next(err); // Handle file upload errors
      }

      const uploadedFileName = (req as MulterRequest).file.filename;
      (req as MulterRequest).uploadedFileName = uploadedFileName;

      next(); // Proceed to the next middleware
    });
  };
}
