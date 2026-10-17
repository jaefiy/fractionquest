import React, { useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  diagnoseFractionAdditionConversion,
  diagnoseFractionAdditionSum,
  DiagnosisResult,
} from '../../utils/fractionUtils';
import {
  Sparkles,
  Search,
  Layers,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

interface Chapter4ActivityProps {
  onComplete?: () => void;
}

export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'CHALLENGING';

export interface AdditionQuestion {
  id: string;
  level: DifficultyLevel;
  n1: number;
  d1: number;
  n2: number;
  d2: number;
}

export const CHAPTER4_QUESTIONS: AdditionQuestion[] = [
  // Easy Level
  { id: 'e1', level: 'EASY', n1: 1, d1: 2, n2: 1, d2: 4 },
  { id: 'e2', level: 'EASY', n1: 1, d1: 3, n2: 1, d2: 6 },
  { id: 'e3', level: 'EASY', n1: 2, d1: 5, n2: 1, d2: 10 },

  // Medium Level
  { id: 'm1', level: 'MEDIUM', n1: 1, d1: 3, n2: 1, d2: 5 },
  { id: 'm2', level: 'MEDIUM', n1: 1, d1: 4, n2: 1, d2: 3 },
  { id: 'm3', level: 'MEDIUM', n1: 2, d1: 7, n2: 1, d2: 3 },

  // Challenging Level
  { id: 'c1', level: 'CHALLENGING', n1: 1, d1: 4, n2: 1, d2: 6 },
  { id: 'c2', level: 'CHALLENGING', n1: 2, d1: 5, n2: 1, d2: 6 },
  { id: 'c3', level: 'CHALLENGING', n1: 3, d1: 8, n2: 1, d2: 6 },
];

export const Chapter4Activity: React.FC<Chapter4ActivityProps> = ({ onComplete }) => {
  const { language, t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // Mode: Main Addition Explorer OR Misconception Detective
  const [activeTab, setActiveTab] = useState<'ADDITION' | 'DETECTIVE'>('ADDITION');

  // Level & Question State
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel>('EASY');
  const [qIndex, setQIndex] = useState<number>(0);

  const levelQuestions = CHAPTER4_QUESTIONS.filter((q) => q.level === selectedLevel);
  const currentQ = levelQuestions[qIndex] || levelQuestions[0];

  // Pedagogical sequence step: 1. Explore, 2. Predict, 3. Attempt, 4. Progressive Feedback, 5. Discover
  const [seqStep, setSeqStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // User Prediction state
  const [prediction, setPrediction] = useState<string | null>(null);

  // User input states for conversion and sum
  const [userCD, setUserCD] = useState<string>('');
  const [userN1, setUserN1] = useState<string>('');
  const [userN2, setUserN2] = useState<string>('');
  const [finalN, setFinalN] = useState<string>('');
  const [finalD, setFinalD] = useState<string>('');

  // Diagnostic feedback states
  const [conversionDiagnosis, setConversionDiagnosis] = useState<DiagnosisResult | null>(null);
  const [sumDiagnosis, setSumDiagnosis] = useState<DiagnosisResult | null>(null);
  const [qCompleted, setQCompleted] = useState<boolean>(false);

  // Misconception Detective State
  const [detectiveStep, setDetectiveStep] = useState<1 | 2 | 3 | 4>(1);
  const [identifiedError, setIdentifiedError] = useState<string>('');
  const [guidedReasonAnswer, setGuidedReasonAnswer] = useState<string>('');
  const [detFinalN, setDetFinalN] = useState<string>('');
  const [detFinalD, setDetFinalD] = useState<string>('');
  const [detDiagnosis, setDetDiagnosis] = useState<DiagnosisResult | null>(null);
  const [detCompleted, setDetCompleted] = useState<boolean>(false);

  const scrollToTop = () => {
    if (containerRef.current && typeof containerRef.current.scrollIntoView === 'function') {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const switchTab = (tab: 'ADDITION' | 'DETECTIVE') => {
    setActiveTab(tab);
    scrollToTop();
  };

  // Reset inputs on question switch
  const handleLevelChange = (level: DifficultyLevel) => {
    setSelectedLevel(level);
    setQIndex(0);
    resetQuestionState();
  };

  const handleNextQuestion = () => {
    if (qIndex < levelQuestions.length - 1) {
      setQIndex((prev) => prev + 1);
      resetQuestionState();
    }
  };

  const resetQuestionState = () => {
    setSeqStep(1);
    setPrediction(null);
    setUserCD('');
    setUserN1('');
    setUserN2('');
    setFinalN('');
    setFinalD('');
    setConversionDiagnosis(null);
    setSumDiagnosis(null);
    setQCompleted(false);
  };

  // Check conversion step
  const handleCheckConversion = (e: React.FormEvent) => {
    e.preventDefault();
    const cd = parseInt(userCD, 10);
    const n1 = parseInt(userN1, 10);
    const n2 = parseInt(userN2, 10);

    const diag = diagnoseFractionAdditionConversion(
      currentQ.n1,
      currentQ.d1,
      currentQ.n2,
      currentQ.d2,
      n1,
      cd,
      n2,
      cd
    );

    setConversionDiagnosis(diag);
    if (diag.isCorrect) {
      setSeqStep(4);
    }
  };

  // Check final sum step
  const handleCheckSum = (e: React.FormEvent) => {
    e.preventDefault();
    const fn = parseInt(finalN, 10);
    const fd = parseInt(finalD, 10);

    const diag = diagnoseFractionAdditionSum(
      currentQ.n1,
      currentQ.d1,
      currentQ.n2,
      currentQ.d2,
      fn,
      fd
    );

    setSumDiagnosis(diag);
    if (diag.isCorrect) {
      setQCompleted(true);
      setSeqStep(5);
    }
  };

  // Check Misconception Detective final correction
  const handleCheckDetectiveCorrection = (e: React.FormEvent) => {
    e.preventDefault();
    const fn = parseInt(detFinalN, 10);
    const fd = parseInt(detFinalD, 10);

    const diag = diagnoseFractionAdditionSum(1, 3, 1, 5, fn, fd);
    setDetDiagnosis(diag);
    if (diag.isCorrect) {
      setDetCompleted(true);
      if (onComplete) onComplete();
    }
  };

  return (
    <div ref={containerRef} className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-lavender-300 shadow-md space-y-6">
      {/* Activity Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-lavender-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold font-fredoka text-2xl shadow-inner">
            4
          </div>
          <div>
            <h3 className="font-fredoka text-xl sm:text-2xl font-extrabold text-slate-800">
              {language === 'ms' ? 'Istana Penambahan Pecahan' : 'Castle of Fraction Addition'}
            </h3>
            <p className="font-quicksand text-xs sm:text-sm font-semibold text-slate-500">
              {language === 'ms'
                ? 'Terokai, samakan penyebut, bina pecahan setara, dan tambah pengangka!'
                : 'Explore, match denominators, construct equivalent fractions, and add numerators!'}
            </p>
          </div>
        </div>

        {/* Tab Switcher (Optional Shortcuts) */}
        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => switchTab('ADDITION')}
            className={`px-4 py-2 rounded-xl font-fredoka font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 ${
              activeTab === 'ADDITION'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{language === 'ms' ? 'Cabaran Penambahan' : 'Addition Challenge'}</span>
          </button>
          <button
            onClick={() => switchTab('DETECTIVE')}
            className={`px-4 py-2 rounded-xl font-fredoka font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 ${
              activeTab === 'DETECTIVE'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>{language === 'ms' ? 'Detektif Mitos' : 'Misconception Detective'}</span>
          </button>
        </div>
      </div>

      {/* TAB 1: ADDITION CHALLENGE */}
      {activeTab === 'ADDITION' && (
        <div className="space-y-6">
          {/* Difficulty Level Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-purple-50/70 p-3 rounded-2xl border border-purple-200">
            <span className="font-fredoka text-xs sm:text-sm font-bold text-purple-900">
              {language === 'ms' ? 'Pilih Aras Kesukaran:' : 'Select Difficulty Level:'}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleLevelChange('EASY')}
                className={`px-3.5 py-1.5 rounded-xl font-fredoka font-bold text-xs sm:text-sm transition-all ${
                  selectedLevel === 'EASY'
                    ? 'bg-emerald-500 text-white shadow-sm scale-105'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {language === 'ms' ? 'Mudah' : 'Easy'}
              </button>
              <button
                onClick={() => handleLevelChange('MEDIUM')}
                className={`px-3.5 py-1.5 rounded-xl font-fredoka font-bold text-xs sm:text-sm transition-all ${
                  selectedLevel === 'MEDIUM'
                    ? 'bg-amber-500 text-white shadow-sm scale-105'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {language === 'ms' ? 'Sederhana' : 'Medium'}
              </button>
              <button
                onClick={() => handleLevelChange('CHALLENGING')}
                className={`px-3.5 py-1.5 rounded-xl font-fredoka font-bold text-xs sm:text-sm transition-all ${
                  selectedLevel === 'CHALLENGING'
                    ? 'bg-purple-600 text-white shadow-sm scale-105'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {language === 'ms' ? 'Mencabar' : 'Challenging'}
              </button>
            </div>
          </div>

          {/* Sequence Step Tracker Indicator */}
          <div className="grid grid-cols-5 gap-1 text-center font-fredoka text-[10px] sm:text-xs font-bold">
            <button
              onClick={() => setSeqStep(1)}
              className={`p-2 rounded-xl border transition-all ${
                seqStep === 1
                  ? 'bg-purple-600 text-white border-purple-700 shadow-sm'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              1. {language === 'ms' ? 'Terokai' : 'Explore'}
            </button>
            <button
              onClick={() => setSeqStep(2)}
              className={`p-2 rounded-xl border transition-all ${
                seqStep === 2
                  ? 'bg-purple-600 text-white border-purple-700 shadow-sm'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              2. {language === 'ms' ? 'Ramal' : 'Predict'}
            </button>
            <button
              onClick={() => setSeqStep(3)}
              className={`p-2 rounded-xl border transition-all ${
                seqStep === 3
                  ? 'bg-purple-600 text-white border-purple-700 shadow-sm'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              3. {language === 'ms' ? 'Tukar' : 'Convert'}
            </button>
            <button
              onClick={() => setSeqStep(4)}
              className={`p-2 rounded-xl border transition-all ${
                seqStep === 4
                  ? 'bg-purple-600 text-white border-purple-700 shadow-sm'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              4. {language === 'ms' ? 'Tambah' : 'Add'}
            </button>
            <button
              onClick={() => setSeqStep(5)}
              className={`p-2 rounded-xl border transition-all ${
                seqStep === 5
                  ? 'bg-purple-600 text-white border-purple-700 shadow-sm'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              5. {language === 'ms' ? 'Penemuan' : 'Discover'}
            </button>
          </div>

          {/* SECTION 1: EXPLORE - INTERACTIVE FRACTION BARS MATCHING ACTIVE QUESTION */}
          <div className="space-y-4 bg-purple-50/50 p-4 sm:p-5 rounded-2xl border border-purple-200">
            <div className="flex items-center justify-between">
              <h4 className="font-fredoka text-base font-bold text-purple-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-600" />
                {language === 'ms' ? '1. Terokai Jalur Pecahan Soalan' : '1. Explore Question Fraction Bars'} ({qIndex + 1}/{levelQuestions.length})
              </h4>
            </div>

            <div className="bg-white p-4 rounded-xl border border-purple-200 space-y-4">
              <div className="text-center">
                <span className="font-fredoka text-xl font-extrabold text-purple-950">
                  {currentQ.n1}/{currentQ.d1} + {currentQ.n2}/{currentQ.d2} = ?
                </span>
              </div>

              {/* Fraction Bar 1 */}
              <div className="space-y-1">
                <span className="font-fredoka text-xs font-bold text-slate-700">
                  {language === 'ms' ? 'Pecahan Pertama:' : 'First Fraction:'} {currentQ.n1}/{currentQ.d1}
                </span>
                <div className="w-full h-10 bg-slate-100 border-2 border-slate-300 rounded-xl overflow-hidden flex">
                  {Array.from({ length: currentQ.d1 }).map((_, i) => (
                    <div
                      key={i}
                      style={{ width: `${100 / currentQ.d1}%` }}
                      className={`h-full border-r border-slate-300/80 last:border-r-0 flex items-center justify-center text-xs font-bold ${
                        i < currentQ.n1 ? 'bg-purple-400 text-purple-950' : 'bg-slate-50 text-slate-400'
                      }`}
                    >
                      1/{currentQ.d1}
                    </div>
                  ))}
                </div>
              </div>

              {/* Fraction Bar 2 */}
              <div className="space-y-1">
                <span className="font-fredoka text-xs font-bold text-slate-700">
                  {language === 'ms' ? 'Pecahan Kedua:' : 'Second Fraction:'} {currentQ.n2}/{currentQ.d2}
                </span>
                <div className="w-full h-10 bg-slate-100 border-2 border-slate-300 rounded-xl overflow-hidden flex">
                  {Array.from({ length: currentQ.d2 }).map((_, i) => (
                    <div
                      key={i}
                      style={{ width: `${100 / currentQ.d2}%` }}
                      className={`h-full border-r border-slate-300/80 last:border-r-0 flex items-center justify-center text-xs font-bold ${
                        i < currentQ.n2 ? 'bg-teal-400 text-teal-950' : 'bg-slate-50 text-slate-400'
                      }`}
                    >
                      1/{currentQ.d2}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: PREDICT */}
          {seqStep >= 2 && (
            <div className="space-y-4 bg-sky-50/60 p-4 rounded-2xl border border-sky-200 animate-fadeIn">
              <h4 className="font-fredoka text-base font-bold text-sky-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-sky-600" />
                {language === 'ms' ? '2. Ramalkan Sebelum Menambah' : '2. Predict Before Adding'}
              </h4>

              <p className="font-quicksand font-semibold text-xs sm:text-sm text-slate-700">
                {language === 'ms'
                  ? `Bolehkah kita terus menambah ${currentQ.n1} + ${currentQ.n2} tanpa menyamakan penyebut ${currentQ.d1} dan ${currentQ.d2}?`
                  : `Can we directly add ${currentQ.n1} + ${currentQ.n2} without matching denominators ${currentQ.d1} and ${currentQ.d2}?`}
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setPrediction('NO')}
                  className={`px-4 py-2.5 rounded-xl font-fredoka font-bold text-xs sm:text-sm transition-all ${
                    prediction === 'NO'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {language === 'ms' ? 'TIDAK BOLEH - Saiz bahagian berbeza!' : 'NO - Piece sizes are different!'}
                </button>
                <button
                  type="button"
                  onClick={() => setPrediction('YES')}
                  className={`px-4 py-2.5 rounded-xl font-fredoka font-bold text-xs sm:text-sm transition-all ${
                    prediction === 'YES'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {language === 'ms' ? 'BOLEH - Tambah terus sahaja' : 'YES - Just add directly'}
                </button>
              </div>

              {prediction && (
                <div className="bg-white p-3 rounded-xl border border-sky-200 text-xs sm:text-sm font-quicksand font-semibold text-slate-700">
                  {prediction === 'NO' ? (
                    <span className="text-emerald-800 font-bold">
                      {language === 'ms'
                        ? 'Tepat sekali! Penyebut yang berbeza bermakna saiz pembahagian tidak sama. Kita mesti menyamakan penyebut dahulu!'
                        : 'Spot on! Different denominators mean different division sizes. We must make denominators equal first!'}
                    </span>
                  ) : (
                    <span className="text-rose-800 font-bold">
                      {language === 'ms'
                        ? 'Fino bersuara: "Awas! Jika saiz kepingan tidak sama, hasil tambah tidak akan tepat. Mari samakan penyebut dahulu!"'
                        : 'Fino says: "Watch out! If piece sizes differ, the sum won\'t be accurate. Let\'s make denominators equal first!"'}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* SECTION 3 & 4: ATTEMPT (CONSTRUCT EQUIVALENT FRACTIONS & CALCULATE FINAL SUM) */}
          {seqStep >= 3 && (
            <div className="space-y-5 bg-amber-50/60 p-4 sm:p-5 rounded-2xl border border-amber-200 animate-fadeIn">
              <h4 className="font-fredoka text-base font-bold text-amber-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                {language === 'ms' ? '3 & 4. Bina Pecahan Setara & Kira Hasil Tambah' : '3 & 4. Construct Equivalent Fractions & Calculate Sum'}
              </h4>

              {/* Step 3: Conversion inputs */}
              <form onSubmit={handleCheckConversion} className="bg-white p-4 rounded-xl border border-amber-200 space-y-4 text-center">
                <p className="font-fredoka text-sm font-bold text-slate-800">
                  {language === 'ms' ? 'Langkah A: Pilih Penyebut Sepunya dan Bina Pecahan Setara' : 'Step A: Select Common Denominator and Build Equivalent Fractions'}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 text-xl font-fredoka font-extrabold text-slate-800">
                  {/* First fraction conversion */}
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-center">
                      <span>{currentQ.n1}</span>
                      <span className="border-b-2 border-slate-700 w-6 my-0.5"></span>
                      <span>{currentQ.d1}</span>
                    </div>
                    <span>➜</span>
                    <div className="flex flex-col items-center">
                      <input
                        type="number"
                        value={userN1}
                        onChange={(e) => setUserN1(e.target.value)}
                        placeholder="?"
                        disabled={conversionDiagnosis?.isCorrect}
                        className="w-12 h-9 text-center bg-purple-100 border-2 border-purple-400 rounded-lg font-fredoka font-bold text-purple-900 text-base focus:outline-none"
                      />
                      <span className="border-b-2 border-slate-800 w-12 my-0.5"></span>
                      <input
                        type="number"
                        value={userCD}
                        onChange={(e) => {
                          setUserCD(e.target.value);
                        }}
                        placeholder="?"
                        disabled={conversionDiagnosis?.isCorrect}
                        className="w-12 h-9 text-center bg-purple-100 border-2 border-purple-400 rounded-lg font-fredoka font-bold text-purple-900 text-base focus:outline-none"
                      />
                    </div>
                  </div>

                  <span className="text-amber-600">+</span>

                  {/* Second fraction conversion */}
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-center">
                      <span>{currentQ.n2}</span>
                      <span className="border-b-2 border-slate-700 w-6 my-0.5"></span>
                      <span>{currentQ.d2}</span>
                    </div>
                    <span>➜</span>
                    <div className="flex flex-col items-center">
                      <input
                        type="number"
                        value={userN2}
                        onChange={(e) => setUserN2(e.target.value)}
                        placeholder="?"
                        disabled={conversionDiagnosis?.isCorrect}
                        className="w-12 h-9 text-center bg-teal-100 border-2 border-teal-400 rounded-lg font-fredoka font-bold text-teal-900 text-base focus:outline-none"
                      />
                      <span className="border-b-2 border-slate-800 w-12 my-0.5"></span>
                      <input
                        type="number"
                        value={userCD}
                        onChange={(e) => setUserCD(e.target.value)}
                        placeholder="?"
                        disabled={conversionDiagnosis?.isCorrect}
                        className="w-12 h-9 text-center bg-teal-100 border-2 border-teal-400 rounded-lg font-fredoka font-bold text-teal-900 text-base focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {!conversionDiagnosis?.isCorrect && (
                  <button
                    type="submit"
                    disabled={!userCD || !userN1 || !userN2}
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-white rounded-xl font-fredoka font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                  >
                    {language === 'ms' ? 'Semak Penukaran' : 'Check Conversion'}
                  </button>
                )}
              </form>

              {/* Conversion Diagnostic Feedback */}
              {conversionDiagnosis && (
                <div
                  className={`p-4 rounded-xl border-2 space-y-1 animate-fadeIn ${
                    conversionDiagnosis.isCorrect ? 'bg-emerald-50 border-emerald-300' : 'bg-rose-50 border-rose-300'
                  }`}
                >
                  <div className="flex items-center gap-2 font-fredoka font-bold text-sm text-slate-800">
                    {conversionDiagnosis.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-rose-600" />
                    )}
                    <span>{conversionDiagnosis.isCorrect ? (language === 'ms' ? 'Penukaran Sah!' : 'Valid Conversion!') : (language === 'ms' ? 'Petunjuk Fino' : 'Fino Guidance')}</span>
                  </div>
                  <p className="font-quicksand font-semibold text-xs sm:text-sm text-slate-700">
                    {conversionDiagnosis.feedback[language]}
                  </p>
                </div>
              )}

              {/* Step 4: Final Sum Form (Unlocked once conversion is valid) */}
              {conversionDiagnosis?.isCorrect && (
                <form onSubmit={handleCheckSum} className="bg-white p-4 rounded-xl border border-amber-200 space-y-4 text-center animate-fadeIn">
                  <p className="font-fredoka text-sm font-bold text-slate-800">
                    {language === 'ms' ? 'Langkah B: Tambah Pengangka dan Tulis Jawapan Akhir' : 'Step B: Add Numerators and Enter Final Answer'}
                  </p>

                  <div className="flex items-center justify-center gap-3 text-2xl font-fredoka font-extrabold text-slate-800">
                    <span>{userN1}/{userCD} + {userN2}/{userCD} =</span>

                    <div className="flex flex-col items-center">
                      <input
                        type="number"
                        value={finalN}
                        onChange={(e) => setFinalN(e.target.value)}
                        placeholder="?"
                        disabled={qCompleted}
                        className="w-14 h-11 text-center bg-amber-100 border-2 border-amber-400 rounded-xl font-fredoka font-bold text-amber-900 text-xl focus:outline-none"
                      />
                      <span className="border-b-2 border-slate-800 w-14 my-0.5"></span>
                      <input
                        type="number"
                        value={finalD}
                        onChange={(e) => setFinalD(e.target.value)}
                        placeholder="?"
                        disabled={qCompleted}
                        className="w-14 h-11 text-center bg-amber-100 border-2 border-amber-400 rounded-xl font-fredoka font-bold text-amber-900 text-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center gap-3 pt-2">
                    {!qCompleted ? (
                      <button
                        type="submit"
                        disabled={!finalN || !finalD}
                        className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-white rounded-xl font-fredoka font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                      >
                        {language === 'ms' ? 'Semak Hasil Tambah' : 'Check Final Sum'}
                      </button>
                    ) : (
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        <span className="text-emerald-700 font-fredoka font-extrabold text-sm sm:text-base flex items-center gap-1.5 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          {language === 'ms' ? 'Tahniah! Jawapan Tepat!' : 'Bravo! Correct Answer!'}
                        </span>
                        {qIndex < levelQuestions.length - 1 && (
                          <button
                            type="button"
                            onClick={handleNextQuestion}
                            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-fredoka font-bold text-xs sm:text-sm shadow-md flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>{language === 'ms' ? 'Soalan Seterusnya' : 'Next Question'}</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </form>
              )}

              {/* Sum Diagnostic Smart Feedback */}
              {sumDiagnosis && (
                <div
                  className={`p-4 rounded-xl border-2 space-y-1 animate-fadeIn ${
                    sumDiagnosis.isCorrect ? 'bg-emerald-50 border-emerald-300' : 'bg-rose-50 border-rose-300'
                  }`}
                >
                  <div className="flex items-center gap-2 font-fredoka font-bold text-sm text-slate-800">
                    {sumDiagnosis.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-rose-600" />
                    )}
                    <span>{sumDiagnosis.isCorrect ? (language === 'ms' ? 'Hasil Tambah Tepat!' : 'Correct Sum!') : (language === 'ms' ? 'Bimbingan Fino' : 'Fino Smart Feedback')}</span>
                  </div>
                  <p className="font-quicksand font-semibold text-xs sm:text-sm text-slate-700">
                    {sumDiagnosis.feedback[language]}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* SECTION 5: DISCOVER & EXPLAIN */}
          {seqStep >= 5 && qCompleted && (
            <div className="p-5 bg-emerald-50 border-2 border-emerald-300 rounded-2xl space-y-3 animate-fadeIn">
              <h4 className="font-fredoka text-base font-bold text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                {language === 'ms' ? '5. Penemuan & Rumusan Fino' : "5. Fino's Discovery & Summary"}
              </h4>
              <p className="font-quicksand font-semibold text-xs sm:text-sm text-slate-700 leading-relaxed">
                {language === 'ms'
                  ? `Syabas! Anda telah menambah ${currentQ.n1}/${currentQ.d1} + ${currentQ.n2}/${currentQ.d2} = ${finalN}/${finalD}. Langkah utama: 1) Samakan penyebut dengan pecahan setara. 2) Tambah pengangka sahaja. 3) Kekalkan penyebut sepunya!`
                  : `Well done! You added ${currentQ.n1}/${currentQ.d1} + ${currentQ.n2}/${currentQ.d2} = ${finalN}/${finalD}. Key steps: 1) Match denominators using equivalent fractions. 2) Add numerators only. 3) Keep common denominator!`}
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MISCONCEPTION DETECTIVE ACTIVITY */}
      {activeTab === 'DETECTIVE' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-purple-900 text-white p-5 rounded-2xl space-y-3 shadow-md">
            <div className="flex items-center gap-2 text-purple-200">
              <Search className="w-6 h-6 text-amber-300" />
              <h4 className="font-fredoka text-lg font-bold text-white">
                {language === 'ms' ? 'Cabaran Detektif Mitos Pecahan' : 'Misconception Detective Challenge'}
              </h4>
            </div>
            <p className="font-quicksand text-xs sm:text-sm font-medium text-purple-100">
              {language === 'ms'
                ? 'Seorang murid telah membuat pengiraan berikut di pintu istana: 1/3 + 1/5 = 2/8. Tugas anda ialah mengenal pasti kesilapan, menerangkan punca, dan membetulkannya!'
                : 'A pupil wrote the following calculation at the castle gate: 1/3 + 1/5 = 2/8. Your job is to identify the flaw, explain why it is wrong, and construct the correct sum!'}
            </p>
          </div>

          {/* Detective Step 1: Identify Incorrect Procedure */}
          <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200 space-y-3">
            <h5 className="font-fredoka text-sm font-bold text-amber-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-xs">1</span>
              {language === 'ms' ? 'Kenal pasti prosedur yang SALAH:' : 'Identify the INCORRECT procedure:'}
            </h5>

            <div className="space-y-2">
              <label className="flex items-center gap-3 bg-white p-3 rounded-xl border border-amber-200 cursor-pointer">
                <input
                  type="radio"
                  name="errorProc"
                  value="SEPARATE"
                  checked={identifiedError === 'SEPARATE'}
                  onChange={() => {
                    setIdentifiedError('SEPARATE');
                    if (detectiveStep < 2) setDetectiveStep(2);
                  }}
                  className="accent-purple-600"
                />
                <span className="font-quicksand font-semibold text-xs sm:text-sm text-slate-800">
                  {language === 'ms'
                    ? 'Murid menambah pengangka (1+1=2) dan penyebut (3+5=8) secara berasingan'
                    : 'The pupil added numerators (1+1=2) and denominators (3+5=8) separately'}
                </span>
              </label>

              <label className="flex items-center gap-3 bg-white p-3 rounded-xl border border-amber-200 cursor-pointer">
                <input
                  type="radio"
                  name="errorProc"
                  value="ARITHMETIC"
                  checked={identifiedError === 'ARITHMETIC'}
                  onChange={() => setIdentifiedError('ARITHMETIC')}
                  className="accent-purple-600"
                />
                <span className="font-quicksand font-semibold text-xs sm:text-sm text-slate-800">
                  {language === 'ms'
                    ? 'Murid tersilap darab 1/3 dengan 1/5'
                    : 'The pupil accidentally multiplied 1/3 by 1/5'}
                </span>
              </label>
            </div>
          </div>

          {/* Detective Step 2: Guided Reasoning Question */}
          {detectiveStep >= 2 && (
            <div className="bg-sky-50/80 p-4 rounded-2xl border border-sky-200 space-y-3 animate-fadeIn">
              <h5 className="font-fredoka text-sm font-bold text-sky-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-200 text-sky-900 flex items-center justify-center text-xs">2</span>
                {language === 'ms' ? 'Soalan Bimbingan Mitos: MENGAPAKAH 1/3 + 1/5 = 2/8 adalah salah?' : 'Guided Reasoning: WHY is 1/3 + 1/5 = 2/8 wrong?'}
              </h5>

              <select
                value={guidedReasonAnswer}
                onChange={(e) => {
                  setGuidedReasonAnswer(e.target.value);
                  if (e.target.value === 'REASON_OK' && detectiveStep < 3) {
                    setDetectiveStep(3);
                  }
                }}
                className="w-full p-3 rounded-xl border border-sky-300 font-quicksand text-xs sm:text-sm font-semibold bg-white"
              >
                <option value="">-- {language === 'ms' ? 'Pilih Alasan Tepat' : 'Select Correct Reason'} --</option>
                <option value="REASON_OK">
                  {language === 'ms'
                    ? 'Penyebut menentukan saiz kepingan. Menambah penyebut menukar saiz kepingan dan bukannya mengumpul bilangan kepingan bersaiz sama!'
                    : 'Denominators define piece sizes. Adding denominators alters piece sizes rather than accumulating equal-sized pieces!'}
                </option>
                <option value="REASON_WRONG">
                  {language === 'ms'
                    ? 'Kerana 2/8 bukan nombor genap'
                    : 'Because 2/8 is not an even number'}
                </option>
              </select>
            </div>
          )}

          {/* Detective Step 3 & 4: Visual Fraction Bars Manipulation & Construct Correct Answer */}
          {detectiveStep >= 3 && (
            <div className="bg-emerald-50/80 p-4 sm:p-5 rounded-2xl border border-emerald-200 space-y-4 animate-fadeIn">
              <h5 className="font-fredoka text-sm font-bold text-emerald-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-200 text-emerald-900 flex items-center justify-center text-xs">3 & 4</span>
                {language === 'ms' ? 'Manipulasi Jalur Pecahan & Bina Jawapan Betul' : 'Manipulate Fraction Bars & Construct Correct Answer'}
              </h5>

              {/* Visual Bars Comparison */}
              <div className="bg-white p-4 rounded-xl border border-emerald-200 space-y-3 text-xs">
                <span className="font-fredoka font-bold text-slate-800 block">
                  {language === 'ms' ? 'Pemerhatian Jalur Pecahan Setara (Penyebut Sepunya 15):' : 'Equivalent Fraction Bar Observation (Common Denominator 15):'}
                </span>

                <div className="space-y-1">
                  <span>1/3 ➜ 5/15</span>
                  <div className="w-full h-8 bg-slate-100 border rounded-lg flex overflow-hidden">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <div
                        key={i}
                        style={{ width: `${100 / 15}%` }}
                        className={`h-full border-r text-[9px] flex items-center justify-center ${
                          i < 5 ? 'bg-purple-400 text-purple-950 font-bold' : 'bg-slate-50'
                        }`}
                      >
                        1/15
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <span>1/5 ➜ 3/15</span>
                  <div className="w-full h-8 bg-slate-100 border rounded-lg flex overflow-hidden">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <div
                        key={i}
                        style={{ width: `${100 / 15}%` }}
                        className={`h-full border-r text-[9px] flex items-center justify-center ${
                          i < 3 ? 'bg-teal-400 text-teal-950 font-bold' : 'bg-slate-50'
                        }`}
                      >
                        1/15
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form to enter correct sum */}
              <form onSubmit={handleCheckDetectiveCorrection} className="bg-white p-4 rounded-xl border border-emerald-200 space-y-3 text-center">
                <p className="font-fredoka text-sm font-bold text-slate-800">
                  {language === 'ms' ? 'Masukkan Hasil Tambah Yang Betul bagi 1/3 + 1/5:' : 'Enter the Correct Sum for 1/3 + 1/5:'}
                </p>

                <div className="flex items-center justify-center gap-3 text-2xl font-fredoka font-extrabold text-slate-800">
                  <span>1/3 + 1/5 =</span>
                  <div className="flex flex-col items-center">
                    <input
                      type="number"
                      value={detFinalN}
                      onChange={(e) => setDetFinalN(e.target.value)}
                      placeholder="?"
                      disabled={detCompleted}
                      className="w-14 h-11 text-center bg-emerald-100 border-2 border-emerald-400 rounded-xl font-fredoka font-bold text-emerald-900 text-xl focus:outline-none"
                    />
                    <span className="border-b-2 border-slate-800 w-14 my-0.5"></span>
                    <input
                      type="number"
                      value={detFinalD}
                      onChange={(e) => setDetFinalD(e.target.value)}
                      placeholder="?"
                      disabled={detCompleted}
                      className="w-14 h-11 text-center bg-emerald-100 border-2 border-emerald-400 rounded-xl font-fredoka font-bold text-emerald-900 text-xl focus:outline-none"
                    />
                  </div>
                </div>

                {!detCompleted ? (
                  <button
                    type="submit"
                    disabled={!detFinalN || !detFinalD}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-xl font-fredoka font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                  >
                    {language === 'ms' ? 'Sahkan Jawapan Betul' : 'Confirm Correct Answer'}
                  </button>
                ) : (
                  <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl font-fredoka font-bold text-sm sm:text-base flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>
                      {language === 'ms'
                        ? 'Syabas Detektif! Anda telah membetulkan mitos pecahan: 1/3 + 1/5 = 8/15!'
                        : 'Great job Detective! You corrected the fraction myth: 1/3 + 1/5 = 8/15!'}
                    </span>
                  </div>
                )}
              </form>

              {detDiagnosis && (
                <div
                  className={`p-4 rounded-xl border-2 space-y-1 animate-fadeIn ${
                    detDiagnosis.isCorrect ? 'bg-emerald-50 border-emerald-300' : 'bg-rose-50 border-rose-300'
                  }`}
                >
                  <div className="flex items-center gap-2 font-fredoka font-bold text-sm text-slate-800">
                    {detDiagnosis.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-rose-600" />
                    )}
                    <span>{language === 'ms' ? 'Maklum Balas Detektif Fino' : "Fino's Detective Feedback"}</span>
                  </div>
                  <p className="font-quicksand font-semibold text-xs sm:text-sm text-slate-700">
                    {detDiagnosis.feedback[language]}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Prominent Bottom Activity Navigation */}
      <div className="flex items-center justify-between pt-4 border-t-2 border-slate-200">
        <button
          onClick={() => switchTab('ADDITION')}
          disabled={activeTab === 'ADDITION'}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-purple-900 font-fredoka font-bold text-sm border-2 border-purple-200 shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-purple-600" />
          <span>{t.prevActivity}</span>
        </button>

        <button
          onClick={() => switchTab('DETECTIVE')}
          disabled={activeTab === 'DETECTIVE'}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-fredoka font-extrabold text-sm sm:text-base shadow-md transition-all"
        >
          <span>{t.nextActivity}</span>
          <ArrowRight className="w-5 h-5 text-purple-200" />
        </button>
      </div>
    </div>
  );
};
