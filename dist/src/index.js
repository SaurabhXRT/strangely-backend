import server from "./app.js";
import logger from "./logger/logger.js";
import dotenv from "dotenv-flow";
dotenv.config();
import dotenvFlow from "dotenv-flow";
dotenvFlow.config();
import { initDatabase } from "./models/init.js";
import { centralDatabase, databaseInitOptions } from "./config/dbconfig.js";
//Asynchronously initialize the database
initDatabase(centralDatabase, databaseInitOptions).catch(function(err) {
    logger.error(err, "An error occured while initializing the database");
});
//const PORT = process.env.PORT || 3000;
import { createServer } from "http";
var httpServer = createServer(server);
httpServer.listen(process.env.PORT, function() {
    console.log("Server started listening on " + process.env.PORT);
    logger.log("Server started listening on " + process.env.PORT);
});
