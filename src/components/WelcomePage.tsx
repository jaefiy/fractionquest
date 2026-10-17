import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';
import { FinoMascot } from './FinoMascot';
import { StorybookCard } from './UI/StorybookCard';
import { BookOpen, Compass, Award, ArrowRight } from 'lucide-react';

export const WelcomePage: React.FC = () => {
  const { t } = useLanguage();
  const { progress, setCurrentChapter } = useProgress();

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
    </div>
  );
};
