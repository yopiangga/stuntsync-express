import express, { NextFunction, Request, Response } from "express";
import * as recomendationCheckService from "../services/recomendationCheckServices";

export const router = express.Router();

router.get("/recomendation/:id", async (req: Request, res: Response, next) => {
  try {
    const recomendations =
      await recomendationCheckService.getRecomendationCheckByRecomendationId({
        recomendationId: parseInt(req.params.id),
      });

    res.json({
      message: "success",
      data: recomendations,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req: Request, res: Response, next) => {
  const { recomendationId } = req.body;

  try {
    const recomendationCheck =
      await recomendationCheckService.createRecomendationCheck({
        recomendationId: parseInt(recomendationId as string),
      });

    res.json({
      message: "success",
      data: recomendationCheck,
    });
  } catch (err) {
    next(err);
  }
});
