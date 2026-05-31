import { useState } from "react";
import PageWrapper from "../components/PageWrapper.tsx";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.tsx";


export default function SudokuLiteGame() {
  // 🎯 Original Sudoku
  const originalGrid = [
    [1, 0, 3, 4],
    [3, 4, 0, 2],
    [2, 1, 4, 0],
    [0, 3, 2, 1],
  ];

  // ✅ Correct Solution
  const solution = [
    [1, 2, 3, 4],
    [3, 4, 1, 2],
    [2, 1, 4, 3],
    [4, 3, 2, 1],
  ];

  // 🎮 User Grid
  const [grid, setGrid] = useState(originalGrid);

  // 🎉 Result Screen
  const [showResult, setShowResult] = useState(false);

  // ❤️ Hearts
  const [hearts, setHearts] = useState(3);

  // 🎉 Win
  const [won, setWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // 💡 Message
  const [message, setMessage] = useState("");

  // 📈 Progress
  const filledCells = grid.flat().filter((cell) => cell !== 0).length;

  const totalCells = 16;

  const progress = (filledCells / totalCells) * 100;

  const navigate = useNavigate();
  const { addCoins, addXP } = useUser();

  // ✍ Input Change
  const handleChange = (row: number, col: number, value: string) => {
    const number = Number(value);

    // ❌ Empty
    if (value === "") {
      const newGrid = [...grid];

      newGrid[row][col] = 0;

      setGrid(newGrid);

      return;
    }

    // ❌ Only 1-4
    if (number < 1 || number > 4) {
      return;
    }

    const newGrid = [...grid];

    // ✅ Correct
    if (number === solution[row][col]) {
      navigator.vibrate?.(100);

      newGrid[row][col] = number;

      setGrid(newGrid);

      setMessage("Correct ✅");

      setTimeout(() => {
        setMessage("");
      }, 1000);
    }

    // ❌ Wrong
    else {
      navigator.vibrate?.([100, 50, 100]);

      setHearts((prev) => {
        const newHearts = Math.max(prev - 1, 0);

        if (newHearts === 0) {
          setGameOver(true);
        }

        return newHearts;
      });

      setMessage("Wrong Number ❌");

      setTimeout(() => {
        setMessage("");
      }, 1000);
    }

    // 🎉 Check Win
    const solved = newGrid.every((row, rowIndex) =>
      row.every((cell, colIndex) => cell === solution[rowIndex][colIndex]),
    );

    if (solved && !won) {
  addCoins(80);
  addXP(40);

  setTimeout(() => {
    setWon(true);
  }, 100);
}
  };

  return (
    <PageWrapper>
      {won ? (
        <div className="min-h-screen overflow-x-hidden">
          {/* 🎉 Win Popup */}
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-[40px] p-10 text-center shadow-2xl w-[90%] max-w-md animate-[popup_0.4s_ease]">
              <div className="text-7xl mb-4">🏆</div>

              <h1 className="text-5xl font-black text-green-600 mb-6">
                Sudoku Solved!
              </h1>

              <button
                onClick={() => navigate("/dashboard")}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:scale-105 transition duration-300"
              >
                Continue 🚀
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen pb-32 bg-gradient-to-b from-purple-400 via-blue-300 to-cyan-200 flex items-center justify-center p-6">
          <div className="bg-white rounded-[40px] shadow-2xl p-4 md:p-8 w-full max-w-2xl text-center">
            {/* Title */}
            <h1 className="text-5xl font-black text-purple-700 mb-4">
              Sudoku Lite 🔢
            </h1>

            {/* Hearts */}
            <div className="text-4xl mb-4">
              {"❤️".repeat(Math.max(hearts, 0))}
            </div>

            {/* Goal */}
            <div className="text-xl font-bold text-green-600 mb-6">
              Fill The Missing Numbers 🧠
            </div>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm font-bold mb-2">
                <span>Progress 🚀</span>
                <span>{Math.floor(progress)}%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-pink-400 via-yellow-400 to-green-500 h-5 rounded-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>

            {/* Message */}
            {message && (
              <div className="text-2xl font-black text-pink-500 mb-6">
                {message}
              </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-4 gap-3 justify-center mb-8">
              {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                  const isFixed = originalGrid[rowIndex][colIndex] !== 0;

                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className="w-14 h-14
sm:w-16 sm:h-16
md:w-20 md:h-20"
                    >
                      {isFixed ? (
                        <div className="w-full h-full bg-purple-400 rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-lg">
                          {cell}
                        </div>
                      ) : (
                        <input
                          type="text"
                          min="1"
                          max="4"
                          value={cell === 0 ? "" : cell}
                          onChange={(e) =>
                            handleChange(rowIndex, colIndex, e.target.value)
                          }
                          className="w-full h-full bg-yellow-100 rounded-2xl text-center text-3xl font-black outline-none border-4 border-transparent focus:border-purple-500 shadow-lg"
                        />
                      )}
                    </div>
                  );
                }),
              )}
            </div>

            {/* 💔 Game Over */}
            {gameOver && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <div className="bg-white rounded-[40px] p-10 text-center shadow-2xl w-[90%] max-w-md">
                  <div className="text-7xl mb-4">😢</div>

                  <h1 className="text-5xl font-black text-red-500 mb-6">
                    Game Over
                  </h1>

                  <p className="text-xl font-bold text-gray-600 mb-8">
                    You lost all hearts!
                  </p>

                  <button
                    onClick={() => window.location.reload()}
                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:scale-105 transition duration-300"
                  >
                    Try Again 🔄
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
