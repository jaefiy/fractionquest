import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  getMultiples,
  isCommonMultiple,
  diagnoseFractionAdditionConversion,
  DiagnosisResult,
} from '../../utils/fractionUtils';
import { CheckCircle2, AlertCircle, Layers, ArrowRight, Sparkles } from 'lucide-react';

interface Chapter3ActivityProps {
  onComplete?: () => void;
}

interface FractionPair {
  id: number;
  n1: number;
  d1: number;
  n2: number;
  d2: number;
}

const FRACTION_PAIRS: FractionPair[] = [
  { id: 1, n1: 1, d1: 3, n2: 1, d2: 5 },
  { id: 2, n1: 1, d1: 2, n2: 1, d2: 4 },
  { id: 3, n1: 1, d1: 4, n2: 1, d2: 6 },
  { id: 4, n1: 2, d1: 5, n2: 1, d2: 2 },
];

export const Chapter3Activity: React.FC<Chapter3ActivityProps> = ({ onComplete }) => {
  const { language } = useLanguage();

  // Active fraction pair index
  const [pairIdx, setPairIdx] = useState<number>(0);
  const currentPair = FRACTION_PAIRS[pairIdx];

  // Common Multiple Explorer selection state
  const [selectedMultiples1, setSelectedMultiples1] = useState<number[]>([]);
  const [selectedMultiples2, setSelectedMultiples2] = useState<number[]>([]);

  // User input states for converting two fractions to a common denominator
  const [userN1, setUserN1] = useState<string>('');
  const [userD1, setUserD1] = useState<string>('');
  const [userN2, setUserN2] = useState<string>('');
  const [userD2, setUserD2] = useState<string>('');

  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);

  const multiples1 = getMultiples(currentPair.d1, 8);
  const multiples2 = getMultiples(currentPair.d2, 8);

  const toggleMultiple1 = (val: number) => {
    setSelectedMultiples1((prev) =>
      prev.includes(val) ? prev.filter((m) => m !== val) : [...prev, val]
    );
  };

  const toggleMultiple2 = (val: number) => {
    setSelectedMultiples2((prev) =>
      prev.includes(val) ? prev.filter((m) => m !== val) : [...prev, val]
    );
  };

  const handleConvertSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedN1 = parseInt(userN1, 10);
    const parsedD1 = parseInt(userD1, 10);
    const parsedN2 = parseInt(userN2, 10);
    const parsedD2 = parseInt(userD2, 10);

    const result = diagnoseFractionAdditionConversion(
      currentPair.n1,
      currentPair.d1,
      currentPair.n2,
      currentPair.d2,
      parsedN1,
      parsedD1,
      parsedN2,
      parsedD2
    );

    setDiagnosis(result);

    if (result.isCorrect && pairIdx === FRACTION_PAIRS.length - 1 && onComplete) {
      onComplete();
    }
  };

  const handleNextPair = () => {
    if (pairIdx < FRACTION_PAIRS.length - 1) {
      setPairIdx((prev) => prev + 1);
      setSelectedMultiples1([]);
      setSelectedMultiples2([]);
      setUserN1('');
      setUserD1('');
      setUserN2('');
      setUserD2('');
      setDiagnosis(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border-2 border-sky-200 shadow-sm space-y-6">
      {/* Header Banner */}
      <div className="flex items-center gap-3 border-b border-sky-200 pb-3">
        <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold font-fredoka text-xl">
          3
        </div>
        <div>
          <h3 className="font-fredoka text-xl font-bold text-slate-800">
            {language === 'ms' ? 'Jambatan Bahagian Sama Saiz' : 'Bridge of Equal Parts'}
          </h3>
          <p className="font-quicksand text-xs font-semibold text-slate-500">
            {language === 'ms'
              ? 'Terokai gandaan sepunya dan tukar pecahan kepada penyebut yang sama!'
              : 'Explore common multiples and convert fractions to shared denominators!'}
          </p>
        </div>
      </div>

      {/* SECTION 1: INTERACTIVE COMMON MULTIPLE EXPLORER */}
      <div className="space-y-4 bg-sky-50/50 p-4 rounded-2xl border border-sky-200">
        <div className="flex items-center justify-between">
          <h4 className="font-fredoka text-base font-bold text-sky-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-600" />
            {language === 'ms' ? 'Penjelajah Gandaan Sepunya' : 'Common Multiple Explorer'} ({pairIdx + 1}/{FRACTION_PAIRS.length})
          </h4>
        </div>

        <p className="font-quicksand font-semibold text-xs sm:text-sm text-slate-700">
          {language === 'ms'
            ? `Pilih nombor gandaan bagi ${currentPair.d1} dan ${currentPair.d2}. Cari gandaan yang wujud pada kedua-dua senarai!`
            : `Select multiples for ${currentPair.d1} and ${currentPair.d2}. Find multiples present in both lists!`}
        </p>

        {/* Row 1: Multiples of d1 */}
        <div className="space-y-1.5 bg-white p-3 rounded-xl border border-sky-200">
          <span className="font-fredoka text-xs font-bold text-sky-900 block">
            {language === 'ms' ? `Gandaan penyebut ${currentPair.d1}:` : `Multiples of denominator ${currentPair.d1}:`}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {multiples1.map((m) => {
              const isSelected = selectedMultiples1.includes(m);
              const isCommon = isCommonMultiple(m, currentPair.d1, currentPair.d2);
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => toggleMultiple1(m)}
                  className={`px-3 py-1.5 rounded-lg font-fredoka font-bold text-xs transition-all ${
                    isSelected
                      ? isCommon
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'bg-sky-500 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Multiples of d2 */}
        <div className="space-y-1.5 bg-white p-3 rounded-xl border border-sky-200">
          <span className="font-fredoka text-xs font-bold text-sky-900 block">
            {language === 'ms' ? `Gandaan penyebut ${currentPair.d2}:` : `Multiples of denominator ${currentPair.d2}:`}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {multiples2.map((m) => {
              const isSelected = selectedMultiples2.includes(m);
              const isCommon = isCommonMultiple(m, currentPair.d1, currentPair.d2);
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => toggleMultiple2(m)}
                  className={`px-3 py-1.5 rounded-lg font-fredoka font-bold text-xs transition-all ${
                    isSelected
                      ? isCommon
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'bg-sky-500 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 2: FRACTION CONVERSION CHALLENGE */}
      <div className="space-y-4 bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
        <h4 className="font-fredoka text-base font-bold text-amber-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-600" />
          {language === 'ms' ? 'Tukar Kedua-Dua Pecahan kepada Penyebut Sepunya' : 'Convert Both Fractions to Common Denominator'}
        </h4>

        <div className="bg-white p-4 rounded-xl border border-amber-200 space-y-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xl font-fredoka font-extrabold text-slate-800">
            {/* First Fraction Original & Input */}
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center text-slate-700">
                <span>{currentPair.n1}</span>
                <span className="border-b-2 border-slate-700 w-6 my-0.5"></span>
                <span>{currentPair.d1}</span>
              </div>
              <span>➜</span>
              <div className="flex flex-col items-center">
                <input
                  type="number"
                  value={userN1}
                  onChange={(e) => setUserN1(e.target.value)}
                  placeholder="?"
                  className="w-12 h-9 text-center bg-sky-100 border-2 border-sky-400 rounded-lg font-fredoka font-bold text-sky-900 text-base focus:outline-none"
                />
                <span className="border-b-2 border-slate-800 w-12 my-0.5"></span>
                <input
                  type="number"
                  value={userD1}
                  onChange={(e) => setUserD1(e.target.value)}
                  placeholder="?"
                  className="w-12 h-9 text-center bg-sky-100 border-2 border-sky-400 rounded-lg font-fredoka font-bold text-sky-900 text-base focus:outline-none"
                />
              </div>
            </div>

            <span className="text-amber-600 text-2xl font-bold">+</span>

            {/* Second Fraction Original & Input */}
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center text-slate-700">
                <span>{currentPair.n2}</span>
                <span className="border-b-2 border-slate-700 w-6 my-0.5"></span>
                <span>{currentPair.d2}</span>
              </div>
              <span>➜</span>
              <div className="flex flex-col items-center">
                <input
                  type="number"
                  value={userN2}
                  onChange={(e) => setUserN2(e.target.value)}
                  placeholder="?"
                  className="w-12 h-9 text-center bg-teal-100 border-2 border-teal-400 rounded-lg font-fredoka font-bold text-teal-900 text-base focus:outline-none"
                />
                <span className="border-b-2 border-slate-800 w-12 my-0.5"></span>
                <input
                  type="number"
                  value={userD2}
                  onChange={(e) => setUserD2(e.target.value)}
                  placeholder="?"
                  className="w-12 h-9 text-center bg-teal-100 border-2 border-teal-400 rounded-lg font-fredoka font-bold text-teal-900 text-base focus:outline-none"
                />
              </div>
            </div>
          </div>

          <form onSubmit={handleConvertSubmit} className="flex justify-center gap-3">
            <button
              type="submit"
              disabled={!userN1 || !userD1 || !userN2 || !userD2}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-white rounded-xl font-fredoka font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              {language === 'ms' ? 'Semak Penukaran' : 'Check Conversion'}
            </button>

            {diagnosis?.isCorrect && pairIdx < FRACTION_PAIRS.length - 1 && (
              <button
                type="button"
                onClick={handleNextPair}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-fredoka font-bold text-xs sm:text-sm shadow-md flex items-center gap-1.5 animate-fadeIn"
              >
                <span>{language === 'ms' ? 'Pasangan Seterusnya' : 'Next Pair'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </form>
        </div>

        {/* FINO SMART FEEDBACK PANEL */}
        {diagnosis && (
          <div
            className={`p-4 rounded-xl border-2 space-y-2 animate-fadeIn ${
              diagnosis.isCorrect ? 'bg-emerald-50 border-emerald-300' : 'bg-rose-50 border-rose-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {diagnosis.isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600" />
              )}
              <h5 className="font-fredoka text-sm sm:text-base font-bold text-slate-800">
                {diagnosis.isCorrect
                  ? language === 'ms'
                    ? 'Penukaran Sah!'
                    : 'Valid Conversion!'
                  : language === 'ms'
                  ? 'Bimbingan Fino'
                  : "Fino's Guidance"}
              </h5>
            </div>

            <p className="font-quicksand font-semibold text-xs sm:text-sm text-slate-700">
              {diagnosis.feedback[language]}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
