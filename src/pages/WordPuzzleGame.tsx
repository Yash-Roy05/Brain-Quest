import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.tsx";
import PageWrapper from "../components/PageWrapper.tsx";
import Confetti from "react-confetti";

export default function WordPuzzleGame() {

  const navigate = useNavigate();

  const {
    setUser,
    addCoins,
    addXP,
  } = useUser();

  // ❤️ Hearts
  const [hearts, setHearts] =
    useState(3);

  // 🪙 Score
  const [score, setScore] =
    useState(0);

  // ⏱ Timer
  const [time, setTime] =
    useState(0);

  // ✨ Message
  const [message, setMessage] =
    useState("");

  // 🔥 Dragging
  const [dragging, setDragging] =
    useState(false);

  // 🎯 Selected Word
  const [selected, setSelected] =
    useState("");

  // ✨ Selected Cells
  const [selectedCells, setSelectedCells] =
    useState<
      { row: number; col: number }[]
    >([]);

  // 🎉 Result Screen
  const [showResult, setShowResult] =
    useState(false);

  const [finalCoins, setFinalCoins] =
    useState(0);

  const [finalXP, setFinalXP] =
    useState(0);

  // 🔤 Used Words
  const [usedWords, setUsedWords] =
    useState<string[]>([]);

  // 📱 Touch Start
  const [touchStarted, setTouchStarted] =
    useState(false);

  // 🔤 Words
  const words = [
    "PLANET",
    "CAPTAIN",
    "FREEDOM",
    "MYSTERY",
    "JOURNEY",
    "ANIMALS",
    "RAINBOW",
  ];

  // 🎯 Current Word
  const [targetWord, setTargetWord] =
    useState("PLANET");

  // 🔳 Grid
  const [grid, setGrid] =
    useState<string[][]>([]);

  // ⏱ Stopwatch
  useEffect(() => {

    if (showResult) return;

    const timer = setInterval(() => {

      setTime((prev) => prev + 1);

    }, 1000);

    return () =>
      clearInterval(timer);

  }, [showResult]);

  // 🎲 Generate Puzzle
  const generatePuzzle = () => {

    const size = 7;

    const availableWords =
      words.filter(
        (word) =>
          !usedWords.includes(word)
      );

    // 🔄 Reset
    if (
      availableWords.length === 0
    ) {

      setUsedWords([]);

      return;

    }

    const randomWord =
      availableWords[
        Math.floor(
          Math.random() *
            availableWords.length
        )
      ];

    setUsedWords((prev) => [
      ...prev,
      randomWord,
    ]);

    setTargetWord(randomWord);

    // 🔳 Empty Grid
    const newGrid = Array(size)
      .fill("")
      .map(() =>
        Array(size).fill("")
      );

    // 🎲 Directions
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [0, -1],
    ];

    let placed = false;

    while (!placed) {

      const direction =
        directions[
          Math.floor(
            Math.random() *
              directions.length
          )
        ];

      const [dx, dy] =
        direction;

      const startRow =
        Math.floor(
          Math.random() * size
        );

      const startCol =
        Math.floor(
          Math.random() * size
        );

      let fits = true;

      for (
        let i = 0;
        i < randomWord.length;
        i++
      ) {

        const newRow =
          startRow + dx * i;

        const newCol =
          startCol + dy * i;

        if (
          newRow < 0 ||
          newRow >= size ||
          newCol < 0 ||
          newCol >= size
        ) {

          fits = false;

          break;

        }

      }

      if (fits) {

        for (
          let i = 0;
          i < randomWord.length;
          i++
        ) {

          const newRow =
            startRow + dx * i;

          const newCol =
            startCol + dy * i;

          newGrid[newRow][newCol] =
            randomWord[i];

        }

        placed = true;

      }

    }

    // 🔠 Fill Random Letters
    for (
      let row = 0;
      row < size;
      row++
    ) {

      for (
        let col = 0;
        col < size;
        col++
      ) {

        if (
          !newGrid[row][col]
        ) {

          newGrid[row][col] =
            String.fromCharCode(
              65 +
                Math.floor(
                  Math.random() * 26
                )
            );

        }

      }

    }

    setGrid(newGrid);

  };

  // 🚀 First Load
  useEffect(() => {

    generatePuzzle();

  }, []);

  // 🖱 Mouse Down
  const handleMouseDown = (
    row: number,
    col: number,
    letter: string
  ) => {

    setDragging(true);

    setSelected(letter);

    setSelectedCells([
      { row, col },
    ]);

  };

  // 📱 Touch Start
  const handleTouchStart = (
    row: number,
    col: number,
    letter: string
  ) => {

    setTouchStarted(true);

    setSelected(letter);

    setSelectedCells([
      { row, col },
    ]);

  };

  // 🖱 Mouse Enter
  const handleMouseEnter = (
    row: number,
    col: number,
    letter: string
  ) => {

    if (!dragging) return;

    const alreadySelected =
      selectedCells.some(
        (cell) =>
          cell.row === row &&
          cell.col === col
      );

    if (alreadySelected) return;

    setSelected(
      (prev) => prev + letter
    );

    setSelectedCells((prev) => [
      ...prev,
      { row, col },
    ]);

  };

  // 📱 Touch Enter
  const handleTouchMove = (
    row: number,
    col: number,
    letter: string
  ) => {

    if (!touchStarted) return;

    const alreadySelected =
      selectedCells.some(
        (cell) =>
          cell.row === row &&
          cell.col === col
      );

    if (alreadySelected) return;

    setSelected(
      (prev) => prev + letter
    );

    setSelectedCells((prev) => [
      ...prev,
      { row, col },
    ]);

  };

  // ✅ Check Word
  const checkWord = () => {

    // ✅ Correct
    if (
      selected === targetWord ||
      selected ===
        targetWord
          .split("")
          .reverse()
          .join("")
    ) {

      navigator.vibrate?.(
        100
      );

      setScore(
        (prev) => prev + 10
      );

      setMessage(
        "Amazing 🔥"
      );

      setTimeout(() => {

        setMessage("");

      }, 1000);

      generatePuzzle();

    }

    // ❌ Wrong
    else {

      navigator.vibrate?.([
        100,
        50,
        100,
      ]);

      setHearts(
        (prev) =>
          Math.max(
            prev - 1,
            0
          )
      );

      setMessage(
        "Wrong 😢"
      );

      setTimeout(() => {

        setMessage("");

      }, 1000);

    }

    setSelected("");

    setSelectedCells([]);

  };

  // 🖱 Mouse Up
  const handleMouseUp = () => {

    setDragging(false);

    checkWord();

  };

  // 📱 Touch End
  const handleTouchEnd = () => {

    setTouchStarted(false);

    checkWord();

  };

  // 🎉 Win
  useEffect(() => {

    if (score >= 70) {

      let coins = 70;

      let xp = 30;

      // ⚡ Fast
      if (time <= 30) {

        coins = 150;

        xp = 80;

      }

      // 🚀 Medium
      else if (time <= 60) {

        coins = 100;

        xp = 50;

      }

      addCoins(coins);

      addXP(xp);

      setFinalCoins(coins);

      setFinalXP(xp);

      setUser((prev) => ({
        ...prev,

        completedMissions: [
          ...prev.completedMissions,
          202,
        ],
      }));

      setShowResult(true);

    }

  }, [score]);

  // 💔 Game Over
  useEffect(() => {

    if (hearts === 0) {

      setTimeout(() => {

        navigate(
          "/dashboard"
        );

      }, 2000);

    }

  }, [hearts]);

  return (

    <>
      {/* 🎉 Result */}
      {showResult && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-[30px] md:rounded-[40px] p-6 md:p-10 text-center shadow-2xl w-full max-w-[90%] md:max-w-md animate-[popup_0.4s_ease]">

            <div className="text-5xl md:text-7xl mb-4">
              🏆
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-purple-700 mb-4">

              YOU WIN!

            </h1>

            <div className="text-lg md:text-2xl font-bold text-blue-600 mb-3">

              ⏱ Time: {time}s

            </div>

            <div className="text-lg md:text-2xl font-bold text-yellow-600 mb-3">

              🪙 Coins: {finalCoins}

            </div>

            <div className="text-lg md:text-2xl font-bold text-green-600 mb-6">

              ⚡ XP: {finalXP}

            </div>

            <button
              onClick={() =>
                navigate(
                  "/dashboard"
                )
              }
              className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-3 md:px-8 md:py-4 rounded-2xl text-lg md:text-xl font-bold hover:scale-105 transition duration-300"
            >
              Continue 🚀
            </button>

          </div>

        </div>

      )}

      <PageWrapper>

        {score >= 70 && (
          <Confetti />
        )}

        <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-pink-300 via-purple-300 to-blue-300 flex items-center justify-center p-3 md:p-6">

          <div className="bg-white rounded-[25px] md:rounded-[40px] shadow-2xl p-4 md:p-10 w-full max-w-4xl text-center">

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-black text-purple-700 mb-4">

              Word Search 🔤

            </h1>

            {/* Hearts */}
            <div className="text-3xl md:text-5xl mb-4">

              {
                "❤️".repeat(
                  Math.max(
                    hearts,
                    0
                  )
                )
              }

            </div>

            {/* Top Info */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 mb-5">

              {/* Timer */}
              <div className="text-lg md:text-2xl font-bold text-blue-600">

                ⏱ {time}s

              </div>

              {/* Score */}
              <div className="text-lg md:text-2xl font-bold text-yellow-600">

                🔍 {score / 10}/7

              </div>

            </div>

            {/* Target */}
            <h2 className="text-xl md:text-3xl font-black mb-6 md:mb-8 text-blue-700 break-words">

              Find: {targetWord}

            </h2>

            {/* Message */}
            {message && (

              <div className="text-2xl md:text-3xl font-black text-pink-500 mb-5 animate-pulse">

                {message}

              </div>

            )}

            {/* Grid */}
            <div className="grid grid-cols-7 gap-1 md:gap-3 justify-center mb-6 touch-none">

              {grid.map(
                (
                  row,
                  rowIndex
                ) =>

                  row.map(
                    (
                      letter,
                      colIndex
                    ) => (

                      <button
                        key={`${rowIndex}-${colIndex}`}
                        onMouseDown={() =>
                          handleMouseDown(
                            rowIndex,
                            colIndex,
                            letter
                          )
                        }
                        onMouseEnter={() =>
                          handleMouseEnter(
                            rowIndex,
                            colIndex,
                            letter
                          )
                        }
                        onMouseUp={
                          handleMouseUp
                        }
                        onTouchStart={() =>
                          handleTouchStart(
                            rowIndex,
                            colIndex,
                            letter
                          )
                        }
                        onTouchMove={() =>
                          handleTouchMove(
                            rowIndex,
                            colIndex,
                            letter
                          )
                        }
                        onTouchEnd={
                          handleTouchEnd
                        }
                        className={`
                          w-10
                          h-10
                          md:w-14
                          md:h-14
                          text-sm
                          md:text-2xl
                          font-black
                          rounded-xl
                          md:rounded-2xl
                          shadow-lg
                          transition
                          duration-200
                          touch-none
                          select-none
                          ${
                            selectedCells.some(
                              (
                                cell
                              ) =>
                                cell.row ===
                                  rowIndex &&
                                cell.col ===
                                  colIndex
                            )
                              ? "bg-pink-500 text-white scale-110"
                              : "bg-purple-400 text-white hover:bg-purple-500"
                          }
                        `}
                      >
                        {letter}
                      </button>

                    )
                  )
              )}

            </div>

            {/* Selected */}
            <div className="text-lg md:text-2xl font-black text-purple-700 break-words">

              Selected: {selected}

            </div>

            {/* 📱 Drag letters with finger to make words */}
            
          </div>

        </div>

      </PageWrapper>

    </>
  );

}