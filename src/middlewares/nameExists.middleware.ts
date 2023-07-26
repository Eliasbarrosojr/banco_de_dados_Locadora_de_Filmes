import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const ifNameExist = async (req: Request, res: Response, next: NextFunction) => {
  const name = req.body.name;

  if (name) {
    const movieRepositoty: Repository<Movie> =
      AppDataSource.getRepository(Movie);

    const movieName: Movie | null = await movieRepositoty.findOne({
      where: {
        name: name,
      },
    });

    if (movieName !== null) {
      throw new AppError("Movie already exists.", 409);
    }
  }
  return next();
};

export default ifNameExist;
