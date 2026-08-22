import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import owlLogo from "../../../assets/owl.png";

type FruitVegetable = {
  title: string;
  description: string;
  emoji: string;
};

export default function FruitVegetableLesson() {
  const navigate = useNavigate();

  const [showTransition, setShowTransition] = useState(false);
  const [currentTeacherMessage, setCurrentTeacherMessage] = useState(
    "Hello Explorer! Click each fruit or vegetable to learn.",
  );
  const [selectedPart, setSelectedPart] = useState("");
  const [visitedParts, setVisitedParts] = useState<string[]>([]);

  const fruitsVegetables: FruitVegetable[] = [
    {
      title: "Apple",
      description: "Apples are fruits that contain vitamins and fiber.",
      emoji: "🍎",
    },
    {
      title: "Carrot",
      description: "Carrots are vegetables that are rich in nutrients.",
      emoji: "🥕",
    },
    {
      title: "Tomato",
      description:
        "Tomatoes are commonly used as vegetables but are botanically fruits.",
      emoji: "🍅",
    },
    {
      title: "Spinach",
      description: "Spinach is a leafy green vegetable rich in nutrients.",
      emoji: "🥬",
    },
  ];

  const teacherMessages: Record<string, string> = {
    Apple: "Apples are fruits and are a good source of fiber.",
    Carrot: "Carrots are vegetables and contain important nutrients.",
    Tomato: "Tomatoes are botanically fruits and are rich in nutrients.",
    Spinach: "Spinach is a leafy green vegetable.",
  };

  const allFruitsVegetablesVisited = fruitsVegetables.every((item) =>
    visitedParts.includes(item.title),
  );

  // Move to quiz after transition
  useEffect(() => {
    if (!showTransition) return;

    const timer = setTimeout(() => {
      navigate("/plants/level5/quiz");
    }, 3500);

    return () => clearTimeout(timer);
  }, [showTransition, navigate]);

  // Welcome speech
  useEffect(() => {
    const welcome = "Hello Explorer! Click any fruit or vegetable to learn.";

    const speech = new SpeechSynthesisUtterance(welcome);

    speech.rate = 0.9;
    speech.pitch = 1.2;

    speechSynthesis.cancel();
    speechSynthesis.speak(speech);

    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  const speakMessage = (message: string) => {
    const speech = new SpeechSynthesisUtterance(message);

    speech.rate = 0.9;
    speech.pitch = 1.2;

    speechSynthesis.cancel();
    speechSynthesis.speak(speech);
  };

  const handlePartClick = (item: FruitVegetable) => {
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

  // Transition screen
  if (showTransition) {
    return (
      <div
        className="
          min-h-screen
          w-full
          bg-gradient-to-r
          from-green-400
          to-emerald-500
          flex
          flex-col
          justify-center
          items-center
          text-center
          px-4
          sm:px-6
        "
      >
        <div
          className="
            text-6xl
            sm:text-7xl
            md:text-8xl
            animate-pop
          "
        >
          🌸
        </div>

        <h1
          className="
            mt-6
            sm:mt-8
            text-4xl
            sm:text-5xl
            md:text-7xl
            font-black
            text-white
            animate-fade-up
          "
        >
          Great Job!
        </h1>

        <p
          className="
            mt-4
            sm:mt-6
            text-lg
            sm:text-xl
            md:text-3xl
            font-semibold
            text-white/90
            animate-fade-up
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
        w-full
        overflow-x-hidden
        bg-gradient-to-r
        from-green-400
        to-emerald-500
        px-3
        sm:px-4
        md:px-6
        py-4
        sm:py-6
        pb-10
        md:pb-16
      "
    >
      {/* Main container */}
      <div className="w-full max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center px-2">
          <h1
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              font-black
              text-green-800
              leading-tight
            "
          >
            Fruits & Vegetables
          </h1>

          <p
            className="
              mt-2
              sm:mt-3
              text-sm
              sm:text-base
              md:text-lg
              lg:text-xl
              text-gray-800
              max-w-2xl
              mx-auto
            "
          >
            Let's discover the wonderful world of fruits and vegetables!
          </p>
        </div>

        {/* Fruits / Vegetables Cards */}
        <div
          className="
            w-full
            mt-6
            sm:mt-8
            md:mt-10
          "
        >
          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-2
              md:grid-cols-4
              gap-3
              sm:gap-4
              md:gap-5
              w-full
            "
          >
            {fruitsVegetables.map((item) => (
              <button
                key={item.title}
                onClick={() => handlePartClick(item)}
                className={`
                  w-full
                  min-w-0
                  bg-white
                  rounded-2xl
                  sm:rounded-3xl
                  p-3
                  sm:p-4
                  md:p-5
                  shadow-xl
                  transition-all
                  duration-300
                  active:scale-95
                  hover:scale-105
                  ${
                    selectedPart === item.title
                      ? "ring-4 ring-yellow-400 scale-105"
                      : ""
                  }
                `}
              >
                {/* Emoji */}
                <div
                  className="
                    text-4xl
                    sm:text-5xl
                    md:text-6xl
                    lg:text-7xl
                    mb-2
                    sm:mb-3
                  "
                >
                  {item.emoji}
                </div>

                {/* Name */}
                <h2
                  className="
                    text-base
                    sm:text-lg
                    md:text-xl
                    lg:text-2xl
                    font-black
                    text-green-700
                    truncate
                  "
                >
                  {item.title}
                </h2>
              </button>
            ))}
          </div>
        </div>

        {/* Quester Card */}
        <div className="w-full flex justify-center mt-5 sm:mt-7 md:mt-8">
          <div
            className="
              w-full
              max-w-xl
              lg:max-w-2xl
              bg-white
              rounded-2xl
              sm:rounded-3xl
              shadow-2xl
              p-4
              sm:p-5
              md:p-7
              transition-all
              duration-300
            "
          >
            {/* Quester Header */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div
                className="
                  flex-shrink-0
                  w-11
                  h-11
                  sm:w-14
                  sm:h-14
                  md:w-16
                  md:h-16
                  rounded-full
                  overflow-hidden
                "
              >
                <img
                  src={owlLogo}
                  alt="Quester"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3
                className="
                  text-lg
                  sm:text-2xl
                  md:text-3xl
                  font-black
                  text-green-700
                "
              >
                Quester
              </h3>
            </div>

            {/* Message */}
            <p
              className="
                mt-3
                sm:mt-4
                text-sm
                sm:text-base
                md:text-lg
                lg:text-xl
                leading-6
                sm:leading-7
                md:leading-9
                text-gray-700
                break-words
              "
            >
              {currentTeacherMessage}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="text-center mt-4 sm:mt-5">
          <p
            className="
              text-sm
              sm:text-base
              md:text-lg
              font-bold
              text-white
            "
          >
            Learned: {visitedParts.length} / {fruitsVegetables.length}
          </p>
        </div>

        {/* Start Quiz Button */}
        <div className="flex justify-center mt-4 sm:mt-5 md:mt-6">
          <button
            onClick={() => {
              if (!allFruitsVegetablesVisited) {
                const warning =
                  "Please learn all four fruits and vegetables before starting the quiz.";

                setCurrentTeacherMessage(warning);
                speakMessage(warning);

                return;
              }

              speechSynthesis.cancel();
              setShowTransition(true);
            }}
            className="
              w-full
              max-w-xs
              sm:max-w-sm
              md:max-w-md
              bg-yellow-400
              hover:bg-yellow-500
              active:scale-95
              py-3
              sm:py-4
              px-5
              rounded-2xl
              sm:rounded-3xl
              text-base
              sm:text-lg
              md:text-xl
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
    </div>
  );
}
