import { useState } from "react";
import { typesScenes } from "./typesData.ts";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import treeImg from "../../../assets/Plants/level3/tree.png";
import shrubImg from "../../../assets/Plants/level3/shrub.png";
import herbImg from "../../../assets/Plants/level3/herb.png";
import climberImg from "../../../assets/Plants/level3/climber.png";
import owlLogo from "../../../assets/owl.png";

export default function TypesLesson() {
  const navigate = useNavigate();

  const [sceneIndex, setSceneIndex] = useState(0);

  const [showTransition, setShowTransition] = useState(false);

  const scene = typesScenes[sceneIndex];

  const [currentTeacherMessage, setCurrentTeacherMessage] = useState(
    scene.message,
  );

  useEffect(() => {
    setCurrentTeacherMessage(scene.message);
    speakMessage(scene.message);

    return () => {
      speechSynthesis.cancel();
    };
  }, [sceneIndex]);

  useEffect(() => {
    if (!showTransition) return;

    const timer = setTimeout(() => {
      navigate("/plants/level3/quiz");
    }, 3500);

    return () => clearTimeout(timer);
  }, [showTransition]);

  const speakMessage = (message: string) => {
    const speech = new SpeechSynthesisUtterance(message);

    speech.rate = 0.9;
    speech.pitch = 1.2;

    speechSynthesis.cancel();
    speechSynthesis.speak(speech);
  };

  let currentImage = treeImg;

  switch (scene.image) {
    case "tree":
      currentImage = treeImg;
      break;

    case "shrub":
      currentImage = shrubImg;
      break;

    case "herb":
      currentImage = herbImg;
      break;

    case "climber":
      currentImage = climberImg;
      break;
  }

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
      <div className="flex items-center">
        <button
          disabled={sceneIndex === 0}
          onClick={() => {
            if (sceneIndex > 0) {
              setSceneIndex(sceneIndex - 1);
            }
          }}
          className="
    flex
    items-center
    gap-2
    px-4
    py-2
    rounded-full
    shadow-lg
    transition
    font-bold

    disabled:opacity-50
    disabled:cursor-not-allowed
  "
        >
          ← Back
        </button>
      </div>

      {/* Title */}
      <div className="text-center mt-8">
        <h1
          className="text-3xl
  sm:text-4xl
  lg:text-5xl

  font-black text-green-800"
        >
          Types of Plants
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
          Let's discover the four main types of plants.
        </p>
      </div>

      {/* Seed */}
      <div
        className="
max-w-6xl
mx-auto

mt-8

flex
flex-col
lg:flex-row

items-center
justify-center

gap-8
lg:gap-16

px-2
md:px-4
"
      >
        <img
          src={currentImage}
          alt={scene.title}
          className="
    w-32
    sm:w-40
    md:w-56
    lg:w-45

    h-auto

    object-contain

    transition-all
    duration-700
  "
        />
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

    p-5
    md:p-7

w-full

max-w-sm
sm:max-w-md
md:max-w-lg
lg:max-w-xl

    relative

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

    object-contain

   
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
      </div>

      {/* Button */}
      <div className="flex justify-center mt-12">
        <button
          onClick={() => {
            if (sceneIndex < typesScenes.length - 1) {
              setSceneIndex((prev) => prev + 1);
            } else {
              speechSynthesis.cancel();

              setShowTransition(true);
            }
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
          {sceneIndex === typesScenes.length - 1 ? "Start Quiz" : "Next"}
        </button>
      </div>
    </div>
  );
}
