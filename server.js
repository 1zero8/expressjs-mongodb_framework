const express = require("express");
const app = express();
const mongoose = require("mongoose");
const subscribersRouter = require("./routes/subscribers");
// const port = process.env.PORT || 5500;

require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(express.json());
app.use("/subscribers", subscribersRouter);

app.listen(3005, () => console.log("server started"));

// app.listen(3000, () => console.log("server started"));

// Listen Port
// app.listen(port, () => {
//   console.log("");
//   console.log(
//     `\x1b[93mBackend Server now running 🚀 on  http://localhost:${port}\x1b[39m`
//   );
//   console.log(
//     "\x1b[93mBuild by\x1b[39m \x1b[91mhttps://github.com/sanengineer\x1b[91m"
//   );
//   console.log(
//     "\x1b[93mgive ⭐️ start, 🍴 fork and 🧲 clone others repository\x1b[39m"
//   );
//   console.log("");
// });
