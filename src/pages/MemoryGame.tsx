import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.tsx";
import PageWrapper from "../components/PageWrapper.tsx";

const emojis = ["🐶", "🐱", "🐸", "🐶", "🐱", "🐸"];

export default function MemoryGame() {

  const navigate = useNavigate();

  const { user, setUser, addCoins, addXP } = useUser();

  const [cards, setCards] = useState(
    [...emojis].sort(() => Math.random() - 0.5)
  );

  const [flipped, setFlipped] = useState<number[]>([]);

  const [matched, setMatched] = useState<number[]>([]);

  // 🎯 Card Click
  const handleClick = (index: number) => {

    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index)
    ) {
      return;
    }

    const newFlipped = [...flipped, index];

    setFlipped(newFlipped);

    // ✅ Check Match
    if (newFlipped.length === 2) {

      const first = cards[newFlipped[0]];
      const second = cards[newFlipped[1]];

      if (first === second) {

        setMatched((prev) => [
          ...prev,
          newFlipped[0],
          newFlipped[1],
        ]);

        setFlipped([]);

      }

      else {

        setTimeout(() => {
          setFlipped([]);
        }, 1000);

      }

    }

  };

  // 🎉 Game Complete
  useEffect(() => {

    if (matched.length === cards.length) {

      addCoins(40);

      addXP(20);

      setUser({
        ...user,
        completedMissions: [
          ...user.completedMissions,
          102,
        ],
      });

      setTimeout(() => {
        alert("Memory Game Completed 🎉");
        navigate("/dashboard");
      }, 500);

    }

  }, [matched]);

  return (
    <PageWrapper>

      <div className="min-h-screen pb-28 bg-gradient-to-b from-pink-300 to-yellow-200 flex items-center justify-center p-6">

        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl text-center">

          <h1 className="text-4xl font-bold mb-6">
            Memory Match 🧠
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Match the same cards together!
          </p>

          <div className="grid grid-cols-3 gap-4">

            {cards.map((card, index) => {

              const isFlipped =
                flipped.includes(index) ||
                matched.includes(index);

              return (

                <div
                  key={index}

                  onClick={() => handleClick(index)}

                  className="bg-blue-200 h-24 rounded-2xl flex items-center justify-center text-4xl cursor-pointer hover:scale-105 transition"
                >

                  {isFlipped ? card : "❓"}

                </div>

              );

            })}

          </div>

        </div>

      </div>

    </PageWrapper>
  );
}