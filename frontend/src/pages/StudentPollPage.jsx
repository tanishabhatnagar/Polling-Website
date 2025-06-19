import { useEffect, useState, useCallback } from "react";
import socket from "../socket";

export default function StudentPollPage() {
  const [poll, setPoll] = useState(null);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);

  const submitAnswer = useCallback(() => {
    if (selected) {
      socket.emit("submit-answer", selected);
    }
    setSubmitted(true);
  }, [selected]);

  useEffect(() => {
    socket.emit("get-current-data");

    socket.on("new-question", (data) => {
      setPoll(data);
      setSelected(null);
      setSubmitted(false);
      setResults(null);
      setRemainingTime(data.timeLimit);
    });

    socket.on("poll-update", (data) => {
      setResults(data);
    });

    return () => {
      socket.off("new-question");
      socket.off("poll-update");
    };
  }, []);

  useEffect(() => {
    let timer;
    if (remainingTime > 0 && !submitted) {
      timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else if (remainingTime === 0 && !submitted) {
      submitAnswer();
    }
    return () => clearInterval(timer);
  }, [remainingTime, submitted, submitAnswer]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-dark p-6">
      {poll ? (
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
          {!submitted ? (
            <>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                {poll.question}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                Time remaining: <span className="font-bold">{remainingTime}s</span>
              </p>
              <form className="space-y-3">
                {poll.options.map((opt, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-2 p-2 rounded border border-gray-300 cursor-pointer hover:border-primary"
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={opt}
                      checked={selected === opt}
                      onChange={() => setSelected(opt)}
                      className="accent-accent"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
                <button
                  type="button"
                  onClick={submitAnswer}
                  className="w-full bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg mt-4 font-semibold"
                >
                  Submit Answer
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Live Results
              </h2>
              <ul className="space-y-2">
                {poll.options.map((opt, i) => {
                  const count = results?.[opt] || 0;
                  const total = Object.values(results || {}).reduce((sum, val) => sum + val, 0);
                  const percent = total ? ((count / total) * 100).toFixed(1) : 0;

                  const isCorrect = opt === poll.correctAnswer;
                  const isSelected = opt === selected;

                  let bgColor = "bg-gray-100";

                  if (isSelected && isCorrect) bgColor = "bg-green-100 border-green-500";
                  else if (isSelected && !isCorrect) bgColor = "bg-red-100 border-red-500";
                  else if (isCorrect) bgColor = "bg-green-50 border-green-400";

                  return (
                    <li
                      key={i}
                      className={`flex justify-between items-center px-4 py-2 border rounded ${bgColor}`}
                    >
                      <span>{opt}</span>
                      <span>{percent}% ({count} votes)</span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                Green = correct answer, Red = your wrong selection
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-6 space-y-4 bg-white shadow-lg rounded-lg max-w-md mx-auto">
          <svg
            className="animate-spin h-10 w-10 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <h2 className="text-xl font-semibold text-primary">
            Waiting for the teacher to ask a question...
          </h2>
          <p className="text-grayish">
            This page will automatically update once the teacher starts a poll.
          </p>
        </div>
      )}
    </div>
  );
}
