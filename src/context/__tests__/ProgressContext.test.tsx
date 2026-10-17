import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { ProgressProvider, useProgress } from '../ProgressContext';

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProgressProvider>{children}</ProgressProvider>
);

describe('ProgressContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with default welcome state (chapter 0, chapter 1 unlocked)', () => {
    const { result } = renderHook(() => useProgress(), { wrapper });
    expect(result.current.progress.currentChapter).toBe(0);
    expect(result.current.progress.highestUnlocked).toBe(1);
    expect(result.current.isChapterUnlocked(1)).toBe(true);
    expect(result.current.isChapterUnlocked(2)).toBe(false);
  });

  it('unlocks chapter 2 after completing chapter 1', () => {
    const { result } = renderHook(() => useProgress(), { wrapper });

    act(() => {
      result.current.markChapterComplete(1);
    });

    expect(result.current.progress.completedChapters).toContain(1);
    expect(result.current.progress.highestUnlocked).toBe(2);
    expect(result.current.isChapterUnlocked(2)).toBe(true);
  });

  it('persists progress state to localStorage', () => {
    const { result } = renderHook(() => useProgress(), { wrapper });

    act(() => {
      result.current.markChapterComplete(1);
    });

    const saved = localStorage.getItem('fractionquest_progress');
    expect(saved).not.toBeNull();
    const parsed = JSON.parse(saved!);
    expect(parsed.highestUnlocked).toBe(2);
  });

  it('resets progress back to initial state', () => {
    const { result } = renderHook(() => useProgress(), { wrapper });

    act(() => {
      result.current.markChapterComplete(1);
      result.current.markChapterComplete(2);
      result.current.resetProgress();
    });

    expect(result.current.progress.completedChapters.length).toBe(0);
    expect(result.current.progress.highestUnlocked).toBe(1);
  });
});
