import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useSound from "use-sound";

export default function PlantLesson() {
  const navigate = useNavigate();

  const [currentTeacherMessage, setCurrentTeacherMessage] = useState(
    "👋 Hello friend! Click any plant part to learn.",
  );
  const [selectedPart, setSelectedPart] = useState("");

  const [visitedParts, setVisitedParts] = useState<string[]>([]);

  const [teacherHappy, setTeacherHappy] = useState(false);

  const [playClick] = useSound("/click.mp3");

  const plantParts = [
    {
      emoji: "🌱",
      title: "Root",
      description:
        "💧 Great choice! Roots grow under the soil. They absorb water and nutrients from the ground.",
    },
    {
      emoji: "🌿",
      title: "Stem",
      description:
        "🌿 Nice! The stem supports the plant and carries water to all parts.",
    },
    {
      emoji: "🍃",
      title: "Leaf",
      description:
        "☀️ Awesome! Leaves make food for the plant using sunlight, air and water.",
    },
    {
      emoji: "🌸",
      title: "Flower",
      description:
        "🌸 Wonderful! Flowers help plants produce seeds and grow new plants.",
    },
  ];

  useEffect(() => {
    speakMessage("Hello friend! Click any plant part to learn.");
  }, []);

  const teacherMessages: Record<string, string> = {
    Root: "Great choice! Roots grow under the soil. They absorb water and nutrients from the ground.",

    Stem: "Nice! The stem supports the plant and carries water to all parts.",

    Leaf: "Awesome! Leaves make food for the plant using sunlight, air and water.",

    Flower: "Wonderful! Flowers help plants produce seeds and grow new plants.",
  };

  const speakMessage = (message: string) => {
    const speech = new SpeechSynthesisUtterance(message);

    speech.rate = 0.9; // speaking speed
    speech.pitch = 1.2; // slightly child-friendly voice

    speechSynthesis.cancel(); // stop previous voice

    speechSynthesis.speak(speech);
  };

  const handlePartClick = (part: any) => {
    setSelectedPart(part.title);

    const message = teacherMessages[part.title];

    if (!visitedParts.includes(part.title)) {
      const updatedParts = [...visitedParts, part.title];

      setVisitedParts(updatedParts);

      // First teach the selected part
      setCurrentTeacherMessage(message);

      const speech = new SpeechSynthesisUtterance(message);

      speech.rate = 0.9;
      speech.pitch = 1.2;

      speech.onend = () => {
        if (updatedParts.length === plantParts.length) {
          setTeacherHappy(true);

          const finalMessage =
            "Amazing Explorer! You learned all plant parts. Now you are ready for the quiz!";

          setCurrentTeacherMessage(finalMessage);

          speakMessage(finalMessage);
        }
      };

      speechSynthesis.cancel();
      speechSynthesis.speak(speech);
    } else {
      setCurrentTeacherMessage(message);

      speakMessage(message);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-emerald-500 p-4 md:p-6 pb-24 md:pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-black text-white ">
            Parts Of A Plant
          </h1>

          <p className="text-white text-lg mt-2">
            Learn the 4 main parts of a plant
          </p>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div
            className="
    bg-white
    rounded-3xl
    shadow-xl
    p-4
    max-w-md
    relative
    mt-3
  "
          >
            <p className="font-bold text-green-700">Quester</p>

            <p className="mt-2">{currentTeacherMessage}</p>

            <div
              className="
      absolute-top-3
      left-10
      w-6
      h-6
      bg-white
      rotate-45
      "
            />
          </div>
        </div>

        <div className="relative w-full max-w-md mx-auto h-[420px] mt-10">
          {/* Daisy Center */}
          <div
            className="
  absolute
  inset-0
  flex
  items-center
  justify-center
  pointer-events-none z-10
"
          >
            <div
              className={`
      text-7xl
      transition-all
      duration-500
      animate-bounce
      ${teacherHappy ? "scale-125" : ""}
    `}
            >
              🌻
            </div>
          </div>

          {/* Root */}
          <button
            onClick={() => handlePartClick(plantParts[0])}
            className={`
      absolute
      left-1/2
      top-0
      -translate-x-1/2
      w-24 h-24
sm:w-28 sm:h-28
md:w-32 md:h-32
      rounded-full
      shadow-xl
      transition-all duration-300
      ${
        selectedPart === "Root"
          ? "bg-green-300 scale-110 border-4 border-green-500"
          : "bg-white"
      }
    `}
          >
            <div>
              <div className="text-4xl">🌱</div>
              <div className="text-sm font-bold">Root</div>
            </div>
          </button>

          {/* Stem */}
          <button
            onClick={() => handlePartClick(plantParts[1])}
            className={`
      absolute
      left-0
      top-1/2
      -translate-y-1/2
      w-24 h-24
sm:w-28 sm:h-28
md:w-32 md:h-32
      rounded-full
      shadow-xl
      transition-all duration-300
      ${
        selectedPart === "Stem"
          ? "bg-green-300 scale-110 border-4 border-green-500"
          : "bg-white"
      }
    `}
          >
            <div>
              <div className="text-4xl">🌿</div>
              <div className="text-sm font-bold">Stem</div>
            </div>
          </button>

          {/* Leaf */}
          <button
            onClick={() => handlePartClick(plantParts[2])}
            className={`
      absolute
      right-0
      top-1/2
      -translate-y-1/2
      w-24 h-24
sm:w-28 sm:h-28
md:w-32 md:h-32
      rounded-full
      shadow-xl
      transition-all duration-300
      ${
        selectedPart === "Leaf"
          ? "bg-green-300 scale-110 border-4 border-green-500"
          : "bg-white"
      }
    `}
          >
            <div>
              <div className="text-4xl">🍃</div>
              <div className="text-sm font-bold">Leaf</div>
            </div>
          </button>

          {/* Flower */}
          <button
            onClick={() => handlePartClick(plantParts[3])}
            className={`
      absolute
      left-1/2
      bottom-0
      -translate-x-1/2
      w-24 h-24
sm:w-28 sm:h-28
md:w-32 md:h-32
      rounded-full
      shadow-xl
      transition-all duration-300
      ${
        selectedPart === "Flower"
          ? "bg-green-300 scale-110 border-4 border-green-500"
          : "bg-white"
      }
    `}
          >
            <div>
              <div className="text-4xl">🌸</div>
              <div className="text-sm font-bold">Flower</div>
            </div>
          </button>
        </div>

        <button
          disabled={visitedParts.length !== plantParts.length}
          onClick={() => {
  speechSynthesis.cancel();
  navigate("/plants/quiz");
}}
          className="
          mt-8
          w-full
          bg-yellow-400
          hover:bg-yellow-500
          text-black
          py-4
          rounded-3xl
          text-xl
          font-black
          shadow-xl
          "
        >
          Start Quiz →
        </button>
      </div>
    </div>
  );
}
