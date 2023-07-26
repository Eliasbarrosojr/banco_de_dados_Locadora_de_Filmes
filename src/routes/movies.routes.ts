import { Router } from "express";
import {
  cretaMovieControllers,
  deleteMovieControllers,
  listerMoviesControllers,
  updateMovieControllers,
} from "../controllers/controllers";
import validBodyMiddleware from "../middlewares/validatesbody.middleware";
import {
  movieSchemaReq,
  movieSchemaReqDescript,
  updatemovieSchema,
} from "../schemas/movies.schema";
import ifNameExist from "../middlewares/nameExists.middleware";
import idExist from "../middlewares/idExist.middleware";

const moviesRoutes: Router = Router();

moviesRoutes.post(
  "/movies",
  validBodyMiddleware(movieSchemaReq),
  ifNameExist,
  cretaMovieControllers
);
moviesRoutes.get("/movies", listerMoviesControllers);
moviesRoutes.patch(
  "/movies/:id",
  validBodyMiddleware(updatemovieSchema),
  idExist,
  ifNameExist,
  updateMovieControllers
);
moviesRoutes.delete("/movies/:id", idExist, deleteMovieControllers);

export default moviesRoutes;
