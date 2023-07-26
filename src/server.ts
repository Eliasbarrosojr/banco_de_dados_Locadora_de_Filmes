import app from "./app";
import { AppDataSource } from "./data-source";

const PORT: number = parseInt(process.env.PORT!) || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database is connected");
    app.listen(PORT, async () => {
      console.log(`App running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
