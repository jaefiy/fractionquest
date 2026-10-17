import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { QuizQuestion } from '../data/quizData';
import { X, Award, CheckCircle2, ArrowRight } from 'lucide-react';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  questions: QuizQuestion[];
  onQuizComplete: (score: number) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  title,
  questions,
  onQuizComplete,
}) => {
  const { language } = useLanguage();
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [finalScore, setFinalScore] = useState<number>(0);

  if (!isOpen) return null;

  const currentQ = questions[currentQuestionIdx];
  const selectedOption = userAnswers[currentQ.id];

  const handleOptionSelect = (optionId: string) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctOptionId) {
        score += 1;
      }
    });

    setFinalScore(score);
    setIsSubmitted(true);
    onQuizComplete(score);
  };

  const handleCloseModal = () => {
    // Reset state on close
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setIsSubmitted(false);
    onClose();
  };

  const allAnswered = questions.every((q) => userAnswers[q.id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 border-4 border-peach-300 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b pb-3 border-slate-200">
          <div className="flex items-center gap-2.5">
            <Award className="w-6 h-6 text-fino-orange" />
            <h3 className="font-fredoka text-xl font-bold text-slate-800">{title}</h3>
          </div>
          <button
            onClick={handleCloseModal}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
            aria-label="Close Quiz"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isSubmitted ? (
          <>
            {/* Progress indicator */}
            <div className="flex items-center justify-between text-xs font-fredoka font-bold text-slate-500">
              <span>
                {language === 'ms' ? `Soalan ${currentQuestionIdx + 1} daripada ${questions.length}` : `Question ${currentQuestionIdx + 1} of ${questions.length}`}
              </span>
              <span className="text-fino-darkOrange">
                {Object.keys(userAnswers).length}/{questions.length} {language === 'ms' ? 'dijawab' : 'answered'}
              </span>
            </div>

            {/* Question Text */}
            <div className="bg-peach-50 p-4 rounded-2xl border border-peach-200">
              <h4 className="font-fredoka text-base sm:text-lg font-bold text-slate-800">
                {currentQuestionIdx + 1}. {currentQ.question[language]}
              </h4>
            </div>

            {/* Answer Options (NO ANSWERS REVEALED DURING QUIZ) */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleOptionSelect(opt.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 font-quicksand font-semibold text-sm sm:text-base ${
                      isSelected
                        ? 'bg-fino-orange/10 border-fino-orange text-slate-900 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-peach-300 hover:bg-peach-50/50'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-fredoka font-bold text-xs flex-shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-fino-orange text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {opt.id}
                    </span>
                    <span className="flex-1">{opt.text[language]}</span>
                  </button>
                );
              })}
            </div>

            {/* Quiz Navigation Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <button
                onClick={handlePrev}
                disabled={currentQuestionIdx === 0}
                className="px-4 py-2 rounded-xl border border-slate-300 font-fredoka font-bold text-xs sm:text-sm text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {language === 'ms' ? 'Sebelumnya' : 'Previous'}
              </button>

              {currentQuestionIdx < questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-xl bg-fino-orange hover:bg-fino-darkOrange text-white font-fredoka font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>{language === 'ms' ? 'Seterusnya' : 'Next'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={!allAnswered}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-fredoka font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{language === 'ms' ? 'Hantar Kuiz' : 'Submit Quiz'}</span>
                </button>
              )}
            </div>
          </>
        ) : (
          /* Quiz Results Display */
          <div className="text-center space-y-5 py-4">
            <div className="w-20 h-20 bg-emerald-100 border-4 border-emerald-300 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="font-fredoka text-2xl font-extrabold text-slate-800">
                {language === 'ms' ? 'Keputusan Kuiz Anda' : 'Your Quiz Results'}
              </h4>
              <p className="font-fredoka text-4xl font-extrabold text-fino-darkOrange">
                {finalScore} / {questions.length}
              </p>
              <p className="font-quicksand font-bold text-sm text-slate-600 max-w-md mx-auto">
                {finalScore === 5
                  ? language === 'ms'
                    ? 'Cemerlang! Anda telah menguasai konsep penambahan pecahan KSSR Tahun 4 sepenuhnya!'
                    : 'Outstanding! You have mastered KSSR Year 4 fraction addition concepts completely!'
                  : language === 'ms'
                  ? 'Syabas atas usaha anda! Teruskan penerokaan untuk mengukuhkan lagi kefahaman anda!'
                  : 'Great effort! Continue exploring to strengthen your fraction mastery!'}
              </p>
            </div>

            <button
              onClick={handleCloseModal}
              className="px-8 py-3 rounded-2xl bg-fino-orange hover:bg-fino-darkOrange text-white font-fredoka font-bold text-base shadow-lg transition-all"
            >
              {language === 'ms' ? 'Tutup & Teruskan' : 'Close & Continue'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
