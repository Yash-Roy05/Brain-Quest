import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { plantQuizData } from "../../data/plantQuizData.ts";

export default function PlantQuiz() {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [hearts, setHearts] = useState(3);

  const [timer, setTimer] = useState(8);

  const [showResult, setShowResult] = useState(false);

  const [gameOver, setGameOver] = useState(false);

  const [feedback, setFeedback] = useState("");

  const [selectedAnswer, setSelectedAnswer] = useState("");

  const [wrongQuestions, setWrongQuestions] = useState<any[]>([]);

  const [reviewMode, setReviewMode] = useState(false);

  const currentQuestions = reviewMode ? wrongQuestions : plantQuizData;

  const question = currentQuestions[currentQuestion];

  const [isLocked, setIsLocked] = useState(false);

  const [correctCount, setCorrectCount] = useState(0);

  const [wrongCount, setWrongCount] = useState(0);

  useEffect(() => {
    if (showResult || gameOver) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1 && !isLocked) {
          setIsLocked(true);

          setTimeout(() => {
            handleWrong();
          }, 0);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestion, showResult, gameOver, isLocked]);

  const handleWrong = () => {
    setIsLocked(true);

    const newHearts = hearts - 1;

    setHearts(newHearts);

    setWrongQuestions((prev) => [...prev, question]);

    setWrongCount((prev) => prev + 1);

    if (newHearts <= 0) {
      setTimeout(() => {
        setGameOver(true);
      }, 2000);

      return;
    }

    setTimeout(() => {
      setFeedback("");

      if (currentQuestion === currentQuestions.length - 1) {
        if (wrongQuestions.length > 0 && !reviewMode) {
          setReviewMode(true);

          setCurrentQuestion(0);

          setSelectedAnswer("");

          setTimer(8);

          setIsLocked(false);

          return;
        }

        setShowResult(true);
      } else {
        setSelectedAnswer("");
        setCurrentQuestion(currentQuestion + 1);
        setTimer(8);
        setIsLocked(false);
      }
    }, 2000);
  };

  const handleAnswer = (option: string) => {
    if (isLocked) return;
    setSelectedAnswer(option);

    if (option === question.answer) {
      setCorrectCount((prev) => prev + 1);

      setIsLocked(true);

      setTimeout(() => {
        setFeedback("");

        if (currentQuestion === currentQuestions.length - 1) {
          if (wrongQuestions.length > 0 && !reviewMode) {
            setReviewMode(true);

            setCurrentQuestion(0);

            setSelectedAnswer("");

            setTimer(8);

            setIsLocked(false);

            return;
          }

          setShowResult(true);
        } else {
          setSelectedAnswer("");
          setCurrentQuestion(currentQuestion + 1);
          setTimer(8);
          setIsLocked(false);
        }
      }, 1000);
    } else {
      handleWrong();
    }
  };

  if (!question) return null;

  if (gameOver) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold"> Mission Failed</h1>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-5 bg-red-500 text-white px-6 py-3 rounded-xl"
          >
            Back To Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold">🌱 Plant Expert</h1>

          <p className="text-xl mt-4">Correct Answers: {correctCount}</p>

          <p className="text-xl">Wrong Answers: {wrongCount}</p>

          <p className="text-xl mt-2">Level 1 Completed</p>

          <p className="text-2xl font-bold text-green-600 mt-4">
            Accuracy: {Math.round((correctCount / plantQuizData.length) * 100)}%
          </p>

          <button
            onClick={() => navigate("/plants/level2")}
            className="mt-5 bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl"
          >
            Unlock Level 2
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden mx-auto px-4 sm:px-6 pb-24">
      <div
        className="absolute inset-0 bg-sky-200 transition-all duration-100"
        style={{
          opacity: timer / 8,
        }}
      />
      {/* Timer Background */}
      <div
        className="absolute inset-0 bg-sky-200 transition-all duration-1000"
        style={{
          clipPath: `inset(${100 - (timer / 8) * 100}% 0 0 0)`,
        }}
      />

      <div className="relative z-10 p-6">
        <div className="mb-4 font-bold text-sm sm:text-base">
          Question {currentQuestion + 1} / {currentQuestions.length}
        </div>

        {!reviewMode && (
          <div className="w-full bg-gray-200 h-4 rounded-full mb-6">
            <div
              className="bg-green-500 h-4 rounded-full transition-all duration-500"
              style={{
                width: `${(currentQuestion / plantQuizData.length) * 100}%`,
              }}
            />
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
            {question.question}
          </h1>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div
            className={`
          text-2xl
          sm:text-3xl
          transition-all
          duration-300
          ${hearts <= 1 ? "animate-bounce" : ""}
        `}
          >
            {"❤️".repeat(hearts)}
          </div>
        </div>

        {question.options.map((option: string) => {
          let buttonColor = "bg-blue-500 hover:bg-blue-600";

          if (selectedAnswer !== "") {
            if (option === question.answer) {
              buttonColor = "bg-green-500 shadow-lg";
            }

            if (option === selectedAnswer && option !== question.answer) {
              buttonColor = "bg-red-500 shake";
            }
          }

          return (
            <button
              key={option}
              disabled={isLocked}
              onClick={() => handleAnswer(option)}
              className={`block w-full text-white p-3 sm:p-4 rounded-xl mb-3 transition-all duration-300 text-sm sm:text-base ${buttonColor}`}
            >
              {option}
            </button>
          );
        })}

        {feedback && (
          <div className="mt-6 text-center text-2xl font-bold animate-pulse">
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
}
