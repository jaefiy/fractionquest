import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ProgressState {
  completedChapters: number[]; // e.g. [1, 2]
  completedActivities: string[]; // e.g. ['ch4_addition', 'ch4_detective', 'ch5_addition', 'ch5_problems', 'ch5_detective']
  currentChapter: number;      // 1 to 5, 0 = Welcome Page
  highestUnlocked: number;     // 1 to 5
  preQuizScore: number | null; // 0 to 5, null if not attempted
  postQuizScore: number | null; // 0 to 5, null if not attempted
}

interface ProgressContextType {
  progress: ProgressState;
  setCurrentChapter: (chapter: number) => void;
  markChapterComplete: (chapter: number) => void;
  markActivityComplete: (activityId: string) => void;
  isActivityComplete: (activityId: string) => boolean;
  isChapterUnlocked: (chapter: number) => boolean;
  isCertificateUnlocked: () => boolean;
  savePreQuizScore: (score: number) => void;
  savePostQuizScore: (score: number) => void;
  resetProgress: () => void;
}

const PROGRESS_STORAGE_KEY = 'fractionquest_progress';

const initialProgress: ProgressState = {
  completedChapters: [],
  completedActivities: [],
  currentChapter: 0, // 0 means Welcome page
  highestUnlocked: 1,
  preQuizScore: null,
  postQuizScore: null,
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<ProgressState>(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.highestUnlocked === 'number') {
          return {
            ...initialProgress,
            ...parsed,
            completedActivities: Array.isArray(parsed.completedActivities) ? parsed.completedActivities : [],
          };
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

  const markActivityComplete = (activityId: string) => {
    setProgress((prev) => {
      const actSet = new Set(prev.completedActivities);
      actSet.add(activityId);
      return {
        ...prev,
        completedActivities: Array.from(actSet),
      };
    });
  };

  const isActivityComplete = (activityId: string): boolean => {
    return progress.completedActivities.includes(activityId);
  };

  const isChapterUnlocked = (chapter: number): boolean => {
    if (chapter === 1) return true;
    return progress.highestUnlocked >= chapter;
  };

  const isCertificateUnlocked = (): boolean => {
    // Requires chapters 1..5 marked complete or all essential activities complete AND post-quiz submitted
    const hasPostQuiz = progress.postQuizScore !== null;
    const ch4Complete = isActivityComplete('ch4_addition') && isActivityComplete('ch4_detective');
    const ch5Complete = isActivityComplete('ch5_addition') && isActivityComplete('ch5_problems') && isActivityComplete('ch5_detective');
    const ch1To3Complete = [1, 2, 3].every((ch) => progress.completedChapters.includes(ch));

    return hasPostQuiz && (ch1To3Complete || progress.completedChapters.includes(5)) && ch4Complete && ch5Complete;
  };

  const savePreQuizScore = (score: number) => {
    setProgress((prev) => ({ ...prev, preQuizScore: score }));
  };

  const savePostQuizScore = (score: number) => {
    setProgress((prev) => ({ ...prev, postQuizScore: score }));
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
        markActivityComplete,
        isActivityComplete,
        isChapterUnlocked,
        isCertificateUnlocked,
        savePreQuizScore,
        savePostQuizScore,
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
