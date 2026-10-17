import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';
import { Map, Languages, Home, Sparkles, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onOpenMap: () => void;
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMap, reducedMotion, setReducedMotion }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { progress, setCurrentChapter, resetProgress } = useProgress();

  const totalChapters = 5;
  const completedCount = progress.completedChapters.length;
  const progressPercentage = Math.round((completedCount / totalChapters) * 100);

  const handleReset = () => {
    if (window.confirm(t.confirmReset)) {
      resetProgress();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-cream-50/90 backdrop-blur-md border-b-2 border-sage-200 px-4 py-3 shadow-sm">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand Logo & Home Button */}
        <button
          onClick={() => setCurrentChapter(0)}
          className="flex items-center gap-2 group text-left focus:outline-none focus:ring-2 focus:ring-sage-400 rounded-2xl p-1 transition-all"
        >
          <div className="w-10 h-10 rounded-2xl bg-peach-300 border-2 border-fino-orange flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 text-fino-darkOrange" />
          </div>
          <div>
            <h1 className="font-fredoka text-lg sm:text-xl font-bold text-slate-800 tracking-wide leading-tight group-hover:text-fino-darkOrange transition-colors">
              FractionQuest
            </h1>
            <p className="text-xs font-semibold text-sage-600 hidden sm:block">
              {t.mascotName}
            </p>
          </div>
        </button>

        {/* Progress Tracker (Center/Right) */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-xs font-bold text-slate-600">
              {t.progressTitle}: {completedCount}/{totalChapters} ({progressPercentage}%)
            </span>
            <div className="w-36 h-3.5 bg-sage-100 rounded-full border border-sage-300 overflow-hidden p-0.5 mt-0.5">
              <div
                className="h-full bg-gradient-to-r from-fino-teal to-fino-orange rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Adventure Map Drawer Button */}
            <button
              onClick={onOpenMap}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-sage-200 hover:bg-sage-300 text-slate-800 font-fredoka font-semibold text-xs sm:text-sm border border-sage-400 shadow-sm hover:shadow transition-all"
              title={t.adventureMap}
            >
              <Map className="w-4 h-4 text-sage-600" />
              <span className="hidden sm:inline">{t.adventureMap}</span>
            </button>

            {/* Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-peach-100 hover:bg-peach-200 text-fino-darkOrange font-fredoka font-bold text-xs sm:text-sm border border-peach-300 shadow-sm hover:shadow transition-all"
              title="Tukar Bahasa / Switch Language"
              aria-label="Switch Language"
            >
              <Languages className="w-4 h-4" />
              <span className="uppercase">{language}</span>
            </button>

            {/* Reduced Motion Toggle */}
            <button
              onClick={() => setReducedMotion(!reducedMotion)}
              className={`p-2 rounded-2xl border text-xs font-fredoka font-semibold transition-all ${
                reducedMotion
                  ? 'bg-lavender-200 border-lavender-400 text-lavender-700'
                  : 'bg-cream-200 border-sage-300 text-slate-600 hover:bg-cream-300'
              }`}
              title={t.toggleMotion}
              aria-label={t.toggleMotion}
            >
              ✨
            </button>

            {/* Home Navigation */}
            {progress.currentChapter !== 0 && (
              <button
                onClick={() => setCurrentChapter(0)}
                className="p-2 rounded-2xl bg-cream-200 border border-peach-300 text-slate-700 hover:bg-peach-100 transition-colors"
                title={t.home}
                aria-label={t.home}
              >
                <Home className="w-4 h-4" />
              </button>
            )}

            {/* Reset Progress */}
            <button
              onClick={handleReset}
              className="p-2 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 transition-colors"
              title={t.resetProgress}
              aria-label={t.resetProgress}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
