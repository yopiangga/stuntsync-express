import express, { NextFunction, Request, Response } from "express";
import * as posyanduService from "../services/posyanduServices";
import { MulterRequest, saveFile } from "../helpers/fileHelper";

export const router = express.Router();

router.get("/", async (req: Request, res: Response, next) => {
  try {
    const posyandus = await posyanduService.getPosyandus();
    res.json({
      message: "success",
      data: posyandus,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req: Request, res: Response, next) => {
  try {
    const posyandu = await posyanduService.getPosyanduById(
      parseInt(req.params.id)
    );
    res.json({
      message: "success",
      data: posyandu,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { name, address, phone } = req.body;

  try {
    const posyandu = await posyanduService.createPosyandu({
      name,
      address,
      phone,
      image: "default.png",
    });
    res.json({
      message: "success",
      data: posyandu,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  const { name, address, phone } = req.body;

  try {
    const posyandu = await posyanduService.updatePosyandu({
      id: parseInt(req.params.id),
      name,
      address,
      phone,
    });
    res.json({
      message: "success",
      data: posyandu,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:id/image", saveFile("posyandu"), async (req, res, next) => {
  const image = (req as MulterRequest).uploadedFileName;

  try {
    const posyandu = await posyanduService.updatePosyanduImage({
      id: parseInt(req.params.id),
      image,
    });
    res.json({
      message: "success",
      data: posyandu,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const posyandu = await posyanduService.deletePosyandu(
      parseInt(req.params.id)
    );
    res.json({
      message: "success",
      data: posyandu,
    });
  } catch (err) {
    next(err);
  }
});
