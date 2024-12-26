import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import FeedbackPage from "./pages/FeedbackPage";
import AdminDashboard from "./pages/AdminDashboard";
import ViewFeedback from "./pages/ViewFeedback";
import EditFeedback from "./pages/EditFeedback";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Router>
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Routes>
            <Route path="/" element={<RegisterPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/view-feedback/:id" element={<ViewFeedback />} />
            <Route path="/admin/edit-feedback/:id" element={<EditFeedback />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
