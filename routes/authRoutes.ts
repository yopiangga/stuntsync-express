import express, { Request, Response } from "express";
export const router = express.Router();

import { signIn, signUp } from "../services/authServices";
import { MulterRequest, saveFileUser } from "../helpers/fileHelper";

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await signIn(email, password);

    res.json({
      message: "Sign in success",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/signup", saveFileUser, async (req, res, next) => {
  const { email, password, name, role, posyanduId } = req.body;
  const image = (req as MulterRequest).uploadedFileName;

  try {
    const user = await signUp(email, password, name, role, image, posyanduId);

    res.json({
      message: "Sign up success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
});
