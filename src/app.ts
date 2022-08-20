import "dotenv/config";
import express from "express";
import "express-async-errors";
import { AppDataSource } from "./data-source";
import { handleErrorMiddleware } from "./middleware/handleError.middleware";
import routes from "./routers/users.routes";

const app = express();

app.use(express.json());
app.use("/users", routes);
app.use(handleErrorMiddleware);

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.APP_PORT || 3000, () => {
    console.log("Server running");

    AppDataSource.initialize()
      .then(() => {
        console.log("Data Source has been initialized!");
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });
}

export default app;
