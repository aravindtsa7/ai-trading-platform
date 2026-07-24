import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import routes from "./routes";

import { errorMiddleware } from "./middleware/error.middleware";
import { AppError } from "./common/exceptions";

const app = express();

/*
|--------------------------------------------------------------------------
| Global Middleware
|--------------------------------------------------------------------------
*/

app.use(helmet());
app.use(cors());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Trading Platform API is running",
    version: "1.0.0",
  });
});

app.get("/error", (_req, _res) => {
  throw new AppError("This is a test error", 400);
});
*/
app.use("/api/v1", routes);

/*
|--------------------------------------------------------------------------
| Error Middleware (Always Last)
|--------------------------------------------------------------------------
*/

app.use(errorMiddleware);

export default app;