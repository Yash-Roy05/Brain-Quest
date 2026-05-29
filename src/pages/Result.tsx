import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.tsx";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import PageWrapper from "../components/PageWrapper.tsx";

type Question = {
  question: string;
  answer: string;
};

type Mission = {
  id: number;
  title: string;
  reward: number;
  type?: string;
  questions?: Question[];
};

type ResultState = {
  mission: Mission;
  userAnswers: string[];
};

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const { addCoins, addXP } = useUser();

  const data = location.state as ResultState;

  // 🎊 Confetti State
  const [showConfetti, setShowConfetti] = useState(true);

  // 🎊 Stop Confetti After 5 Seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // ✅ Rewards + XP
  useEffect(() => {
    if (data?.mission) {
      const mission = data.mission;

      let score = 0;

      if (mission.type === "quiz" && mission.questions) {
        mission.questions.forEach((q, index) => {
          if (
            data.userAnswers[index]?.toLowerCase() === q.answer.toLowerCase()
          ) {
            score++;
          }
        });
      }

      addCoins(mission.reward);

      addXP(score * 10);
    }
  }, []);

  // ❌ No Data
  if (!data) {
    return <h2 className="text-center text-2xl mt-10">No result data ❌</h2>;
  }

  const { mission, userAnswers } = data;

  // 🎯 Score Calculation
  let score = 0;

  if (mission.type === "quiz" && mission.questions) {
    mission.questions.forEach((q, index) => {
      if (userAnswers[index]?.toLowerCase() === q.answer.toLowerCase()) {
        score++;
      }
    });
  }

  // ⭐ Performance Message
  let performance = "Good 👍";

  if (score === mission.questions?.length) {
    performance = "Excellent 🔥";
  } else if (score <= 2) {
    performance = "Keep Practicing 💪";
  }

  return (
    <PageWrapper>
      <>
        {/* 🎊 Confetti */}
        {showConfetti && <Confetti />}

        <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-4 md:p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                🎯 Quiz Result
              </h1>

             <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
                {mission.title}
              </h2>
            </div>

            {/* Score Cards */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-yellow-100 rounded-2xl p-4 text-center">
                <h3 className="text-2xl md:text-3xl font-bold">{score}</h3>

                <p>Correct ✅</p>
              </div>

              <div className="bg-red-100 rounded-2xl p-4 text-center">
                <h3 className="text-3xl font-bold">
                  {(mission.questions?.length || 0) - score}
                </h3>

                <p>Wrong ❌</p>
              </div>

              <div className="bg-purple-100 rounded-2xl p-4 text-center">
                <h3 className="text-3xl font-bold">{mission.reward}</h3>

                <p>Coins 🪙</p>
              </div>
            </div>

            {/* Performance */}
            <div className="bg-blue-100 p-4 rounded-2xl text-center mb-8">
              <h2 className="text-xl md:text-2xl font-bold">{performance}</h2>
            </div>

            {/* Questions Review */}
            <div className="space-y-6">
              {mission.questions?.map((q, index) => {
                const isCorrect =
                  userAnswers[index]?.toLowerCase() === q.answer.toLowerCase();

                return (
                  <div
                    key={index}
                    className={`p-5 rounded-2xl border-2 ${
                      isCorrect
                        ? "bg-green-50 border-green-400"
                        : "bg-red-50 border-red-400"
                    }`}
                  >
                    <h3 className="text-base md:text-lg font-bold mb-2">
                      Q{index + 1}: {q.question}
                    </h3>

                    <p>
                      <span className="font-semibold">Your Answer:</span>{" "}
                      {userAnswers[index]}
                    </p>

                    <p>
                      <span className="font-semibold">Correct Answer:</span>{" "}
                      {q.answer}
                    </p>

                    <p className="mt-2 font-bold">
                      {isCorrect ? "✅ Correct" : "❌ Wrong"}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Back Button */}
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full mt-8 bg-green-500 hover:bg-green-600 hover:scale-105 active:scale-95 transition duration-300 text-white py-4 rounded-2xl text-xl font-bold"
            >
              Back to Dashboard 🔙
            </button>
          </div>
        </div>
      </>
    </PageWrapper>
  );
}
