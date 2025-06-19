import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import StudentNamePage from "./pages/StudentNamePage";
import StudentPollPage from "./pages/StudentPollPage";
import CreateQuestionPage from "./pages/CreateQuestionPage";
import TeacherResultsPage from "./pages/TeacherResultsPage";
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/student/name" element={<StudentNamePage />} />
        <Route path="/student/poll" element={<StudentPollPage />} />
        <Route path="/teacher/create-question" element={<CreateQuestionPage />} />
        <Route path="/teacher/view-results" element={<TeacherResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
