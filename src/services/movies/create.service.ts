import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";
import { TMovieReq, iMovieCreate } from "../../interfaces/movies.interfaces";
import { movieSchemaRes } from "../../schemas/movies.schema";

const createMovie = async (movieData: TMovieReq): Promise<iMovieCreate> => {
  const movieRepositoty: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: Movie = movieRepositoty.create(movieData);
  await movieRepositoty.save(movie);

  const movieCreated: iMovieCreate = movieSchemaRes.parse(movie);

  return movieCreated;
};

export default createMovie;
