import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';
import { Chapter } from '../data/chapters';
import { StorybookCard } from './UI/StorybookCard';
import { DialoguePanel } from './UI/DialoguePanel';
import { ArrowLeft, ArrowRight, Home, Map, BookOpen, CheckCircle } from 'lucide-react';
import { Chapter1Activity } from './activities/Chapter1Activity';
import { Chapter2Activity } from './activities/Chapter2Activity';
import { Chapter3Activity } from './activities/Chapter3Activity';

interface ChapterViewProps {
  chapter: Chapter;
  onOpenMap: () => void;
}

export const ChapterView: React.FC<ChapterViewProps> = ({ chapter, onOpenMap }) => {
  const { language, t } = useLanguage();
  const { progress, setCurrentChapter, markChapterComplete } = useProgress();

  const isCompleted = progress.completedChapters.includes(chapter.id);

  const handleNext = () => {
    markChapterComplete(chapter.id);
    if (chapter.id < 5) {
      setCurrentChapter(chapter.id + 1);
    } else {
      setCurrentChapter(0);
    }
  };

  const handlePrev = () => {
    if (chapter.id > 1) {
      setCurrentChapter(chapter.id - 1);
    } else {
      setCurrentChapter(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 animate-fadeIn">
      <StorybookCard variant={chapter.themeColor} className="space-y-6">
        {/* Top Chapter Header Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-200/60 pb-4">
          <div className="flex items-center gap-3">
            <span className="font-fredoka text-sm font-extrabold text-white bg-fino-orange px-3.5 py-1 rounded-full shadow-sm">
              {t.chapterShort} {chapter.id}
            </span>
            <h2 className="font-fredoka text-2xl sm:text-3xl font-extrabold text-slate-800">
              {chapter.title[language]}
            </h2>
          </div>

          <button
            onClick={onOpenMap}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white text-slate-700 font-fredoka font-semibold text-xs sm:text-sm border border-slate-300 shadow-sm transition-all"
          >
            <Map className="w-4 h-4 text-fino-teal" />
            <span>{t.adventureMap}</span>
          </button>
        </div>

        {/* Learning Purpose Banner */}
        <div className="bg-white/80 border border-slate-200 rounded-2xl p-4 flex items-start gap-3 shadow-inner">
          <BookOpen className="w-5 h-5 text-fino-darkOrange flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-fredoka text-xs font-bold text-fino-darkOrange uppercase tracking-wider block mb-0.5">
              {language === 'ms' ? 'Tujuan Pembelajaran' : 'Learning Objective'}
            </span>
            <p className="font-quicksand font-semibold text-sm sm:text-base text-slate-700">
              {chapter.learningPurpose[language]}
            </p>
          </div>
        </div>

        {/* Story Dialogue Panel with Fino */}
        <DialoguePanel
          dialogue={chapter.finoDialogue[language]}
          expression={chapter.id === 5 ? 'excited' : 'welcoming'}
          title={`${t.mascotName} - ${t.chapterShort} ${chapter.id}`}
        />

        {/* Chapter Story Narrative */}
        <div className="bg-cream-50/90 border-2 border-peach-200 rounded-2xl p-5 text-slate-800 space-y-3 shadow-sm">
          <h3 className="font-fredoka text-lg font-bold text-fino-darkOrange flex items-center gap-2">
            📖 {language === 'ms' ? 'Kembara Fino' : "Fino's Journey"}
          </h3>
          <p className="font-quicksand font-medium text-base sm:text-lg leading-relaxed text-slate-700">
            {chapter.storyIntro[language]}
          </p>
        </div>

        {/* Active Chapter Interactive Activity */}
        <div className="my-6">
          {chapter.id === 1 && (
            <Chapter1Activity onComplete={() => markChapterComplete(1)} />
          )}
          {chapter.id === 2 && (
            <Chapter2Activity onComplete={() => markChapterComplete(2)} />
          )}
          {chapter.id === 3 && (
            <Chapter3Activity onComplete={() => markChapterComplete(3)} />
          )}
          {chapter.id > 3 && (
            <div className="border-2 border-dashed border-sage-400 bg-sage-50/70 rounded-3xl p-6 text-center space-y-3 my-4">
              <div className="w-12 h-12 rounded-2xl bg-sage-200 text-sage-700 flex items-center justify-center mx-auto shadow-sm">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="font-fredoka text-base sm:text-lg font-bold text-sage-800">
                {t.activitySpaceNotice}
              </h4>
              <p className="text-xs sm:text-sm font-quicksand font-medium text-sage-600 max-w-lg mx-auto">
                {language === 'ms'
                  ? 'Aktiviti interaktif Matematik bagi bab ini bersedia diserapkan dalam tugas akan datang.'
                  : 'Interactive Mathematics activity for this chapter is scheduled for upcoming tasks.'}
              </p>
            </div>
          )}
        </div>

        {/* Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-2 border-slate-200/60">
          <button
            onClick={handlePrev}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-fredoka font-bold text-sm border border-slate-300 shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.prevChapter}</span>
          </button>

          <button
            onClick={() => setCurrentChapter(0)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-cream-100 hover:bg-cream-200 text-slate-700 font-fredoka font-bold text-sm border border-peach-300 transition-all"
          >
            <Home className="w-4 h-4 text-fino-orange" />
            <span className="hidden sm:inline">{t.home}</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-fino-orange hover:bg-fino-darkOrange text-white font-fredoka font-extrabold text-sm sm:text-base shadow-md hover:shadow-lg transition-all"
          >
            <span>{chapter.id === 5 ? t.completed : t.nextChapter}</span>
            {isCompleted ? <CheckCircle className="w-5 h-5 text-emerald-200" /> : <ArrowRight className="w-5 h-5" />}
          </button>
        </div>
      </StorybookCard>
    </div>
  );
};
