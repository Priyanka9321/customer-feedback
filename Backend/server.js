require("dotenv").config();
const express = require("express");
const userRoute = require("./routes/userRouter");
const feedbackRouter = require("./routes/feedbackRouter");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

// Set up your MongoDB connection (example)
connectDB();
const app = express();

// Middleware to parse incoming JSON
app.use(express.json());

app.use(cors());

// Register routes
app.use("/api/users", userRoute);
app.use("/api/feedbacks", feedbackRouter);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// deployment
const _dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "../Frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running.....");
  });
}
