import { useEffect, useState } from 'react';
import api from "../utils/api";
import { useParams, useNavigate } from 'react-router-dom';

const EditFeedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({ content: "" });

  // Fetch the feedback for editing
  const fetchFeedback = async () => {
    const token = localStorage.getItem('token');
    try {
      const { data } = await api.get(`/feedbacks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setFeedback(data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await api.put(`/feedbacks/${id}`, feedback, { headers: { Authorization: `Bearer ${token}` } });
      navigate('/admin'); // Redirect to admin dashboard after editing
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold mb-6">Edit Feedback</h1>
      <form onSubmit={handleEdit} className="bg-white p-4 rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700">Feedback Content</label>
          <textarea
            id="content"
            value={feedback.content}
            onChange={(e) => setFeedback({ ...feedback, content: e.target.value })}
            className="w-full p-3 border rounded"
            rows="5"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditFeedback;
