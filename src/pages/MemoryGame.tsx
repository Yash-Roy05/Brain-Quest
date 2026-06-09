import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.tsx";
import PageWrapper from "../components/PageWrapper.tsx";

const emojis = ["🐶", "🐱", "🐸", "🐶", "🐱", "🐸"];

export default function MemoryGame() {
  const navigate = useNavigate();

  const { user, setUser, addCoins, addXP } = useUser();

  const [cards, setCards] = useState(
    [...emojis].sort(() => Math.random() - 0.5),
  );

  const [flipped, setFlipped] = useState<number[]>([]);

  const [matched, setMatched] = useState<number[]>([]);

  const [showWinCard, setShowWinCard] = useState(false);

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
        setMatched((prev) => [...prev, newFlipped[0], newFlipped[1]]);

        setFlipped([]);
      } else {
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
        completedMissions: [...user.completedMissions, 102],
      });

      setShowWinCard(true);
    }
  }, [matched]);

  return (
    <PageWrapper>
      {showWinCard && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" />

          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-8 text-center w-full max-w-md animate-[popup_0.4s_ease-out] dark:bg-gray-600">
              <div className="text-6xl mb-4">🏆</div>

              <h1 className="text-4xl font-black text-purple-700 mb-2 dark:text-white">
              YOU WIN!
            </h1>

              <div className="rounded-2xl p-4 mb-4">
                <p className="font-bold text-2xl font-bold text-yellow-600 mb-3 dark:text-white">🪙 +40 Coins</p>
                <p className="font-bold text-2xl font-bold text-green-600 mb-0 dark:text-white">⚡ +20 XP</p>
              </div>

              <button
                onClick={() => navigate("/dashboard")}
                className="bg-purple-500
          hover:bg-purple-600
          text-white
          px-8
          py-4
          rounded-2xl
          text-xl
          font-bold"
              >
                Continue
              </button>
            </div>
          </div>
        </>
      )}

      <div
        className="
bg-gradient-to-b
from-pink-300
to-yellow-200
flex
justify-center
items-start
p-2
pt-4
pb-24
mb-2
md:mb-0
min-h-[calc(100vh-80px)]
"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl text-center animate-[fadeIn_0.5s_ease-out] dark:bg-gray-700 ">
          <h1 className="text-4xl font-bold mb-3 text-purple-700 dark:text-white">
            Memory Match
          </h1>

          <p className="text-lg text-gray-600 mb-4 dark:text-white">
            Match the same cards together!
          </p>

          <div className="grid grid-cols-3 gap-4 ">
            {cards.map((card, index) => {
              const isFlipped =
                flipped.includes(index) || matched.includes(index);

              return (
                <div
                  key={index}
                  onClick={() => handleClick(index)}
                  className="bg-blue-200 h-24 rounded-2xl flex items-center justify-center text-4xl cursor-pointer hover:scale-105 transition "
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
