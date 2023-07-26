import { z } from "zod";

const movieSchema = z.object({
  id: z.number(),
  name: z.string().max(50),
  description: z.string().nullish(),
  duration: z.number().int().positive(),
  price: z.number().int().positive(),
});

const movieSchemaReq = movieSchema.omit({ id: true });

const movieSchemaReqDescript = movieSchemaReq;

const movieSchemaRes = movieSchema;

const updatemovieSchema = movieSchemaReq.partial();

const moviesSchemaRes = z.array(movieSchemaRes);

export {
  movieSchema,
  movieSchemaReq,
  movieSchemaRes,
  updatemovieSchema,
  moviesSchemaRes,
  movieSchemaReqDescript,
};
