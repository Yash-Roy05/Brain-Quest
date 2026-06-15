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

function App() {
  return (
    <BrowserRouter>
  <Routes>

    {/* Pages WITHOUT Header/Footer */}
    <Route path="/" element={<Welcome />} />
    <Route path="/loading" element={<Loading />} />
    <Route path="/create-profile" element={<CreateProfile />} />

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

    </Route>

  </Routes>
</BrowserRouter>
  );
}

export default App;
