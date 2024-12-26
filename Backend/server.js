require('dotenv').config(); // Add dotenv to load environment variables
const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRouter'); // Import user route
const feedbackRouter = require("./routes/feedbackRouter");
const cors = require('cors');
const app = express();

// Middleware to parse incoming JSON
app.use(express.json());

// Enable CORS if necessary
// Allow CORS for frontend running on localhost:5173
const corsOptions = {
  origin: 'http://localhost:5173', // Allow only requests from localhost:5173
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // You can customize the allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
};

app.use(cors(corsOptions)); // Enable CORS with the specified options

// Register routes
app.use('/api/users', userRoute);

app.use("/api/feedbacks", feedbackRouter);

// Set up your MongoDB connection (example)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); 
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
