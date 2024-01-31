import { NextFunction, Response, Request } from "express";
import multer from "multer";
import path from "path";

export interface MulterRequest extends Request {
  file: any;
  uploadedFileName: string;
}

const storageUser = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "uploads/user/");
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const uploadUser = multer({ storage: storageUser });

const storagePatient = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/patient/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const uploadPatient = multer({ storage: storagePatient });

const storageHospital = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/hospital/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const uploadHospital = multer({ storage: storageHospital });

const storageMedicalRecord = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/medical-record/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const uploadMedicalRecord = multer({ storage: storageMedicalRecord });

export const saveFileUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uploadSingle = uploadUser.single("image");

  uploadSingle(req, res, (err) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }

    const uploadedFileName = (req as MulterRequest).file.filename;
    (req as MulterRequest).uploadedFileName = uploadedFileName;
    next();
  });
};

export const saveFilePatient = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uploadSingle = uploadPatient.single("image");

  uploadSingle(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const uploadedFileName = (req as MulterRequest).file.filename;
    (req as MulterRequest).uploadedFileName = uploadedFileName;
    next();
  });
};

export const saveFileHospital = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uploadSingle = uploadHospital.single("image");

  uploadSingle(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const uploadedFileName = (req as MulterRequest).file.filename;
    (req as MulterRequest).uploadedFileName = uploadedFileName;
    next();
  });
};

export const saveFileMedicalRecord = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uploadSingle = uploadMedicalRecord.single("image");

  uploadSingle(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const uploadedFileName = (req as MulterRequest).file.filename;
    (req as MulterRequest).uploadedFileName = uploadedFileName;
    next();
  });
};
