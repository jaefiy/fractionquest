import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';
import { Chapter } from '../data/chapters';
import { FinoMascot } from './FinoMascot';
import { ArrowLeft, ArrowRight, Home, Map, BookOpen, CheckCircle } from 'lucide-react';
import { Chapter1Activity } from './activities/Chapter1Activity';
import { Chapter2Activity } from './activities/Chapter2Activity';
import { Chapter3Activity } from './activities/Chapter3Activity';
import { Chapter4Activity } from './activities/Chapter4Activity';
import { Chapter5Activity } from './activities/Chapter5Activity';

interface ChapterViewProps {
  chapter: Chapter;
  onOpenMap: () => void;
}

export const ChapterView: React.FC<ChapterViewProps> = ({ chapter, onOpenMap }) => {
  const { language, t } = useLanguage();
  const { progress, setCurrentChapter, markChapterComplete, isActivityComplete } = useProgress();

  const [chapterWarning, setChapterWarning] = useState(false);
  const isCompleted = progress.completedChapters.includes(chapter.id);

  const handleNext = () => {
    if (chapter.id === 1 && !isCompleted) { setChapterWarning(true); return; }
    if (chapter.id === 4 && !(isActivityComplete('ch4_addition') && isActivityComplete('ch4_detective'))) {setChapterWarning(true); return;}
    if (chapter.id === 5 && !(isActivityComplete('ch5_addition') && isActivityComplete('ch5_problems') && isActivityComplete('ch5_detective') && progress.postQuizScore !== null)) {setChapterWarning(true); return;}
    setChapterWarning(false);
    // Check if current chapter's essential activities are done
    if (chapter.id === 4) {
      if (isActivityComplete('ch4_addition') && isActivityComplete('ch4_detective')) {
        markChapterComplete(4);
      }
    } else if (chapter.id === 5) {
      if (isActivityComplete('ch5_addition') && isActivityComplete('ch5_problems') && isActivityComplete('ch5_detective')) {
        markChapterComplete(5);
      }
    } else {
      markChapterComplete(chapter.id);
    }

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

  const settings = [
    { location: '🌿', subtitle: language === 'ms' ? 'Hutan Pecahan Ajaib' : 'Enchanted Fraction Forest', sky: '#c9f1e5', hill: '#79ba93' },
    { location: '🪞', subtitle: language === 'ms' ? 'Taman Cermin Ajaib' : 'Magical Mirror Garden', sky: '#d6eef4', hill: '#88b9ad' },
    { location: '🌉', subtitle: language === 'ms' ? 'Jambatan Pecahan' : 'Fraction Bridge', sky: '#d4ecf2', hill: '#75b5a0' },
    { location: '🔍', subtitle: language === 'ms' ? 'Misteri Halaman Hilang' : 'Mystery of the Missing Pages', sky: '#e9e1f3', hill: '#9caf92' },
    { location: '✨', subtitle: language === 'ms' ? 'Buku Pecahan Dipulihkan' : 'The Restored Fraction Book', sky: '#fbe5bc', hill: '#98be8b' },
  ][chapter.id - 1] || { location: '📖', subtitle: 'FractionQuest', sky: '#d9f1db', hill: '#8ebd91' };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-5 py-5 page-turn-enter font-quicksand">
      <style>{`
        @keyframes fq-ch-sway { 0%,100% { transform: translateY(0) rotate(-1deg) } 50% {transform:translateY(-9px) rotate(2deg)} }
        @keyframes fq-ch-glow { 0%,100% {opacity:.45;transform:scale(.85)} 50% {opacity:1;transform:scale(1.15)} }
        .fq-ch-fino { animation:fq-ch-sway 4.5s ease-in-out infinite; }
        .fq-ch-star { animation:fq-ch-glow 3s ease-in-out infinite; }
        @media (prefers-reduced-motion:reduce) { .fq-ch-fino,.fq-ch-star {animation:none!important} }
      `}</style>
      <div className="overflow-hidden rounded-[2rem] border-[7px] border-[#9d6136] bg-[#fff8e5] shadow-[0_18px_50px_rgba(69,45,29,.22)]">
        <section className="relative isolate overflow-hidden min-h-[435px] sm:min-h-[455px] px-5 sm:px-10 pt-6 pb-10" style={{background:`linear-gradient(180deg, ${settings.sky} 0%, #e9f5d5 77%, #d3e4ad 100%)`}}>
          {/* Scenic shapes are decorative; learning content remains real HTML. */}
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute right-[9%] top-[8%] h-28 w-28 rounded-full bg-[#fff2af] blur-[1px] opacity-90" />
            <div className="absolute -left-[18%] right-[35%] bottom-[-37%] h-[64%] rounded-[50%]" style={{background:settings.hill}} />
            <div className="absolute left-[20%] -right-[12%] bottom-[-44%] h-[72%] rounded-[50%] bg-[#569b78]" />
            <div className="absolute left-[5%] bottom-[12%] w-14 h-32 bg-[#99643b] rounded-b-lg"><div className="absolute -top-16 -left-16 w-44 h-36 rounded-full bg-[#398766]"/></div>
            <div className="absolute right-[5%] bottom-[12%] w-14 h-32 bg-[#99643b] rounded-b-lg"><div className="absolute -top-16 -left-16 w-44 h-36 rounded-full bg-[#4b9874]"/></div>
            <span className="fq-ch-star absolute left-[24%] top-[22%] text-2xl text-[#ffeb9d]">✦</span>
            <span className="fq-ch-star absolute right-[25%] top-[28%] text-3xl text-[#fff6c4]" style={{animationDelay:'1s'}}>✧</span>
            <span className="fq-ch-star absolute right-[14%] bottom-[28%] text-2xl text-[#fff1ad]" style={{animationDelay:'2s'}}>✦</span>
          </div>
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full border border-[#d4aa72] bg-[#fff8e5]/95 px-4 py-2 font-fredoka font-bold text-sm text-[#775034]">📖 {t.chapterShort} {chapter.id} / 5 · {settings.location} {settings.subtitle}</span>
            <button type="button" onClick={onOpenMap} className="inline-flex items-center gap-2 rounded-full bg-white/95 border border-[#c7d5b2] px-4 py-2 text-sm font-fredoka font-bold text-[#315e51] shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#dc7933]">
              <Map className="h-4 w-4"/> {t.adventureMap}
            </button>
          </div>
          <div className="relative z-10 text-center mx-auto max-w-2xl mt-5">
            <p className="font-fredoka tracking-widest uppercase text-[#6b614b] text-xs">{language === 'ms' ? 'Satu lagi halaman pengembaraan Fino' : 'Another page in Fino’s adventure'}</p>
            <h1 className="font-fredoka text-3xl sm:text-5xl font-extrabold text-[#593924] leading-tight mt-2 drop-shadow-[0_2px_0_#fff8e8]">{chapter.title[language]}</h1>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 max-w-3xl mx-auto mt-5">
            <div className="fq-ch-fino shrink-0"><FinoMascot expression={chapter.id === 5 ? 'excited' : 'waving'} size="lg" /></div>
            <div className="relative rounded-[1.7rem] bg-[#fff9eb]/95 border-[3px] border-[#d6a86a] p-5 sm:p-6 shadow-[0_8px_0_rgba(100,71,42,.13)] max-w-md">
              <span className="font-fredoka font-bold text-[#c46d2f] text-sm">✨ {t.mascotName}</span>
              <p className="font-fredoka font-semibold text-[#315e51] text-base sm:text-lg leading-relaxed mt-2">{chapter.finoDialogue[language]}</p>
              <p className="font-quicksand text-[#65533f] text-sm sm:text-base leading-relaxed mt-3">{chapter.storyIntro[language]}</p>
            </div>
          </div>
        </section>
        <div className="relative border-t-[6px] border-[#c58d56] bg-[#fff8e8] px-4 sm:px-9 py-6 space-y-5">
          <div className="flex flex-wrap gap-3 justify-between items-center">
            <div className="font-fredoka text-[#946236] font-bold text-sm">✦ {language === 'ms' ? 'Halaman Cabaran' : 'Challenge Page'} {chapter.id}</div>
            <details className="rounded-2xl bg-white border border-[#ead6a5] text-[#5f503f] max-w-lg">
              <summary className="cursor-pointer px-4 py-2 font-fredoka font-bold text-sm flex items-center gap-2"><BookOpen className="w-4 h-4"/> {language === 'ms' ? 'Tujuan Pembelajaran' : 'Learning Objective'}</summary>
              <p className="px-4 pb-3 text-sm font-semibold">{chapter.learningPurpose[language]}</p>
            </details>
          </div>
          <div className="rounded-[1.6rem] border-[3px] border-[#e0c595] bg-white/80 px-3 py-4 sm:p-6 shadow-inner">
            {chapter.id === 1 && <Chapter1Activity onComplete={() => markChapterComplete(1)} />}
            {chapter.id === 2 && <Chapter2Activity onComplete={() => markChapterComplete(2)} />}
            {chapter.id === 3 && <Chapter3Activity onComplete={() => markChapterComplete(3)} />}
            {chapter.id === 4 && <Chapter4Activity onComplete={() => markChapterComplete(4)} />}
            {chapter.id === 5 && <Chapter5Activity onComplete={() => markChapterComplete(5)} />}
          </div>
          {chapterWarning && <div role="alert" className="rounded-xl bg-amber-50 border-2 border-amber-300 p-4 text-amber-900 font-bold">{language === 'ms' ? 'Selesaikan aktiviti yang diperlukan sebelum ke bab seterusnya. Cuba lagi dengan bantuan Fino!' : 'Complete the required activities before moving to the next chapter. Try again with Fino’s help!'}</div>}
          <nav aria-label={language === 'ms' ? 'Navigasi bab' : 'Chapter navigation'} className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-dashed border-[#dbc69c] pt-5">
            <button type="button" onClick={handlePrev} className="flex gap-2 items-center rounded-2xl px-4 py-3 bg-white border border-[#e2c9a5] text-[#674b35] font-fredoka font-bold text-sm"><ArrowLeft className="w-4 h-4"/>{t.prevChapter}</button>
            <button type="button" onClick={() => setCurrentChapter(0)} aria-label={t.home} className="rounded-2xl px-4 py-3 bg-[#f4ead4] text-[#674b35] border border-[#e2c9a5] font-fredoka font-bold"><Home className="w-5 h-5"/></button>
            <button type="button" onClick={handleNext} className="flex gap-2 items-center rounded-2xl px-5 py-3 bg-[#dc7933] hover:bg-[#be6126] text-white font-fredoka font-bold text-sm shadow-md"><span>{chapter.id === 5 ? t.completed : t.nextChapter}</span>{isCompleted ? <CheckCircle className="w-5 h-5"/> : <ArrowRight className="w-5 h-5"/>}</button>
          </nav>
        </div>
      </div>
    </div>
  );
};
