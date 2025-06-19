// src/pages/LandingPage.jsx
export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-dark p-6">
      <h1 className="text-5xl font-bold text-primary mb-4 text-center">Welcome to the Live Polling System</h1>
      <p className="text-lg text-grayish text-center mb-10 max-w-2xl">
        Please select the role that best describes you to begin using the live polling system.
      </p>
      <div className="flex gap-6">
        <a href="/teacher/create-question">
          <button className="bg-primary hover:bg-secondary text-white font-semibold px-6 py-3 rounded-xl shadow-md transition">
            I'm a Teacher
          </button>
        </a>
        <a href="/student/name">
          <button className="bg-accent hover:bg-secondary text-white font-semibold px-6 py-3 rounded-xl shadow-md transition">
            I'm a Student
          </button>
        </a>
      </div>
    </div>
  );
}
