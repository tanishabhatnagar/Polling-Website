import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import ChatWidget from "./ChatWidget";


function CreateQuestionPage() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(null);
  const [timeLimit, setTimeLimit] = useState(30);
  const [pollHistory, setPollHistory] = useState([]);

  useEffect(() => {
    // Request poll history from server
    socket.emit("get-poll-history");

    // Listen for poll history
    socket.on("poll-history", (history) => {
      setPollHistory(history);
    });

    // Cleanup
    return () => {
      socket.off("poll-history");
    };
  }, []);

 const handleSubmit = (e) => {
  e.preventDefault();

  const correctAnswer = options[correctIndex];

  if (!question.trim() || !correctAnswer) return;

  const newPoll = {
    question: question.trim(),
    options: options.map((opt) => opt.trim()),
    correctAnswer: correctAnswer.trim(),
    timeLimit,
    createdAt: new Date().toISOString(),
  };

  socket.emit("create-question", newPoll);

  // ✅ Add to local history
  setPollHistory((prev) => [...prev, newPoll]);

  // ✅ Navigate after setting
  navigate("/teacher/view-results");
};


  const handleOptionChange = (value, index) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const isFormEmpty = !question.trim() && options.every((o) => !o.trim());

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-white to-slate-100 text-dark p-6">
      <h2 className="text-4xl font-bold text-primary mb-2">Create a Quiz</h2>
      <p className="text-gray-600 mb-6 text-center">
        Try creating a quiz! Add your question, options, mark the correct answer, and set a time limit.
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
      >
        {/* Poll Question Header + Timer */}
        <div className="flex items-center justify-between mb-2">
          <label className="text-lg font-semibold text-dark">Poll Question</label>
          <select
            value={timeLimit}
            onChange={(e) => setTimeLimit(Number(e.target.value))}
            className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-secondary"
          >
            <option value={10}>10 sec</option>
            <option value={20}>20 sec</option>
            <option value={30}>30 sec</option>
            <option value={45}>45 sec</option>
          </select>
        </div>

        {/* Question input */}
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question here"
          className="w-full border border-gray-300 px-4 py-2 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />

        {/* Options */}
        <label className="block text-lg font-semibold text-dark mb-2">Options</label>
        <p className="text-sm text-gray-500 mb-4">Mark the correct answer for your audience.</p>

        {options.map((opt, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-slate-50 border border-gray-200 p-3 rounded-lg mb-3"
          >
            <input
              type="text"
              value={opt}
              onChange={(e) => handleOptionChange(e.target.value, i)}
              placeholder={`Option ${i + 1}`}
              className="flex-1 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-secondary mr-3"
              required
            />
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 mt-2 sm:mt-0">

              <label className="text-sm font-medium">Correct?</label>
              <input
                type="radio"
                name="correctAnswer"
                checked={correctIndex === i}
                onChange={() => setCorrectIndex(i)}
                className="accent-green-500"
              />
              <label className="text-sm">Yes</label>
              <input
                type="radio"
                name={`notCorrect${i}`}
                checked={correctIndex !== i}
                onChange={() => correctIndex === i && setCorrectIndex(null)}
                className="accent-red-500 ml-2"
              />
              <label className="text-sm">No</label>
            </div>
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-xl mt-6 w-full font-semibold text-lg transition-all"
        >
          Ask the Poll
        </button>
      </form>

      <ChatWidget name="Teacher" />


      {/* Feedback if empty */}
      {isFormEmpty && (
        <p className="mt-6 text-sm text-gray-500 italic">
          ⏳ Waiting for a poll to be created...
        </p>
      )}

      {/* Poll History */}
      {/* Poll History */}
<div className="w-full max-w-xl mt-10">
  <h3 className="text-2xl font-bold text-dark mb-6">🕘 Poll History</h3>
  {pollHistory.length === 0 ? (
    <p className="text-gray-500 text-sm italic">No past polls yet.</p>
  ) : (
    <div className="space-y-6">
      {pollHistory
        .slice()
        .reverse()
        .map((poll, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow-md border border-gray-200"
          >
            {/* Poll Question + Timer */}
            <div className="flex items-center justify-between mb-2">
              <label className="text-lg font-semibold text-dark">
                Poll Question
              </label>
              <div className="text-sm text-gray-600">
                ⏱ {poll.timeLimit} sec
              </div>
            </div>

            <input
              type="text"
              value={poll.question}
              readOnly
              className="w-full border border-gray-300 px-4 py-2 rounded-md mb-6 bg-gray-100 cursor-not-allowed"
            />

            <label className="block text-lg font-semibold text-dark mb-2">
              Options
            </label>

            {poll.options.map((opt, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-slate-50 border border-gray-200 p-3 rounded-lg mb-3"
              >
                <input
                  type="text"
                  value={opt}
                  readOnly
                  className="flex-1 border border-gray-300 px-3 py-2 rounded-md bg-gray-100 cursor-not-allowed mr-3"
                />
                <div className="flex items-center space-x-2 text-sm">
                  <label>Correct?</label>
                  <input
                    type="radio"
                    checked={poll.correctAnswer === opt}
                    readOnly
                    className="accent-green-500"
                  />
                  <label>Yes</label>
                  <input
                    type="radio"
                    checked={poll.correctAnswer !== opt}
                    readOnly
                    className="accent-red-500 ml-2"
                  />
                  <label>No</label>
                </div>
              </div>
            ))}

            <p className="text-xs text-gray-500 mt-2">
              Created at: {new Date(poll.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
    </div>
  )}
</div>

    </div>
  );
}

export default CreateQuestionPage;
