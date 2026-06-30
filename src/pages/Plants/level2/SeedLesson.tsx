import { useState } from "react";
import { seedScenes } from "./seedData.ts";

import seedImg from "../../../assets/Plants/level2/seed.png";
import waterImg from "../../../assets/Plants/level2/seed-water.png";
import sproutImg from "../../../assets/Plants/level2/seed-root.png";
import rootsImg from "../../../assets/Plants/level2/small-plant.png";
import plantImg from "../../../assets/Plants/level2/flower-plant.png";

export default function SeedLesson() {
  const [sceneIndex, setSceneIndex] = useState(0);

  const scene = seedScenes[sceneIndex];

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
      {/* Title */}
      <div className="text-center pt-8">
        <h1 className="text-4xl md:text-5xl font-black text-green-800">
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
  mt-0
  flex
  flex-col
  md:flex-row
  items-center
  justify-center
  gap-10
"
      >
        <img
  src={currentImage}
  alt={scene.title}
  className="
    w-30
    sm:w-60
    md:w-[100px]
    lg:w-[100px]
    object-contain
    transition-all
    duration-700
"
/>
      </div>

      {/* Teacher Card */}
      <div className="max-w-md mx-auto mt-10">
        <div
          className="
bg-white
rounded-3xl
shadow-2xl
p-6
md:p-8
transition-all
duration-300
hover:scale-105
"
        >
          <h2
            className="
text-2xl
md:text-4xl
font-black
text-green-700
"
          >
            {scene.title}
          </h2>

          <p
            className="
mt-5
text-lg
md:text-xl
leading-8
text-gray-700
"
          >
            {scene.message}
          </p>
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-center mt-12">
        <button
          onClick={() => {
            if (sceneIndex < seedScenes.length - 1) {
              setSceneIndex(sceneIndex + 1);
            }
          }}
          className="
        bg-yellow-400
        hover:bg-yellow-500
        px-12
        py-4
        rounded-3xl
        text-xl
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
