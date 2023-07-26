import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";

const deleteUsersService = async (movieId: number): Promise<void> => {
  const movieRepositoty: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: Movie | null = await movieRepositoty.findOneBy({
    id: movieId,
  });

  await movieRepositoty.remove(movie!);
};

export default deleteUsersService;
