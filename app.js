const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const hospitalRoute = require("./routes/hospitalRoute");

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use('/api/users', userRoute)

module.exports = app;
