import { createContext, useContext, useState } from 'react';

export const StoreContext = createContext(undefined);

export const useStore = () => {
  return useContext(StoreContext);
};

export const ContextProvider = ({ children }) => {
  const [isOnMeditationsMusic, setIsOnMeditationsMusic] = useState(false);
  const [isOnSerenityNtf, setIsOnSerenityNtf] = useState(false);
  const [moodStats, setMoodStats] = useState({ A: 0, B: 0, C: 0, D: 0 });
  const [quizResult, setQuizResult] = useState(null);
  const [openedMeditationsCount, setOpenedMeditationsCount] = useState([]);
  const [openedBreathingSessionCount, setOpenedBreathingSessionCount] =
    useState(0);

  const value = {
    isOnMeditationsMusic,
    setIsOnMeditationsMusic,
    isOnSerenityNtf,
    setIsOnSerenityNtf,
    moodStats,
    setMoodStats,
    openedBreathingSessionCount,
    setOpenedBreathingSessionCount,
    openedMeditationsCount,
    setOpenedMeditationsCount,
    quizResult,
    setQuizResult,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
