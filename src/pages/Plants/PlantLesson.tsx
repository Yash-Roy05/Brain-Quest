import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useSound from "use-sound";

import plantFull from "../../assets/Plants/without-bg.png";
import rootImg from "../../assets/Plants/Roott.png";
import stemImg from "../../assets/Plants/Stemm.png";
import leafImg from "../../assets/Plants/Leaff.png";
import flowerImg from "../../assets/Plants/Flowerr.png";

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

  const handleQuizStart = () => {
    if (visitedParts.length !== plantParts.length) {
      const message =
        "Wait Explorer! Please learn all four plant parts before starting the quiz.";

      setCurrentTeacherMessage(message);

      speakMessage(message);

      return;
    }

    speechSynthesis.cancel();
    navigate("/plants/quiz");
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

        <div className="max-w-5xl mx-auto mt-6">
          {/* Flower */}
          <div className="flex justify-center mb-4">
            <button
              onClick={() => handlePartClick(plantParts[3])}
              className="
    absolute
    left-1/2
    top-0
    -translate-x-1/2
    p-3
    z-20
    md:top-[200px]
    md:left-[1000px]
    md:w-[150px]
    md:h-[150px]

    top-[230px]
    left-[350px]
    w-[80px]
    h-[70px]
  "
            >
              <img
                src={flowerImg}
                className="w-24 h-24 object-contain mx-auto"
              />
              <p className="md:font-bold text-[16px] md:text-[18px] -mt-5 md:mt-0">
                Flower
              </p>
            </button>
          </div>

          {/* Middle Row */}
          <div className="relative w-full max-w-5xl mx-auto h-[700px]">
            {/* Stem */}
            <button
              onClick={() => handlePartClick(plantParts[1])}
              className="
absolute
-translate-y-1/2
p-2
z-20
w-[70px]
h-[70px]
top-[140px]
left-[23px]

md:w-[150px]
md:h-[150px]
md:top-[180px]
md:left-[130px]
"
            >
              <img src={stemImg} className="w-24 h-24 object-contain mx-auto" />
              <p className="md:font-bold text-[16px] md:text-[18px] -mt-4 md:mt-0">
                Stem
              </p>
            </button>

            {/* Plant */}
            <img
              src={plantFull}
              alt="Plant"
              className="
absolute
left-1/2
top-1/2
-translate-x-1/2
-translate-y-1/2

w-[800px]
h-[400px]
top-[160px]

sm:w-[400px]
sm:h-[300px]

md:w-[700px]
md:h-[450px]
md:top-[190px]
"
            />
            {/* Leaf */}
            <button
              onClick={() => handlePartClick(plantParts[2])}
              className="
    absolute
    right-10
    top-1/2
    -translate-y-1/2
    p-3
w-[80px]
h-[70px]
top-[80px]
left-[320px]

md:w-[150px]
md:h-[150px]
md:top-[150px]
md:left-[670px]


  "
            >
              <img src={leafImg} className="w-24 h-24 object-contain mx-auto" />
              <p className="md:font-bold text-[16px] md:text-[18px] -mt-4 md:mt-0">
                Leaf
              </p>
            </button>
          </div>

          {/* Root */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePartClick(plantParts[0])}
              className={`
      absolute
      left-1/2
      bottom-0
      -translate-x-1/2
      p-3

      w-[80px]
      h-[70px]
      top-[500px]
      left-[60px]

      md:w-[150px]
      md:h-[150px]
      md:top-[500px]
      md:left-[490px]

      ${
        selectedPart === "Root"
          ? "drop-shadow-[0_0_20px_rgba(255,255,0,0.9)] scale-110"
          : ""
      }
    `}
            >
              <img src={rootImg} className="w-24 h-24 object-contain mx-auto" />

              <p className="md:font-bold text-[16px] md:text-[18px] -mt-4 md:mt-0">
                Root
              </p>
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center -mt-80 md:-mt-80">
          <div
            className="
    bg-white
    rounded-3xl
    shadow-xl
    p-4
    max-w-md
    relative
    mt-3
    animate-fade-in
    transition-all
    duration-500
    hover:scale-105
  "
          >
            <p className="font-bold text-green-700 text-lg">🌻 Quester</p>

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

        <button
          onClick={handleQuizStart}
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
          hover:scale-105
          active:scale-95
          transition-all
          duration-300
          "
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
