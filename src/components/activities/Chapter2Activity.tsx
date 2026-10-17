import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CheckCircle2, HelpCircle, Layers, ArrowRight, Sparkles } from 'lucide-react';

interface Chapter2ActivityProps {
  onComplete?: () => void;
}

interface Puzzle {
  id: number;
  origNum: number;
  origDen: number;
  targetDen: number;
  expectedNum: number;
}

const PUZZLES: Puzzle[] = [
  { id: 1, origNum: 1, origDen: 3, targetDen: 15, expectedNum: 5 },
  { id: 2, origNum: 1, origDen: 5, targetDen: 15, expectedNum: 3 },
  { id: 3, origNum: 2, origDen: 4, targetDen: 12, expectedNum: 6 },
];

export const Chapter2Activity: React.FC<Chapter2ActivityProps> = ({ onComplete }) => {
  const { language } = useLanguage();

  // Exploration multiplier state (e.g. 1, 2, 3, 4, 5)
  const [multiplier, setMultiplier] = useState<number>(2);

  // Active puzzle index
  const [currentPuzzleIdx, setCurrentPuzzleIdx] = useState<number>(0);
  const currentPuzzle = PUZZLES[currentPuzzleIdx];

  // User input for puzzle conversion: ? / targetDen
  const [userInputNum, setUserInputNum] = useState<string>('');
  const [userAttempted, setUserAttempted] = useState<boolean>(false);
  const [hintLevel, setHintLevel] = useState<number>(0);
  const [puzzleCompleted, setPuzzleCompleted] = useState<boolean>(false);

  // Computed values for demonstration (original 1/3 multiplied by multiplier)
  const baseNum = 1;
  const baseDen = 3;
  const equivNum = baseNum * multiplier;
  const equivDen = baseDen * multiplier;

  const handleCheckPuzzle = (e: React.FormEvent) => {
    e.preventDefault();
    setUserAttempted(true);

    const parsedNum = parseInt(userInputNum, 10);
    const isCorrect = !isNaN(parsedNum) && parsedNum === currentPuzzle.expectedNum;

    if (isCorrect) {
      setPuzzleCompleted(true);
      if (currentPuzzleIdx === PUZZLES.length - 1 && onComplete) {
        onComplete();
      }
    } else {
      setHintLevel((prev) => Math.min(prev + 1, 2));
    }
  };

  const handleNextPuzzle = () => {
    if (currentPuzzleIdx < PUZZLES.length - 1) {
      setCurrentPuzzleIdx((prev) => prev + 1);
      setUserInputNum('');
      setUserAttempted(false);
      setHintLevel(0);
      setPuzzleCompleted(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border-2 border-emerald-200 shadow-sm space-y-6">
      {/* Header Banner */}
      <div className="flex items-center gap-3 border-b border-emerald-200 pb-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold font-fredoka text-xl">
          2
        </div>
        <div>
          <h3 className="font-fredoka text-xl font-bold text-slate-800">
            {language === 'ms' ? 'Hutan Pecahan Setara' : 'Forest of Equivalent Fractions'}
          </h3>
          <p className="font-quicksand text-xs font-semibold text-slate-500">
            {language === 'ms'
              ? 'Membahagi semula bahagian tanpa mengubah jumlah nilai kawasan tersenarai!'
              : 'Subdivide existing parts without changing the total shaded value!'}
          </p>
        </div>
      </div>

      {/* SECTION 1: INTERACTIVE SUBDIVISION EXPLORER */}
      <div className="space-y-4 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200">
        <div className="flex items-center justify-between">
          <h4 className="font-fredoka text-base font-bold text-emerald-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            {language === 'ms' ? 'Terokai Pembahagian Semula Jalur' : 'Explore Bar Subdivision'}
          </h4>
          <span className="text-xs font-fredoka font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            {baseNum}/{baseDen} = {equivNum}/{equivDen}
          </span>
        </div>

        {/* Multiplier buttons */}
        <div className="space-y-2">
          <label className="font-fredoka text-xs font-bold text-slate-700 block">
            {language === 'ms' ? 'Pilih Pengganda Pembahagian:' : 'Select Subdivision Multiplier:'}
          </label>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMultiplier(m)}
                className={`px-4 py-2 rounded-xl font-fredoka font-bold text-xs sm:text-sm transition-all ${
                  multiplier === m
                    ? 'bg-emerald-600 text-white shadow-md scale-105'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                }`}
              >
                × {m}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Bar Display */}
        <div className="space-y-3 pt-2">
          <div>
            <div className="flex justify-between text-xs font-fredoka font-bold text-slate-700 mb-1">
              <span>{language === 'ms' ? 'Jalur Asal:' : 'Original Bar:'} {baseNum}/{baseDen}</span>
            </div>
            <div className="w-full h-10 bg-slate-100 border-2 border-slate-300 rounded-xl overflow-hidden flex">
              {Array.from({ length: baseDen }).map((_, i) => (
                <div
                  key={i}
                  style={{ width: `${100 / baseDen}%` }}
                  className={`h-full border-r border-slate-300/80 last:border-r-0 flex items-center justify-center text-xs font-bold ${
                    i < baseNum ? 'bg-emerald-400 text-emerald-950' : 'bg-slate-50 text-slate-400'
                  }`}
                >
                  1/{baseDen}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-fredoka font-bold text-slate-700 mb-1">
              <span>
                {language === 'ms' ? 'Jalur Diperhalusi (Didarab ' : 'Subdivided Bar (Multiplied by '}
                {multiplier}): {equivNum}/{equivDen}
              </span>
              <span className="text-emerald-700 font-extrabold">
                {language === 'ms' ? 'Kawasan berlorek KEKAL SAMAZ!' : 'Shaded area REMAINS EQUAL!'}
              </span>
            </div>
            <div className="w-full h-10 bg-slate-100 border-2 border-slate-300 rounded-xl overflow-hidden flex">
              {Array.from({ length: equivDen }).map((_, i) => (
                <div
                  key={i}
                  style={{ width: `${100 / equivDen}%` }}
                  className={`h-full border-r border-slate-300/80 last:border-r-0 flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                    i < equivNum ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-300'
                  }`}
                >
                  1/{equivDen}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: CONVERSION PUZZLES WITH PROGRESSIVE HINTS */}
      <div className="space-y-4 bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
        <div className="flex items-center justify-between">
          <h4 className="font-fredoka text-base font-bold text-amber-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            {language === 'ms' ? 'Cabaran Cabang Pecahan Setara' : 'Equivalent Fraction Puzzle'} ({currentPuzzleIdx + 1}/{PUZZLES.length})
          </h4>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-200 text-center space-y-3">
          <p className="font-quicksand font-bold text-slate-800 text-sm sm:text-base">
            {language === 'ms'
              ? `Cari pengangka yang sesuai untuk membina pecahan setara:`
              : `Find the matching numerator to construct an equivalent fraction:`}
          </p>

          <div className="flex items-center justify-center gap-3 text-2xl font-fredoka font-extrabold text-slate-800 my-3">
            <div className="flex flex-col items-center">
              <span>{currentPuzzle.origNum}</span>
              <span className="border-b-2 border-slate-800 w-8 my-0.5"></span>
              <span>{currentPuzzle.origDen}</span>
            </div>
            <span>=</span>
            <div className="flex flex-col items-center">
              <input
                type="number"
                value={userInputNum}
                onChange={(e) => setUserInputNum(e.target.value)}
                disabled={puzzleCompleted}
                placeholder="?"
                className="w-12 h-10 text-center bg-amber-100 border-2 border-amber-400 rounded-lg font-fredoka font-bold text-amber-900 text-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <span className="border-b-2 border-slate-800 w-12 my-0.5"></span>
              <span>{currentPuzzle.targetDen}</span>
            </div>
          </div>

          <form onSubmit={handleCheckPuzzle} className="flex justify-center gap-2">
            {!puzzleCompleted ? (
              <button
                type="submit"
                disabled={!userInputNum}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-white rounded-xl font-fredoka font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                {language === 'ms' ? 'Semak Jawapan' : 'Check Answer'}
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-emerald-700 font-fredoka font-extrabold text-sm flex items-center gap-1">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  {language === 'ms' ? 'Tepat Sekali!' : 'Correct!'}
                </span>
                {currentPuzzleIdx < PUZZLES.length - 1 && (
                  <button
                    type="button"
                    onClick={handleNextPuzzle}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-fredoka font-bold text-xs shadow-md flex items-center gap-1"
                  >
                    <span>{language === 'ms' ? 'Soalan Seterusnya' : 'Next Puzzle'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Progressive Fino Hints - ONLY SHOWN AFTER ATTEMPT */}
        {userAttempted && (
          <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 space-y-2 animate-fadeIn">
            <div className="flex items-center gap-2 text-sky-900 font-fredoka font-bold text-sm">
              <HelpCircle className="w-5 h-5 text-sky-600" />
              <span>{language === 'ms' ? 'Petunjuk Fino:' : "Fino's Progressive Hint:"}</span>
            </div>

            <div className="font-quicksand font-semibold text-xs sm:text-sm text-slate-700 space-y-1">
              {puzzleCompleted ? (
                <p className="text-emerald-800 font-bold">
                  {language === 'ms'
                    ? `Hebat! ${currentPuzzle.origNum}/${currentPuzzle.origDen} setara dengan ${currentPuzzle.expectedNum}/${currentPuzzle.targetDen} kerana kedua-dua pengangka dan penyebut didarab dengan ${currentPuzzle.targetDen / currentPuzzle.origDen}.`
                    : `Great! ${currentPuzzle.origNum}/${currentPuzzle.origDen} is equivalent to ${currentPuzzle.expectedNum}/${currentPuzzle.targetDen} because both numerator and denominator were multiplied by ${currentPuzzle.targetDen / currentPuzzle.origDen}.`}
                </p>
              ) : hintLevel === 1 ? (
                <p>
                  {language === 'ms'
                    ? `Perhatikan penyebut: Bagaimanakah ${currentPuzzle.origDen} menjadi ${currentPuzzle.targetDen}? Nombor apakah yang perlu didarabkan?`
                    : `Look at the denominator: How does ${currentPuzzle.origDen} become ${currentPuzzle.targetDen}? What factor was multiplied?`}
                </p>
              ) : (
                <p>
                  {language === 'ms'
                    ? `Kerana penyebut didarab dengan ${currentPuzzle.targetDen / currentPuzzle.origDen} (${currentPuzzle.origDen} × ${currentPuzzle.targetDen / currentPuzzle.origDen} = ${currentPuzzle.targetDen}), anda mesti mendarab pengangka (${currentPuzzle.origNum}) dengan ${currentPuzzle.targetDen / currentPuzzle.origDen} juga!`
                    : `Since the denominator was multiplied by ${currentPuzzle.targetDen / currentPuzzle.origDen} (${currentPuzzle.origDen} × ${currentPuzzle.targetDen / currentPuzzle.origDen} = ${currentPuzzle.targetDen}), you must multiply numerator (${currentPuzzle.origNum}) by ${currentPuzzle.targetDen / currentPuzzle.origDen} as well!`}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
