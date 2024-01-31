import express, { NextFunction, Request, Response } from "express";
import * as babyService from "../services/babyServices";
import { MulterRequest, saveFile } from "../helpers/fileHelper";
import { JWTRequest, jwtAuthMiddleware } from "../middleware/jwtAuth";

export const router = express.Router();

router.get("/", async (req: Request, res: Response, next) => {
  try {
    const babies = await babyService.getBabies();
    res.json({
      message: "success",
      data: babies,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req: Request, res: Response, next) => {
  try {
    const baby = await babyService.getBabyById(parseInt(req.params.id));
    res.json({
      message: "success",
      data: baby,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", jwtAuthMiddleware, async (req, res, next) => {
  const { name, dob, gender } = req.body;
  const userId = parseInt((req as JWTRequest).user.id);

  try {
    const baby = await babyService.createBaby({
      name,
      dob,
      gender,
      image: "default.png",
      userId,
    });

    res.json({
      message: "success",
      data: baby,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", jwtAuthMiddleware, async (req, res, next) => {
  const { name, dob, gender } = req.body;

  try {
    const baby = await babyService.updateBaby({
      id: parseInt(req.params.id),
      name,
      dob,
      gender,
    });

    res.json({
      message: "success",
      data: baby,
    });
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id/image",
  jwtAuthMiddleware,
  saveFile("baby"),
  async (req, res, next) => {
    const image = (req as MulterRequest).uploadedFileName;

    try {
      const baby = await babyService.updateBabyImage({
        id: parseInt(req.params.id),
        image,
      });

      res.json({
        message: "success",
        data: baby,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", jwtAuthMiddleware, async (req, res, next) => {
  try {
    const baby = await babyService.deleteBaby(parseInt(req.params.id));

    res.json({
      message: "success",
      data: baby,
    });
  } catch (err) {
    next(err);
  }
});
