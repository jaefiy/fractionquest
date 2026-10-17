import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';
import { FinoMascot } from './FinoMascot';
import { StorybookCard } from './UI/StorybookCard';
import { QuizModal } from './QuizModal';
import { PRE_QUIZ_QUESTIONS } from '../data/quizData';
import { BookOpen, Compass, Award, ArrowRight, ClipboardCheck, CheckCircle2 } from 'lucide-react';

export const WelcomePage: React.FC = () => {
  const { language, t } = useLanguage();
  const { progress, setCurrentChapter, savePreQuizScore } = useProgress();
  const [isPreQuizOpen, setIsPreQuizOpen] = useState(false);

  const handleStart = () => {
    // If pupil has progress, jump to highest unlocked or current, else chapter 1
    const targetChapter = progress.currentChapter > 0 ? progress.currentChapter : 1;
    setCurrentChapter(targetChapter);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 animate-fadeIn">
      <StorybookCard variant="cream" className="text-center overflow-hidden">
        {/* Decorative Top Banner */}
        <div className="bg-gradient-to-r from-peach-200 via-cream-200 to-sage-200 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 p-6 mb-6 border-b-2 border-peach-300">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-peach-300 shadow-sm mb-3">
            <BookOpen className="w-4 h-4 text-fino-darkOrange" />
            <span className="font-fredoka text-xs sm:text-sm font-semibold text-fino-darkOrange">
              {t.subtitle}
            </span>
          </div>

          <h1 className="font-fredoka text-3xl sm:text-5xl font-extrabold text-slate-800 tracking-wide mb-2 leading-tight">
            {t.appTitle}
          </h1>
        </div>

        {/* Pre-Quiz Callout Card */}
        <div className="bg-amber-50/90 border-2 border-amber-300 rounded-3xl p-4 sm:p-5 mb-6 text-left flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-200 text-amber-800 flex items-center justify-center flex-shrink-0 shadow-inner">
              <ClipboardCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-fredoka text-base sm:text-lg font-bold text-amber-900">
                {language === 'ms' ? 'Pra-Kuiz Minda Pecahan' : 'Fraction Mind Pre-Quiz'}
              </h3>
              <p className="font-quicksand font-semibold text-xs sm:text-sm text-slate-700">
                {progress.preQuizScore !== null
                  ? language === 'ms'
                    ? `Skor Pra-Kuiz Anda: ${progress.preQuizScore}/5`
                    : `Your Pre-Quiz Score: ${progress.preQuizScore}/5`
                  : language === 'ms'
                  ? 'Uji tahap kefahaman awal anda sebelum memulakan kembara!'
                  : 'Test your initial understanding before starting the adventure!'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsPreQuizOpen(true)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-fredoka font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
          >
            {progress.preQuizScore !== null ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-amber-100" />
                <span>{language === 'ms' ? 'Semak / Mula Semula Pra-Kuiz' : 'Review / Retake Pre-Quiz'}</span>
              </>
            ) : (
              <span>{language === 'ms' ? 'Mula Pra-Kuiz (5 Soalan)' : 'Start Pre-Quiz (5 Questions)'}</span>
            )}
          </button>
        </div>

        {/* Mascot & Introduction Frame */}
        <div className="flex flex-col md:flex-row items-center gap-8 my-6">
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-peach-300/30 rounded-full blur-xl transform scale-110" />
              <FinoMascot expression="waving" size="lg" className="relative z-10" />
            </div>
            <span className="font-fredoka text-base font-bold text-fino-darkOrange bg-peach-100 px-4 py-1 rounded-full border border-peach-300 mt-2 shadow-sm">
              {t.mascotName}
            </span>
          </div>

          <div className="flex-1 text-left space-y-4">
            <div className="bg-white/80 border-2 border-sage-200 rounded-3xl p-5 sm:p-6 shadow-sm">
              <h2 className="font-fredoka text-2xl font-bold text-sage-600 mb-2 flex items-center gap-2">
                <Compass className="w-6 h-6 text-fino-teal" />
                {t.welcomeHeading}
              </h2>
              <p className="text-base sm:text-lg font-quicksand font-medium text-slate-700 leading-relaxed">
                {t.welcomeIntro}
              </p>
            </div>

            {/* KSSR Learning Focus Panel */}
            <div className="bg-skyblue-50/80 border-2 border-skyblue-200 rounded-2xl p-4 text-xs sm:text-sm font-quicksand font-semibold text-slate-700 flex items-start gap-3">
              <Award className="w-5 h-5 text-skyblue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-800 font-bold font-fredoka mb-1">{t.kssrStandard}</p>
                <p className="text-slate-600 font-medium">{t.learningFocus}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-4 flex flex-col items-center gap-3">
          <button
            onClick={handleStart}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-fino-orange to-fino-darkOrange text-white font-fredoka font-extrabold text-xl sm:text-2xl rounded-3xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 active:translate-y-0"
          >
            <span>{progress.currentChapter > 0 ? t.continueAdventure : t.startAdventure}</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </StorybookCard>

      {/* Pre-Quiz Modal */}
      <QuizModal
        isOpen={isPreQuizOpen}
        onClose={() => setIsPreQuizOpen(false)}
        title={language === 'ms' ? 'Pra-Kuiz Minda Pecahan (Tahun 4 KSSR)' : 'Fraction Mind Pre-Quiz (Year 4 KSSR)'}
        questions={PRE_QUIZ_QUESTIONS}
        onQuizComplete={(score) => savePreQuizScore(score)}
      />
    </div>
  );
};
