import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Chapter1Activity } from '../Chapter1Activity';
import { LanguageProvider } from '../../../context/LanguageContext';

const renderWithLanguage = (ui: React.ReactElement) => {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
};

describe('Chapter1Activity Component', () => {
  it('renders initial interactive fraction bar controls and title', () => {
    renderWithLanguage(<Chapter1Activity />);
    expect(screen.getByText(/Misteri Bahagian Pecahan|Mystery of Fraction Pieces/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Jalur A|Bar A/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Jalur B|Bar B/i).length).toBeGreaterThan(0);
  });

  it('allows prediction selection and confirmation', () => {
    renderWithLanguage(<Chapter1Activity />);
    const predictStepBtn = screen.getByText(/2. Ramalkan|2. Predict/i);
    fireEvent.click(predictStepBtn);

    const radioOptions = screen.getAllByRole('radio');
    expect(radioOptions.length).toBeGreaterThan(0);
    fireEvent.click(radioOptions[0]);

    const confirmBtn = screen.getByRole('button', { name: /Sahkan Ramalan|Confirm Prediction/i });
    expect(confirmBtn).not.toBeDisabled();
    fireEvent.click(confirmBtn);

    expect(screen.getByText(/Maklum Balas Ramalan:|Prediction Feedback:/i)).toBeInTheDocument();
  });

  it('submits assessment questions and triggers completion callback', () => {
    const onCompleteMock = vi.fn();
    renderWithLanguage(<Chapter1Activity onComplete={onCompleteMock} />);

    const step3Btn = screen.getByText(/3. Soalan|3. Attempt/i);
    fireEvent.click(step3Btn);

    const selects = screen.getAllByRole('combobox');
    expect(selects.length).toBe(3);

    // Q1: TOTAL_PARTS
    fireEvent.change(selects[0], { target: { value: 'TOTAL_PARTS' } });
    // Q2: TAKEN_PARTS
    fireEvent.change(selects[1], { target: { value: 'TAKEN_PARTS' } });
    // Q3: ONE_THIRD
    fireEvent.change(selects[2], { target: { value: 'ONE_THIRD' } });

    const submitBtn = screen.getByRole('button', { name: /Hantar Jawapan|Submit Answers/i });
    expect(submitBtn).not.toBeDisabled();
    fireEvent.click(submitBtn);

    expect(onCompleteMock).toHaveBeenCalled();
    expect(screen.getByText(/Tahniah! Penemuan Hebat!|Congratulations! Great Discovery!/i)).toBeInTheDocument();
  });
});
