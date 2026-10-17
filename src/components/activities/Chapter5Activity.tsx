import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useProgress } from '../../context/ProgressContext';
import {
  diagnoseFractionAdditionConversion,
  diagnoseFractionAdditionSum,
  DiagnosisResult,
} from '../../utils/fractionUtils';
import { QuizModal } from '../QuizModal';
import { POST_QUIZ_QUESTIONS } from '../../data/quizData';
import {
  Sparkles,
  BookOpen,
  Search,
  Award,
  CheckCircle2,
  ClipboardCheck,
  ArrowRight,
  ArrowLeft,
  Printer,
  Lock,
  Info,
} from 'lucide-react';

interface Chapter5ActivityProps {
  onComplete?: () => void;
}

export interface WordProblem {
  id: number;
  story: { ms: string; en: string };
  n1: number;
  d1: number;
  n2: number;
  d2: number;
  unit: { ms: string; en: string };
}

export const WORD_PROBLEMS: WordProblem[] = [
  {
    id: 1,
    story: {
      ms: 'Aminah minum 1/4 liter jus oren pada waktu pagi dan 1/2 liter jus oren pada waktu petang dari jag yang sama. Berapakah jumlah isi padu jus oren yang diminum oleh Aminah?',
      en: 'Aminah drank 1/4 liter of orange juice in the morning and 1/2 liter in the afternoon from the same pitcher. What is the total volume of orange juice drank by Aminah?',
    },
    n1: 1,
    d1: 4,
    n2: 1,
    d2: 2,
    unit: { ms: 'liter', en: 'liters' },
  },
  {
    id: 2,
    story: {
      ms: 'Ibu menggunakan 1/3 kg tepung untuk membuat kek pandan dan 1/5 kg tepung untuk membuat biskut. Berapakah jumlah jisim tepung yang digunakan oleh ibu?',
      en: 'Mother used 1/3 kg of flour to bake a pandan cake and 1/5 kg of flour for cookies. What is the total mass of flour used by mother?',
    },
    n1: 1,
    d1: 3,
    n2: 1,
    d2: 5,
    unit: { ms: 'kg', en: 'kg' },
  },
  {
    id: 3,
    story: {
      ms: 'Farid memotong 1/6 m reben merah dan 1/4 m reben biru untuk projek kraf tangan. Berapakah jumlah panjang reben yang dipotong oleh Farid?',
      en: 'Farid cut 1/6 m of red ribbon and 1/4 m of blue ribbon for a handicraft project. What is the total length of ribbon cut by Farid?',
    },
    n1: 1,
    d1: 6,
    n2: 1,
    d2: 4,
    unit: { ms: 'meter', en: 'meters' },
  },
];

type Chapter5Tab = 'ADDITION' | 'PROBLEMS' | 'DETECTIVE' | 'POST_QUIZ' | 'CERTIFICATE';

const SEQUENCE_TABS: Chapter5Tab[] = ['ADDITION', 'PROBLEMS', 'DETECTIVE', 'POST_QUIZ', 'CERTIFICATE'];

