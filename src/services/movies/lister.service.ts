import { Repository } from "typeorm";
import { TMoviesRes } from "../../interfaces/movies.interfaces";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";
import { moviesSchemaRes } from "../../schemas/movies.schema";
import { iPagination } from "../../interfaces";

const listerMoviesService = async (
  page: number | null,
  perPage: number,
  sort: string,
  order: string
): Promise<iPagination> => {
  const movieRepositoty: Repository<Movie> = AppDataSource.getRepository(Movie);
  let movies: Movie[] | undefined;

  if (sort !== "price" && sort !== "duration") {
    sort = "id";
    order = "asc";
  }

  if (!page || !perPage) {
    movies = await movieRepositoty.find({
      take: 5,
      order: {
        [sort]: order,
      },
    });
  } else {
    if (Number(page) < 0) {
      page = 1;
    }
    if (perPage <= 0 || perPage > 5 || perPage == 0) {
      perPage = 5;
    }
    movies = await movieRepositoty.find({
      skip: (page - 1) * perPage,
      take: perPage,
    });
  }

  const returnMovies: TMoviesRes = moviesSchemaRes.parse(movies);

  const lenghtMovie = Number(returnMovies.length);

  let urlPrev = null;
  let urlNext = `http://localhost:3000/movies?page=${
    Number(page) + 2
  }&perPage=${perPage}`;

  if (page! <= 1) {
    let urlPrev = null;
    let urlNext = `http://localhost:3000/movies?page=${
      Number(page) + 2
    }&perPage=${perPage}`;
  } else if (page! > 1) {
    let urlPrev = `http://localhost:3000/movies?page=${
      Number(page) + 1
    }&perPage=${perPage}`;
  } else if (perPage === 0) {
    let urlNext = null;
  }

  return {
    prevPage: urlPrev,
    nextPage: urlNext,
    count: lenghtMovie,
    data: returnMovies,
  };
};

export default listerMoviesService;
