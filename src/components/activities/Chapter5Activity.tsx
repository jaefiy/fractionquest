import React, { useState } from 'react';
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

export const Chapter5Activity: React.FC<Chapter5ActivityProps> = ({ onComplete }) => {
  const { language } = useLanguage();
  const { progress, savePostQuizScore } = useProgress();

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<'ADDITION' | 'PROBLEMS' | 'DETECTIVE' | 'CERTIFICATE'>('ADDITION');

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
  };

  // Handle Misconception detective check
  const handleCheckDetective = (e: React.FormEvent) => {
    e.preventDefault();
    const fn = parseInt(detFinalN, 10);
    const fd = parseInt(detFinalD, 10);

    // Misconception target: 1/4 + 1/6 = 5/12
    const diag = diagnoseFractionAdditionSum(1, 4, 1, 6, fn, fd);
    setDetDiag(diag);
    if (diag.isCorrect && onComplete) {
      onComplete();
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-300 shadow-md space-y-6">
      {/* Activity Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold font-fredoka text-2xl shadow-inner">
            5
          </div>
          <div>
            <h3 className="font-fredoka text-xl sm:text-2xl font-extrabold text-slate-800">
              {language === 'ms' ? 'Misi Terakhir Pecahan' : 'The Final Fraction Quest'}
            </h3>
            <p className="font-quicksand text-xs sm:text-sm font-semibold text-slate-500">
              {language === 'ms'
                ? 'Selesaikan cabaran, wawasan dunia sebenar, pasca-kuiz dan dapatkan Sijil Kejayaan!'
                : 'Solve challenges, real-life word problems, post-quiz, and earn your Certificate!'}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap bg-slate-100 p-1 rounded-2xl border border-slate-200 gap-1">
          <button
            onClick={() => setActiveTab('ADDITION')}
            className={`px-3 py-1.5 rounded-xl font-fredoka font-bold text-xs transition-all flex items-center gap-1 ${
              activeTab === 'ADDITION'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ms' ? 'Cabaran Akhir' : 'Final Addition'}</span>
          </button>
          <button
            onClick={() => setActiveTab('PROBLEMS')}
            className={`px-3 py-1.5 rounded-xl font-fredoka font-bold text-xs transition-all flex items-center gap-1 ${
              activeTab === 'PROBLEMS'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === 'ms' ? 'Soalan Kehidupan' : 'Word Problems'}</span>
          </button>
          <button
            onClick={() => setActiveTab('DETECTIVE')}
            className={`px-3 py-1.5 rounded-xl font-fredoka font-bold text-xs transition-all flex items-center gap-1 ${
              activeTab === 'DETECTIVE'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>{language === 'ms' ? 'Detektif Mitos' : 'Detective'}</span>
          </button>
          <button
            onClick={() => setActiveTab('CERTIFICATE')}
            className={`px-3 py-1.5 rounded-xl font-fredoka font-bold text-xs transition-all flex items-center gap-1 ${
              activeTab === 'CERTIFICATE'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>{language === 'ms' ? 'Sijil' : 'Certificate'}</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: FRACTION ADDITION CHALLENGES WITH VARIED DENOMINATORS */}
      {activeTab === 'ADDITION' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
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
          <div className="bg-sky-50 p-4 rounded-2xl border border-sky-200 flex items-center justify-between">
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
          <div className="bg-purple-900 text-white p-5 rounded-2xl space-y-2">
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

      {/* SECTION 4 & 5: POST-QUIZ & COMPLETION CERTIFICATE */}
      {activeTab === 'CERTIFICATE' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Post Quiz Trigger */}
          <div className="bg-amber-50 p-5 rounded-3xl border-2 border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="w-8 h-8 text-amber-600 flex-shrink-0" />
              <div>
                <h4 className="font-fredoka text-lg font-bold text-amber-900">
                  {language === 'ms' ? 'Pasca-Kuiz Minda Pecahan Bab 5' : 'Chapter 5 Post-Quiz'}
                </h4>
                <p className="font-quicksand font-semibold text-xs sm:text-sm text-slate-700">
                  {progress.postQuizScore !== null
                    ? language === 'ms'
                      ? `Skor Pasca-Kuiz Anda: ${progress.postQuizScore}/5`
                      : `Your Post-Quiz Score: ${progress.postQuizScore}/5`
                    : language === 'ms'
                    ? 'Selesaikan pasca-kuiz untuk mengesahkan pencapaian kembara anda!'
                    : 'Complete post-quiz to verify your adventure achievement!'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsPostQuizOpen(true)}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-fredoka font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{progress.postQuizScore !== null ? (language === 'ms' ? 'Semak Pasca-Kuiz' : 'Review Post-Quiz') : (language === 'ms' ? 'Mula Pasca-Kuiz' : 'Start Post-Quiz')}</span>
            </button>
          </div>

          {/* Certificate Frame */}
          <div className="bg-cream-50 border-8 border-double border-amber-400 rounded-3xl p-6 text-center space-y-4 shadow-xl relative overflow-hidden">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-1 rounded-full font-fredoka font-bold text-xs">
              <Award className="w-4 h-4 text-amber-600" />
              <span>{language === 'ms' ? 'Sijil Pencapaian KSSR Matematik' : 'KSSR Mathematics Achievement Certificate'}</span>
            </div>

            <h3 className="font-fredoka text-2xl sm:text-4xl font-extrabold text-slate-800 tracking-wide">
              {language === 'ms' ? 'SIJIL KEJAYAN FRACTIONQUEST' : 'FRACTIONQUEST COMPLETION CERTIFICATE'}
            </h3>

            <p className="font-quicksand font-semibold text-xs sm:text-sm text-slate-600">
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
                className="w-full text-center p-2.5 rounded-xl border-2 border-amber-300 font-fredoka font-extrabold text-lg sm:text-2xl text-amber-950 bg-white focus:outline-none shadow-sm"
              />
            </div>

            <p className="font-quicksand font-medium text-xs sm:text-sm text-slate-700 max-w-lg mx-auto">
              {language === 'ms'
                ? 'Kerana berjaya menyelesaikan semua bab kembara penambahan pecahan wajar penyebut berbeza KSSR Tahun 4!'
                : 'For successfully mastering proper fraction addition with different denominators in Year 4 KSSR!'}
            </p>

            {/* Scores summary box */}
            <div className="bg-white/90 p-4 rounded-2xl border border-amber-300 max-w-md mx-auto grid grid-cols-2 gap-3 text-xs font-fredoka font-bold text-slate-800">
              <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                <span>{language === 'ms' ? 'Skor Pra-Kuiz:' : 'Pre-Quiz Score:'}</span>
                <span className="block text-lg text-amber-700">{progress.preQuizScore !== null ? `${progress.preQuizScore}/5` : '-'}</span>
              </div>
              <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                <span>{language === 'ms' ? 'Skor Pasca-Kuiz:' : 'Post-Quiz Score:'}</span>
                <span className="block text-lg text-emerald-700">{progress.postQuizScore !== null ? `${progress.postQuizScore}/5` : '-'}</span>
              </div>
            </div>

            <div className="pt-2 text-xs font-quicksand font-semibold text-slate-500">
              {language === 'ms'
                ? 'Disahkan oleh Fino Si Musang • FractionQuest KSSR Tahun 4'
                : 'Verified by Fino the Explorer Fox • FractionQuest Year 4 KSSR'}
            </div>
          </div>
        </div>
      )}

      {/* Post-Quiz Modal */}
      <QuizModal
        isOpen={isPostQuizOpen}
        onClose={() => setIsPostQuizOpen(false)}
        title={language === 'ms' ? 'Pasca-Kuiz Minda Pecahan (Tahun 4 KSSR)' : 'Fraction Mind Post-Quiz (Year 4 KSSR)'}
        questions={POST_QUIZ_QUESTIONS}
        onQuizComplete={(score) => savePostQuizScore(score)}
      />
    </div>
  );
};
