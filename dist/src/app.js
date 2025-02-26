import express from "express";
import dotenv from "dotenv-flow";
dotenv.config();
import cors from "cors";
import logger from "./logger/logger.js";
import bodyParser from "body-parser";
import characterRoutes from "./routes/routes.js";
var server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(express.json());
server.use(cors());
server.use("/v1", characterRoutes);
process.on("uncaughtException", function(err) {
    logger.error("An error occured which was not caught");
    logger.error(err);
});
process.on("unhandledRejection", function(err) {
    logger.error("An  unhandled rejection was caught");
    logger.error(err);
});
server.get("/", function(req, res) {
    res.json({
        message: "welcome to the server"
    });
});
// server.get("/error", (req, res) => {
//   const error = new Error("This is a test error!");
//   logger.error(error);
//   res.status(500).send("Error logged");
// });
export default server;
