import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Chapter2Activity } from '../Chapter2Activity';
import { Chapter3Activity } from '../Chapter3Activity';
import { LanguageProvider } from '../../../context/LanguageContext';

const renderWithLanguage = (ui: React.ReactElement) => {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
};

describe('Chapter2Activity Discovery-First Pedagogical Tests', () => {
  it('hides completed equation/numerator prior to attempt and reveals it only after correct submission', () => {
    renderWithLanguage(<Chapter2Activity />);

    // 1. Initial State: 1/3 = ?/15
    // Completed explanation container must NOT be in document
    expect(screen.queryByTestId('completed-explanation')).not.toBeInTheDocument();
    expect(screen.queryByText('1/3 = 5/15')).not.toBeInTheDocument();

    // 2. Interact with multiplier x5 -> subdivides bar to 15 parts
    const mult5Btn = screen.getByRole('button', { name: '× 5' });
    fireEvent.click(mult5Btn);

    // Equation still unrevealed
    expect(screen.queryByTestId('completed-explanation')).not.toBeInTheDocument();

    // 3. Incorrect Attempt (e.g., input 2)
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '2' } });

    const checkBtn = screen.getByRole('button', { name: /Semak Jawapan|Check Answer/i });
    fireEvent.click(checkBtn);

    // Progressive Hint level 1 shown, completed explanation still hidden
    expect(screen.getByTestId('hint-level-1')).toBeInTheDocument();
    expect(screen.queryByTestId('completed-explanation')).not.toBeInTheDocument();

    // 4. Correct Attempt (input 5)
    fireEvent.change(input, { target: { value: '5' } });
    fireEvent.click(checkBtn);

    // Completed equation and explanation now revealed
    expect(screen.getByTestId('completed-explanation')).toBeInTheDocument();
    expect(screen.getByText(/1\/3 = 5\/15/i)).toBeInTheDocument();

    // 5. Transition to Question 2 -> resets input and hides explanation again
    const nextBtn = screen.getByRole('button', { name: /Soalan Seterusnya|Next Question/i });
    fireEvent.click(nextBtn);

    expect(screen.queryByTestId('completed-explanation')).not.toBeInTheDocument();
    expect((screen.getByRole('spinbutton') as HTMLInputElement).value).toBe('');
  });

  it('verifies dynamic fraction bar matching for 1/5 = 3/15 and 1/2 = 4/8 questions', () => {
    renderWithLanguage(<Chapter2Activity />);

    // Move to Question 2: 1/5 = ?/15
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '5' } });
    fireEvent.click(screen.getByRole('button', { name: /Semak Jawapan|Check Answer/i }));
    fireEvent.click(screen.getByRole('button', { name: /Soalan Seterusnya|Next Question/i }));

    // Question 2
    const origBarQ2 = screen.getByTestId('original-fraction-bar');
    expect(within(origBarQ2).getAllByText('1/5')).toHaveLength(5);

    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '3' } });
    fireEvent.click(screen.getByRole('button', { name: /Semak Jawapan|Check Answer/i }));
    expect(screen.getByText(/1\/5 = 3\/15/i)).toBeInTheDocument();

    // Move to Question 3: 1/2 = ?/8
    fireEvent.click(screen.getByRole('button', { name: /Soalan Seterusnya|Next Question/i }));

    const origBarQ3 = screen.getByTestId('original-fraction-bar');
    expect(within(origBarQ3).getAllByText('1/2')).toHaveLength(2);

    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '4' } });
    fireEvent.click(screen.getByRole('button', { name: /Semak Jawapan|Check Answer/i }));
    expect(screen.getByText(/1\/2 = 4\/8/i)).toBeInTheDocument();
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
