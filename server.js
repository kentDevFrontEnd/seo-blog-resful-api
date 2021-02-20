const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

require("dotenv").config();

// routes
const blogRoute = require("./routes/blog.route");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const categoryRoute = require("./routes/category.route");
const tagRoute = require("./routes/tag.route");
const inititalRoute = require("./routes/initialData.route");

// mongoose connect
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  function () {
    console.log("Database connected");
  }
);

// app
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
// cors
// if (process.env.NODE_ENV === "development") {
//   app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
// }
app.use(cors());

// router
app.use("/public", express.static("uploads"));
app.use("/api/blog", blogRoute);
app.use("/api/user", authRoute);
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/tag", tagRoute);
app.use("/api/initialData", inititalRoute);

// port
const port = process.env.PORT || 2000;

app.listen(port, function () {
  console.log(`Listen server from port: ${port}`);
});
