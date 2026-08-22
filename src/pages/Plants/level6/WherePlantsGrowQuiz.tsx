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
    question: "Where do many trees and ferns grow?",
    options: ["Desert", "Forest", "Ocean", "Ice"],
    answer: "Forest",
  },
  {
    question: "Which plant is commonly adapted to the desert?",
    options: ["Cactus", "Water Lily", "Fern", "Rice"],
    answer: "Cactus",
  },
  {
    question: "Where do farmers grow crops?",
    options: ["Ocean", "Farm", "Iceberg", "Road"],
    answer: "Farm",
  },
  {
    question: "Where can water lilies grow?",
    options: ["Desert", "Pond", "Dry Road", "Mountain"],
    answer: "Pond",
  },
  {
    question: "Why do different plants grow in different places?",
    options: [
      "Plants need suitable conditions",
      "Plants need no water",
      "Every place is the same",
      "Plants cannot grow outside",
    ],
    answer: "Plants need suitable conditions",
  },
];

export default function WherePlantsGrowQuiz() {
  const navigate = useNavigate();

  const { addCoins, addXP, setUser } = useUser();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const question = questions[currentQuestion];

  // --------------------------------
  // Select answer
  // --------------------------------
  const handleAnswer = (answer: string) => {
    if (isAnswered) {
      return;
    }

    setSelectedAnswer(answer);
    setIsAnswered(true);
  };

  // --------------------------------
  // Next question / Finish quiz
  // --------------------------------
  const handleNext = () => {
    if (!selectedAnswer || !isAnswered) {
      return;
    }

    const isCorrect = selectedAnswer === question.answer;

    // Calculate score including current question
    const newScore = isCorrect ? score + 1 : score;

    setScore(newScore);

    // --------------------------------
    // Last question
    // --------------------------------
    if (currentQuestion === questions.length - 1) {
      const coins =
        newScore === questions.length ? 100 : 50;

      const xp =
        newScore === questions.length ? 50 : 25;

      addCoins(coins);
      addXP(xp);

      setUser((prev) => ({
        ...prev,
        completedMissions: [
          ...prev.completedMissions,
          206,
        ],
      }));

      localStorage.setItem(
        "plantLevel6Completed",
        "true"
      );

      setShowResult(true);

      return;
    }

    // --------------------------------
    // Move to next question
    // --------------------------------
    setCurrentQuestion((prev) => prev + 1);
    setSelectedAnswer("");
    setIsAnswered(false);
  };

  // --------------------------------
  // Result screen
  // --------------------------------
  if (showResult) {
    return (
      <div
        className="
          min-h-screen
          w-full
          overflow-x-hidden
          bg-gradient-to-r
          from-green-400
          to-emerald-500
          flex
          items-center
          justify-center
          px-3
          sm:px-5
          py-6
        "
      >
        <div
          className="
            w-full
            max-w-md
            sm:max-w-lg
            bg-white
            rounded-3xl
            shadow-2xl
            p-5
            sm:p-8
            md:p-12
            text-center
          "
        >
          {/* Result Icon */}
          <div
            className="
              text-5xl
              sm:text-6xl
              md:text-7xl
              mb-4
            "
          >
            {score === questions.length
              ? "🏆"
              : "🌱"}
          </div>

          {/* Result Title */}
          <h1
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-black
              text-green-700
              mb-3
              sm:mb-4
            "
          >
            {score === questions.length
              ? "Perfect!"
              : "Quiz Completed!"}
          </h1>

          {/* Score Label */}
          <p
            className="
              text-base
              sm:text-xl
              font-bold
              text-gray-700
              mb-2
            "
          >
            Your Score
          </p>

          {/* Score */}
          <p
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-black
              text-purple-600
              mb-5
              sm:mb-6
            "
          >
            {score} / {questions.length}
          </p>

          {/* Message */}
          <p
            className="
              text-sm
              sm:text-base
              md:text-lg
              text-gray-600
              leading-6
              sm:leading-7
              mb-6
              sm:mb-8
            "
          >
            Great job learning where plants grow!
            🌱🌳🏜️
          </p>

          {/* Back Button */}
          <button
            onClick={() => navigate("/plants")}
            className="
              w-full
              sm:w-auto
              bg-green-500
              hover:bg-green-600
              active:scale-95
              text-white
              px-6
              sm:px-8
              py-3
              sm:py-4
              rounded-2xl
              font-black
              text-base
              sm:text-lg
              transition-all
              duration-300
              hover:scale-105
            "
          >
            Back to Plants 🌱
          </button>
        </div>
      </div>
    );
  }

  // --------------------------------
  // Quiz screen
  // --------------------------------
  return (
    <div
      className="
        min-h-screen
        w-full
        overflow-x-hidden
        bg-gradient-to-r
        from-green-400
        to-emerald-500
        px-3
        sm:px-4
        md:px-6
        py-4
        sm:py-6
        md:py-8
        pb-10
        md:pb-16
      "
    >
      <div
        className="
          w-full
          max-w-4xl
          mx-auto
        "
      >
        {/* Header */}
        <div
          className="
            text-center
            mb-5
            sm:mb-7
            md:mb-8
            px-2
          "
        >
          <h1
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              font-black
              text-white
              leading-tight
            "
          >
            Where Plants Grow 
          </h1>

          <p
            className="
              mt-2
              text-sm
              sm:text-base
              md:text-lg
              font-semibold
              text-white
            "
          >
            Question {currentQuestion + 1} of{" "}
            {questions.length}
          </p>

          {/* Score */}
          <p
            className="
              mt-2
              text-sm
              sm:text-base
              md:text-lg
              font-bold
              text-white
            "
          >
            Score: {score}
          </p>

          {/* Progress Bar */}
          <div
            className="
              mt-3
              w-full
              max-w-md
              mx-auto
              h-2
              sm:h-3
              bg-white/40
              rounded-full
              overflow-hidden
            "
          >
            <div
              className="
                h-full
                bg-yellow-400
                rounded-full
                transition-all
                duration-500
              "
              style={{
                width: `${
                  ((currentQuestion + 1) /
                    questions.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        {/* Quiz Card */}
        <div
          className="
            w-full
            bg-white
            rounded-2xl
            sm:rounded-3xl
            shadow-2xl
            p-4
            sm:p-6
            md:p-10
          "
        >
          {/* Question */}
          <h2
            className="
              text-xl
              sm:text-2xl
              md:text-3xl
              lg:text-4xl
              font-black
              text-green-700
              text-center
              leading-snug
              mb-5
              sm:mb-7
              md:mb-8
            "
          >
            {question.question}
          </h2>

          {/* Options */}
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-3
              sm:gap-4
              md:gap-5
            "
          >
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
                    min-h-[64px]
                    sm:min-h-[72px]
                    md:min-h-[80px]

                    px-4
                    sm:px-5

                    py-3
                    sm:py-4

                    rounded-xl
                    sm:rounded-2xl

                    font-black

                    text-base
                    sm:text-lg
                    md:text-xl

                    transition-all
                    duration-300

                    shadow-lg

                    flex
                    items-center
                    justify-center

                    text-center

                    break-words

                    ${
                      isAnswered && isCorrect
                        ? "bg-green-500 text-white ring-4 ring-green-600 scale-[1.02]"
                        : isWrong
                        ? "bg-red-500 text-white ring-4 ring-red-600 scale-[1.02]"
                        : isSelected
                        ? "bg-yellow-400 text-black ring-4 ring-yellow-500 scale-[1.02]"
                        : "bg-purple-400 text-white hover:bg-purple-500 hover:scale-[1.02]"
                    }

                    ${
                      isAnswered
                        ? "cursor-not-allowed"
                        : "cursor-pointer active:scale-95"
                    }
                  `}
                >
                  <span>{option}</span>

                  {/* Correct */}
                  {isAnswered && isCorrect && (
                    <span
                      className="
                        ml-2
                        text-xl
                        sm:text-2xl
                      "
                    >
                      ✅
                    </span>
                  )}

                  {/* Wrong */}
                  {isWrong && (
                    <span
                      className="
                        ml-2
                        text-xl
                        sm:text-2xl
                      "
                    >
                      ❌
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {isAnswered && (
            <div
              className={`
                mt-4
                sm:mt-5
                md:mt-6

                p-3
                sm:p-4
                md:p-5

                rounded-xl
                sm:rounded-2xl

                text-center

                font-bold

                text-sm
                sm:text-base
                md:text-lg

                leading-6
                sm:leading-7

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
          <div
            className="
              flex
              justify-center
              mt-5
              sm:mt-7
              md:mt-8
            "
          >
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className={`
                w-full
                sm:w-auto

                min-w-0
                sm:min-w-[180px]

                px-6
                sm:px-8

                py-3
                sm:py-4

                rounded-xl
                sm:rounded-2xl

                text-base
                sm:text-lg
                md:text-xl

                font-black

                transition-all
                duration-300

                ${
                  isAnswered
                    ? "bg-green-500 hover:bg-green-600 text-white hover:scale-105 active:scale-95"
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