import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const idExist = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const idMovie = Number(req.params.id);
  const movieRepositoty: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movieId: Movie | null = await movieRepositoty.findOne({
    where: {
      id: idMovie,
    },
  });

  if (!movieId) {
    throw new AppError("Movie not found", 404);
  }

  return next();
};

export default idExist;
