import { useState } from "react";
import { seedScenes } from "./seedData.ts";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import seedImg from "../../../assets/Plants/level2/seed.png";
import waterImg from "../../../assets/Plants/level2/seed-water.png";
import sproutImg from "../../../assets/Plants/level2/seed-root.png";
import rootsImg from "../../../assets/Plants/level2/small-plant.png";
import plantImg from "../../../assets/Plants/level2/flower-plant.png";
import owlLogo from "../../../assets/owl.png";

export default function SeedLesson() {
  const navigate = useNavigate();

  const [sceneIndex, setSceneIndex] = useState(0);

  const scene = seedScenes[sceneIndex];

  const [currentTeacherMessage, setCurrentTeacherMessage] = useState(
    scene.message,
  );

  useEffect(() => {
    setCurrentTeacherMessage(scene.message);
    speakMessage(scene.message);
  }, [sceneIndex]);

  const speakMessage = (message: string) => {
    const speech = new SpeechSynthesisUtterance(message);

    speech.rate = 0.9;
    speech.pitch = 1.2;

    speechSynthesis.cancel();
    speechSynthesis.speak(speech);
  };

  let currentImage = seedImg;

  switch (scene.image) {
    case "water":
      currentImage = waterImg;
      break;

    case "sprout":
      currentImage = sproutImg;
      break;

    case "roots":
      currentImage = rootsImg;
      break;

    case "plant":
      currentImage = plantImg;
      break;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-emerald-500 px-4 py-6 pb-36 md:pb-24">
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
          Seed Growth
        </h1>

        <p className="text-lg mt-2 text-gray-700">
          Watch how a tiny seed becomes a beautiful plant.
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
  lg:gap-20

  px-4
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
    w-full
max-w-sm
sm:max-w-md
lg:max-w-lg

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
            if (sceneIndex < seedScenes.length - 1) {
              setSceneIndex((prev) => prev + 1);
            } else {
              speechSynthesis.cancel();

              // later
              // navigate("/plants/level2/activity");
            }
          }}
          className="
        bg-yellow-400
        hover:bg-yellow-500
        w-full
max-w-xs

py-4

text-lg
md:text-xl
        rounded-3xl
        font-black
        shadow-xl
        "
        >
          {sceneIndex === seedScenes.length - 1 ? "Start Activity" : "Next"}
        </button>
      </div>
    </div>
  );
}
