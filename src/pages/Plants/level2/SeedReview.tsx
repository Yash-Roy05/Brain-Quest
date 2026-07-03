import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import seedImg from "../../../assets/Plants/level2/seed.png";
import waterImg from "../../../assets/Plants/level2/seed-water.png";
import sproutImg from "../../../assets/Plants/level2/seed-root.png";
import rootsImg from "../../../assets/Plants/level2/small-plant.png";
import plantImg from "../../../assets/Plants/level2/flower-plant.png";

export default function SeedReview() {
  const navigate = useNavigate();

  const stages = [
    {
      image: seedImg,
      title: "Seed",
      message: "First we planted a tiny seed.",
    },
    {
      image: waterImg,
      title: "Water",
      message: "Then we gave it water.",
    },
    {
      image: sproutImg,
      title: "Root",
      message: "Soon the root appeared.",
    },
    {
      image: rootsImg,
      title: "Small Plant",
      message: "The plant became bigger.",
    },
    {
      image: plantImg,
      title: "Flower Plant",
      message: "Finally it became a beautiful flowering plant!",
    },
  ];

  const [index, setIndex] = useState(0);

  // Auto animation
  useEffect(() => {
    if (index < stages.length - 1) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [index]);

  // Voice
  useEffect(() => {
    const speech = new SpeechSynthesisUtterance(stages[index].message);

    speech.rate = 0.9;
    speech.pitch = 1.2;

    speechSynthesis.cancel();
    speechSynthesis.speak(speech);
  }, [index]);

  return (
    <div
      className="
min-h-screen
bg-gradient-to-r
from-green-400
to-emerald-500

flex
flex-col

items-center
justify-center

px-4

pb-20
md:pb-24

pt-5
md:pt-6
"
    >
      <p
  className="
text-sm
sm:text-base
md:text-lg

mt-2

text-gray-700

text-center

max-w-xs
sm:max-w-md
mx-auto
"
>
  Watch how a tiny seed became a beautiful plant.
</p>

      <img
        src={stages[index].image}
        alt={stages[index].title}
        className="w-40 md:w-64 object-contain transition-all duration-700"
      />

      <h2 className="mt-8 text-3xl font-black text-white">
        {stages[index].title}
      </h2>

      <p className="mt-4 max-w-xl text-center text-xl text-white">
        {stages[index].message}
      </p>

      {index === stages.length - 1 && (
        <button
          onClick={() => {
            speechSynthesis.cancel();
            navigate("/plants/level2/quiz");
          }}
          className="
mt-10

w-full
max-w-xs
md:max-w-sm

py-4

rounded-3xl

bg-yellow-400
hover:bg-yellow-500

text-lg
md:text-xl

font-black

shadow-xl
"
        >
          Start Quiz
        </button>
      )}
    </div>
  );
}
