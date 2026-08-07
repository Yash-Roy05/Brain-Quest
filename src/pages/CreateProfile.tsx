import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.tsx";
import PageWrapper from "../components/PageWrapper.tsx";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

import panda from "../assets/avatars/panda.png";
import fox from "../assets/avatars/fox.png";
import lion from "../assets/avatars/lion.png";
import frog from "../assets/avatars/frog.png";
import monkey from "../assets/avatars/monkey.png";
import tiger from "../assets/avatars/tiger.png";

export default function Profile() {
  const navigate = useNavigate();

  const { setUser } = useUser();

  // 🧍 Avatar List
  const avatars = [
    { id: "panda", image: panda },
    { id: "fox", image: fox },
    { id: "lion", image: lion },
    { id: "frog", image: frog },
    { id: "monkey", image: monkey },
    { id: "tiger", image: tiger },
  ];

  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");

  // parent mode
  const [parentPin, setParentPin] = useState("");

  // parent empty error hadling
  const [pinError, setPinError] = useState(false);

  const [showPin, setShowPin] = useState(false);

  // ⭐ Selected Avatar
  const [avatar, setAvatar] = useState("panda");

  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleStart = async () => {
    if (!name.trim()) {
      setNameError(true);
    } else {
      setNameError(false);
    }

    if (!age) {
      setAgeError(true);
    } else {
      setAgeError(false);
    }

    if (!gender) {
      setGenderError(true);
    } else {
      setGenderError(false);
    }

    if (parentPin.length !== 4) {
      setPinError(true);
    } else {
      setPinError(false);
    }

    if (!name.trim() || !age || !gender || parentPin.length !== 4) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // Create FormData
      const formData = new FormData();

      formData.append("name", name);
      formData.append("age", age.toString());
      formData.append("gender", gender);
      formData.append("parent_pin", parentPin);

      // Convert selected avatar image to File
      const selectedAvatar = avatars.find((a) => a.id === avatar);

      if (selectedAvatar) {
        const imageResponse = await fetch(selectedAvatar.image);
        const blob = await imageResponse.blob();

        formData.append("avatar", blob, `${avatar}.png`);
      }

      // API Call
      const response = await axios.post(
        "https://kids-api.test/api/children",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log(response.data);

      console.log("Full Response:", response.data);
      console.log("Child Data:", response.data.data);
      console.log("Child ID:", response.data.data.id);

      toast.success("Profile Created Successfully!");

      let ageGroup = "";

      if (age >= 5 && age <= 10) {
        ageGroup = "8-10";
      } else if (age >= 11 && age <= 13) {
        ageGroup = "11-13";
      } else {
        ageGroup = "14-15";
      }

      setUser({
        id: response.data.data.id,

        name,
        age,
        ageGroup,
        gender,
        avatar,

        coins: 0,
        xp: 0,
        level: 1,

        completedMissions: [],
        streak: 1,
        lastLoginDate: new Date().toDateString(),

        parentPin,

        savedProfiles: {},
        screenTimeToday: 0,
        screenTimeTotal: 0,
      });

      navigate("/dashboard");
    } catch (error: any) {
      console.log(error.response);

      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast.error(error.response?.data?.message || "Something went wrong.");
      }
    }
  };

  return (
    <PageWrapper>
      <div className="flex items-center justify-center py-10 px-4 bg-gradient-to-r from-blue-400 to-purple-500 min-h-[80vh] pb-8">
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full max-w-xl text-center">
          {/* Hero Avatar */}
          <div className="mb-6">
            <img
              src={avatars.find((a) => a.id === avatar)?.image}
              alt="Avatar"
              className="w-24 h-24 mx-auto mb-3 rounded-full"
            />

            <h1 className="text-3xl md:text-5xl font-black text-purple-700">
              Brain Quest
            </h1>

            <p className="text-gray-500 mt-2">Create your learning profile</p>
          </div>

          {/* Name Input */}
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError(false);
            }}
            className={`w-full bg-gray-50 border-2 rounded-3xl p-4 text-lg shadow-sm focus:outline-none mb-1 ${
              nameError
                ? "border-red-500"
                : "border-gray-100 focus:border-purple-500"
            }`}
          />
          <p
            className={`mt-0 text-red-500 text-sm text-left min-h-[20px] mb-1 ${
              nameError ? "opacity-100" : "opacity-0"
            }`}
          >
            Please enter your name
          </p>

          {/* Age Group */}
          <select
            value={age}
            onChange={(e) => {
              const value = e.target.value;

              if (value === "") {
                setAge("");
              } else {
                setAge(Number(value));
              }

              setAgeError(false);
            }}
            className={`w-full bg-gray-50 border-2 rounded-3xl p-4 text-lg shadow-sm focus:outline-none mb-1 ${
              ageError
                ? "border-red-500"
                : "border-gray-100 focus:border-purple-500"
            }`}
          >
            <option value="">Select Age</option>

            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
            <option value={11}>11</option>
            <option value={12}>12</option>
            <option value={13}>13</option>
            <option value={14}>14</option>
            <option value={15}>15</option>
            <option value={16}>16</option>
            <option value={17}>17</option>
            <option value={18}>18</option>
          </select>
          <p
            className={`text-red-500 text-sm text-left min-h-[20px] mb-2 ${
              ageError ? "opacity-100" : "opacity-0"
            }`}
          >
            Please select age
          </p>

          {/* Gender */}
          <select
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
              setGenderError(false);
            }}
            className={`w-full bg-gray-50 border-2 rounded-3xl p-4 text-lg shadow-sm focus:outline-none mb-1 ${
              genderError
                ? "border-red-500"
                : "border-gray-100 focus:border-purple-500"
            }`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male </option>
            <option value="female">Female </option>
          </select>

          <p
            className={`text-red-500 text-sm text-left min-h-[20px] mb-2 ${
              genderError ? "opacity-100" : "opacity-0"
            }`}
          >
            Please select gender
          </p>

          <div className="relative">
            <input
              type={showPin ? "text" : "password"}
              inputMode="numeric"
              maxLength={4}
              placeholder="Create Parent PIN"
              value={parentPin}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setParentPin(value);
                setPinError(false);
              }}
              className={`w-full bg-gray-50 border-2 rounded-3xl p-4 pr-12 text-lg shadow-sm focus:outline-none mb-1 ${
                pinError
                  ? "border-red-500"
                  : "border-gray-100 focus:border-purple-500"
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <p
            className={`text-red-500 text-sm text-left min-h-[20px] mb-2 ${
              pinError ? "opacity-100" : "opacity-0"
            }`}
          >
            Please enter 4 digit Parent PIN
          </p>

          {/* 🧍 Avatar Selection */}
          <div className="mb-8">
            <h2 className="text-lg md:text-xl font-bold mb-4 text-center">
              Choose Your Avatar
            </h2>

            <div className="flex justify-center gap-3 flex-wrap">
              {avatars.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setAvatar(item.id)}
                  className={`
text-5xl
w-20
h-20
flex
items-center
justify-center
rounded-3xl
transition-all
duration-300
shadow-md ${
                    avatar === item.id
                      ? "bg-blue-500 scale-110"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.id}
                    className="w-16 h-16 rounded-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStart}
            className="
w-full
bg-gradient-to-r
from-yellow-400
to-orange-500
hover:scale-105
active:scale-95
transition
duration-300
text-xl
font-black
py-4
rounded-3xl
shadow-xl
text-white
"
          >
            Start Adventure
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}
