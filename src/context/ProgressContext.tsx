import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ProgressState {
  completedChapters: number[]; // e.g. [1, 2]
  currentChapter: number;      // 1 to 5, 0 = Welcome Page
  highestUnlocked: number;     // 1 to 5
}

interface ProgressContextType {
  progress: ProgressState;
  setCurrentChapter: (chapter: number) => void;
  markChapterComplete: (chapter: number) => void;
  isChapterUnlocked: (chapter: number) => boolean;
  resetProgress: () => void;
}

const PROGRESS_STORAGE_KEY = 'fractionquest_progress';

const initialProgress: ProgressState = {
  completedChapters: [],
  currentChapter: 0, // 0 means Welcome page
  highestUnlocked: 1,
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<ProgressState>(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.highestUnlocked === 'number') {
          return parsed;
        }
      }
    } catch {
      // Ignore localStorage read errors
    }
    return initialProgress;
  });

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore localStorage write errors
    }
  }, [progress]);

  const setCurrentChapter = (chapter: number) => {
    setProgress((prev) => {
      if (chapter === 0 || chapter <= prev.highestUnlocked) {
        return { ...prev, currentChapter: chapter };
      }
      return prev;
    });
  };

  const markChapterComplete = (chapter: number) => {
    setProgress((prev) => {
      const completedSet = new Set(prev.completedChapters);
      completedSet.add(chapter);
      const nextUnlocked = Math.max(prev.highestUnlocked, Math.min(5, chapter + 1));
      return {
        ...prev,
        completedChapters: Array.from(completedSet),
        highestUnlocked: nextUnlocked,
      };
    });
  };

  const isChapterUnlocked = (chapter: number): boolean => {
    if (chapter === 1) return true;
    return progress.highestUnlocked >= chapter;
  };

  const resetProgress = () => {
    setProgress(initialProgress);
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        setCurrentChapter,
        markChapterComplete,
        isChapterUnlocked,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
