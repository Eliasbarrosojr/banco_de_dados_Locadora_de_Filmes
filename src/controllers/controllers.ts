import { Request, Response } from "express";
import createMovie from "../services/movies/create.service";
import listerMoviesService from "../services/movies/lister.service";
import updateMovieService from "../services/movies/update.service";
import deleteUsersService from "../services/movies/delete.service";

const cretaMovieControllers = async (req: Request, res: Response) => {
  const movieData = req.body;
  const newMovie = await createMovie(movieData);

  return res.status(201).json(newMovie);
};

const listerMoviesControllers = async (req: Request, res: Response) => {
  const page: number | null = Number(req.query.page) || null;
  const perPage: number = Number(req.query.perPage) || 5;
  const sort: string = req.query.sort?.toString() || "id";
  const order: string = req.query.order?.toString() || "asc";
  const getMovies = await listerMoviesService(page, perPage, sort, order);

  return res.status(200).json(getMovies);
};

const updateMovieControllers = async (req: Request, res: Response) => {
  const movieData = req.body;

  const id = Number(req.params.id);
  const updatedMovie = await updateMovieService(movieData, id);

  return res.status(200).json(updatedMovie);
};

const deleteMovieControllers = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await deleteUsersService(id);

  return res.status(204).send();
};

export {
  cretaMovieControllers,
  listerMoviesControllers,
  updateMovieControllers,
  deleteMovieControllers,
};
