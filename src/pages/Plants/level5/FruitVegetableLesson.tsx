import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import owlLogo from "../../../assets/owl.png";

export default function FruitVegetableLesson() {
  const navigate = useNavigate();

  const [showTransition, setShowTransition] = useState(false);

  const [currentTeacherMessage, setCurrentTeacherMessage] = useState(
    "Hello Explorer! Click each fruit or vegetable to learn.",
  );

  const [selectedPart, setSelectedPart] = useState("");

  const [visitedParts, setVisitedParts] = useState<string[]>([]);

  useEffect(() => {
    if (!showTransition) return;

    const timer = setTimeout(() => {
      navigate("/plants/level5/quiz");
    }, 3500);

    return () => clearTimeout(timer);
  }, [showTransition]);

  useEffect(() => {
    const welcome = "Hello Explorer! Click any fruit or vegetable to learn.";

    const speech = new SpeechSynthesisUtterance(welcome);

    speech.rate = 0.9;
    speech.pitch = 1.2;

    speechSynthesis.cancel();
    speechSynthesis.speak(speech);

    return () => speechSynthesis.cancel();
  }, []);

  const fruitsVegetables = [
    {
      title: "Apple",
      description: "Apples are fruits that contain vitamins and fiber.",
    },
    {
      title: "Carrot",
      description: "Carrots are vegetables that are rich in nutrients.",
    },
    {
      title: "Tomato",
      description:
        "Tomatoes are commonly used as vegetables but are botanically fruits.",
    },
    {
      title: "Spinach",
      description: "Spinach is a leafy green vegetable rich in nutrients.",
    },
  ];

  const allFruitsVegetablesVisited = fruitsVegetables.every((item) =>
    visitedParts.includes(item.title),
  );

  const handlePartClick = (item: any) => {
    setSelectedPart(item.title);

    const message = teacherMessages[item.title];

    if (!visitedParts.includes(item.title)) {
      const updatedParts = [...visitedParts, item.title];

      setVisitedParts(updatedParts);

      setCurrentTeacherMessage(message);

      const speech = new SpeechSynthesisUtterance(message);

      speech.rate = 0.9;
      speech.pitch = 1.2;

      speech.onend = () => {
        if (updatedParts.length === fruitsVegetables.length) {
          const finalMessage =
            "Amazing Explorer! You learned about all the fruits and vegetables. Now you are ready for the quiz!";

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

  const teacherMessages: Record<string, string> = {
    Apple: "Apples are fruits and are a good source of fiber.",
    Carrot: "Carrots are vegetables and contain important nutrients.",
    Tomato: "Tomatoes are botanically fruits and are rich in nutrients.",
    Spinach: "Spinach is a leafy green vegetable.",
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
          Fruits & Vegetables
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
          Let's discover the wonderful world of fruits and vegetables!
        </p>
      </div>

      {/* Fruits and Vegetables Section */}

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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-6">
            {fruitsVegetables.map((item) => (
              <button
                key={item.title}
                onClick={() => handlePartClick(item)}
                className={`
        bg-white
        rounded-3xl
        p-5
        shadow-xl
        transition-all
        hover:scale-105
        ${selectedPart === item.title ? "ring-4 ring-yellow-400 scale-105" : ""}
      `}
              >
                <div className="text-6xl mb-3">
                  {item.title === "Apple" && "🍎"}
                  {item.title === "Carrot" && "🥕"}
                  {item.title === "Tomato" && "🍅"}
                  {item.title === "Spinach" && "🥬"}
                </div>

                <h2 className="text-xl font-black text-green-700">
                  {item.title}
                </h2>
              </button>
            ))}
          </div>
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
            if (!allFruitsVegetablesVisited) {
              const warning =
                "Please learn all four fruits and vegetables before starting the quiz.";

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
