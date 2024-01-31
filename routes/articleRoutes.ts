import express, { NextFunction, Request, Response } from "express";
import * as articleService from "../services/articleServices";
import { MulterRequest, saveFile } from "../helpers/fileHelper";

export const router = express.Router();

router.get("/", async (req: Request, res: Response, next) => {
  try {
    const articles = await articleService.getArticles();
    res.json({
      message: "success",
      data: articles,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req: Request, res: Response, next) => {
  try {
    const article = await articleService.getArticleById(
      parseInt(req.params.id)
    );
    res.json({
      message: "success",
      data: article,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", saveFile("image"), async (req, res, next) => {
  const { title, desc, content, published, userId } = req.body;
  const image = (req as MulterRequest).uploadedFileName;
  try {
    const article = await articleService.createArticle({
      title,
      desc,
      image,
      content,
      published,
      userId,
    });
    res.json({
      message: "success",
      data: article,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  const { title, desc, content, published } = req.body;

  try {
    const article = await articleService.updateArticle({
      id: parseInt(req.params.id),
      title,
      desc,
      content,
      published,
    });
    res.json({
      message: "success",
      data: article,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:id/image", saveFile("image"), async (req, res, next) => {
  const image = (req as MulterRequest).uploadedFileName;

  try {
    const article = await articleService.updateArticleImage({
      id: parseInt(req.params.id),
      image,
    });
    res.json({
      message: "success",
      data: article,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await articleService.deleteArticle(parseInt(req.params.id));
    res.json({
      message: "success",
    });
  } catch (err) {
    next(err);
  }
});
