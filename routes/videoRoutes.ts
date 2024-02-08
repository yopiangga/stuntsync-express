import express, { NextFunction, Request, Response } from "express";
import * as videoService from "../services/videoServices";
import { MulterRequest, saveFile } from "../helpers/fileHelper";
import { JWTRequest } from "../middleware/jwtAuth";

export const router = express.Router();

router.get("/", async (req: Request, res: Response, next) => {
  try {
    const videos = await videoService.getVideos();
    res.json({
      message: "success",
      data: videos,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req: Request, res: Response, next) => {
  try {
    const video = await videoService.getVideoById({
      id: parseInt(req.params.id)
    });
    res.json({
      message: "success",
      data: video,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { title, desc, url, published } = req.body;
  const userId = parseInt((req as JWTRequest).user.id);

  try {
    const video = await videoService.createVideo({
      title,
      desc,
      url,
      published,
      userId,
    });
    res.json({
      message: "success",
      data: video,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  const { title, desc, url, published } = req.body;

  try {
    const video = await videoService.updateVideo({
      id: parseInt(req.params.id),
      title,
      desc,
      url,
      published,
    });
    res.json({
      message: "success",
      data: video,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const video = await videoService.deleteVideo(parseInt(req.params.id));
    res.json({
      message: "success",
      data: video,
    });
  } catch (err) {
    next(err);
  }
});
