import { useNavigate } from "react-router-dom";

export default function PlantDashboard() {
  const navigate = useNavigate();

  const level1Completed =
    localStorage.getItem("plantLevel1Completed") === "true";

  const level2Completed =
    localStorage.getItem("plantLevel2Completed") === "true";

  const level3Completed =
    localStorage.getItem("plantLevel3Completed") === "true";

  const level4Completed =
    localStorage.getItem("plantLevel4Completed") === "true";

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
      title: "Types of Plants",
      unlocked: level2Completed,
    },
    {
      id: 4,
      title: "Parts of Flower",
      unlocked: level3Completed,
    },
    {
      id: 5,
      title: "Fruits & Vegetables",
      unlocked: level4Completed,
    },
    {
      id: 6,
      title: "Where Plants Grow",
      unlocked: false,
    },
    {
      id: 7,
      title: "What Plants Need",
      unlocked: false,
    },
    {
      id: 8,
      title: "Leaf Shapes",
      unlocked: false,
    },
    {
      id: 9,
      title: "Uses of Plants",
      unlocked: false,
    },
    {
      id: 10,
      title: "Save Plants",
      unlocked: false,
    },
  ];

  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-r
      from-green-400
      to-emerald-500

      px-4
      py-6
      pb-24
    "
    >
      <div className="max-w-5xl mx-auto">
        <h1
          className="
          text-3xl
          sm:text-4xl
          md:text-5xl

          font-black
          text-white

          text-center

          mb-2
        "
        >
          Plants World
        </h1>

        <p
          className="
          text-center
          text-white

          text-base
          md:text-lg

          mb-8
        "
        >
          Learn plants level by level
        </p>

        <div className="space-y-5">
          {levels.map((level) => (
            <div
              key={level.id}
              className="
              bg-white

              rounded-3xl

              shadow-xl

              p-5
              md:p-6

              flex
              flex-col
              sm:flex-row

              items-center
              justify-between

              gap-5
              "
            >
              <div className="text-center sm:text-left">
                <h2
                  className="
                  text-xl
                  md:text-2xl

                  font-bold
                "
                >
                  Level {level.id}
                </h2>

                <p
                  className="
                  text-gray-600

                  text-sm
                  md:text-base
                "
                >
                  {level.title}
                </p>
              </div>

              {level.unlocked ? (
                <button
                  onClick={() => {
                    switch (level.id) {
                      case 1:
                        navigate("/plants/lesson");
                        break;

                      case 2:
                        navigate("/plants/seed-growth");
                        break;

                      case 3:
                        navigate("/plants/level3");
                        break;

                      case 4:
                        navigate("/plants/level4");
                        break;

                      case 5:
                        navigate("/plants/level5");
                        break;

                      case 6:
                        navigate("/plants/level6");
                        break;

                      case 7:
                        navigate("/plants/level7");
                        break;

                      case 8:
                        navigate("/plants/level8");
                        break;

                      case 9:
                        navigate("/plants/level9");
                        break;

                      case 10:
                        navigate("/plants/level10");
                        break;
                    }
                  }}
                  className="
                  w-full
                  sm:w-auto

                  bg-green-500
                  hover:bg-green-600

                  text-white

                  px-8
                  py-3

                  rounded-xl

                  font-bold

                  transition-all
                  duration-300

                  hover:scale-105
                  "
                >
                  Start
                </button>
              ) : (
                <div className="text-2xl md:text-3xl">🔒</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
