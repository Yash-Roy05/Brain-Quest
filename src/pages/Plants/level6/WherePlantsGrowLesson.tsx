import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import owlLogo from "../../../assets/owl.png";

type PlantPlace = {
  title: string;
  emoji: string;
  description: string;
  message: string;
};

const places: PlantPlace[] = [
  {
    title: "Forest",
    emoji: "🌳",
    description: "Forests have many trees, ferns, and other plants.",
    message:
      "Forests are places where many trees, ferns, and other plants grow together.",
  },
  {
    title: "Desert",
    emoji: "🏜️", 
    description: "Deserts are dry places where plants like cactus can survive.",
    message:
      "Deserts get very little rain. Cactus plants can store water and survive in dry conditions.",
  },
  {
    title: "Farm",
    emoji: "🌾",
    description: "Farmers grow crops such as wheat, corn, and vegetables.",
    message:
      "Farmers grow useful crops such as wheat, corn, vegetables, and fruits in fields.",
  },
  {
    title: "Garden",
    emoji: "🌷",
    description: "People grow flowers, vegetables, and herbs in gardens.",
    message:
      "Gardens are places where people grow flowers, vegetables, herbs, and other plants.",
  },
  {
    title: "Pond",
    emoji: "💧",
    description: "Some plants grow in or near water.",
    message:
      "Some plants need lots of water and can grow in ponds, lakes, rivers, or other wet places.",
  },
  {
    title: "Mountain",
    emoji: "🏔️",
    description: "Some special plants can survive cold mountain conditions.",
    message:
      "Some plants can survive the cold, wind, and rocky conditions found in mountains.",
  },
];

export default function WherePlantsGrowLesson() {
  const navigate = useNavigate();

  const [showTransition, setShowTransition] = useState(false);

  const [currentTeacherMessage, setCurrentTeacherMessage] = useState(
    "Hello Explorer! Click each place to learn where plants grow.",
  );

  const [selectedPlace, setSelectedPlace] = useState("");

  const [visitedPlaces, setVisitedPlaces] = useState<string[]>([]);

  useEffect(() => {
    if (!showTransition) return;

    const timer = setTimeout(() => {
      navigate("/plants/level6/quiz");
    }, 3500);

    return () => clearTimeout(timer);
  }, [showTransition, navigate]);

  useEffect(() => {
    const welcome =
      "Hello Explorer! Click any place to learn where plants grow.";

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

  const allPlacesVisited = places.every((place) =>
    visitedPlaces.includes(place.title),
  );

  const handlePlaceClick = (place: PlantPlace) => {
    setSelectedPlace(place.title);

    const message = place.message;

    if (!visitedPlaces.includes(place.title)) {
      const updatedPlaces = [...visitedPlaces, place.title];

      setVisitedPlaces(updatedPlaces);
      setCurrentTeacherMessage(message);

      const speech = new SpeechSynthesisUtterance(message);

      speech.rate = 0.9;
      speech.pitch = 1.2;

      speech.onend = () => {
        if (updatedPlaces.length === places.length) {
          const finalMessage =
            "Amazing Explorer! You learned about all six places where plants grow. Now you are ready for the quiz!";

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
        <div className="text-7xl animate-pop">🌱</div>

        <h1
          className="
            mt-8
            text-5xl
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
            mt-6
            text-xl
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
      <div className="text-center">
        <h1
          className="
            text-3xl
            sm:text-4xl
            lg:text-5xl
            font-black
            text-green-900
          "
        >
          Where Plants Grow 🌱
        </h1>

        <p
          className="
            mt-2
            text-sm
            sm:text-base
            md:text-lg
            text-gray-700
            max-w-xl
            mx-auto
          "
        >
          Let's discover the different places where plants can grow!
        </p>
      </div>

      {/* Places */}
      <div
        className="
          max-w-6xl
          mx-auto
          mt-6
          grid
          grid-cols-2
          md:grid-cols-3
          gap-4
          md:gap-6
        "
      >
        {places.map((place) => {
          const isSelected = selectedPlace === place.title;
          const isVisited = visitedPlaces.includes(place.title);

          return (
            <button
              key={place.title}
              onClick={() => handlePlaceClick(place)}
              className={`
                bg-white
                rounded-3xl
                p-5
                md:p-7
                shadow-xl
                transition-all
                duration-300
                hover:scale-105
                ${
                  isSelected
                    ? "ring-4 ring-yellow-400 scale-105"
                    : ""
                }
              `}
            >
              <div className="text-6xl md:text-7xl mb-3">
                {place.emoji}
              </div>

              <h2
                className="
                  text-xl
                  md:text-2xl
                  font-black
                  text-green-700
                "
              >
                {place.title}
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  md:text-base
                  text-gray-600
                "
              >
                {place.description}
              </p>

              {isVisited && (
                <div className="mt-3 text-green-600 font-black">
                  ✅ Learned
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Quester */}
      <div className="w-full flex justify-center mt-6">
        <div
          className="
            bg-white
            rounded-3xl
            shadow-2xl
            p-5
            md:p-7
            w-[95%]
            sm:w-[420px]
            md:w-[550px]
            lg:w-[650px]
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

          <p className="mt-3 text-sm font-bold text-gray-500">
            Learned: {visitedPlaces.length} / {places.length}
          </p>
        </div>
      </div>

      {/* Start Quiz */}
      <div className="flex justify-center mt-5">
        <button
          onClick={() => {
            if (!allPlacesVisited) {
              const warning =
                "Please learn all six places before starting the quiz.";

              setCurrentTeacherMessage(warning);
              speakMessage(warning);

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
          Start Quiz 🌱
        </button>
      </div>
    </div>
  );
}