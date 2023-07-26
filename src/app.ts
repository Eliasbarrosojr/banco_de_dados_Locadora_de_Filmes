import "reflect-metadata";
import "express-async-errors";
import express, { Application } from "express";
import { HandleErrors } from "./error";
import moviesRoutes from "./routes/movies.routes";

const app: Application = express();
app.use(express.json());

app.use("", moviesRoutes);

app.use(HandleErrors);

export default app;
