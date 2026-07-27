import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout.tsx";

import Welcome from "./pages/Welcome.tsx";
import CreateProfile from "./pages/CreateProfile.tsx";
import Profile from "./pages/Profile.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Result from "./pages/Result.tsx";
import MemoryGame from "./pages/MemoryGame.tsx";
import DifferenceGame from "./pages/DifferenceGame.tsx";
import DragDropGame from "./pages/DragDropGame.tsx";
import SpeedMathGame from "./pages/SpeedMathGame.tsx";
import WordPuzzleGame from "./pages/WordPuzzleGame.tsx";
import PatternMemoryGame from "./pages/PatternMemoryGame.tsx";
import CodeBreakerGame from "./pages/CodeBreakerGame.tsx";
import SudokuLiteGame from "./pages/SudokuLiteGame.tsx";
import ReflexTapGame from "./pages/ReflexTapGame.tsx";
import Games from "./pages/Games.tsx";
import Missions from "./pages/Missions.tsx";
import Loading from "./pages/Loading.tsx";
import ParentLogin from "./pages/ParentLogin.tsx";
import ParentDashboard from "./pages/ParentDashboard.tsx";

import PlantDashboard from "./pages/Plants/PlantDashboard.tsx";
import PlantLesson from "./pages/Plants/PlantLesson.tsx";
import PlantQuiz from "./pages/Plants/PlantQuiz.tsx";

import SeedLesson from "./pages/Plants/level2/SeedLesson.tsx";
import SeedQuiz from "./pages/Plants/level2/SeedQuiz.tsx";

import TypesLesson from "./pages/Plants/level3/TypesLesson.tsx";
import TypesQuiz from "./pages/Plants/level3/TypesQuiz.tsx";

import FlowerLesson from "./pages/Plants/level4/FlowerLesson.tsx";
import FlowerQuiz from "./pages/Plants/level4/FlowerQuiz.tsx";

import Auth from "./pages/Auth.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages WITHOUT Header/Footer */}
        <Route path="/" element={<Welcome />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* All Other Pages WITH Header/Footer */}
        <Route element={<Layout />}>
          <Route path="create-profile" element={<CreateProfile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="result" element={<Result />} />
          <Route path="memory-game" element={<MemoryGame />} />
          <Route path="difference-game" element={<DifferenceGame />} />
          <Route path="dragdrop-game" element={<DragDropGame />} />
          <Route path="speedmath-game" element={<SpeedMathGame />} />
          <Route path="wordpuzzle-game" element={<WordPuzzleGame />} />
          <Route path="pattern-memory" element={<PatternMemoryGame />} />
          <Route path="code-breaker" element={<CodeBreakerGame />} />
          <Route path="sudoku-lite" element={<SudokuLiteGame />} />
          <Route path="reflex-tap" element={<ReflexTapGame />} />
          <Route path="games" element={<Games />} />
          <Route path="missions" element={<Missions />} />
          <Route path="loading" element={<Loading />} />
          <Route path="/parent-login" element={<ParentLogin />} />
          <Route path="/parent-dashboard" element={<ParentDashboard />} />

          <Route path="/plants" element={<PlantDashboard />} />
          <Route path="/plants/lesson" element={<PlantLesson />} />
          <Route path="/plants/quiz" element={<PlantQuiz />} />

          <Route path="/plants/seed-growth" element={<SeedLesson />} />
          <Route path="/plants/level2/quiz" element={<SeedQuiz />} />

          <Route path="/plants/level3" element={<TypesLesson />} />
          <Route path="/plants/level3/quiz" element={<TypesQuiz />} />

          <Route path="/plants/level4" element={<FlowerLesson />} />
          <Route path="/plants/level4/quiz" element={<FlowerQuiz />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;