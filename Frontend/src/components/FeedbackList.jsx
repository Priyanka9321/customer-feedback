import { useEffect, useState } from "react";
import api from "../utils/api";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    const token = localStorage.getItem("token");
    const { data } = await api.get("/feedbacks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setFeedbacks(data);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div>
      {feedbacks.map((fb) => (
        <div key={fb._id}>
          <p>{fb.content}</p>
          <p>{new Date(fb.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
