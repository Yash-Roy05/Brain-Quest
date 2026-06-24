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
      <div
  className="
  min-h-screen
  bg-gradient-to-b
  from-red-300
  via-red-400
  to-red-600
  px-4
  pt-6
  pb-28
  flex
  justify-center
  "
>
        <div
          className="
    bg-white
    rounded-3xl
    shadow-2xl
    p-5 md:p-8
    max-w-lg
    w-full
    text-center
    pt-4
    "
        >
          <div className="text-5xl md:text-7xl mb-4">💔</div>

          <h1 className="text-4xl md:text-5xl font-black text-red-600">
            Mission Failed
          </h1>

          <p className="mt-4 text-lg text-gray-700">Don't worry Explorer!</p>

          <p className="text-gray-600">Plants need practice too</p>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-green-100 rounded-2xl p-4">
              <div className="text-3xl">✅</div>

              <div className="text-2xl font-black">{correctCount}</div>

              <div>Correct</div>
            </div>

            <div className="bg-red-100 rounded-2xl p-4">
              <div className="text-3xl">❌</div>

              <div className="text-2xl font-black">{wrongCount}</div>

              <div>Wrong</div>
            </div>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="
      mt-6
      w-full
      bg-yellow-400
      hover:bg-yellow-500
      text-black
      py-3 md:py-4
text-lg md:text-xl
      rounded-3xl
      text-xl
      font-black
      shadow-xl
      hover:scale-105
      active:scale-95
      transition-all
      duration-300
      "
          >
            🔄 Try Again
          </button>

          <button
            onClick={() => navigate("/plants")}
            className="
      mt-3
      w-full
      bg-gray-700
      hover:bg-gray-800
      text-white
      py-3 md:py-4
text-lg md:text-xl
      rounded-3xl
      text-xl
      font-black
      shadow-xl
      "
          >
            🏠 Plant Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-6 md:pt-6 pb-20 px-4 md:px-4">
        <div
          className="
  bg-white
  rounded-3xl
  shadow-2xl
  p-4
  max-w-lg
  w-full
  text-center
  animate-[fadeIn_0.8s_ease]
  mb-4
  md:mb-4
"
        >
          <div className="text-6xl sm:text-8xl mb-4">🏆</div>

          <h1 className="text-3xl sm:text-5xl font-black text-green-600">
            Plant Expert!
          </h1>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 gap-4 mt-6 p-3 sm:p-4">
            <div className="bg-green-100 rounded-2xl p-4">
              <div className="text-3xl">✅</div>
              <div className="font-black text-2xl">{correctCount}</div>
              <div>Correct</div>
            </div>

            <div className="bg-red-100 rounded-2xl p-4">
              <div className="text-3xl">❌</div>
              <div className="font-black text-2xl">{wrongCount}</div>
              <div>Wrong</div>
            </div>
          </div>

          <p className="text-xl mt-2">Level 1 Completed</p>

          <div
            className="
  mt-4
  bg-yellow-100
  rounded-full
  px-8
  py-4
  inline-block
  shadow-lg
"
          >
            <div className="text-4xl">⭐</div>

            <div className="text-3xl font-black text-yellow-700">
              {Math.round((correctCount / plantQuizData.length) * 100)}%
            </div>

            <div className="font-bold">Accuracy</div>
          </div>

          <button
            onClick={() => {
              localStorage.setItem("plantLevel1Completed", "true");
              navigate("/plants");
            }}
            className="
mt-8
w-full
bg-gradient-to-r
from-green-500
to-emerald-600
text-white
py-4
rounded-3xl
text-xl
font-black
shadow-xl
hover:scale-105
active:scale-95
transition-all
duration-300
"
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
