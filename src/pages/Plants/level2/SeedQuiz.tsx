import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    question: "What comes first?",
    options: ["🌱 Seed", "🌸 Flower", "🌿 Plant"],
    answer: "🌱 Seed",
  },
  {
    question: "What does a seed need first?",
    options: ["💧 Water", "🍫 Chocolate", "🚗 Car"],
    answer: "💧 Water",
  },
  {
    question: "What does the seed become at the end?",
    options: ["🌸 Flower Plant", "🪨 Rock", "🐟 Fish"],
    answer: "🌸 Flower Plant",
  },
];

export default function SeedQuiz() {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  function speak(text: string) {
    const speech = new SpeechSynthesisUtterance(text);

    speech.rate = 0.9;
    speech.pitch = 1.2;

    speechSynthesis.cancel();
    speechSynthesis.speak(speech);
  }

  function handleAnswer(option: string) {
    if (selected !== "") return;

    setSelected(option);

    if (option === questions[current].answer) {
      setScore((prev) => prev + 1);
      speak("Excellent!");
    } else {
      speak("Oops! Try the next one.");
    }

    setTimeout(() => {
      if (current === questions.length - 1) {
        setFinished(true);

        localStorage.setItem("plantLevel2Completed", "true");
      } else {
        setCurrent((prev) => prev + 1);
        setSelected("");
      }
    }, 1500);
  }

  if (finished) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-4xl font-black text-green-700">Amazing!</h1>

          <p className="mt-5 text-xl">You scored</p>

          <h2 className="text-5xl font-black mt-3 text-yellow-500">
            {score} / {questions.length}
          </h2>

          <div className="mt-8 space-y-3">
            <div className="bg-yellow-100 rounded-2xl py-3 font-bold text-xl">
              🪙 +30 Coins
            </div>

            <div className="bg-blue-100 rounded-2xl py-3 font-bold text-xl">
              ⭐ +50 XP
            </div>
          </div>

          <button
            onClick={() => navigate("/plants")}
            className="mt-10 w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-3xl text-xl font-black"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-green-400 to-emerald-500 px-4 pt-8 pb-24">
      <div className="max-w-xl mx-auto flex flex-col">
        <h1 className="text-4xl md:text-5xl font-black text-center text-green-800">
          Seed Quiz
        </h1>

        <p className="text-center mt-3 text-lg">
          Question {current + 1} of {questions.length}
        </p>

        <div className="bg-white rounded-3xl shadow-xl p-8 mt-3 md:mt-10">
          <h2 className="text-2xl md:text-3xl font-black text-center">
            {questions[current].question}
          </h2>

          <div className="mt-8 space-y-4">
            {questions[current].options.map((option) => {
              const correct = selected && option === questions[current].answer;

              const wrong =
                selected === option && option !== questions[current].answer;

              return (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className={`
                    w-full
                    py-5
                    rounded-2xl
                    text-xl
                    font-bold
                    transition-all

                    ${
                      correct
                        ? "bg-green-500 text-white"
                        : wrong
                          ? "bg-red-500 text-white"
                          : "bg-yellow-300 hover:bg-yellow-400"
                    }
                  `}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
