import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { LanguageProvider, useLanguage } from '../LanguageContext';

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <LanguageProvider>{children}</LanguageProvider>
);

describe('LanguageContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('defaults to Bahasa Melayu (ms)', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.language).toBe('ms');
    expect(result.current.t.appTitle).toContain('Kembara Pecahan Fino');
  });

  it('switches language to English (en) and updates translations', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    act(() => {
      result.current.setLanguage('en');
    });

    expect(result.current.language).toBe('en');
    expect(result.current.t.appTitle).toContain("Fino's Fraction Adventure");
    expect(localStorage.getItem('fractionquest_language')).toBe('en');
  });

  it('toggles language back and forth', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    act(() => {
      result.current.toggleLanguage();
    });
    expect(result.current.language).toBe('en');

    act(() => {
      result.current.toggleLanguage();
    });
    expect(result.current.language).toBe('ms');
  });
});
