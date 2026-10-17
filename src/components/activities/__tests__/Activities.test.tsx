import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Chapter2Activity } from '../Chapter2Activity';
import { Chapter3Activity } from '../Chapter3Activity';
import { LanguageProvider } from '../../../context/LanguageContext';

const renderWithLanguage = (ui: React.ReactElement) => {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
};

describe('Chapter2Activity Component', () => {
  it('renders subdivision multiplier controls and puzzle', () => {
    renderWithLanguage(<Chapter2Activity />);
    expect(screen.getByText(/Hutan Pecahan Setara|Forest of Equivalent Fractions/i)).toBeInTheDocument();
    expect(screen.getByText(/Cabaran Cabang Pecahan Setara|Equivalent Fraction Puzzle/i)).toBeInTheDocument();
  });

  it('allows puzzle input check and displays feedback', () => {
    renderWithLanguage(<Chapter2Activity />);
    const input = screen.getByPlaceholderText('?');
    fireEvent.change(input, { target: { value: '5' } });

    const checkBtn = screen.getByRole('button', { name: /Semak Jawapan|Check Answer/i });
    fireEvent.click(checkBtn);

    expect(screen.getByText(/Tepat Sekali!|Correct!/i)).toBeInTheDocument();
  });
});

describe('Chapter3Activity Component', () => {
  it('renders common multiple explorer and fraction conversion inputs', () => {
    renderWithLanguage(<Chapter3Activity />);
    expect(screen.getByText(/Jambatan Bahagian Sama Saiz|Bridge of Equal Parts/i)).toBeInTheDocument();
    expect(screen.getByText(/Penjelajah Gandaan Sepunya|Common Multiple Explorer/i)).toBeInTheDocument();
  });

  it('validates common denominator fraction conversion correctly', () => {
    renderWithLanguage(<Chapter3Activity />);
    const inputs = screen.getAllByPlaceholderText('?');
    expect(inputs.length).toBe(4);

    // For pair 1/3 and 1/5 -> user converts to 5/15 and 3/15
    fireEvent.change(inputs[0], { target: { value: '5' } });
    fireEvent.change(inputs[1], { target: { value: '15' } });
    fireEvent.change(inputs[2], { target: { value: '3' } });
    fireEvent.change(inputs[3], { target: { value: '15' } });

    const checkBtn = screen.getByRole('button', { name: /Semak Penukaran|Check Conversion/i });
    fireEvent.click(checkBtn);

    expect(screen.getByText(/Penukaran Sah!|Valid Conversion!/i)).toBeInTheDocument();
  });
});
