const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const protect = async (req, res, next) => {
  // Get token from Authorization header
  let token = req.headers.authorization?.split(' ')[1];
  
  // If token is missing, return 401 Unauthorized
  if (!token) {
    console.error('No token provided');
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Verify the token using JWT_SECRET from environment
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if decoded contains the user id and find the user
    req.user = await User.findById(decoded.id).select('-password');

    // If user not found, return 401 Unauthorized
    if (!req.user) {
      console.error(`User not found for ID: ${decoded.id}`);
      return res.status(401).json({ message: 'User not found' });
    }

    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    // Log error
    console.error('Error in JWT verification:', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    } else {
      return res.status(401).json({ message: 'Token is not valid' });
    }
  }
};

module.exports = { protect };
