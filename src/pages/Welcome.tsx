import { useNavigate } from "react-router-dom";
import owl from "../assets/owl.png";


export default function Welcome() {
  const navigate = useNavigate();

  return (
    
    <div className="flex items-center justify-center py-10 px-4 bg-white  min-h-[80vh] pb-28 ">

      <div className=" p-10 text-center max-w-xl w-full">

        {/* Owl */}
        <img
          src={owl}
          alt="owl"
          className="w-40 mx-auto mb-2 "
        />

        {/* Title */}
        <h1 className="text-5xl font-bold mb-4 text-gray-800">
          Brain Quest 
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 mb-8 text-lg">
          Learn while playing fun missions!
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/loading")}
          className="bg-yellow-400 hover:bg-yellow-500 hover:scale-105 active:scale-95 transition duration-300 px-8 py-4 rounded-2xl text-xl font-bold"
        >
          GET STARTED
        </button>

      </div>

    </div>
  );
}