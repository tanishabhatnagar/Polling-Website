// src/pages/LandingPage.jsx
// src/pages/LandingPage.jsx
export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-dark p-6">

      {/* Header with smaller logo */}
      <div className="flex items-center gap-2 mb-4 bg-primary px-3 py-1 rounded-full shadow-md">
  <img
    src="/images/logo.png"
    alt="Intervue Poll Logo"
    className="h-4 w-4 sm:h-6 sm:w-6 object-contain"
    style={{ maxHeight: "24px", maxWidth: "24px" }}
  />
  <h1 className="text-sm sm:text-lg font-semibold text-white">
    Intervue Poll
  </h1>
</div>


      {/* Welcome Text */}
      <p className="text-xl sm:text-2xl font-bold text-gray-900 text-center max-w-2xl mb-3">
        Welcome to the Live Polling System!
      </p>
      <p className="text-base sm:text-lg text-gray-600 text-center mb-10 max-w-xl">
        Please select the role that best describes you to begin using the live polling system.
      </p>

      {/* Role Selection */}
      <div className="flex flex-col sm:flex-row gap-5">
        <a href="/teacher/create-question">
          <button className="bg-primary hover:bg-secondary text-white font-medium px-8 py-3 rounded-xl shadow transition duration-300">
            I'm a Teacher
          </button>
        </a>
        <a href="/student/name">
          <button className="bg-accent hover:bg-secondary text-white font-medium px-8 py-3 rounded-xl shadow transition duration-300">
            I'm a Student
          </button>
        </a>
      </div>
    </div>
  );
}

