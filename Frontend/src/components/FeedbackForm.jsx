import { useState, useEffect } from "react";
import api from "../utils/api";
import PropTypes from "prop-types";

const FeedbackForm = ({ refreshFeedbacks, feedbackToEdit }) => {
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (feedbackToEdit) {
      setContent(feedbackToEdit.content);
      setIsEditing(true);
    } else {
      setIsEditing(false);
      setContent(""); 
    }
  }, [feedbackToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const token = localStorage.getItem("token");
      console.log("Submitting feedback with content:", content); 
  
      if (isEditing && feedbackToEdit) {
        console.log("Updating feedback with ID:", feedbackToEdit._id);
        await api.put(`/feedbacks/${feedbackToEdit._id}`, { content });
        alert("Feedback updated successfully!");
      } else {
        console.log("Creating new feedback"); 
        await api.post("/feedbacks", { content });
        alert("Feedback submitted successfully!");
      }
  
      setContent("");
      if (refreshFeedbacks) refreshFeedbacks(); 
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert(
        "Failed to submit feedback: " +
        (error.response?.data?.message || error.message)
      );
    }
  };
  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          {isEditing ? "Edit Feedback" : "Add Feedback"}
        </h2>

        <div className="flex justify-between mb-6">
          <button
            onClick={() => {
              setIsEditing(false);
              setContent(""); 
            }}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Add Feedback
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
          >
            Edit Feedback
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            placeholder="Write your feedback"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            {isEditing ? "Update Feedback" : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
};

// Add prop types validation
FeedbackForm.propTypes = {
  refreshFeedbacks: PropTypes.func.isRequired,  
  feedbackToEdit: PropTypes.shape({
    _id: PropTypes.string,
    content: PropTypes.string,
  }), 
};

export default FeedbackForm;