export const Chapter5Activity: React.FC<Chapter5ActivityProps> = ({ onComplete }) => {
  const { language, t } = useLanguage();
  const { progress, savePostQuizScore, markActivityComplete, isActivityComplete, isCertificateUnlocked } = useProgress();
  const containerRef = useRef<HTMLDivElement>(null);

  // Active step in sequence
  const [activeTab, setActiveTab] = useState<Chapter5Tab>('ADDITION');

  // Addition challenge state
  const [addN1] = useState<number>(1);
  const [addD1] = useState<number>(4);
  const [addN2] = useState<number>(1);
  const [addD2] = useState<number>(6);
  const [addCD, setAddCD] = useState<string>('');
  const [addEqN1, setAddEqN1] = useState<string>('');
  const [addEqN2, setAddEqN2] = useState<string>('');
  const [addFinalN, setAddFinalN] = useState<string>('');
  const [addFinalD, setAddFinalD] = useState<string>('');
  const [addConvDiag, setAddConvDiag] = useState<DiagnosisResult | null>(null);
  const [addSumDiag, setAddSumDiag] = useState<DiagnosisResult | null>(null);

  // Word problem state
  const [wpIndex, setWpIndex] = useState<number>(0);
  const currentWP = WORD_PROBLEMS[wpIndex];
  const [wpCD, setWpCD] = useState<string>('');
  const [wpEqN1, setWpEqN1] = useState<string>('');
  const [wpEqN2, setWpEqN2] = useState<string>('');
  const [wpFinalN, setWpFinalN] = useState<string>('');
  const [wpFinalD, setWpFinalD] = useState<string>('');
  const [wpConvDiag, setWpConvDiag] = useState<DiagnosisResult | null>(null);
  const [wpSumDiag, setWpSumDiag] = useState<DiagnosisResult | null>(null);

  // Misconception detective state
  const [detFinalN, setDetFinalN] = useState<string>('');
  const [detFinalD, setDetFinalD] = useState<string>('');
  const [detDiag, setDetDiag] = useState<DiagnosisResult | null>(null);

  // Post quiz modal state
  const [isPostQuizOpen, setIsPostQuizOpen] = useState<boolean>(false);

  // Certificate pupil name state
  const [pupilName, setPupilName] = useState<string>('');

  // Guidance warning banner state
  const [warningMsg, setWarningMsg] = useState<string | null>(null);

  const isAddDone = (addSumDiag?.isCorrect) || isActivityComplete('ch5_addition');
  const isWpDone = (wpSumDiag?.isCorrect) || isActivityComplete('ch5_problems');
  const isDetDone = (detDiag?.isCorrect) || isActivityComplete('ch5_detective');
  const isPostQuizDone = progress.postQuizScore !== null || isActivityComplete('ch5_postquiz');

  useEffect(() => {
    if (isAddDone) markActivityComplete('ch5_addition');
  }, [isAddDone]);

  useEffect(() => {
    if (isWpDone) markActivityComplete('ch5_problems');
  }, [isWpDone]);

  useEffect(() => {
    if (isDetDone) markActivityComplete('ch5_detective');
  }, [isDetDone]);

  useEffect(() => {
    if (isPostQuizDone) markActivityComplete('ch5_postquiz');
  }, [isPostQuizDone]);

  const currentTabIdx = SEQUENCE_TABS.indexOf(activeTab);

  const scrollToTop = () => {
    if (containerRef.current && typeof containerRef.current.scrollIntoView === 'function') {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const switchTab = (tab: Chapter5Tab) => {
    setWarningMsg(null);
    setActiveTab(tab);
    scrollToTop();
  };

  const handlePrevTab = () => {
    setWarningMsg(null);
    if (currentTabIdx > 0) {
      switchTab(SEQUENCE_TABS[currentTabIdx - 1]);
    }
  };

  const handleNextTab = () => {
    setWarningMsg(null);

    // Validate completion requirements before allowing advancing
    if (activeTab === 'ADDITION' && !isAddDone) {
      setWarningMsg(
        language === 'ms'
          ? 'Sila selesaikan cabaran penambahan 1/4 + 1/6 terlebih dahulu sebelum meneruskan!'
          : 'Please complete the 1/4 + 1/6 addition challenge first before proceeding!'
      );
      return;
    }

    if (activeTab === 'PROBLEMS' && !isWpDone) {
      setWarningMsg(
        language === 'ms'
          ? 'Sila selesaikan sekurang-kurangnya satu soalan masalah kehidupan sebenar!'
          : 'Please solve at least one real-life word problem!'
      );
      return;
    }

    if (activeTab === 'DETECTIVE' && !isDetDone) {
      setWarningMsg(
        language === 'ms'
          ? 'Sila betulkan mitos pecahan dalam aktiviti Detektif Mitos terlebih dahulu!'
          : 'Please correct the fraction myth in Misconception Detective first!'
      );
      return;
    }

    if (activeTab === 'POST_QUIZ' && !isPostQuizDone) {
      setWarningMsg(
        language === 'ms'
          ? 'Sila jawab dan hantar Pasca-Kuiz terlebih dahulu sebelum melihat Sijil Pencapaian!'
          : 'Please answer and submit the Post-Quiz first before viewing the Completion Certificate!'
      );
      return;
    }

    if (currentTabIdx < SEQUENCE_TABS.length - 1) {
      switchTab(SEQUENCE_TABS[currentTabIdx + 1]);
    }
  };

  // Handle Addition challenge conversion check
  const handleCheckAddConv = (e: React.FormEvent) => {
    e.preventDefault();
    const cd = parseInt(addCD, 10);
    const n1 = parseInt(addEqN1, 10);
    const n2 = parseInt(addEqN2, 10);

    const diag = diagnoseFractionAdditionConversion(addN1, addD1, addN2, addD2, n1, cd, n2, cd);
    setAddConvDiag(diag);
  };

  const handleCheckAddSum = (e: React.FormEvent) => {
    e.preventDefault();
    const fn = parseInt(addFinalN, 10);
    const fd = parseInt(addFinalD, 10);

    const diag = diagnoseFractionAdditionSum(addN1, addD1, addN2, addD2, fn, fd);
    setAddSumDiag(diag);
    if (diag.isCorrect) {
      markActivityComplete('ch5_addition');
    }
  };

  // Handle Word problem conversion & sum check
  const handleCheckWpConv = (e: React.FormEvent) => {
    e.preventDefault();
    const cd = parseInt(wpCD, 10);
    const n1 = parseInt(wpEqN1, 10);
    const n2 = parseInt(wpEqN2, 10);

    const diag = diagnoseFractionAdditionConversion(currentWP.n1, currentWP.d1, currentWP.n2, currentWP.d2, n1, cd, n2, cd);
    setWpConvDiag(diag);
  };

  const handleCheckWpSum = (e: React.FormEvent) => {
    e.preventDefault();
    const fn = parseInt(wpFinalN, 10);
    const fd = parseInt(wpFinalD, 10);

    const diag = diagnoseFractionAdditionSum(currentWP.n1, currentWP.d1, currentWP.n2, currentWP.d2, fn, fd);
    setWpSumDiag(diag);
    if (diag.isCorrect) {
      markActivityComplete('ch5_problems');
    }
  };

  // Handle Misconception detective check
  const handleCheckDetective = (e: React.FormEvent) => {
    e.preventDefault();
    const fn = parseInt(detFinalN, 10);
    const fd = parseInt(detFinalD, 10);

    // Misconception target: 1/4 + 1/6 = 5/12
    const diag = diagnoseFractionAdditionSum(1, 4, 1, 6, fn, fd);
    setDetDiag(diag);
    if (diag.isCorrect) {
      markActivityComplete('ch5_detective');
      if (onComplete) onComplete();
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const isCertUnlocked = isCertificateUnlocked();
  const currentDateFormatted = new Date().toLocaleDateString(language === 'ms' ? 'ms-MY' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div ref={containerRef} className="rounded-[2rem] border-[5px] border-[#9a663e] bg-[#fff7e7] p-4 sm:p-6 shadow-[0_18px_38px_rgba(86,63,30,0.18)] space-y-7">
      {/* Final magical book scene - compact so the shared chapter illustration stays visible. */}
      <section className="relative isolate overflow-hidden rounded-[1.75rem] border-[4px] border-[#9a663e] bg-gradient-to-br from-[#fff1c9] via-[#fff8e8] to-[#dbecd8] shadow-[0_8px_0_#ead5b1] px-5 py-6 sm:px-8 sm:py-8">
        <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-12 h-44 w-44 rounded-full bg-[#fff0a6]/80 blur-xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-14 -left-16 h-32 w-72 rounded-[50%] bg-[#a6d6ab]/50" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-5 md:gap-8">
          <div className="relative shrink-0" aria-hidden="true">
            <div className="absolute inset-0 rounded-full bg-amber-200/60 blur-xl" />
            <div className="relative h-28 w-28 sm:h-36 sm:w-36 rounded-[1.5rem] rotate-[-6deg] border-[5px] border-[#af7947] bg-[#fff9e8] shadow-[7px_9px_0_#d6bd91] flex items-center justify-center">
              <BookOpen className="h-16 w-16 sm:h-20 sm:w-20 text-[#a2673d]" strokeWidth={1.5} />
              <Sparkles className="absolute -right-4 -top-4 h-9 w-9 text-amber-500 animate-pulse" />
            </div>
          </div>
          <div className="min-w-0 flex-1 text-center md:text-left space-y-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ddb77d] bg-[#fffaf0] px-4 py-1 font-fredoka text-xs font-bold text-[#87542d]">
              <BookOpen className="h-4 w-4" /> {language === 'ms' ? '📖 Halaman Akhir · Buku Pecahan Ajaib' : '📖 Final Page · The Magical Fraction Book'}
            </span>
            <h3 className="font-fredoka text-2xl sm:text-3xl font-extrabold text-[#663d29]">
              {language === 'ms' ? 'Pulihkan Buku Pecahan Ajaib!' : 'Restore the Magical Fraction Book!'}
            </h3>
            <p className="font-quicksand font-semibold text-sm sm:text-base leading-relaxed text-[#3e6657]">
              {language === 'ms'
                ? 'Fino telah menemui semua halaman yang hilang! Selesaikan lima misi terakhir untuk mengembalikan keajaiban buku ini.'
                : 'Fino has found the missing pages! Complete five final quests to restore the book’s magic.'}
            </p>
          </div>
        </div>
        <div className="relative z-10 mt-6 grid grid-cols-5 gap-2" aria-label={language === 'ms' ? 'Kemajuan lima misi' : 'Five-quest progress'}>
          {SEQUENCE_TABS.map((tab, index) => {
            const finished = [isAddDone, isWpDone, isDetDone, isPostQuizDone, isCertUnlocked][index];
            const current = activeTab === tab;
            return (
              <div key={tab} className={`min-w-0 rounded-xl border-2 px-1 py-2 text-center shadow-sm transition-colors ${finished ? 'border-[#5a9b78] bg-[#e0f4df]' : current ? 'border-[#d49a44] bg-[#fff4cc]' : 'border-[#e6d5b4] bg-[#fffaf0]/85'}`}>
                <div className="text-base sm:text-xl" aria-hidden="true">{finished ? '✨' : current ? '📖' : '📜'}</div>
                <div className="font-fredoka text-[10px] sm:text-xs font-bold text-[#69452e]">{index + 1} {finished ? '✓' : ''}</div>
              </div>
            );
          })}
        </div>
      </section>
      {/* Keep the original navigation and all five interactive learning tasks below. */}
      <div className="rounded-[1.5rem] border-2 border-[#ecd7ae] bg-[#fffaf1] p-3 sm:p-4 space-y-3">
        {/* Top Activity Tab Shortcuts */}
        <div className="flex flex-wrap justify-center bg-[#f3e5c8] p-2 rounded-2xl border border-[#dfc399] gap-2">
          <button
            onClick={() => switchTab('ADDITION')}
            className={`px-3 py-1.5 rounded-xl font-fredoka font-bold text-xs transition-all flex items-center gap-1 ${
              activeTab === 'ADDITION'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>1. {language === 'ms' ? 'Penambahan' : 'Addition'}</span>
            {isAddDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />}
          </button>
          <button
            onClick={() => switchTab('PROBLEMS')}
            className={`px-3 py-1.5 rounded-xl font-fredoka font-bold text-xs transition-all flex items-center gap-1 ${
              activeTab === 'PROBLEMS'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>2. {language === 'ms' ? 'Soalan' : 'Problems'}</span>
            {isWpDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />}
          </button>
          <button
            onClick={() => switchTab('DETECTIVE')}
            className={`px-3 py-1.5 rounded-xl font-fredoka font-bold text-xs transition-all flex items-center gap-1 ${
              activeTab === 'DETECTIVE'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>3. {language === 'ms' ? 'Detektif' : 'Detective'}</span>
            {isDetDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />}
          </button>
          <button
            onClick={() => switchTab('POST_QUIZ')}
            className={`px-3 py-1.5 rounded-xl font-fredoka font-bold text-xs transition-all flex items-center gap-1 ${
              activeTab === 'POST_QUIZ'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>4. {language === 'ms' ? 'Pasca-Kuiz' : 'Post-Quiz'}</span>
            {isPostQuizDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />}
          </button>
          <button
            onClick={() => switchTab('CERTIFICATE')}
            className={`px-3 py-1.5 rounded-xl font-fredoka font-bold text-xs transition-all flex items-center gap-1 ${
              activeTab === 'CERTIFICATE'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>5. {language === 'ms' ? 'Sijil' : 'Certificate'}</span>
            {isCertUnlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />}
          </button>
        </div>
      </div>

      {/* Warning callout if user tries to advance prematurely */}
      {warningMsg && (
        <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl flex items-start gap-3 animate-fadeIn shadow-sm">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="font-quicksand font-bold text-xs sm:text-sm text-amber-900 leading-relaxed">
            {warningMsg}
          </p>
        </div>
      )}

      {/* SECTION 1: FRACTION ADDITION CHALLENGES WITH VARIED DENOMINATORS */}
      {activeTab === 'ADDITION' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="bg-[#fff0cb] p-4 rounded-2xl border-2 border-[#e7c28c]">
            <h4 className="font-fredoka text-base font-bold text-amber-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              {language === 'ms' ? 'Cabaran Penambahan Variasi Penyebut: 1/4 + 1/6' : 'Varied Denominator Addition Challenge: 1/4 + 1/6'}
            </h4>
          </div>

          <form onSubmit={handleCheckAddConv} className="bg-white p-4 rounded-2xl border border-amber-200 space-y-4 text-center">
            <p className="font-fredoka text-sm font-bold text-slate-800">
              {language === 'ms' ? 'Langkah 1: Bina Pecahan Setara' : 'Step 1: Build Equivalent Fractions'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xl font-fredoka font-extrabold text-slate-800">
              <div className="flex items-center gap-2">
                <span>1/4</span>
                <span>➜</span>
                <div className="flex flex-col items-center">
                  <input
                    type="number"
                    value={addEqN1}
                    onChange={(e) => setAddEqN1(e.target.value)}
                    placeholder="?"
                    className="w-12 h-9 text-center bg-amber-100 border-2 border-amber-400 rounded-lg font-bold text-amber-900 text-base focus:outline-none"
                  />
                  <span className="border-b-2 border-slate-800 w-12 my-0.5"></span>
                  <input
                    type="number"
                    value={addCD}
                    onChange={(e) => setAddCD(e.target.value)}
                    placeholder="?"
                    className="w-12 h-9 text-center bg-amber-100 border-2 border-amber-400 rounded-lg font-bold text-amber-900 text-base focus:outline-none"
                  />
                </div>
              </div>

              <span>+</span>

              <div className="flex items-center gap-2">
                <span>1/6</span>
                <span>➜</span>
                <div className="flex flex-col items-center">
                  <input
                    type="number"
                    value={addEqN2}
                    onChange={(e) => setAddEqN2(e.target.value)}
                    placeholder="?"
                    className="w-12 h-9 text-center bg-amber-100 border-2 border-amber-400 rounded-lg font-bold text-amber-900 text-base focus:outline-none"
                  />
                  <span className="border-b-2 border-slate-800 w-12 my-0.5"></span>
                  <input
                    type="number"
                    value={addCD}
                    onChange={(e) => setAddCD(e.target.value)}
                    placeholder="?"
                    className="w-12 h-9 text-center bg-amber-100 border-2 border-amber-400 rounded-lg font-bold text-amber-900 text-base focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {!addConvDiag?.isCorrect && (
              <button
                type="submit"
                disabled={!addCD || !addEqN1 || !addEqN2}
                className="px-6 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-white font-fredoka font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
              >
                {language === 'ms' ? 'Semak Penukaran' : 'Check Conversion'}
              </button>
            )}
          </form>

          {addConvDiag && (
            <div className={`p-4 rounded-xl border-2 text-xs sm:text-sm font-quicksand font-semibold ${addConvDiag.isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'}`}>
              {addConvDiag.feedback[language]}
            </div>
          )}

          {addConvDiag?.isCorrect && (
            <form onSubmit={handleCheckAddSum} className="bg-white p-4 rounded-2xl border border-amber-200 space-y-4 text-center animate-fadeIn">
              <p className="font-fredoka text-sm font-bold text-slate-800">
                {language === 'ms' ? 'Langkah 2: Kira Hasil Tambah Akhir' : 'Step 2: Enter Final Sum'}
              </p>

              <div className="flex items-center justify-center gap-3 text-2xl font-fredoka font-extrabold text-slate-800">
                <span>{addEqN1}/{addCD} + {addEqN2}/{addCD} =</span>
                <div className="flex flex-col items-center">
                  <input
                    type="number"
                    value={addFinalN}
                    onChange={(e) => setAddFinalN(e.target.value)}
                    placeholder="?"
                    className="w-14 h-11 text-center bg-amber-100 border-2 border-amber-400 rounded-xl font-bold text-amber-900 text-xl focus:outline-none"
                  />
                  <span className="border-b-2 border-slate-800 w-14 my-0.5"></span>
                  <input
                    type="number"
                    value={addFinalD}
                    onChange={(e) => setAddFinalD(e.target.value)}
                    placeholder="?"
                    className="w-14 h-11 text-center bg-amber-100 border-2 border-amber-400 rounded-xl font-bold text-amber-900 text-xl focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!addFinalN || !addFinalD}
                className="px-6 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-white font-fredoka font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
              >
                {language === 'ms' ? 'Semak Jawapan' : 'Check Answer'}
              </button>
            </form>
          )}

          {addSumDiag && (
            <div className={`p-4 rounded-xl border-2 text-xs sm:text-sm font-quicksand font-semibold ${addSumDiag.isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'}`}>
              {addSumDiag.feedback[language]}
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: REAL-LIFE WORD PROBLEMS */}
      {activeTab === 'PROBLEMS' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="bg-[#eaf3f1] p-4 rounded-2xl border-2 border-[#9bcabd] flex flex-wrap gap-3 items-center justify-between">
            <h4 className="font-fredoka text-base font-bold text-sky-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sky-600" />
              {language === 'ms' ? 'Soalan Kehidupan Sebenar' : 'Real-Life Word Problems'} ({wpIndex + 1}/{WORD_PROBLEMS.length})
            </h4>
            <div className="flex gap-2">
              {WORD_PROBLEMS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setWpIndex(idx);
                    setWpCD('');
                    setWpEqN1('');
                    setWpEqN2('');
                    setWpFinalN('');
                    setWpFinalD('');
                    setWpConvDiag(null);
                    setWpSumDiag(null);
                  }}
                  className={`w-7 h-7 rounded-lg font-fredoka font-bold text-xs transition-all ${
                    wpIndex === idx ? 'bg-sky-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-sky-200 space-y-4">
            <p className="font-quicksand font-bold text-slate-800 text-sm sm:text-base leading-relaxed bg-sky-50/50 p-4 rounded-xl border border-sky-100">
              📖 {currentWP.story[language]}
            </p>

            <form onSubmit={handleCheckWpConv} className="space-y-3 text-center">
              <p className="font-fredoka text-xs sm:text-sm font-bold text-slate-700">
                {language === 'ms' ? 'Langkah 1: Penukaran Pecahan Setara' : 'Step 1: Equivalent Fraction Conversion'}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 text-lg font-fredoka font-bold text-slate-800">
                <span>{currentWP.n1}/{currentWP.d1} ➜</span>
                <input
                  type="number"
                  value={wpEqN1}
                  onChange={(e) => setWpEqN1(e.target.value)}
                  placeholder="?"
                  className="w-12 h-9 text-center bg-sky-50 border-2 border-sky-300 rounded-lg font-bold"
                />
                <span>/</span>
                <input
                  type="number"
                  value={wpCD}
                  onChange={(e) => setWpCD(e.target.value)}
                  placeholder="?"
                  className="w-12 h-9 text-center bg-sky-50 border-2 border-sky-300 rounded-lg font-bold"
                />

                <span className="mx-2">+</span>

                <span>{currentWP.n2}/{currentWP.d2} ➜</span>
                <input
                  type="number"
                  value={wpEqN2}
                  onChange={(e) => setWpEqN2(e.target.value)}
                  placeholder="?"
                  className="w-12 h-9 text-center bg-sky-50 border-2 border-sky-300 rounded-lg font-bold"
                />
                <span>/</span>
                <input
                  type="number"
                  value={wpCD}
                  onChange={(e) => setWpCD(e.target.value)}
                  placeholder="?"
                  className="w-12 h-9 text-center bg-sky-50 border-2 border-sky-300 rounded-lg font-bold"
                />
              </div>

              {!wpConvDiag?.isCorrect && (
                <button
                  type="submit"
                  disabled={!wpCD || !wpEqN1 || !wpEqN2}
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 text-white font-fredoka font-bold text-xs rounded-xl shadow-sm transition-all"
                >
                  {language === 'ms' ? 'Semak Penukaran' : 'Check Conversion'}
                </button>
              )}
            </form>

            {wpConvDiag && (
              <div className={`p-3 rounded-xl border text-xs font-quicksand font-semibold ${wpConvDiag.isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'}`}>
                {wpConvDiag.feedback[language]}
              </div>
            )}

            {wpConvDiag?.isCorrect && (
              <form onSubmit={handleCheckWpSum} className="space-y-3 text-center border-t pt-3">
                <p className="font-fredoka text-xs sm:text-sm font-bold text-slate-700">
                  {language === 'ms' ? `Langkah 2: Tulis Jawapan Akhir (${currentWP.unit[language]})` : `Step 2: Enter Final Answer (${currentWP.unit[language]})`}
                </p>

                <div className="flex items-center justify-center gap-2 text-xl font-fredoka font-extrabold text-slate-800">
                  <input
                    type="number"
                    value={wpFinalN}
                    onChange={(e) => setWpFinalN(e.target.value)}
                    placeholder="?"
                    className="w-12 h-10 text-center bg-emerald-50 border-2 border-emerald-400 rounded-lg font-bold text-emerald-900"
                  />
                  <span>/</span>
                  <input
                    type="number"
                    value={wpFinalD}
                    onChange={(e) => setWpFinalD(e.target.value)}
                    placeholder="?"
                    className="w-12 h-10 text-center bg-emerald-50 border-2 border-emerald-400 rounded-lg font-bold text-emerald-900"
                  />
                  <span className="text-sm font-bold text-slate-600">{currentWP.unit[language]}</span>
                </div>

                <button
                  type="submit"
                  disabled={!wpFinalN || !wpFinalD}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-fredoka font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all"
                >
                  {language === 'ms' ? 'Semak Soalan Kehidupan' : 'Check Word Problem Answer'}
                </button>
              </form>
            )}

            {wpSumDiag && (
              <div className={`p-3 rounded-xl border text-xs font-quicksand font-semibold ${wpSumDiag.isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'}`}>
                {wpSumDiag.feedback[language]}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 3: MISCONCEPTION DETECTIVE QUESTIONS */}
      {activeTab === 'DETECTIVE' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="bg-[#604276] text-white p-5 rounded-2xl border-[3px] border-[#be9dcf] space-y-2">
            <h4 className="font-fredoka text-lg font-bold text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-amber-300" />
              {language === 'ms' ? 'Detektif Mitos Bab 5: 1/4 + 1/6 = 2/10 ?' : 'Chapter 5 Misconception Detective: 1/4 + 1/6 = 2/10 ?'}
            </h4>
            <p className="font-quicksand text-xs sm:text-sm font-medium text-purple-200">
              {language === 'ms'
                ? 'Betulkan salah faham penambahan berasingan ini untuk melengkapkan kembara!'
                : 'Correct this separate addition misconception to complete the quest!'}
            </p>
          </div>

          <form onSubmit={handleCheckDetective} className="bg-white p-5 rounded-2xl border border-purple-200 space-y-4 text-center">
            <p className="font-fredoka text-sm font-bold text-slate-800">
              {language === 'ms' ? 'Bina jawapan yang betul bagi 1/4 + 1/6:' : 'Construct the correct sum for 1/4 + 1/6:'}
            </p>

            <div className="flex items-center justify-center gap-3 text-2xl font-fredoka font-extrabold text-slate-800">
              <span>1/4 + 1/6 =</span>
              <div className="flex flex-col items-center">
                <input
                  type="number"
                  value={detFinalN}
                  onChange={(e) => setDetFinalN(e.target.value)}
                  placeholder="?"
                  className="w-14 h-11 text-center bg-purple-100 border-2 border-purple-400 rounded-xl font-bold text-purple-900 text-xl focus:outline-none"
                />
                <span className="border-b-2 border-slate-800 w-14 my-0.5"></span>
                <input
                  type="number"
                  value={detFinalD}
                  onChange={(e) => setDetFinalD(e.target.value)}
                  placeholder="?"
                  className="w-14 h-11 text-center bg-purple-100 border-2 border-purple-400 rounded-xl font-bold text-purple-900 text-xl focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!detFinalN || !detFinalD}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white font-fredoka font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
            >
              {language === 'ms' ? 'Sahkan Jawapan Detektif' : 'Confirm Detective Answer'}
            </button>
          </form>

          {detDiag && (
            <div className={`p-4 rounded-xl border-2 text-xs sm:text-sm font-quicksand font-semibold ${detDiag.isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'}`}>
              {detDiag.feedback[language]}
            </div>
          )}
        </div>
      )}

      {/* SECTION 4: POST-QUIZ STEP IN SEQUENCE */}
      {activeTab === 'POST_QUIZ' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="bg-[#fff2d3] p-5 rounded-3xl border-[3px] border-[#e2b871] text-center space-y-4">
            <div className="w-16 h-16 bg-amber-100 border-2 border-amber-400 text-amber-800 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <ClipboardCheck className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="font-fredoka text-xl font-bold text-amber-900">
                {language === 'ms' ? 'Pasca-Kuiz Minda Pecahan (5 Soalan)' : 'Fraction Mind Post-Quiz (5 Questions)'}
              </h4>
              <p className="font-quicksand font-semibold text-xs sm:text-sm text-slate-700 max-w-md mx-auto">
                {progress.postQuizScore !== null
                  ? language === 'ms'
                    ? `Skor Pasca-Kuiz Anda: ${progress.postQuizScore}/5`
                    : `Your Post-Quiz Score: ${progress.postQuizScore}/5`
                  : language === 'ms'
                  ? 'Uji kemahiran yang telah anda pelajari sepanjang kembara bersama Fino!'
                  : 'Test the skills you have acquired throughout your adventure with Fino!'}
              </p>
            </div>

            <button
              onClick={() => setIsPostQuizOpen(true)}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-fredoka font-bold text-sm sm:text-base rounded-2xl shadow-md transition-all inline-flex items-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{progress.postQuizScore !== null ? (language === 'ms' ? 'Semak / Mula Semula Pasca-Kuiz' : 'Review / Retake Post-Quiz') : (language === 'ms' ? 'Mula Pasca-Kuiz Sekarang' : 'Start Post-Quiz Now')}</span>
            </button>
          </div>
        </div>
      )}

      {/* SECTION 5: COMPLETION CERTIFICATE */}
      {activeTab === 'CERTIFICATE' && (
        <div className="space-y-6 animate-fadeIn">
          {!isCertUnlocked ? (
            /* Locked Certificate Panel */
            <div className="bg-amber-50/90 border-4 border-dashed border-amber-300 rounded-3xl p-6 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 bg-amber-200 border-2 border-amber-400 text-amber-800 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4 className="font-fredoka text-xl sm:text-2xl font-extrabold text-amber-950">
                  {language === 'ms' ? 'Sijil Penyelesaian Kembara Masih Terkunci' : 'Quest Completion Certificate is Locked'}
                </h4>
                <p className="font-quicksand font-semibold text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed">
                  {language === 'ms'
                    ? 'Untuk membuka Sijil Penyelesaian Kembara, anda perlu melengkapkan semua aktiviti pembelajaran dalam Bab 1 hingga Bab 5 dan menghantar Pasca-Kuiz.'
                    : 'To unlock the Quest Completion Certificate, you must complete all learning activities in Chapters 1 to 5 and submit the Post-Quiz.'}
                </p>
              </div>

              {/* Requirement Checklist */}
              <div className="bg-white p-4 rounded-2xl border border-amber-300 max-w-md mx-auto text-left space-y-2.5 text-xs sm:text-sm font-fredoka font-bold text-slate-800">
                <div className="flex items-center justify-between">
                  <span>1. {language === 'ms' ? 'Aktiviti Bab 1–3' : 'Chapter 1–3 Activities'}</span>
                  {[1, 2, 3].every((ch) => progress.completedChapters.includes(ch)) ? (
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> {language === 'ms' ? 'Selesai' : 'Done'}
                    </span>
                  ) : (
                    <span className="text-amber-600 font-semibold">{language === 'ms' ? 'Belum Selesai' : 'Incomplete'}</span>
                  )}
                </div>

                <div className="flex items-center justify-between border-t pt-2">
                  <span>2. {language === 'ms' ? 'Penambahan & Detektif Bab 4' : 'Chapter 4 Addition & Detective'}</span>
                  {isActivityComplete('ch4_addition') && isActivityComplete('ch4_detective') ? (
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> {language === 'ms' ? 'Selesai' : 'Done'}
                    </span>
                  ) : (
                    <span className="text-amber-600 font-semibold">{language === 'ms' ? 'Belum Selesai' : 'Incomplete'}</span>
                  )}
                </div>

                <div className="flex items-center justify-between border-t pt-2">
                  <span>3. {language === 'ms' ? 'Penambahan & Soalan Bab 5' : 'Chapter 5 Addition & Problems'}</span>
                  {isAddDone && isWpDone && isDetDone ? (
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> {language === 'ms' ? 'Selesai' : 'Done'}
                    </span>
                  ) : (
                    <span className="text-amber-600 font-semibold">{language === 'ms' ? 'Belum Selesai' : 'Incomplete'}</span>
                  )}
                </div>

                <div className="flex items-center justify-between border-t pt-2">
                  <span>4. {language === 'ms' ? 'Penghantaran Pasca-Kuiz' : 'Post-Quiz Submitted'}</span>
                  {isPostQuizDone ? (
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> {language === 'ms' ? 'Selesai' : 'Done'}
                    </span>
                  ) : (
                    <span className="text-amber-600 font-semibold">{language === 'ms' ? 'Belum Dihantar' : 'Not Submitted'}</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Unlocked Certificate Frame */
            <div className="space-y-4">
              <div className="bg-cream-50 border-8 border-double border-amber-400 rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-2xl relative overflow-hidden print:border-4 print:shadow-none print:bg-white print:p-4">
                <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full font-fredoka font-bold text-xs sm:text-sm shadow-sm">
                  <Award className="w-5 h-5 text-amber-600" />
                  <span>{language === 'ms' ? 'SIJIL PENYELESAIAN KEMBARA' : 'QUEST COMPLETION CERTIFICATE'}</span>
                </div>

                <h3 className="font-fredoka text-2xl sm:text-4xl font-extrabold text-slate-800 tracking-wide leading-tight">
                  {language === 'ms' ? 'SIJIL PENYELESAIAN KEMBARA FRACTIONQUEST' : 'FRACTIONQUEST COMPLETION CERTIFICATE'}
                </h3>

                <p className="font-quicksand font-bold text-xs sm:text-sm text-slate-600">
                  {language === 'ms'
                    ? 'Dengan ini dianugerahkan kepada pengembara bijak:'
                    : 'This certificate is proudly awarded to:'}
                </p>

                <div className="max-w-xs mx-auto">
                  <input
                    type="text"
                    value={pupilName}
                    onChange={(e) => setPupilName(e.target.value)}
                    placeholder={language === 'ms' ? 'Masukkan Nama Anda' : 'Enter Your Name'}
                    className="w-full text-center p-3 rounded-2xl border-2 border-amber-300 font-fredoka font-extrabold text-xl sm:text-3xl text-amber-950 bg-white focus:outline-none shadow-inner"
                  />
                </div>

                <p className="font-quicksand font-semibold text-xs sm:text-base text-slate-700 max-w-xl mx-auto leading-relaxed">
                  {language === 'ms'
                    ? 'Kerana berjaya menyempurnakan semua bab dan tugasan kembara penambahan pecahan wajar penyebut berbeza KSSR Tahun 4!'
                    : 'For successfully completing all adventure chapters and tasks for proper fraction addition with different denominators in Year 4 KSSR!'}
                </p>

                {/* Distinction Notice */}
                <div className="bg-amber-100/70 border border-amber-300 p-3 rounded-2xl max-w-lg mx-auto text-[11px] sm:text-xs font-quicksand font-bold text-amber-900">
                  ℹ️ {language === 'ms'
                    ? 'Nota: Sijil ini mengesahkan penyelesaian kembara pembelajaran interaktif storybook FractionQuest.'
                    : 'Note: This certificate verifies completion of the interactive FractionQuest storybook learning adventure.'}
                </div>

                {/* Scores & Date Summary */}
                <div className="bg-white/90 p-4 rounded-2xl border-2 border-amber-300 max-w-md mx-auto grid grid-cols-3 gap-2 text-xs font-fredoka font-bold text-slate-800 shadow-sm">
                  <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                    <span className="block text-[10px] text-slate-500">{language === 'ms' ? 'Pra-Kuiz' : 'Pre-Quiz'}</span>
                    <span className="text-base text-amber-700">{progress.preQuizScore !== null ? `${progress.preQuizScore}/5` : '-'}</span>
                  </div>
                  <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                    <span className="block text-[10px] text-slate-500">{language === 'ms' ? 'Pasca-Kuiz' : 'Post-Quiz'}</span>
                    <span className="text-base text-emerald-700">{progress.postQuizScore !== null ? `${progress.postQuizScore}/5` : '-'}</span>
                  </div>
                  <div className="bg-purple-50 p-2.5 rounded-xl border border-purple-200">
                    <span className="block text-[10px] text-slate-500">{language === 'ms' ? 'Tarikh' : 'Date'}</span>
                    <span className="text-[10px] text-purple-900 font-extrabold">{currentDateFormatted}</span>
                  </div>
                </div>

                <div className="pt-2 text-xs font-quicksand font-semibold text-slate-500">
                  {language === 'ms'
                    ? 'Disahkan oleh Fino Si Musang • FractionQuest KSSR Tahun 4'
                    : 'Verified by Fino the Explorer Fox • FractionQuest Year 4 KSSR'}
                </div>
              </div>

              {/* Working Print / Save PDF Button */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={handlePrintCertificate}
                  className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-fredoka font-extrabold text-base rounded-2xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Printer className="w-5 h-5" />
                  <span>{language === 'ms' ? 'Cetak / Simpan PDF' : 'Print / Save as PDF'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Prominent Bottom Activity Navigation */}
      <div className="flex items-center justify-between pt-4 border-t-2 border-slate-200">
        <button
          onClick={handlePrevTab}
          disabled={currentTabIdx === 0}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-amber-900 font-fredoka font-bold text-sm border-2 border-amber-300 shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-amber-600" />
          <span>{t.prevActivity}</span>
        </button>

        <button
          onClick={handleNextTab}
          disabled={currentTabIdx === SEQUENCE_TABS.length - 1}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-fredoka font-extrabold text-sm sm:text-base shadow-md transition-all"
        >
          <span>{t.nextActivity}</span>
          <ArrowRight className="w-5 h-5 text-amber-100" />
        </button>
      </div>

      {/* Post-Quiz Modal */}
      <QuizModal
        isOpen={isPostQuizOpen}
        onClose={() => setIsPostQuizOpen(false)}
        title={language === 'ms' ? 'Pasca-Kuiz Minda Pecahan (Tahun 4 KSSR)' : 'Fraction Mind Post-Quiz (Year 4 KSSR)'}
        questions={POST_QUIZ_QUESTIONS}
        onQuizComplete={(score) => {
          savePostQuizScore(score);
          markActivityComplete('ch5_postquiz');
        }}
      />
    </div>
  );
};
