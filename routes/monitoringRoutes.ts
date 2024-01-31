import express, { NextFunction, Request, Response } from "express";
import * as monitoringService from "../services/monitoringServices";
import { MulterRequest, saveFile } from "../helpers/fileHelper";

export const router = express.Router();

router.get("/", async (req: Request, res: Response, next) => {
  try {
    const monitorings = await monitoringService.getMonitorings();
    res.json({
      message: "success",
      data: monitorings,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req: Request, res: Response, next) => {
  try {
    const monitoring = await monitoringService.getMonitoringById(
      parseInt(req.params.id)
    );
    res.json({
      message: "success",
      data: monitoring,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { babyId, height, weight, head, month } = req.body;

  try {
    const monitoring = await monitoringService.createMonitoring({
      babyId,
      height,
      weight,
      head,
      month,
    });
    res.json({
      message: "success",
      data: monitoring,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  const { height, weight, head, month } = req.body;

  try {
    const monitoring = await monitoringService.updateMonitoring({
      id: parseInt(req.params.id),
      height,
      weight,
      head,
      month,
    });
    res.json({
      message: "success",
      data: monitoring,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const monitoring = await monitoringService.deleteMonitoring(
      parseInt(req.params.id)
    );
    res.json({
      message: "success",
      data: monitoring,
    });
  } catch (err) {
    next(err);
  }
});
