const path = require("path");
const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
//const colors = require('colors');
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const fileUpload = require("express-fileupload");
const port = process.env.PORT || 5000;
const app = express();
const __dirname = path.resolve();
connectDB();

// Function to serve all static files
// inside public directory.
app.use(express.static(path.join("backend/images"))); //Serve static files/images
console.log(__dirname);

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

//Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production build"));
}

app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
