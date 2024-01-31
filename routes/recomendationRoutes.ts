import express, { NextFunction, Request, Response } from "express";
import * as recomendationService from "../services/recomendationServices";
import { MulterRequest, saveFile } from "../helpers/fileHelper";
import { JWTRequest, jwtAuthMiddleware } from "../middleware/jwtAuth";

export const router = express.Router();

router.get("/", async (req: Request, res: Response, next) => {
  try {
    const recomendations = await recomendationService.getRecomendations();
    res.json({
      message: "success",
      data: recomendations,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req: Request, res: Response, next) => {
  try {
    const recomendation = await recomendationService.getRecomendationById(
      parseInt(req.params.id)
    );
    res.json({
      message: "success",
      data: recomendation,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", jwtAuthMiddleware, async (req, res, next) => {
  const { title, desc, babyId, type, month } = req.body;
  const userId = parseInt((req as JWTRequest).user.id);

  try {
    const recomendation = await recomendationService.createRecomendation({
      userId,
      babyId,
      title,
      desc,
      type,
      month,
    });
    res.json({
      message: "success",
      data: recomendation,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", jwtAuthMiddleware, async (req, res, next) => {
  const { title, desc, type, month, isCheck } = req.body;

  try {
    const recomendation = await recomendationService.updateRecomendation({
      id: parseInt(req.params.id),
      title,
      desc,
      type,
      month,
      isCheck,
    });
    res.json({
      message: "success",
      data: recomendation,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", jwtAuthMiddleware, async (req, res, next) => {
  try {
    const recomendation = await recomendationService.deleteRecomendation(
      parseInt(req.params.id)
    );
    res.json({
      message: "success",
      data: recomendation,
    });
  } catch (err) {
    next(err);
  }
});
