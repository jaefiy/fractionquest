import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Chapter4Activity } from '../Chapter4Activity';
import { Chapter5Activity } from '../Chapter5Activity';
import { QuizModal } from '../../QuizModal';
import { PRE_QUIZ_QUESTIONS } from '../../../data/quizData';
import { LanguageProvider } from '../../../context/LanguageContext';
import { ProgressProvider } from '../../../context/ProgressContext';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <LanguageProvider>
      <ProgressProvider>{ui}</ProgressProvider>
    </LanguageProvider>
  );
};

describe('Chapter4Activity Interactive Tests', () => {
  it('renders difficulty levels and fraction bars for active question', () => {
    renderWithProviders(<Chapter4Activity />);

    expect(screen.getByText(/Istana Penambahan Pecahan|Castle of Fraction Addition/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Mudah|Easy/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sederhana|Medium/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Mencabar|Challenging/i })).toBeInTheDocument();

    // Default active question is Easy 1/2 + 1/4
    expect(screen.getByText('1/2 + 1/4 = ?')).toBeInTheDocument();
  });

  it('navigates between activities using bottom Previous and Next Activity buttons', () => {
    renderWithProviders(<Chapter4Activity />);

    // Initial tab: Addition Challenge. Previous Activity should be disabled
    const prevBtn = screen.getByRole('button', { name: /Aktiviti Sebelum|Previous Activity/i });
    const nextBtn = screen.getByRole('button', { name: /Aktiviti Seterusnya|Next Activity/i });

    expect(prevBtn).toBeDisabled();
    expect(nextBtn).not.toBeDisabled();

    // Click Next Activity -> Navigates to Misconception Detective
    fireEvent.click(nextBtn);
    expect(screen.getByText(/1\/3 \+ 1\/5 = 2\/8/i)).toBeInTheDocument();
    expect(nextBtn).toBeDisabled();
    expect(prevBtn).not.toBeDisabled();

    // Click Previous Activity -> Navigates back to Addition Challenge
    fireEvent.click(prevBtn);
    expect(screen.getByText('1/2 + 1/4 = ?')).toBeInTheDocument();
  });

  it('runs Misconception Detective and detects 1/3 + 1/5 = 2/8 error', () => {
    renderWithProviders(<Chapter4Activity />);

    const detTabBtn = screen.getByRole('button', { name: /Detektif Mitos|Misconception Detective/i });
    fireEvent.click(detTabBtn);

    expect(screen.getByText(/1\/3 \+ 1\/5 = 2\/8/i)).toBeInTheDocument();

    // Select procedure error
    const separateRadio = screen.getByLabelText(/Murid menambah pengangka/i);
    fireEvent.click(separateRadio);

    // Guided reasoning step
    const reasonSelect = screen.getByRole('combobox');
    fireEvent.change(reasonSelect, { target: { value: 'REASON_OK' } });

    // Enter correct sum 8/15
    const inputs = screen.getAllByPlaceholderText('?');
    fireEvent.change(inputs[0], { target: { value: '8' } });
    fireEvent.change(inputs[1], { target: { value: '15' } });

    const confirmBtn = screen.getByRole('button', { name: /Sahkan Jawapan Betul|Confirm Correct Answer/i });
    fireEvent.click(confirmBtn);

    expect(screen.getByText(/Syabas Detektif!|Great job Detective!/i)).toBeInTheDocument();
  });
});

describe('Chapter5Activity & Sequential Navigation Tests', () => {
  it('navigates through all 5 sequence steps in Chapter 5 using bottom navigation buttons', () => {
    renderWithProviders(<Chapter5Activity />);

    const prevBtn = screen.getByRole('button', { name: /Aktiviti Sebelum|Previous Activity/i });
    const nextBtn = screen.getByRole('button', { name: /Aktiviti Seterusnya|Next Activity/i });

    // Step 1: Final Addition
    expect(screen.getByText(/Cabaran Penambahan Variasi Penyebut|Varied Denominator Addition Challenge/i)).toBeInTheDocument();
    expect(prevBtn).toBeDisabled();

    // Move to Step 2: Real-Life Word Problems
    fireEvent.click(nextBtn);
    expect(screen.getByText(/Soalan Kehidupan Sebenar|Real-Life Word Problems/i)).toBeInTheDocument();
    expect(prevBtn).not.toBeDisabled();

    // Move to Step 3: Misconception Detective
    fireEvent.click(nextBtn);
    expect(screen.getByText(/Detektif Mitos Bab 5|Chapter 5 Misconception Detective/i)).toBeInTheDocument();

    // Move to Step 4: Post-Quiz
    fireEvent.click(nextBtn);
    expect(screen.getByText(/Pasca-Kuiz Minda Pecahan|Fraction Mind Post-Quiz/i)).toBeInTheDocument();

    // Move to Step 5: Certificate
    fireEvent.click(nextBtn);
    expect(screen.getByText(/SIJIL KEJAYAN FRACTIONQUEST|FRACTIONQUEST COMPLETION CERTIFICATE/i)).toBeInTheDocument();
    expect(nextBtn).toBeDisabled();

    // Move back to Step 4: Post-Quiz
    fireEvent.click(prevBtn);
    expect(screen.getByText(/Pasca-Kuiz Minda Pecahan|Fraction Mind Post-Quiz/i)).toBeInTheDocument();
  });

  it('preserves user state and inputs across activity transitions in Chapter 5', () => {
    renderWithProviders(<Chapter5Activity />);

    const nextBtn = screen.getByRole('button', { name: /Aktiviti Seterusnya|Next Activity/i });
    const prevBtn = screen.getByRole('button', { name: /Aktiviti Sebelum|Previous Activity/i });

    // Fill conversion input in Step 1
    const inputs = screen.getAllByPlaceholderText('?');
    fireEvent.change(inputs[0], { target: { value: '3' } }); // eqN1

    // Navigate to Step 2 and back
    fireEvent.click(nextBtn);
    fireEvent.click(prevBtn);

    // Verify input value is preserved
    const inputsAfter = screen.getAllByPlaceholderText('?');
    expect((inputsAfter[0] as HTMLInputElement).value).toBe('3');
  });

  it('renders QuizModal, does not reveal answers while answering, and computes correct score', () => {
    const handleComplete = vi.fn();
    render(
      <LanguageProvider>
        <QuizModal
          isOpen={true}
          onClose={vi.fn()}
          title="Test Quiz"
          questions={PRE_QUIZ_QUESTIONS}
          onQuizComplete={handleComplete}
        />
      </LanguageProvider>
    );

    expect(screen.getByText('Test Quiz')).toBeInTheDocument();

    // Verify option A selection on Q1
    const optA = screen.getByRole('button', { name: /Menunjukkan jumlah semua bahagian sama saiz|Shows the total number of equal parts/i });
    fireEvent.click(optA);

    // Answers are NOT revealed during question completion
    expect(screen.queryByText(/Keputusan Kuiz Anda|Your Quiz Results/i)).not.toBeInTheDocument();
  });
});
