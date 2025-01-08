import { useState, useEffect } from "react";
import api from "../utils/api";
import FeedbackForm from "../components/FeedbackForm";

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackToEdit, setFeedbackToEdit] = useState(null);

  // Fetch all feedbacks
  const refreshFeedbacks = async () => {
    const response = await api.get("/feedbacks");
    setFeedbacks(response.data);
  };

  // Set feedback for editing
  const handleEditFeedback = (feedback) => {
    setFeedbackToEdit(feedback);
  };

  useEffect(() => {
    refreshFeedbacks();
  }, []);

  return (
    <div>
      <FeedbackForm refreshFeedbacks={refreshFeedbacks} feedbackToEdit={feedbackToEdit} />

      <div className="mt-8">
        {feedbacks.map((fb) => (
          <div key={fb._id} className="p-4 border-b">
            <p>{fb.content}</p>
            <button
              onClick={() => handleEditFeedback(fb)}
              className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 mt-2"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackPage;
