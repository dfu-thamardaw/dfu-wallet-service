import "dotenv/config";

import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import routes from "./routes";
import routesV2 from "./routes-v2";
import errorHandler from "./error_handler";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { options } from "./config";
import cors from "cors";
import { connectToDb } from "./data-access";

// require because of this issue
// https://github.com/expressjs/morgan/issues/190
const morgan = require("morgan");

// Do some magic for dependencies that are not available in node
global.fetch = fetch;
global.Headers = fetch.Headers;

const port = process.env.PORT || 3001;

const app = express();

connectToDb().catch((err) => console.log(err));

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/user", routes.user);
app.use("/network", routes.network);
app.use("/trustline", routes.trustline);
app.use("/event", routes.events);
app.use("/payment", routes.payment);

app.use("/v2/user", routesV2.user);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`${process.env.NODE_ENV} server started at port ${port}`);
});
