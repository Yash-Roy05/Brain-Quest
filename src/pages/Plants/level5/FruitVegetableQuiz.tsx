import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext.tsx";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const questions: Question[] = [
  {
    question: "Which one is a fruit?",
    options: ["Carrot", "Apple", "Spinach", "Potato"],
    answer: "Apple",
  },
  {
    question: "Which one is a vegetable?",
    options: ["Apple", "Banana", "Carrot", "Mango"],
    answer: "Carrot",
  },
  {
    question: "Which one is botanically a fruit?",
    options: ["Spinach", "Tomato", "Carrot", "Potato"],
    answer: "Tomato",
  },
  {
    question: "Which one is a leafy green vegetable?",
    options: ["Apple", "Spinach", "Orange", "Mango"],
    answer: "Spinach",
  },
  {
    question: "Which food is commonly known as a fruit?",
    options: ["Carrot", "Spinach", "Apple", "Potato"],
    answer: "Apple",
  },
];

export default function FruitVegetableQuiz() {
  const navigate = useNavigate();

  const { addCoins, addXP, setUser } = useUser();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const question = questions[currentQuestion];

  // Select an answer
  const handleAnswer = (answer: string) => {
    // Don't allow changing the answer
    if (isAnswered) {
      return;
    }

    setSelectedAnswer(answer);
    setIsAnswered(true);

    // Increase score immediately if correct
    if (answer === question.answer) {
      setScore((prev) => prev + 1);
    }
  };

  // Next question / finish quiz
  const handleNext = () => {
    if (!selectedAnswer || !isAnswered) {
      return;
    }

    // Last question
    if (currentQuestion === questions.length - 1) {
      // Score was already updated inside handleAnswer,
      // so calculate the final score here.
      const finalScore =
        selectedAnswer === question.answer ? score : score;

      const coins =
        finalScore === questions.length ? 100 : 50;

      const xp =
        finalScore === questions.length ? 50 : 25;

      addCoins(coins);
      addXP(xp);

      setUser((prev) => ({
        ...prev,
        completedMissions: [
          ...prev.completedMissions,
          205,
        ],
      }));

      localStorage.setItem(
        "plantLevel5Completed",
        "true",
      );

      setShowResult(true);

      return;
    }

    // Move to next question
    setCurrentQuestion((prev) => prev + 1);
    setSelectedAnswer("");
    setIsAnswered(false);
  };

  // Result screen
  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center px-4">
        <div className="bg-white rounded-[30px] shadow-2xl p-8 md:p-12 text-center w-full max-w-lg">
          <div className="text-6xl mb-5">
            {score === questions.length ? "🏆" : "🌱"}
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-green-700 mb-4">
            {score === questions.length
              ? "Perfect!"
              : "Quiz Completed!"}
          </h1>

          <p className="text-xl font-bold text-gray-700 mb-3">
            Your Score
          </p>

          <p className="text-4xl font-black text-purple-600 mb-6">
            {score} / {questions.length}
          </p>

          <p className="text-lg text-gray-600 mb-8">
            Great job learning about fruits and vegetables! 🍎🥕
          </p>

          <button
            onClick={() => navigate("/plants")}
            className="
              bg-green-500
              hover:bg-green-600
              text-white
              px-8
              py-4
              rounded-2xl
              font-black
              text-lg
              transition
              hover:scale-105
            "
          >
            Back to Plants 🌱
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-emerald-500 px-4 py-6 pb-24">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
            Fruits & Vegetables 🍎🥕
          </h1>

          <p className="text-white text-lg font-semibold">
            Question {currentQuestion + 1} of{" "}
            {questions.length}
          </p>
        </div>

        {/* Quiz Card */}
        <div className="bg-white rounded-[30px] shadow-2xl p-6 md:p-10">

          {/* Question */}
          <h2 className="text-2xl md:text-3xl font-black text-green-700 text-center mb-8">
            {question.question}
          </h2>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {question.options.map((option) => {
              const isSelected =
                selectedAnswer === option;

              const isCorrect =
                option === question.answer;

              const isWrong =
                isAnswered &&
                isSelected &&
                !isCorrect;

              return (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={isAnswered}
                  className={`
                    w-full
                    p-5
                    rounded-2xl
                    font-black
                    text-lg
                    transition-all
                    shadow-lg

                    ${
                      isAnswered && isCorrect
                        ? "bg-green-500 text-white ring-4 ring-green-600 scale-105"

                        : isWrong
                        ? "bg-red-500 text-white ring-4 ring-red-600 scale-105"

                        : isSelected
                        ? "bg-yellow-400 text-black ring-4 ring-yellow-500 scale-105"

                        : "bg-purple-400 text-white hover:bg-purple-500 hover:scale-105"
                    }

                    ${
                      isAnswered
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }
                  `}
                >
                  {option}

                  {/* Correct / Wrong indicator */}
                  {isAnswered && isCorrect && (
                    <span className="ml-2">
                      ✅
                    </span>
                  )}

                  {isWrong && (
                    <span className="ml-2">
                      ❌
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {isAnswered && (
            <div
              className={`
                mt-6
                p-4
                rounded-2xl
                text-center
                font-bold
                text-lg

                ${
                  selectedAnswer === question.answer
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }
              `}
            >
              {selectedAnswer === question.answer
                ? "🎉 Correct! Great job!"
                : `❌ Wrong! The correct answer is ${question.answer}.`}
            </div>
          )}

          {/* Next Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className={`
                px-8
                py-4
                rounded-2xl
                text-lg
                font-black
                transition-all

                ${
                  isAnswered
                    ? "bg-green-500 hover:bg-green-600 text-white hover:scale-105"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
              `}
            >
              {currentQuestion === questions.length - 1
                ? "Finish Quiz 🏆"
                : "Next ➡️"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

