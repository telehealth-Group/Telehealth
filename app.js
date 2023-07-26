const express = require("express");
const morgan = require("morgan");
const path = require('path')
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const hospitalRoute = require("./routes/hospitalRoute");
const appointmentRoute = require("./routes/appointmentRoute")
const reviewRouter = require("./routes/reviewRoute")

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/users", userRoute);
app.use("/api/users", appointmentRoute);
app.use("/api/users", hospitalRoute);
app.use("/api/review", reviewRouter);



app.use(express.static(path.join(__dirname, "client", "dist")));

// Handle all other routes with the Svelte app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});
module.exports = app;
