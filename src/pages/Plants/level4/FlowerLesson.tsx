import { useState } from "react";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import petalImg from "../../../assets/Plants/level4/petal.png";
import sepalImg from "../../../assets/Plants/level4/sepal.png";
import stamenImg from "../../../assets/Plants/level4/stamen.png";
import pistilImg from "../../../assets/Plants/level4/pistil.png";
import flowerImg from "../../../assets/Plants/level4/flower.png";
import owlLogo from "../../../assets/owl.png";

export default function FlowerLesson() {
  const navigate = useNavigate();

  const [showTransition, setShowTransition] = useState(false);

  const [currentTeacherMessage, setCurrentTeacherMessage] = useState(
    "Hello Explorer! Click any flower part to learn.",
  );

  const [selectedPart, setSelectedPart] = useState("");

  const [visitedParts, setVisitedParts] = useState<string[]>([]);

  useEffect(() => {
    if (!showTransition) return;

    const timer = setTimeout(() => {
      navigate("/plants/level4/quiz");
    }, 3500);

    return () => clearTimeout(timer);
  }, [showTransition]);

  useEffect(() => {
    const welcome = "Hello Explorer! Click any flower part to learn.";

    const speech = new SpeechSynthesisUtterance(welcome);

    speech.rate = 0.9;
    speech.pitch = 1.2;

    speechSynthesis.cancel();
    speechSynthesis.speak(speech);

    return () => speechSynthesis.cancel();
  }, []);

  const allPartsVisited =
    visitedParts.includes("Petal") &&
    visitedParts.includes("Sepal") &&
    visitedParts.includes("Stamen") &&
    visitedParts.includes("Pistil");

  const handlePartClick = (part: any) => {
    setSelectedPart(part.title);

    const message = teacherMessages[part.title];

    if (!visitedParts.includes(part.title)) {
      const updatedParts = [...visitedParts, part.title];

      setVisitedParts(updatedParts);

      setCurrentTeacherMessage(message);

      const speech = new SpeechSynthesisUtterance(message);

      speech.rate = 0.9;
      speech.pitch = 1.2;

      speech.onend = () => {
        if (updatedParts.length === flowerParts.length) {
          const finalMessage =
            "Amazing Explorer! You learned all flower parts. Now you are ready for the quiz!";

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

  const speakMessage = (message: string) => {
    const speech = new SpeechSynthesisUtterance(message);

    speech.rate = 0.9;
    speech.pitch = 1.2;

    speechSynthesis.cancel();
    speechSynthesis.speak(speech);
  };

  const flowerParts = [
    {
      title: "Petal",
      description: "Petals are colorful. They attract bees and butterflies.",
    },
    {
      title: "Sepal",
      description: "Sepals protect the flower before it blooms.",
    },
    {
      title: "Stamen",
      description: "The stamen produces pollen.",
    },
    {
      title: "Pistil",
      description: "The pistil helps produce seeds.",
    },
  ];

  const teacherMessages: Record<string, string> = {
    Petal: "Petals are colorful. They attract bees and butterflies.",

    Sepal: "Sepals protect the flower before it blooms.",

    Stamen: "The stamen produces pollen.",

    Pistil: "The pistil helps produce seeds.",
  };

  if (showTransition) {
    return (
      <div
        className="
      min-h-screen
      bg-gradient-to-r
      from-green-400
      to-emerald-500

      flex
      flex-col
      justify-center
      items-center

      text-center
      px-6
    "
      >
        <div
          className="
        text-7xl
        animate-pop
      "
        >
          🌸
        </div>

        <h1
          className="
        mt-8

        text-5xl
        md:text-7xl

        font-black

        text-white

        animate-fade-up
        delay-300
      "
        >
          Great Job!
        </h1>

        <p
          className="
        mt-6

        text-xl
        md:text-3xl

        font-semibold

        text-white/90

        animate-fade-up
        delay-700
      "
        >
          Let's see what you remember...
        </p>
      </div>
    );
  }

  return (
    <div
      className="
min-h-screen

bg-gradient-to-r
from-green-400
to-emerald-500

px-4
md:px-6

pt-4
md:pt-6

pb-24
"
    >
      {/* Title */}
      <div className="text-center -mt-1">
        <h1
          className="text-3xl
  sm:text-4xl
  lg:text-5xl

  font-black text-green-800"
        >
          Parts of a Flower
        </h1>

        <p
          className="
mt-2

text-sm
sm:text-base
md:text-lg

text-gray-700

text-center

max-w-md
mx-auto
"
        >
          Let's discover the important parts of a flower.
        </p>
      </div>

      {/* Flower Section */}

      <div
        className="
max-w-6xl
mx-auto

-mt-2
md:-mt-5

flex
flex-col

items-center
"
      >
        {/* LEFT SIDE */}

        <div
          className="
relative

w-[380px]
h-[260px]

md:w-[700px]
md:h-[420px]
"
        >
          {/* Main Flower */}
          <img
            src={flowerImg}
            alt="Flower"
            className="
absolute
left-1/2
top-1/2
-translate-x-1/2
-translate-y-1/2

w-[700px]
h-[320px]

sm:w-[380px]
sm:h-[380px]

md:w-[700px]
md:h-[700px]

object-contain
pointer-events-none
z-0
"
          />

          {/* Petal Button */}
          <button
            onClick={() => handlePartClick(flowerParts[0])}
            className={`
    absolute
    -translate-x-1/2
    z-10

    top-[25px] 
    left-[53px]

    md:top-[20px] 
    md:left-[130px]

    w-16 h-20
    md:w-24 md:h-28

    ${
      selectedPart === "Petal"
        ? "drop-shadow-[0_0_25px_rgba(255,255,0,1)] scale-110"
        : ""
    }
  `}
          >
            <img src={petalImg} className="w-full h-full object-contain" />
            <p className="font-bold text-sm md:text-base -mt-4 md:-mt-5">
              Petal
            </p>
          </button>

          {/* Sepal Button */}
          <button
            onClick={() => handlePartClick(flowerParts[1])}
            className={`
    absolute
    -translate-x-1/2
    z-10
    
    top-[110px] 
    left-[70px]
    
    md:top-[200px] 
    md:left-[140px]
    
    w-16 h-20
    md:w-28 md:h-28

    ${
      selectedPart === "Sepal"
        ? "drop-shadow-[0_0_25px_rgba(255,255,0,1)] scale-110"
        : ""
    }
  `}
          >
            <img src={sepalImg} className="w-full h-full object-contain" />
            <p className="font-bold text-sm md:text-base -mt-4 md:-mt-3">
              Sepal
            </p>
          </button>

          {/* Stamen Button */}
          <button
            onClick={() => handlePartClick(flowerParts[2])}
            className={`
    absolute
    -translate-y-1/2
    z-10
    
    top-[160px] 
    left-[300px]

    md:top-[250px] 
    md:left-[550px]

    w-16 h-20
    md:w-28 md:h-28

    ${
      selectedPart === "Stamen"
        ? "drop-shadow-[0_0_25px_rgba(255,255,0,1)] scale-110"
        : ""
    }
  `}
          >
            <img src={stamenImg} className="w-full h-full object-contain" />
            <p className="font-bold text-sm md:text-base -mt-3 md:-mt-2">
              Stamen
            </p>
          </button>

          {/* Pistil Button */}
          <button
            onClick={() => handlePartClick(flowerParts[3])}
            className={`
    absolute
    top-[60px] 
    left-[270px]

    md:top-[80px] 
    md:left-[500px]

    -translate-y-1/2
    z-10

    w-16 h-20
    md:w-28 md:h-28

    ${
      selectedPart === "Pistil"
        ? "drop-shadow-[0_0_25px_rgba(255,255,0,1)] scale-110"
        : ""
    }
  `}
          >
            <img src={pistilImg} className="w-full h-full object-contain" />
            <p className="font-bold text-sm md:text-base -mt-3 md:-mt-3">
              Pistil
            </p>
          </button>
        </div>
      </div>

      <div
        className="
w-full
md:w-auto

flex
justify-center
"
      >
        <div
          className="
bg-white

rounded-3xl

shadow-2xl

mt-2

p-5
md:p-7

w-full

w-[95%]
sm:w-[420px]
md:w-[550px]
lg:w-[650px]

transition-all
duration-500
hover:scale-105
"
        >
          <div className="flex items-center gap-3">
            <img
              src={owlLogo}
              alt="Quester"
              className="
w-12
h-12

sm:w-14
sm:h-14

md:w-16
md:h-16
"
            />

            <h3
              className="
font-black
text-green-700

text-xl
sm:text-2xl
md:text-3xl
"
            >
              Quester
            </h3>
          </div>

          <p
            className="
mt-4

text-base
sm:text-lg
md:text-xl

leading-7
md:leading-9

text-gray-700
"
          >
            {currentTeacherMessage}
          </p>
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-center mt-5 md:mt-5">
        <button
          onClick={() => {
            if (!allPartsVisited) {
              const warning =
                "Please learn all four flower parts before starting the quiz.";

              setCurrentTeacherMessage(warning); // Update Quester card

              speakMessage(warning); // Speak the message

              return;
            }
            speechSynthesis.cancel();
            setShowTransition(true);
          }}
          className="
bg-yellow-400
hover:bg-yellow-500

w-full
max-w-xs
sm:max-w-sm

py-4

text-lg
md:text-xl

rounded-3xl

font-black

shadow-xl

transition-all
duration-300

hover:scale-105
"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
