import express, { NextFunction, Request, Response } from "express";
import * as userService from "../services/userServices";
import { MulterRequest, saveFile } from "../helpers/fileHelper";

export const router = express.Router();

router.get("/", async (req: Request, res: Response, next) => {
  try {
    const users = await userService.myProfile({
      id: parseInt(req.params.id),
    });
    res.json({
      message: "success",
      data: users,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await userService.updateProfile({
      id: parseInt(req.params.id),
      name,
      email,
      password,
    });
    res.json({
      message: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:id/image", saveFile("user"), async (req, res, next) => {
  const image = (req as MulterRequest).uploadedFileName;

  try {
    const user = await userService.updateProfileImage({
      id: parseInt(req.params.id),
      image,
    });
    res.json({
      message: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
});
