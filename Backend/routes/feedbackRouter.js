const express = require('express');
const Feedback = require('../models/FeedbackModel');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Create feedback
router.post("/", protect, async (req, res) => {
  try {
    const { content } = req.body;
    const feedback = await Feedback.create({ user: req.user._id, content });
    res.status(201).json(feedback);
  } catch (error) {
    console.error("Error creating feedback:", error.message);
    res.status(400).json({ message: error.message });
  }
});

// Get all feedbacks of the logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ user: req.user._id });
    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error.message);
    res.status(400).json({ message: error.message });
  }
});

// Get a specific feedback by ID
router.get("/:id", protect, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback with the given ID does not exist." });
    }
    res.json(feedback);
  } catch (error) {
    console.error("Error fetching feedback:", error.message);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
});

// Update feedback by ID
router.put("/:id", protect, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    // Authorization check: Only the user who created the feedback can edit it
    if (feedback.user.toString() === req.user._id.toString()) {
      feedback.content = req.body.content || feedback.content;
      await feedback.save();
      res.json(feedback);
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  } catch (error) {
    console.error("Error updating feedback:", error.message);
    res.status(400).json({ message: error.message });
  }
});

// DELETE feedback by ID
router.delete("/:id", protect, async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json({ message: "Feedback deleted successfully!" });
  } catch (error) {
    console.error("Error deleting feedback:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
