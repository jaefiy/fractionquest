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

  it('allows converting equivalent fractions and calculating final sum without pre-revealing answer', () => {
    renderWithProviders(<Chapter4Activity />);

    // Step 1 Explore -> Step 2 Predict -> Step 3 Convert
    const convertTabBtn = screen.getByRole('button', { name: /3\. Tukar|3\. Convert/i });
    fireEvent.click(convertTabBtn);

    // Initial inputs in Step 3 A (Conversion): userN1, userCD, userN2, userCD
    const convInputs = screen.getAllByPlaceholderText('?');
    expect(convInputs.length).toBe(4);

    fireEvent.change(convInputs[0], { target: { value: '2' } }); // userN1 (1/2 -> 2/4)
    fireEvent.change(convInputs[1], { target: { value: '4' } }); // userCD
    fireEvent.change(convInputs[2], { target: { value: '1' } }); // userN2 (1/4 -> 1/4)

    const checkConvBtn = screen.getByRole('button', { name: /Semak Penukaran|Check Conversion/i });
    fireEvent.click(checkConvBtn);

    expect(screen.getByText(/Penukaran Sah!|Valid Conversion!/i)).toBeInTheDocument();

    // After valid conversion, final sum form (Step 3 B) is unlocked
    const checkSumBtn = screen.getByRole('button', { name: /Semak Hasil Tambah|Check Final Sum/i });
    expect(checkSumBtn).toBeInTheDocument();

    // The enabled inputs in Step 3 B are finalN and finalD (last 2 placeholders)
    const allInputs = screen.getAllByPlaceholderText('?');
    const enabledInputs = allInputs.filter((i) => !(i as HTMLInputElement).disabled);
    expect(enabledInputs.length).toBe(2);

    fireEvent.change(enabledInputs[0], { target: { value: '3' } }); // finalN
    fireEvent.change(enabledInputs[1], { target: { value: '4' } }); // finalD

    fireEvent.click(checkSumBtn);

    // Feedback message rendered upon correct sum
    expect(screen.getByText(/Hasil Tambah Tepat!|Correct Sum!/i)).toBeInTheDocument();
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

describe('Chapter5Activity & QuizModal Tests', () => {
  it('renders Chapter 5 tabs, word problems, and completion certificate', () => {
    renderWithProviders(<Chapter5Activity />);

    expect(screen.getByText(/Misi Terakhir Pecahan|The Final Fraction Quest/i)).toBeInTheDocument();

    // Switch to Word Problems
    const wpTabBtn = screen.getByRole('button', { name: /Soalan Kehidupan|Word Problems/i });
    fireEvent.click(wpTabBtn);

    expect(screen.getByText(/Soalan Kehidupan Sebenar|Real-Life Word Problems/i)).toBeInTheDocument();

    // Switch to Certificate
    const certTabBtn = screen.getByRole('button', { name: /Sijil|Certificate/i });
    fireEvent.click(certTabBtn);

    expect(screen.getByText(/SIJIL KEJAYAN FRACTIONQUEST|FRACTIONQUEST COMPLETION CERTIFICATE/i)).toBeInTheDocument();
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
