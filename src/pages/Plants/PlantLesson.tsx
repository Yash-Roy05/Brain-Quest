import { useNavigate } from "react-router-dom";

export default function PlantLesson() {
  const navigate = useNavigate();

  const plantParts = [
    {
      emoji: "🌱",
      title: "Root",
      description:
        "Roots grow under the soil. They absorb water and nutrients from the ground.",
    },
    {
      emoji: "🌿",
      title: "Stem",
      description:
        "The stem supports the plant and carries water to all parts.",
    },
    {
      emoji: "🍃",
      title: "Leaf",
      description:
        "Leaves make food for the plant using sunlight, air and water.",
    },
    {
      emoji: "🌸",
      title: "Flower",
      description:
        "Flowers help plants produce seeds and grow new plants.",
    },
  ];

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

        <div className="space-y-5">
          {plantParts.map((part, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-xl p-5 md:p-6"
            >
              <div className="flex items-center gap-4">
                <div className="text-5xl">
                  {part.emoji}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-green-700">
                    {part.title}
                  </h2>

                  <p className="text-gray-600 mt-1">
                    {part.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/plants/quiz")}
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
          Next Activity →
        </button>
      </div>
    </div>
  );
}

