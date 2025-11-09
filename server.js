const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const routes = require("./Router/route");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

//  MongoDB Connection
(async function connectDB() {
  try {
    await mongoose.connect(
      `mongodb+srv://AhmedHashmi:1d6FHNxs7qnTMdjc@cluster0.r7yo0xw.mongodb.net/?appName=Cluster0`
    );
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error(" MongoDB Connection Error:", error.message);
  }
})();

//  Middlewares
app.use(
  cors({
    origin: "http://localhost:5501", // your frontend port (adjust if needed)
    credentials: true, // allow cookies to pass
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("public"));

// define  Routes
app.use("/api", routes);


app.use(express.static(path.join(__dirname, "public")));

//  Start Server
app.listen(PORT, () => {
  console.log(` Server running on: http://localhost:${PORT}`);
});
