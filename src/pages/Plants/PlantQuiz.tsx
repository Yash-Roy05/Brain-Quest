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

  const [wrongQuestions, setWrongQuestions] = useState<any[]>([]);

  const [reviewMode, setReviewMode] = useState(false);

  const [feedback, setFeedback] = useState("");

  const question = plantQuizData[currentQuestion];

  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    if (showResult || gameOver) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setFeedback(`⏰ Time's Up! Correct Answer: ${question.answer}`);

          setTimeout(() => {
            handleWrong();
          }, 1500);

          return 8;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestion, showResult, gameOver]);

  useEffect(() => {
    if (showResult || gameOver) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setFeedback(`⏰ Time's Up! Correct Answer: ${question.answer}`);

          setTimeout(() => {
            handleWrong();
          }, 1500);

          return 8;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestion, showResult, gameOver]);

  const handleWrong = () => {
    const newHearts = hearts - 1;

    setHearts(newHearts);

    setWrongQuestions((prev) => [...prev, question]);

    setFeedback(`❌ Correct Answer: ${question.answer}`);

    if (newHearts <= 0) {
      setTimeout(() => {
        setGameOver(true);
      }, 1500);

      return;
    }

    setTimeout(() => {
      setFeedback("");

      if (currentQuestion === plantQuizData.length - 1) {
        finishQuiz();
      } else {
        setCurrentQuestion((prev) => prev + 1);
        setTimer(8);
      }
    }, 1500);
  };

  const finishQuiz = () => {
    if (wrongQuestions.length > 0) {
      setReviewMode(true);

      plantQuizData.length = 0;

      wrongQuestions.forEach((q) => {
        plantQuizData.push(q);
      });

      setCurrentQuestion(0);
      setTimer(8);

      return;
    }

    setShowResult(true);
  };

  const handleAnswer = (option: string) => {
    if (option === question.answer) {
      setFeedback("🎉 Awesome!");

      setTimeout(() => {
        setFeedback("");

        if (currentQuestion === plantQuizData.length - 1) {
          finishQuiz();
        } else {
          setCurrentQuestion((prev) => prev + 1);
        }
      }, 1000);
    } else {
      const newHearts = hearts - 1;

      setHearts(newHearts);

      setFeedback(`❌ Oops! Correct Answer: ${question.answer}`);

      if (newHearts <= 0) {
        setTimeout(() => {
          setGameOver(true);
        }, 1500);
      } else {
        setTimeout(() => {
          setFeedback("");

          if (currentQuestion === plantQuizData.length - 1) {
            setShowResult(true);
          } else {
            setCurrentQuestion((prev) => prev + 1);
            setTimer(8);
          }
        }, 1500);
      }
    }
  };

  if (!question) return null;

  if (gameOver) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold">💀 Mission Failed</h1>

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

          <p className="text-xl mt-4">Level 1 Completed</p>

          <button
            onClick={() => navigate("/plants/level2")}
            className="mt-5 bg-green-500 text-white px-6 py-3 rounded-xl"
          >
            Unlock Level 2
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-4 font-bold">
        Question {currentQuestion + 1} / {plantQuizData.length}
      </div>

{reviewMode && (
  <div className="bg-yellow-200 text-yellow-900 p-3 rounded-xl mb-4 font-bold">
    🔄 Review Round - Answer wrong questions again
  </div>
)}

      <h1>{question.question}</h1>

      <div className="text-xl font-bold">⏱️ {timer}s</div>

      <div className="text-2xl mb-4">{"❤️".repeat(hearts)}</div>

      {question.options.map((option: string) => (
        <button
          key={option}
          onClick={() => handleAnswer(option)}
          className="block w-full bg-blue-500 text-white p-4 rounded-xl mb-3 hover:bg-blue-600 transition"
        >
          {option}
        </button>
      ))}
      {feedback && <div className="mt-4 text-xl font-bold">{feedback}</div>}
    </div>
  );
}
