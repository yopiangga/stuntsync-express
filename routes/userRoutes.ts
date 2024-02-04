import express, { NextFunction, Request, Response } from "express";
import * as userService from "../services/userServices";
import { MulterRequest, saveFile } from "../helpers/fileHelper";
import { JWTRequest, jwtAuthMiddleware } from "../middleware/jwtAuth";

export const router = express.Router();

router.get("/", async (req: Request, res: Response, next) => {
  const id = parseInt((req as JWTRequest).user.id);

  try {
    const users = await userService.myProfile({
      id,
    });
    res.json({
      message: "success",
      data: users,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  const { name, email, password } = req.body;
  const id = parseInt((req as JWTRequest).user.id);

  try {
    const user = await userService.updateProfile({
      id,
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

router.put("/image", saveFile("user"), async (req, res, next) => {
  const image = (req as MulterRequest).uploadedFileName;
  const id = parseInt((req as JWTRequest).user.id);

  try {
    const user = await userService.updateProfileImage({
      id,
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

router.put("/change-password", async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const id = parseInt((req as JWTRequest).user.id);

  try {
    const user = await userService.changePassword({
      id,
      oldPassword,
      newPassword,
    });
    res.json({
      message: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
});