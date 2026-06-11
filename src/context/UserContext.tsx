import { createContext, useContext, useState, useEffect } from "react";

type SavedProfile = {
  coins: number;
  xp: number;
  level: number;
  completedMissions: number[];
};

type User = {
  name: string;
  age: string;
  coins: number;
  xp: number;
  level: number;
  completedMissions: number[];
  avatar: string;

  streak: number;
  lastLoginDate: string;  

  savedProfiles: {
  [key: string]: SavedProfile;
};
};

type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  addCoins: (amount: number) => void;
  addXP: (amount: number) => void;
  completeMission: (missionId: number) => void;
  checkDailyStreak: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  // ✅ Load saved user from localStorage
  const [user, setUser] = useState<User>(() => {
    const savedUser = localStorage.getItem("brainquest-user");

    return savedUser
      ? JSON.parse(savedUser)
      : {
          name: "",
          age: "",
          coins: 0,
          xp: 0,
          level: 1,
          completedMissions: [],
          avatar: "🐼",

          streak: 0,
          lastLoginDate: "",
          
          savedProfiles: {},
        };
  });

  // ✅ Save user automatically
  useEffect(() => {
    localStorage.setItem("brainquest-user", JSON.stringify(user));
  }, [user]);

  // ✅ Add Coins
  const addCoins = (amount: number) => {
    setUser((prev) => ({
      ...prev,
      coins: prev.coins + amount,
    }));
  };

  // ✅ Add XP
  const addXP = (amount: number) => {
    setUser((prev) => {
      const newXP = prev.xp + amount;

      return {
        ...prev,
        xp: newXP,
        level: Math.floor(newXP / 50) + 1,
      };
    });
  };

  // ✅ Complete Mission
  // 🔥 Daily Streak
const checkDailyStreak = () => {
  const today = new Date().toDateString();

  if (user.lastLoginDate === today) {
    return;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (
    user.lastLoginDate ===
    yesterday.toDateString()
  ) {
    const reward = Math.min(
      (user.streak + 1) * 10,
      100
    );

    setUser((prev) => ({
      ...prev,
      streak: prev.streak + 1,
      lastLoginDate: today,
      coins: prev.coins + reward,
    }));
  } else {
    setUser((prev) => ({
      ...prev,
      streak: 1,
      lastLoginDate: today,
      coins: prev.coins + 10,
    }));
  }
};

// ✅ Complete Mission
const completeMission = (
  missionId: number
) => {
  setUser((prev) => ({
    ...prev,
    completedMissions: [
      ...prev.completedMissions,
      missionId,
    ],
  }));
};

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        addCoins,
        addXP,
        completeMission,
        checkDailyStreak,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
}
