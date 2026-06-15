import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import { Outlet, useLocation } from "react-router-dom";

const hideFooterRoutes = [
  "/memory-game",
  "/difference-game",
  "/dragdrop-game",
  "/wordpuzzle-game",
  "/pattern-memory",
  "/code-breaker",
  "/sudoku-lite",
  "/reflex-tap",
  "/speedmath-game",
  "/parent-login",
  "/parent-dashboard",
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-r from-green-400 to-blue-500">
        <Outlet />
      </main>

      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}
