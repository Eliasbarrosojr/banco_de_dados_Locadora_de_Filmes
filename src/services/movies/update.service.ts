import { Repository } from "typeorm";
import { TMovieReq, iMovieCreate } from "../../interfaces/movies.interfaces";
import { Movie } from "../../entities";
import { AppDataSource } from "../../data-source";
import { movieSchemaRes } from "../../schemas/movies.schema";

const updateMovieService = async (
  data: TMovieReq,
  id: number
): Promise<iMovieCreate> => {
  const movieRepositoty: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: Movie | null = await movieRepositoty.findOneBy({
    id,
  });

  const updatedMovie: Movie = movieRepositoty.create({
    ...movie,
    ...data,
  });

  await movieRepositoty.save(updatedMovie);

  const newData: iMovieCreate = movieSchemaRes.parse(updatedMovie);

  return newData;
};

export default updateMovieService;
