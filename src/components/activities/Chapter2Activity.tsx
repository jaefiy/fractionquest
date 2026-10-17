import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CheckCircle2, AlertCircle, HelpCircle, Layers, ArrowRight, Sparkles } from 'lucide-react';

interface Chapter2ActivityProps {
  onComplete?: () => void;
}

export interface Puzzle {
  id: number;
  origNum: number;
  origDen: number;
  targetDen: number;
  expectedNum: number;
}

export const PUZZLES: Puzzle[] = [
  { id: 1, origNum: 1, origDen: 3, targetDen: 15, expectedNum: 5 },
  { id: 2, origNum: 1, origDen: 5, targetDen: 15, expectedNum: 3 },
  { id: 3, origNum: 1, origDen: 2, targetDen: 8, expectedNum: 4 },
];

export const Chapter2Activity: React.FC<Chapter2ActivityProps> = ({ onComplete }) => {
  const { language } = useLanguage();

  // Active puzzle index
  const [currentPuzzleIdx, setCurrentPuzzleIdx] = useState<number>(0);
  const currentPuzzle = PUZZLES[currentPuzzleIdx];

  // Subdivision multiplier (1 to 5) defaulted to 1 so pupil must discover subdividing
  const [multiplier, setMultiplier] = useState<number>(1);

  // User input & progression states
  const [userInputNum, setUserInputNum] = useState<string>('');
  const [userAttempted, setUserAttempted] = useState<boolean>(false);
  const [hintLevel, setHintLevel] = useState<number>(0);
  const [puzzleCompleted, setPuzzleCompleted] = useState<boolean>(false);
  const [isLastIncorrect, setIsLastIncorrect] = useState<boolean>(false);

  // Reset all puzzle states on question transition
  useEffect(() => {
    setUserInputNum('');
    setUserAttempted(false);
    setHintLevel(0);
    setPuzzleCompleted(false);
    setIsLastIncorrect(false);
    setMultiplier(1);
  }, [currentPuzzleIdx, currentPuzzle.origDen, currentPuzzle.targetDen]);

  const baseNum = currentPuzzle.origNum;
  const baseDen = currentPuzzle.origDen;
  const equivDen = baseDen * multiplier;

  const handleCheckPuzzle = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    const trimmedInput = userInputNum.trim();
    if (!trimmedInput) return;

    setUserAttempted(true);
    const parsedNum = parseInt(trimmedInput, 10);
    const isCorrect = !isNaN(parsedNum) && parsedNum === currentPuzzle.expectedNum;

    if (isCorrect) {
      setPuzzleCompleted(true);
      setIsLastIncorrect(false);
      if (currentPuzzleIdx === PUZZLES.length - 1 && onComplete) {
        onComplete();
      }
    } else {
      setIsLastIncorrect(true);
      setHintLevel((prev) => Math.min(prev + 1, 2));
    }
  };

  const handleNextPuzzle = () => {
    if (currentPuzzleIdx < PUZZLES.length - 1) {
      setCurrentPuzzleIdx((prev) => prev + 1);
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
              ? 'Membahagi semula bahagian tanpa mengubah jumlah kawasan tersenarai!'
              : 'Subdivide existing parts without changing the total shaded area!'}
          </p>
        </div>
      </div>

      {/* SECTION 1: INTERACTIVE EXPLORATION (SUBDIVISION WITHOUT REVEALING ANSWER) */}
      <div className="space-y-4 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200">
        <div className="flex items-center justify-between">
          <h4 className="font-fredoka text-base font-bold text-emerald-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            {language === 'ms' ? '1 & 2. Ramal & Terokai Pembahagian Semula' : '1 & 2. Predict & Explore Subdivision'}
          </h4>
          <span className="text-xs font-fredoka font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            {language === 'ms' ? `Soalan ${currentPuzzleIdx + 1} daripada ${PUZZLES.length}` : `Question ${currentPuzzleIdx + 1} of ${PUZZLES.length}`}
          </span>
        </div>

        {/* Multiplier selector */}
        <div className="space-y-2">
          <label className="font-fredoka text-xs font-bold text-slate-700 block">
            {language === 'ms'
              ? 'Pilih Pengganda Pembahagian untuk memperhalusi kepingan:'
              : 'Select Subdivision Multiplier to split the pieces:'}
          </label>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMultiplier(m)}
                className={`px-4 py-2 rounded-xl font-fredoka font-bold text-xs sm:text-sm transition-all cursor-pointer ${
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

        {/* Visual Fraction Bars - Dynamic, Unrevealed before check */}
        <div className="space-y-3 pt-2">
          {/* Original Bar */}
          <div>
            <div className="flex justify-between text-xs font-fredoka font-bold text-slate-700 mb-1">
              <span>{language === 'ms' ? 'Jalur Asal:' : 'Original Bar:'} {baseNum}/{baseDen}</span>
            </div>
            <div className="w-full h-10 bg-slate-100 border-2 border-slate-300 rounded-xl overflow-hidden flex" data-testid="original-fraction-bar">
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

          {/* Subdivided Bar - Shows visual grid of pieces without revealing completed numerator */}
          <div>
            <div className="flex justify-between text-xs font-fredoka font-bold text-slate-700 mb-1">
              <span>
                {language === 'ms'
                  ? `Jalur Diperhalusi (${multiplier > 1 ? `Dibahagi ×${multiplier}` : 'Belum Dibahagi'}): ${equivDen} Bahagian`
                  : `Subdivided Bar (${multiplier > 1 ? `Split ×${multiplier}` : 'Unsplit'}): ${equivDen} Equal Parts`}
              </span>
              <span className="text-emerald-700 font-extrabold">
                {language === 'ms' ? 'Kawasan berlorek KEKAL SAMA!' : 'Shaded region REMAINS EQUAL!'}
              </span>
            </div>
            <div className="w-full h-10 bg-slate-100 border-2 border-slate-300 rounded-xl overflow-hidden flex" data-testid="equivalent-fraction-bar">
              {Array.from({ length: equivDen }).map((_, i) => {
                const isShaded = i < baseNum * multiplier;
                return (
                  <div
                    key={i}
                    style={{ width: `${100 / equivDen}%` }}
                    className={`h-full border-r border-slate-300/80 last:border-r-0 flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                      isShaded ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-300'
                    }`}
                  >
                    1/{equivDen}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: CONSTRUCT, CHECK & EXPLAIN */}
      <div className="space-y-4 bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
        <div className="flex items-center justify-between">
          <h4 className="font-fredoka text-base font-bold text-amber-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            {language === 'ms' ? '3. Bina & Semak Pecahan Setara' : '3. Construct & Check Equivalent Fraction'}
          </h4>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-200 text-center space-y-3">
          <p className="font-quicksand font-bold text-slate-800 text-sm sm:text-base">
            {language === 'ms'
              ? `Kira bilangan bahagian berlorek selepas pembahagian dan bina pecahan setara:`
              : `Count the shaded pieces after subdivision and construct the equivalent fraction:`}
          </p>

          <form onSubmit={handleCheckPuzzle} className="space-y-4">
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
                  aria-label={language === 'ms' ? 'Pengangka Jawapan' : 'Answer Numerator'}
                  value={userInputNum}
                  onChange={(e) => setUserInputNum(e.target.value)}
                  disabled={puzzleCompleted}
                  placeholder="?"
                  className="w-14 h-12 text-center bg-amber-100 border-2 border-amber-400 rounded-xl font-fredoka font-bold text-amber-900 text-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-75 disabled:cursor-not-allowed"
                />
                <span className="border-b-2 border-slate-800 w-14 my-0.5"></span>
                <span>{currentPuzzle.targetDen}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {!puzzleCompleted ? (
                <button
                  type="submit"
                  disabled={!userInputNum.trim()}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl font-fredoka font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  {language === 'ms' ? 'Semak Jawapan' : 'Check Answer'}
                </button>
              ) : (
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <span className="text-emerald-700 font-fredoka font-extrabold text-base flex items-center gap-1.5 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    {language === 'ms' ? 'Tepat Sekali!' : 'Correct!'}
                  </span>
                  {currentPuzzleIdx < PUZZLES.length - 1 && (
                    <button
                      type="button"
                      onClick={handleNextPuzzle}
                      className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl font-fredoka font-bold text-sm sm:text-base shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <span>{language === 'ms' ? 'Soalan Seterusnya' : 'Next Question'}</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Progressive Fino Hints & Explanation - SHOWN ONLY AFTER ATTEMPT */}
        {userAttempted && (
          <div
            className={`p-4 rounded-xl border-2 space-y-2 animate-fadeIn ${
              puzzleCompleted
                ? 'bg-emerald-50 border-emerald-300'
                : 'bg-sky-50 border-sky-300'
            }`}
          >
            <div className="flex items-center gap-2 font-fredoka font-bold text-sm">
              {puzzleCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : isLastIncorrect ? (
                <AlertCircle className="w-5 h-5 text-amber-600" />
              ) : (
                <HelpCircle className="w-5 h-5 text-sky-600" />
              )}
              <span className={puzzleCompleted ? 'text-emerald-900' : 'text-sky-900'}>
                {language === 'ms'
                  ? puzzleCompleted ? '4. Penemuan & Penerangan Fino:' : 'Petunjuk Bimbingan Fino:'
                  : puzzleCompleted ? "4. Fino's Explanation & Discovery:" : "Fino's Progressive Hint:"}
              </span>
            </div>

            <div className="font-quicksand font-semibold text-xs sm:text-sm text-slate-700 space-y-1">
              {puzzleCompleted ? (
                <div className="space-y-1" data-testid="completed-explanation">
                  <p className="text-emerald-900 font-extrabold text-base">
                    {baseNum}/{baseDen} = {currentPuzzle.expectedNum}/{currentPuzzle.targetDen}
                  </p>
                  <p className="text-emerald-800">
                    {language === 'ms'
                      ? `Syabas! Apabila pengangka (${baseNum}) dan penyebut (${baseDen}) kedua-duanya didarab dengan ${currentPuzzle.targetDen / baseDen}, jumlah kawasan berlorek tidak berubah!`
                      : `Great job! When numerator (${baseNum}) and denominator (${baseDen}) are both multiplied by ${currentPuzzle.targetDen / baseDen}, the total shaded area remains equal!`}
                  </p>
                </div>
              ) : hintLevel === 1 ? (
                <p className="text-amber-900" data-testid="hint-level-1">
                  {language === 'ms'
                    ? `Perhatikan penyebut: Bagaimanakah ${baseDen} menjadi ${currentPuzzle.targetDen}? Berapakah faktor pendarabannya?`
                    : `Look at the denominator: How does ${baseDen} become ${currentPuzzle.targetDen}? What factor was multiplied?`}
                </p>
              ) : (
                <p className="text-sky-900" data-testid="hint-level-2">
                  {language === 'ms'
                    ? `Petunjuk Lanjutan: Kerana penyebut didarab dengan ${currentPuzzle.targetDen / baseDen} (${baseDen} × ${currentPuzzle.targetDen / baseDen} = ${currentPuzzle.targetDen}), darabkan pengangka (${baseNum}) dengan ${currentPuzzle.targetDen / baseDen} juga!`
                    : `Further Hint: Since the denominator was multiplied by ${currentPuzzle.targetDen / baseDen} (${baseDen} × ${currentPuzzle.targetDen / baseDen} = ${currentPuzzle.targetDen}), multiply numerator (${baseNum}) by ${currentPuzzle.targetDen / baseDen} as well!`}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
