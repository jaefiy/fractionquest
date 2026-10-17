import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Chapter2Activity } from '../Chapter2Activity';
import { Chapter3Activity } from '../Chapter3Activity';
import { LanguageProvider } from '../../../context/LanguageContext';

const renderWithLanguage = (ui: React.ReactElement) => {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
};

describe('Chapter2Activity Automated Mathematical & Usability Tests', () => {
  it('renders Puzzle 1 (1/3 = 5/15) with dynamic fraction bars and resets input on question transition', () => {
    renderWithLanguage(<Chapter2Activity />);

    // Verify initial active puzzle is 1/3 = ?/15
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();

    // Verify original fraction bar shows 3 parts for 1/3
    const origBar = screen.getByTestId('original-fraction-bar');
    expect(within(origBar).getAllByText('1/3')).toHaveLength(3);

    // Verify equivalent fraction bar shows 15 parts for 5/15
    const equivBar = screen.getByTestId('equivalent-fraction-bar');
    expect(within(equivBar).getAllByText('1/15')).toHaveLength(15);

    // Input incorrect answer first
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '2' } });

    const checkBtn = screen.getByRole('button', { name: /Semak Jawapan|Check Answer/i });
    fireEvent.click(checkBtn);

    // Progressive hint for wrong answer
    expect(screen.getByText(/Jawapan belum tepat|Not quite right/i)).toBeInTheDocument();

    // Now submit correct answer 5 for 1/3 = 5/15
    fireEvent.change(input, { target: { value: '5' } });
    fireEvent.click(checkBtn);

    expect(screen.getByText(/Tepat Sekali!|Correct!/i)).toBeInTheDocument();

    // Click Next Question
    const nextBtn = screen.getByRole('button', { name: /Soalan Seterusnya|Next Question/i });
    fireEvent.click(nextBtn);

    // Verify transition to Puzzle 2 (1/5 = 3/15)
    expect(screen.getByText('5')).toBeInTheDocument();
    const newOrigBar = screen.getByTestId('original-fraction-bar');
    expect(within(newOrigBar).getAllByText('1/5')).toHaveLength(5);

    // Ensure input field is reset to empty for Puzzle 2
    const newInput = screen.getByRole('spinbutton');
    expect((newInput as HTMLInputElement).value).toBe('');
  });

  it('tests Puzzle 2 (1/5 = 3/15) answer submission and fraction bar rendering', () => {
    renderWithLanguage(<Chapter2Activity />);

    // Complete Puzzle 1
    const input1 = screen.getByRole('spinbutton');
    fireEvent.change(input1, { target: { value: '5' } });
    const checkBtn1 = screen.getByRole('button', { name: /Semak Jawapan|Check Answer/i });
    fireEvent.click(checkBtn1);

    const nextBtn = screen.getByRole('button', { name: /Soalan Seterusnya|Next Question/i });
    fireEvent.click(nextBtn);

    // Puzzle 2: 1/5 = 3/15
    const input2 = screen.getByRole('spinbutton');
    fireEvent.change(input2, { target: { value: '3' } });
    const checkBtn2 = screen.getByRole('button', { name: /Semak Jawapan|Check Answer/i });
    fireEvent.click(checkBtn2);

    expect(screen.getByText(/Tepat Sekali!|Correct!/i)).toBeInTheDocument();
  });

  it('tests Puzzle 3 (1/2 = 4/8) answer submission and fraction bar rendering', () => {
    renderWithLanguage(<Chapter2Activity />);

    // Puzzle 1 -> Puzzle 2
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '5' } });
    fireEvent.click(screen.getByRole('button', { name: /Semak Jawapan|Check Answer/i }));
    fireEvent.click(screen.getByRole('button', { name: /Soalan Seterusnya|Next Question/i }));

    // Puzzle 2 -> Puzzle 3
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '3' } });
    fireEvent.click(screen.getByRole('button', { name: /Semak Jawapan|Check Answer/i }));
    fireEvent.click(screen.getByRole('button', { name: /Soalan Seterusnya|Next Question/i }));

    // Puzzle 3: 1/2 = 4/8
    const origBar = screen.getByTestId('original-fraction-bar');
    expect(within(origBar).getAllByText('1/2')).toHaveLength(2);

    const equivBar = screen.getByTestId('equivalent-fraction-bar');
    expect(within(equivBar).getAllByText('1/8')).toHaveLength(8);

    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '4' } });
    fireEvent.click(screen.getByRole('button', { name: /Semak Jawapan|Check Answer/i }));

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
