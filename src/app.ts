import express, { Express } from "express";
import { errorHandler } from "./middleware/error-handler";
import cors from "cors";
import { corsOptions } from "./middleware/cors";
import { validator } from "./middleware/validator";
import { HttpException } from "./assets/exception/http-exception";

export default (): Express => {
  const app = express();

  //  basic middleware
  app.use(cors(corsOptions));
  app.get("/", (_, res) => res.json({ ok: true }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));
  app.use(express.json({ limit: "50mb" }));

  //  routes
  app.get("/test", (req, res) => {
    return res.json({ ok: true, message: "get : /" });
  });
  app.post("/test", (req, res) => {
    return res.json({ ok: true, message: "post : /test" });
  });
  app.post(
    "/validation",
    validator({
      body: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string" }
        },
        additionalProperties: false
      }
    }),
    (_, res) => {
      return res.json({ ok: true });
    }
  );
  app.post(
    "/validation-error",
    validator({
      body: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string" }
        },
        additionalProperties: false
      }
    }),
    (_, res) => {
      return res.json({ ok: true });
    }
  );
  app.post("/error", () => {
    throw new HttpException("error message", "BAD_REQUEST");
  });

  //  errorHandler
  app.use(errorHandler);

  return app;
};
