const express = require("express");
const app = express();
const mongoose = require("mongoose");
const swaggerui = require("swagger-ui-express");
const swaggerJson = require("./swagger_api.json");
const subscribersRouter = require("./routes/subscribers");
const port = 5500;
var logger = require("morgan");

require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("\n Successfully Connected To Database\n\n"));

// Configure CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, OPTIONS, DELETE, PUT, POST, PATCH, HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization, Accept"
  );

  return next();
});

app.use(logger("dev"));
app.use(express.json());
app.use("/subscribers", subscribersRouter);
app.use("/api-docs/v1", swaggerui.serve, swaggerui.setup(swaggerJson));

// app.listen(3005, () => console.log("server started"));

// Listen Port
app.listen(port, () => {
  console.log(
    `\x1b[93m \n Backend Server now running 🚀 on  http://localhost:${port}\x1b[39m\n`,
    `\x1b[93mBackend Server now running 🚀 on  http://localhost:${port}/api-docs/v1\x1b[39m\n`
  );
  console.log(
    "\x1b[93m Build by\x1b[39m \x1b[91mhttps://github.com/sanengineer\x1b[91m"
  );
  console.log(
    "\x1b[93m give ⭐️ start, 🍴 fork and 🧲 clone others repository\x1b[39m"
  );
  console.log("");
});
