import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  // Fetch all feedbacks from the API
  const fetchAllFeedbacks = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await api.get("/feedbacks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbacks(data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  // Delete feedback
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await api.delete(`/feedbacks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAllFeedbacks();
    } catch (error) {
      console.error(
        "Error deleting feedback:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Edit feedback - Navigates to the edit page with the feedback ID
  const handleEdit = (id) => {
    navigate(`/admin/edit-feedback/${id}`);
  };

  // View feedback - Navigates to the view page with the feedback ID
  const handleView = (id) => {
    navigate(`/admin/view-feedback/${id}`);
  };

  useEffect(() => {
    fetchAllFeedbacks();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        Admin Dashboard
      </h1>

      <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-4 text-left">ID</th>
            <th className="py-3 px-4 text-left">Feedback</th>
            <th className="py-3 px-4 text-left">Date</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((fb) => (
            <tr key={fb._id} className="border-b">
              <td className="py-3 px-4">{fb._id}</td>
              <td className="py-3 px-4">{fb.content}</td>
              <td className="py-3 px-4">
                {new Date(fb.createdAt).toLocaleString()}
              </td>
              <td className="py-3 px-4">
                <div className="space-x-3">
                  {/* View Button */}
                  <button
                    onClick={() => handleView(fb._id)}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
                  >
                    View
                  </button>
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(fb._id)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(fb._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
