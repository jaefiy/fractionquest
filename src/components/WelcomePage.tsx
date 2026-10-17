import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';
import { FinoMascot } from './FinoMascot';
import { QuizModal } from './QuizModal';
import { PRE_QUIZ_QUESTIONS } from '../data/quizData';
import { ArrowRight, BookOpen, CheckCircle2, ChevronDown, ClipboardCheck, Sparkles, Star } from 'lucide-react';

/** Visual-only homepage refresh: existing quiz, translation and progress logic remain intact. */
export const WelcomePage: React.FC = () => {
  const { language, t } = useLanguage();
  const { progress, setCurrentChapter, savePreQuizScore } = useProgress();
  const [isPreQuizOpen, setIsPreQuizOpen] = useState(false);
  const isMalay = language === 'ms';

  const handleStart = () => {
    setCurrentChapter(progress.currentChapter > 0 ? progress.currentChapter : 1);
  };

  return (
    <div className="fq-welcome mx-auto w-full max-w-6xl px-3 py-5 sm:px-6 sm:py-8">
      <style>{`
        @keyframes fq-float { 0%,100% {transform:translateY(0) rotate(-1deg)} 50% {transform:translateY(-13px) rotate(1deg)} }
        @keyframes fq-drift { 0%,100% {transform:translate(0,0);opacity:.6} 50% {transform:translate(8px,-13px);opacity:1} }
        @keyframes fq-reveal { from {opacity:0;transform:translateY(16px)} to {opacity:1;transform:translateY(0)} }
        .fq-welcome .fq-fino {animation:fq-float 4.5s ease-in-out infinite}
        .fq-welcome .fq-spark {animation:fq-drift 3.8s ease-in-out infinite}
        .fq-welcome .fq-scene {animation:fq-reveal .7s ease-out both}
        .fq-welcome .fq-page {box-shadow: inset 7px 0 15px rgba(113,75,35,.09),0 18px 42px rgba(83,58,25,.17)}
        @media (prefers-reduced-motion:reduce) {
          .fq-welcome .fq-fino,.fq-welcome .fq-spark,.fq-welcome .fq-scene {animation:none!important}
        }
      `}</style>

      <div className="fq-scene relative overflow-hidden rounded-[2rem] border-[7px] border-[#9d6136] bg-[#fff3d7] shadow-[0_20px_0_#cba16d,0_32px_60px_rgba(65,45,29,.24)] sm:rounded-[3rem] sm:border-[10px]">
        {/* Illustrated woodland — created as vectors so no external image downloads are needed. */}
        <div className="relative isolate min-h-[560px] overflow-hidden bg-gradient-to-b from-[#b9e9e1] via-[#e3f3cc] to-[#c9e5a2] sm:min-h-[610px]">
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1000 650" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <radialGradient id="fq-sun"><stop stopColor="#fffcd0"/><stop offset="1" stopColor="#ffe7aa" stopOpacity="0"/></radialGradient>
              <linearGradient id="fq-hills" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#9cd39b"/><stop offset="1" stopColor="#609a75"/></linearGradient>
            </defs>
            <circle cx="778" cy="137" r="160" fill="url(#fq-sun)"/>
            <circle cx="785" cy="120" r="57" fill="#fff5ba" opacity=".93"/>
            <path d="M0 370 Q175 240 375 362 T1000 348 V650 H0Z" fill="#aed8b2"/>
            <path d="M0 440 Q260 310 515 432 T1000 388 V650 H0Z" fill="url(#fq-hills)"/>
            <path d="M0 575 Q250 510 525 570 T1000 515 V650 H0Z" fill="#4f956e" opacity=".8"/>
            <path d="M412 650 Q466 529 600 464 Q645 442 708 417" stroke="#f7df9e" strokeWidth="92" fill="none" strokeLinecap="round" opacity=".9"/>
            <path d="M412 650 Q466 529 600 464 Q645 442 708 417" stroke="#fff2c4" strokeWidth="63" fill="none" strokeLinecap="round" opacity=".9"/>
            {([45,145,890,972] as number[]).map((x, i) => (
              <g key={x} transform={`translate(${x},${i % 2 ? 260 : 215})`}>
                <path d="M-10 225 V65 H22 V225Z" fill="#8b6741"/>
                <circle cx="6" cy="44" r="97" fill={i % 2 ? '#4f9679' : '#4b866b'}/>
                <circle cx="-37" cy="88" r="65" fill="#72b28a"/>
                <circle cx="50" cy="82" r="74" fill="#62a67e"/>
              </g>
            ))}
            <g fill="#fff8dd" opacity=".88">
              <circle cx="155" cy="139" r="4"/><circle cx="222" cy="190" r="3"/>
              <circle cx="840" cy="262" r="4"/><circle cx="682" cy="85" r="3"/>
              <circle cx="317" cy="102" r="4"/><circle cx="740" cy="346" r="3"/>
            </g>
            <g transform="translate(718 342) rotate(-10)">
              <rect width="126" height="148" x="-63" y="-74" rx="13" fill="#916044"/>
              <rect width="108" height="132" x="-54" y="-66" rx="10" fill="#ffe9aa"/>
              <path d="M0 -65 V64" stroke="#c79551" strokeWidth="4"/>
              <path d="M-35 -20 H-14 M15 -20 H36 M-35 0 H-14 M15 0 H36" stroke="#dfb66f" strokeWidth="5" strokeLinecap="round"/>
              <path d="M0 -44 L12 -22 0 -27 -12 -22Z" fill="#edae4d"/>
            </g>
          </svg>

          {/* Cover title — overlaid on scenery, not surrounded by a generic dashboard card. */}
          <div className="relative z-10 mx-auto max-w-3xl px-5 pt-9 text-center sm:pt-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e8c17d] bg-[#fff9e9]/90 px-4 py-1.5 font-fredoka text-xs font-bold tracking-wide text-[#81552d] shadow-sm sm:text-sm">
              <BookOpen size={17}/> {isMalay ? 'SEBUAH BUKU CERITA MATEMATIK INTERAKTIF' : 'AN INTERACTIVE MATHEMATICS STORYBOOK'}
            </span>
            <div className="mt-5 font-fredoka text-2xl font-bold text-[#496b5a] sm:text-3xl">FractionQuest</div>
            <h1 className="mt-1 font-fredoka text-4xl font-extrabold leading-[1.1] tracking-tight text-[#59391f] drop-shadow-[0_2px_0_#fff3d7] sm:text-6xl">
              {isMalay ? <>Pengembaraan <span className="text-[#da6b34]">Fino</span><br/>di Dunia Pecahan</> : <>Fino’s <span className="text-[#da6b34]">Fraction</span><br/>Adventure</>}
            </h1>
            <p className="mx-auto mt-4 max-w-xl font-quicksand text-base font-bold leading-relaxed text-[#466857] sm:text-lg">
              {isMalay ? 'Lima halaman ajaib telah hilang! Bolehkah kamu membantu Fino menemukannya semula?' : 'Five magical pages have gone missing! Can you help Fino find them all?'}
            </p>
          </div>

          <div className="pointer-events-none absolute bottom-4 left-[4%] z-10 text-[#fff0a4] fq-spark"><Star size={32} fill="currentColor"/></div>
          <div className="pointer-events-none absolute right-[16%] top-[43%] z-10 text-[#fff7cc] fq-spark" style={{animationDelay:'1s'}}><Sparkles size={29}/></div>
          <div className="pointer-events-none absolute left-[16%] top-[37%] z-10 text-[#fff7cc] fq-spark" style={{animationDelay:'2s'}}><Star size={19} fill="currentColor"/></div>

          <div className="relative z-10 mx-auto mt-7 flex max-w-3xl flex-col items-center justify-center gap-1 px-5 pb-7 sm:mt-6 sm:flex-row sm:gap-5 sm:pb-10">
            <div className="fq-fino relative shrink-0 drop-shadow-[0_12px_7px_rgba(59,73,45,.25)]">
              <FinoMascot expression="waving" size="xl"/>
            </div>
            <div className="fq-page relative max-w-md rounded-[1.8rem] border-[3px] border-[#cfa374] bg-[#fff9e8]/95 px-6 py-5 text-left sm:rotate-[-2deg] sm:px-8 sm:py-7">
              <div className="absolute -left-3 top-10 hidden h-5 w-5 rotate-45 border-b-[3px] border-l-[3px] border-[#cfa374] bg-[#fff9e8] sm:block"/>
              <div className="mb-1 flex items-center gap-2 font-fredoka text-lg font-bold text-[#b96531]"><Sparkles size={19}/>{t.mascotName}</div>
              <h2 className="font-fredoka text-xl font-bold text-[#3f654e] sm:text-2xl">{isMalay ? 'Mari selamatkan Buku Pecahan Ajaib!' : 'Let’s save the Magical Fraction Book!'}</h2>
              <p className="mt-2 font-quicksand text-sm font-semibold leading-relaxed text-[#5f594d] sm:text-base">{t.welcomeIntro}</p>
            </div>
          </div>
        </div>

        {/* Actions appear as the next page of the book, not administrative dashboard blocks. */}
        <div className="relative border-t-[7px] border-[#cfa374] bg-[linear-gradient(105deg,#f8e8c3_0%,#fffaf0_48%,#f9ebce_100%)] px-5 py-8 sm:px-10">
          <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-px bg-[#d7ba91] sm:block" />
          <div className="relative grid items-center gap-7 sm:grid-cols-2 sm:gap-9">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#af7138]"><ClipboardCheck size={18}/>{isMalay ? 'Cabaran sebelum pengembaraan' : 'Before your adventure'}</div>
              <h3 className="mt-2 font-fredoka text-2xl font-bold text-[#5b4129]">{isMalay ? 'Uji Minda Pecahan' : 'Fraction Warm-up'}</h3>
              <p className="mt-1 font-quicksand text-sm font-semibold text-[#6d6558]">{progress.preQuizScore !== null
                ? (isMalay ? `Skor pra-kuiz: ${progress.preQuizScore}/5` : `Pre-quiz score: ${progress.preQuizScore}/5`)
                : (isMalay ? 'Jawab 5 soalan ringkas untuk mengetahui pengetahuan awal kamu.' : 'Try 5 quick questions to discover what you already know.')}</p>
              <button type="button" onClick={() => setIsPreQuizOpen(true)} className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#dca94e] bg-[#ffefc8] px-5 py-3 font-fredoka font-bold text-[#79501e] transition hover:-translate-y-0.5 hover:bg-[#ffe3a1] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#87bbaa] sm:w-auto">
                {progress.preQuizScore !== null ? <CheckCircle2 size={20}/> : <ClipboardCheck size={20}/>}
                {progress.preQuizScore !== null ? (isMalay ? 'Lihat / Ulang Pra-Kuiz' : 'Review / Retake Pre-Quiz') : (isMalay ? 'Cuba Pra-Kuiz (5 Soalan)' : 'Try Pre-Quiz (5 Questions)')}
              </button>
            </div>
            <div className="sm:pl-5">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#af7138]"><Star size={18}/>{isMalay ? 'Halaman pertama menanti' : 'Your first page awaits'}</div>
              <h3 className="mt-2 font-fredoka text-2xl font-bold text-[#5b4129]">{isMalay ? 'Sedia untuk bermula?' : 'Ready to begin?'}</h3>
              <p className="mt-1 font-quicksand text-sm font-semibold text-[#6d6558]">{isMalay ? 'Ikuti Fino dan kumpulkan kelima-lima halaman ajaib!' : 'Follow Fino and collect all five magical pages!'}</p>
              <button type="button" onClick={handleStart} className="group mt-4 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl border-b-[5px] border-[#a75325] bg-[#e87537] px-6 py-3 font-fredoka text-lg font-extrabold text-white shadow-[0_8px_18px_rgba(176,82,30,.2)] transition hover:-translate-y-1 hover:bg-[#d9642d] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#87bbaa] sm:w-auto">
                {progress.currentChapter > 0 ? t.continueAdventure : t.startAdventure}<ArrowRight size={22} className="transition-transform group-hover:translate-x-1"/>
              </button>
            </div>
          </div>
          <details className="group mt-7 rounded-xl border border-[#e5cfaa] bg-white/60 px-4 py-3 font-quicksand text-sm text-[#665844]">
            <summary className="flex cursor-pointer list-none items-center gap-2 font-bold"><BookOpen size={16}/>{isMalay ? 'Maklumat pembelajaran untuk guru' : 'Learning information for teachers'}<ChevronDown size={16} className="ml-auto transition-transform group-open:rotate-180"/></summary>
            <p className="mt-3 font-bold">{t.kssrStandard}</p>
            <p className="mt-1">{t.learningFocus}</p>
          </details>
        </div>
      </div>

      <QuizModal
        isOpen={isPreQuizOpen}
        onClose={() => setIsPreQuizOpen(false)}
        title={isMalay ? 'Pra-Kuiz Minda Pecahan (Tahun 4 KSSR)' : 'Fraction Mind Pre-Quiz (Year 4 KSSR)'}
        questions={PRE_QUIZ_QUESTIONS}
        onQuizComplete={(score) => savePreQuizScore(score)}
      />
    </div>
  );
};
