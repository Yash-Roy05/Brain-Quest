type Question = {
  question: string;
  answer: string;
};

type Mission = {
  id: number;
  title: string;
  reward: number;

  // 🎮 Game Types
  type:
    | "quiz"
    | "memory"
    | "difference"
    | "dragdrop"
    | "activity"
    | "speedmath"
    | "word"
    | "pattern"
    | "codebreaker"
    | "sudoku"
    | "reflex-tap";

  questions?: Question[];
};

type MissionsByAge = {
  [key: string]: Mission[];
};

export const missions: MissionsByAge = {
  // 👶 AGE 8-10
  "8-10": [
    // 🔍 Difference Game
    {
      id: 101,
      title: "Find the Difference 🔍",
      reward: 50,
      type: "difference",
    },

    // 🧠 Memory Game
    {
      id: 102,
      title: "Memory Match 🧠",
      reward: 40,
      type: "memory",
    },

    // 🧩 Drag Drop
    {
      id: 103,
      title: "Shape Drag Game 🧩",
      reward: 45,
      type: "dragdrop",
    },
  ],

  // 👦 AGE 11-13
  "11-13": [
    {
      id: 201,
      title: "Speed Math Battle ⚡",
      reward: 60,
      type: "speedmath",
    },

    // Word Puzzle 🔤
    {
      id: 202,
      title: "Word Puzzle 🔤",
      reward: 60,
      type: "word",
    },

    // 🧠 Pattern Memory
    {
      id: 203,
      title: "Pattern Memory Master 🧠",
      reward: 120,
      type: "pattern",
    },
  ],

  // 🧑 AGE 14-15
  "14-15": [
    // Code Breaker 🔐
    {
      id: 301,
      title: "Code Breaker 🔐",
      reward: 150,
      type: "codebreaker",
    },

    // Sudoku Lite 🔢
    {
      id: 302,
      title: "Sudoku Lite 🔢",
      reward: 180,
      type: "sudoku",
    },

    // Reflex Tap Challenge ⚡
    {
      id: 405,
      title: "Reflex Tap Challenge ⚡",
      reward: 140,
      type: "reflex-tap",
    },
  ],
};
