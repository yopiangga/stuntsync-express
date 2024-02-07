import express, { Application, Response, Request, NextFunction } from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { config } from "./config";

import { router as authRouter } from "./routes/authRoutes";
import { router as userRouter } from "./routes/userRoutes";
import { router as articleRouter } from "./routes/articleRoutes";
import { router as videoRouter } from "./routes/videoRoutes";
import { router as posyanduRouter } from "./routes/posyanduRoutes";
import { router as recomendationRouter } from "./routes/recomendationRoutes";
import { router as recomendationCheckRouter } from "./routes/recomendationCheckRoutes";
import { router as monitoringRouter } from "./routes/monitoringRoutes";
import { router as babyRouter } from "./routes/babyRoutes";
import { jwtAuthMiddleware } from "./middleware/jwtAuth";

dotenv.config();

const app: Application = express();

app.use(helmet());
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Replace '*' with your allowed origins
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/auth", authRouter);
app.use("/user", jwtAuthMiddleware, userRouter);
app.use("/article", jwtAuthMiddleware, articleRouter);
app.use("/video", jwtAuthMiddleware, videoRouter);
app.use("/posyandu", jwtAuthMiddleware, posyanduRouter);
app.use("/recomendation", jwtAuthMiddleware, recomendationRouter);
app.use("/recomendation-check", jwtAuthMiddleware, recomendationCheckRouter);
app.use("/monitoring", jwtAuthMiddleware, monitoringRouter);
app.use("/baby", jwtAuthMiddleware, babyRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message,
  });
});

app.listen(config.port, () => {
  console.log("Server is running on port " + config.port);
});
