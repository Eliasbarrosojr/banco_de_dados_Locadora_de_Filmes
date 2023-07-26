import { DeepPartial, Repository } from "typeorm";
import { Movie } from "../entities";
import { z } from "zod";
import {
  movieSchema,
  movieSchemaReq,
  moviesSchemaRes,
  updatemovieSchema,
} from "../schemas/movies.schema";

type iMovieCreate = z.infer<typeof movieSchema>;
type iMovieUpdate = z.infer<typeof updatemovieSchema>;
type iMovieRepo = Repository<Movie>;
type TMovieReq = z.infer<typeof movieSchemaReq>;
type TMoviesRes = z.infer<typeof moviesSchemaRes>;

type TmoviePagination = {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: TMoviesRes;
};

export {
  TMovieReq,
  TMoviesRes,
  TmoviePagination,
  iMovieCreate,
  iMovieUpdate,
  iMovieRepo,
};
