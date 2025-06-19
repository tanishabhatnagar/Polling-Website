
// src/pages/StudentNamePage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentNamePage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const existingName = sessionStorage.getItem("studentName");
    if (existingName) navigate("/student/poll");
  }, [navigate]);

  const handleSubmit = () => {
    if (name.trim()) {
      sessionStorage.setItem("studentName", name);
      navigate("/student/poll");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-dark p-6">
      <h2 className="text-4xl font-bold text-primary mb-4">Hello, Student!</h2>
      <p className="text-lg text-grayish mb-6 max-w-md text-center">
        To participate in the poll, please enter your name. Your name will be used only within this tab.
      </p>
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-grayish px-5 py-3 rounded-lg mb-4 w-72 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        onClick={handleSubmit}
        className="bg-accent hover:bg-secondary text-white px-6 py-3 rounded-xl font-semibold transition shadow-md"
      >
        Continue
      </button>
    </div>
  );
}
