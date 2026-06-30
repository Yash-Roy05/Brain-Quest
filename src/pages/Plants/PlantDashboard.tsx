import { useNavigate } from "react-router-dom";

export default function PlantDashboard() {
  const navigate = useNavigate();

  const level1Completed =
    localStorage.getItem("plantLevel1Completed") === "true";

  const levels = [
    {
      id: 1,
      title: "Parts of Plant",
      unlocked: true,
    },
    {
      id: 2,
      title: "Seed Growth",
      unlocked: level1Completed,
    },
    {
      id: 3,
      title: "Plant Needs",
      unlocked: false,
    },
    {
      id: 4,
      title: "Types of Plants",
      unlocked: false,
    },
    {
      id: 5,
      title: "Plant Life Cycle",
      unlocked: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-emerald-500 p-4 md:p-6 pb-24 md:pb-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-black text-white text-center mb-2 md:mb-2">
          Plants World
        </h1>

        <p className="text-center text-white text-lg mb-4 md:mb-4">
          Learn plants level by level
        </p>

        <div className="grid gap-5">
          {levels.map((level) => (
            <div
              key={level.id}
              className="bg-white rounded-3xl shadow-xl p-6 flex justify-between items-center"
            >
              <div>
                <h2 className="text-2xl font-bold">Level {level.id}</h2>

                <p className="text-gray-600">{level.title}</p>
              </div>

              {level.unlocked ? (
                <button
                  onClick={() => {
                    if (level.id === 1) {
                      navigate("/plants/lesson");
                    }

                    if (level.id === 2) {
                      navigate("/plants/seed-growth");
                    }
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold"
                >
                  Start
                </button>
              ) : (
                <div className="text-3xl">🔒</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
