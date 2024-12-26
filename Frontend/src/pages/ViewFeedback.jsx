import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../utils/api';

const ViewFeedback = () => {
  const { id } = useParams(); // Get the feedback ID from the URL
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      const token = localStorage.getItem('token');
      try {
        const { data } = await api.get(`/feedbacks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        setFeedback(data);
      } catch (error) {
        console.error("Error fetching feedback details:", error);
      }
    };

    fetchFeedback();
  }, [id]);

  if (!feedback) return <p className="text-center text-gray-500">Loading feedback details...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Feedback Details</h1>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <span className="font-medium text-gray-700 mr-2">ID:</span>
          <span className="text-gray-600">{feedback._id}</span>
        </div>
        
        <div className="flex items-center">
          <span className="font-medium text-gray-700 mr-2">Content:</span>
          <p className="text-gray-600">{feedback.content}</p>
        </div>
        
        <div className="flex items-center">
          <span className="font-medium text-gray-700 mr-2">Created At:</span>
          <span className="text-gray-600">{new Date(feedback.createdAt).toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button 
          onClick={() => window.history.back()} 
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ViewFeedback;
