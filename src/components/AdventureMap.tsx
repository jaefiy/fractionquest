import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';
import { chaptersData } from '../data/chapters';
import { Lock, CheckCircle2, MapPin, X, ArrowRight } from 'lucide-react';

interface AdventureMapProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const { progress, setCurrentChapter, isChapterUnlocked } = useProgress();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-cream-100 rounded-3xl border-4 border-sage-300 shadow-2xl p-6 md:p-8 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-sage-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sage-200 text-sage-700 rounded-2xl border border-sage-300">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-fredoka text-2xl font-bold text-slate-800">{t.adventureMap}</h2>
              <p className="text-xs sm:text-sm font-semibold text-sage-600">
                {t.progressTitle}: {progress.completedChapters.length}/5 {t.completed}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-peach-100 hover:bg-peach-200 text-fino-darkOrange border border-peach-300 transition-colors"
            title="Tutup / Close"
            aria-label="Close Map"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Map Path Nodes */}
        <div className="flex-1 overflow-y-auto py-6 px-2 space-y-4">
          {chaptersData.map((chapter) => {
            const unlocked = isChapterUnlocked(chapter.id);
            const isCompleted = progress.completedChapters.includes(chapter.id);
            const isCurrent = progress.currentChapter === chapter.id;

            return (
              <div
                key={chapter.id}
                className={`relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                  isCurrent
                    ? 'bg-peach-100/90 border-fino-orange shadow-md scale-[1.02]'
                    : unlocked
                    ? 'bg-white border-sage-300 hover:border-sage-400 hover:shadow-sm'
                    : 'bg-slate-100 border-slate-200 opacity-70'
                }`}
              >
                {/* Node Status Badge */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-fredoka font-bold text-lg flex-shrink-0 shadow-sm ${
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : unlocked
                      ? 'bg-fino-orange text-white'
                      : 'bg-slate-300 text-slate-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-7 h-7" />
                  ) : unlocked ? (
                    chapter.id
                  ) : (
                    <Lock className="w-6 h-6" />
                  )}
                </div>

                {/* Chapter Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-fredoka text-xs font-bold text-fino-darkOrange bg-peach-100 px-2.5 py-0.5 rounded-full border border-peach-200">
                      {t.chapter} {chapter.id}
                    </span>
                    {isCurrent && (
                      <span className="font-fredoka text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                        {t.unlocked}
                      </span>
                    )}
                  </div>
                  <h3 className="font-fredoka text-base sm:text-lg font-bold text-slate-800 truncate">
                    {chapter.title[language]}
                  </h3>
                  <p className="text-xs sm:text-sm font-quicksand font-medium text-slate-600 line-clamp-1">
                    {chapter.learningPurpose[language]}
                  </p>
                </div>

                {/* Go Button */}
                {unlocked && (
                  <button
                    onClick={() => {
                      setCurrentChapter(chapter.id);
                      onClose();
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-fino-teal hover:bg-fino-darkTeal text-white font-fredoka font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex-shrink-0"
                  >
                    <span>Teroka</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
