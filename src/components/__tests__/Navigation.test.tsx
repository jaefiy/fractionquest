import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';

describe('Navigation & Bilingual Switcher Component Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders Welcome page in Bahasa Melayu by default', () => {
    render(<App />);

    expect(screen.getByText(/FractionQuest: Kembara Pecahan Fino/i)).toBeInTheDocument();
    expect(screen.getByText('Mula Kembara')).toBeInTheDocument();
  });

  it('switches language dynamically without losing progress when EN button is clicked', () => {
    render(<App />);

    // Click Start Adventure / Mula Kembara
    const startBtn = screen.getByText('Mula Kembara');
    fireEvent.click(startBtn);

    // Verify Chapter 1 in BM
    expect(screen.getByText(/1. Misteri Bahagian Pecahan/i)).toBeInTheDocument();

    // Toggle language to English using header language button
    const langBtn = screen.getByLabelText(/Switch Language/i);
    fireEvent.click(langBtn);

    // Verify chapter updates dynamically to English while remaining on Chapter 1
    expect(screen.getByText(/1. The Mystery of Fraction Pieces/i)).toBeInTheDocument();
    expect(screen.getByText(/Previous Chapter/i)).toBeInTheDocument();
  });
});
