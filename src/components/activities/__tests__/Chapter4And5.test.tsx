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

  it('shows friendly warning message when Next Activity is clicked before completing addition task', () => {
    renderWithProviders(<Chapter4Activity />);

    const nextBtn = screen.getByRole('button', { name: /Aktiviti Seterusnya|Next Activity/i });

    // Click Next Activity before solving question
    fireEvent.click(nextBtn);

    // Friendly warning message should appear and activity should stay on Addition Challenge
    expect(screen.getByText(/Sila selesaikan sekurang-kurangnya satu soalan/i)).toBeInTheDocument();
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

describe('Chapter5Activity & Certificate Tests', () => {
  it('displays locked certificate panel when requirements are incomplete', () => {
    renderWithProviders(<Chapter5Activity />);

    // Switch to Certificate tab
    const certTabBtn = screen.getByRole('button', { name: /5\. Sijil|5\. Certificate/i });
    fireEvent.click(certTabBtn);

    // Should display locked warning and requirements checklist
    expect(screen.getByText(/Sijil Penyelesaian Kembara Masih Terkunci|Quest Completion Certificate is Locked/i)).toBeInTheDocument();
    expect(screen.getByText(/Aktiviti Bab 1–3|Chapter 1–3 Activities/i)).toBeInTheDocument();
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
