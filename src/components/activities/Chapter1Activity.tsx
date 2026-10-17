import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CheckCircle2, AlertCircle, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';

interface Chapter1ActivityProps {
  onComplete?: () => void;
}

export const Chapter1Activity: React.FC<Chapter1ActivityProps> = ({ onComplete }) => {
  const { language } = useLanguage();

  // Denominator states for bar A and bar B (range 2 to 10)
  const [denA, setDenA] = useState<number>(3);
  const [denB, setDenB] = useState<number>(8);

  // Sequence state: Step 1 (Explore), Step 2 (Predict), Step 3 (Attempt / Assessment), Step 4 (Discover)
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);

  // Prediction selection
  const [prediction, setPrediction] = useState<'A' | 'B' | 'EQUAL' | null>(null);
  const [predictionSubmitted, setPredictionSubmitted] = useState<boolean>(false);

  // Short assessment questions state
  const [q1Answer, setQ1Answer] = useState<string>('');
  const [q2Answer, setQ2Answer] = useState<string>('');
  const [q3Answer, setQ3Answer] = useState<string>('');
  const [assessmentSubmitted, setAssessmentSubmitted] = useState<boolean>(false);

  // Helper renderer for a single fraction bar displaying 1/denom shaded
  const renderFractionBar = (denom: number, label: string, colorClass: string) => {
    const parts = Array.from({ length: denom }, (_, i) => i);
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm font-fredoka font-bold text-slate-700">
          <span>{label}: 1/{denom}</span>
          <span className="text-xs text-slate-500">
            {language === 'ms' ? `(1 daripada ${denom} bahagian)` : `(1 of ${denom} equal parts)`}
          </span>
        </div>
        <div className="w-full h-12 bg-slate-100 border-2 border-slate-300 rounded-xl overflow-hidden flex shadow-inner">
          {parts.map((index) => (
            <div
              key={index}
              style={{ width: `${100 / denom}%` }}
              className={`h-full border-r border-slate-300/80 last:border-r-0 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                index === 0 ? colorClass : 'bg-slate-50 text-slate-400'
              }`}
            >
              1/{denom}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handlePredictionSubmit = () => {
    if (!prediction) return;
    setPredictionSubmitted(true);
  };

  const handleAssessmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q1Answer || !q2Answer || !q3Answer) return;
    setAssessmentSubmitted(true);
    if (activeStep < 4) {
      setActiveStep(4);
    }
    if (onComplete) {
      onComplete();
    }
  };

  const isQ1Correct = q1Answer === 'TOTAL_PARTS';
  const isQ2Correct = q2Answer === 'TAKEN_PARTS';
  const isQ3Correct = q3Answer === 'ONE_THIRD';
  const allCorrect = isQ1Correct && isQ2Correct && isQ3Correct;

  return (
    <div className="bg-white rounded-2xl p-5 border-2 border-amber-200 shadow-sm space-y-6">
      {/* Activity Title Banner */}
      <div className="flex items-center gap-3 border-b border-amber-200 pb-3">
        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold font-fredoka text-xl">
          1
        </div>
        <div>
          <h3 className="font-fredoka text-xl font-bold text-slate-800">
            {language === 'ms' ? 'Misteri Bahagian Pecahan' : 'Mystery of Fraction Pieces'}
          </h3>
          <p className="font-quicksand text-xs font-semibold text-slate-500">
            {language === 'ms'
              ? 'Terokai, ramal, dan fahami hubungan penyebut dengan saiz pecahan unit!'
              : 'Explore, predict, and understand how denominators affect unit fraction sizes!'}
          </p>
        </div>
      </div>

      {/* Step Navigation Indicator */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-center text-xs font-fredoka font-bold">
        <button
          onClick={() => setActiveStep(1)}
          className={`p-2 rounded-xl border transition-all ${
            activeStep === 1
              ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
              : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
          }`}
        >
          1. {language === 'ms' ? 'Terokai' : 'Explore'}
        </button>
        <button
          onClick={() => setActiveStep(2)}
          className={`p-2 rounded-xl border transition-all ${
            activeStep === 2
              ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
              : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
          }`}
        >
          2. {language === 'ms' ? 'Ramalkan' : 'Predict'}
        </button>
        <button
          onClick={() => setActiveStep(3)}
          className={`p-2 rounded-xl border transition-all ${
            activeStep === 3
              ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
              : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
          }`}
        >
          3. {language === 'ms' ? 'Soalan' : 'Attempt'}
        </button>
        <button
          onClick={() => setActiveStep(4)}
          className={`p-2 rounded-xl border transition-all ${
            activeStep === 4
              ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
              : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
          }`}
        >
          4. {language === 'ms' ? 'Penemuan' : 'Discover'}
        </button>
      </div>

      {/* SECTION 1: EXPLORE - INTERACTIVE FRACTION BARS */}
      <div className="space-y-5 bg-amber-50/50 p-4 rounded-2xl border border-amber-200">
        <div className="flex items-center justify-between">
          <h4 className="font-fredoka text-base font-bold text-amber-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            {language === 'ms' ? 'Penyelasan Penyebut Interaktif' : 'Interactive Denominator Controls'}
          </h4>
        </div>

        {/* Adjuster controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-2">
            <label className="font-fredoka text-xs font-bold text-slate-700 block">
              {language === 'ms' ? 'Penyebut Jalur A:' : 'Bar A Denominator:'} <span className="text-amber-600 text-sm">{denA}</span>
            </label>
            <input
              type="range"
              min={2}
              max={10}
              value={denA}
              onChange={(e) => setDenA(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>1/2</span>
              <span>1/10</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-2">
            <label className="font-fredoka text-xs font-bold text-slate-700 block">
              {language === 'ms' ? 'Penyebut Jalur B:' : 'Bar B Denominator:'} <span className="text-teal-600 text-sm">{denB}</span>
            </label>
            <input
              type="range"
              min={2}
              max={10}
              value={denB}
              onChange={(e) => setDenB(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>1/2</span>
              <span>1/10</span>
            </div>
          </div>
        </div>

        {/* Visual Bars Rendering */}
        <div className="space-y-4 pt-2">
          {renderFractionBar(
            denA,
            language === 'ms' ? 'Jalur A' : 'Bar A',
            'bg-amber-400 text-amber-950 font-extrabold'
          )}
          {renderFractionBar(
            denB,
            language === 'ms' ? 'Jalur B' : 'Bar B',
            'bg-teal-400 text-teal-950 font-extrabold'
          )}
        </div>
      </div>

      {/* SECTION 2: PREDICT */}
      {activeStep >= 2 && (
        <div className="space-y-4 bg-sky-50/60 p-4 rounded-2xl border border-sky-200 animate-fadeIn">
          <h4 className="font-fredoka text-base font-bold text-sky-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-sky-600" />
            {language === 'ms' ? 'Langkah 2: Ramalkan Sebelum Semak' : 'Step 2: Predict Before Checking'}
          </h4>

          <p className="font-quicksand font-semibold text-sm text-slate-700">
            {language === 'ms'
              ? `Bandingkan kepingan 1/${denA} (Jalur A) dan 1/${denB} (Jalur B). Antara ramalan berikut, yang manakah BENAR?`
              : `Compare piece 1/${denA} (Bar A) and 1/${denB} (Bar B). Which prediction is TRUE?`}
          </p>

          <div className="space-y-2">
            <label
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                prediction === 'A'
                  ? 'bg-sky-100 border-sky-400 font-bold text-sky-900'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name="prediction"
                value="A"
                checked={prediction === 'A'}
                onChange={() => setPrediction('A')}
                className="accent-sky-600"
              />
              <span className="text-sm">
                1/{denA} {denA < denB ? '>' : '<'} 1/{denB} ({language === 'ms' ? `Kepingan 1/${denA} lebih ${denA < denB ? 'besar' : 'kecil'}` : `Piece 1/${denA} is ${denA < denB ? 'larger' : 'smaller'}`})
              </span>
            </label>

            <label
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                prediction === 'B'
                  ? 'bg-sky-100 border-sky-400 font-bold text-sky-900'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name="prediction"
                value="B"
                checked={prediction === 'B'}
                onChange={() => setPrediction('B')}
                className="accent-sky-600"
              />
              <span className="text-sm">
                1/{denB} {denB < denA ? '>' : '<'} 1/{denA} ({language === 'ms' ? `Kepingan 1/${denB} lebih ${denB < denA ? 'besar' : 'kecil'}` : `Piece 1/${denB} is ${denB < denA ? 'larger' : 'smaller'}`})
              </span>
            </label>

            <label
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                prediction === 'EQUAL'
                  ? 'bg-sky-100 border-sky-400 font-bold text-sky-900'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name="prediction"
                value="EQUAL"
                checked={prediction === 'EQUAL'}
                onChange={() => setPrediction('EQUAL')}
                className="accent-sky-600"
              />
              <span className="text-sm">
                {language === 'ms' ? 'Kedua-dua kepingan bersaiz sama' : 'Both pieces are equal in size'}
              </span>
            </label>
          </div>

          <div className="flex justify-between items-center pt-2">
            {!predictionSubmitted ? (
              <button
                onClick={handlePredictionSubmit}
                disabled={!prediction}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 text-white rounded-xl font-fredoka font-bold text-xs sm:text-sm shadow-sm transition-all"
              >
                {language === 'ms' ? 'Sahkan Ramalan' : 'Confirm Prediction'}
              </button>
            ) : (
              <div className="w-full bg-white p-3 rounded-xl border border-sky-300 space-y-1 text-xs">
                <span className="font-fredoka font-bold text-sky-900 block">
                  {language === 'ms' ? 'Maklum Balas Ramalan:' : 'Prediction Feedback:'}
                </span>
                <p className="font-quicksand text-slate-700">
                  {denA === denB
                    ? language === 'ms'
                      ? 'Penyebut sama! Oleh itu kedua-dua kepingan adalah sama saiz.'
                      : 'Same denominators! Thus both pieces are equal in size.'
                    : denA < denB
                    ? language === 'ms'
                      ? `Kerana Jalur A dibahagi kepada ${denA} bahagian sahaja, setiap kepingan 1/${denA} LEBIH BESAR daripada kepingan 1/${denB}!`
                      : `Because Bar A is divided into only ${denA} parts, each 1/${denA} piece is LARGER than a 1/${denB} piece!`
                    : language === 'ms'
                    ? `Kerana Jalur B dibahagi kepada ${denB} bahagian sahaja, setiap kepingan 1/${denB} LEBIH BESAR daripada kepingan 1/${denA}!`
                    : `Because Bar B is divided into only ${denB} parts, each 1/${denB} piece is LARGER than a 1/${denA} piece!`}
                </p>
              </div>
            )}

            {activeStep === 2 && (
              <button
                onClick={() => setActiveStep(3)}
                className="ml-auto px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-fredoka font-bold text-xs sm:text-sm shadow-sm flex items-center gap-1.5"
              >
                <span>{language === 'ms' ? 'Ke Soalan' : 'To Questions'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* SECTION 3: ATTEMPT (ASSESSMENT QUESTIONS) */}
      {activeStep >= 3 && (
        <form onSubmit={handleAssessmentSubmit} className="space-y-5 bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 animate-fadeIn">
          <h4 className="font-fredoka text-base font-bold text-emerald-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            {language === 'ms' ? 'Langkah 3: Soalan Minda Pecahan' : 'Step 3: Mind Challenge Questions'}
          </h4>

          {/* Q1 */}
          <div className="space-y-2 bg-white p-3.5 rounded-xl border border-emerald-200">
            <label className="font-fredoka text-xs font-bold text-slate-800 block">
              1. {language === 'ms' ? 'Apakah maksud PENYEBUT (nombor di bawah)?' : 'What does the DENOMINATOR (bottom number) represent?'}
            </label>
            <select
              value={q1Answer}
              onChange={(e) => setQ1Answer(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 font-quicksand text-xs sm:text-sm font-semibold bg-slate-50 focus:bg-white"
            >
              <option value="">-- {language === 'ms' ? 'Pilih Jawapan' : 'Select Answer'} --</option>
              <option value="TAKEN_PARTS">
                {language === 'ms' ? 'Jumlah bahagian yang diambil/dilorotkan' : 'Number of parts taken or shaded'}
              </option>
              <option value="TOTAL_PARTS">
                {language === 'ms' ? 'Jumlah SEMUA bahagian sama saiz dalam satu keseluruhan' : 'TOTAL number of equal parts in a whole'}
              </option>
              <option value="SUM_PARTS">
                {language === 'ms' ? 'Hasil tambah pengangka dan penyebut' : 'Sum of numerator and denominator'}
              </option>
            </select>
          </div>

          {/* Q2 */}
          <div className="space-y-2 bg-white p-3.5 rounded-xl border border-emerald-200">
            <label className="font-fredoka text-xs font-bold text-slate-800 block">
              2. {language === 'ms' ? 'Apakah maksud PENGANGKA (nombor di atas)?' : 'What does the NUMERATOR (top number) represent?'}
            </label>
            <select
              value={q2Answer}
              onChange={(e) => setQ2Answer(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 font-quicksand text-xs sm:text-sm font-semibold bg-slate-50 focus:bg-white"
            >
              <option value="">-- {language === 'ms' ? 'Pilih Jawapan' : 'Select Answer'} --</option>
              <option value="TOTAL_PARTS">
                {language === 'ms' ? 'Jumlah semua bahagian dalam satu keseluruhan' : 'Total parts in a whole'}
              </option>
              <option value="TAKEN_PARTS">
                {language === 'ms' ? 'Bilangan bahagian yang diambil atau dipilih' : 'Number of parts taken or selected'}
              </option>
              <option value="MULTIPLIER">
                {language === 'ms' ? 'Nombor pendarab pecahan' : 'Fraction multiplier number'}
              </option>
            </select>
          </div>

          {/* Q3 */}
          <div className="space-y-2 bg-white p-3.5 rounded-xl border border-emerald-200">
            <label className="font-fredoka text-xs font-bold text-slate-800 block">
              3. {language === 'ms' ? 'Antara 1/3 dan 1/8, kepingan yang manakah LEBIH BESAR?' : 'Between 1/3 and 1/8, which piece is LARGER?'}
            </label>
            <select
              value={q3Answer}
              onChange={(e) => setQ3Answer(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 font-quicksand text-xs sm:text-sm font-semibold bg-slate-50 focus:bg-white"
            >
              <option value="">-- {language === 'ms' ? 'Pilih Jawapan' : 'Select Answer'} --</option>
              <option value="ONE_THIRD">
                {language === 'ms' ? '1/3 lebih besar kerana dibahagi 3 bahagian sahaja' : '1/3 is larger because it is divided into only 3 parts'}
              </option>
              <option value="ONE_EIGHTH">
                {language === 'ms' ? '1/8 lebih besar kerana nombor 8 lebih besar daripada 3' : '1/8 is larger because 8 is bigger than 3'}
              </option>
              <option value="EQUAL">
                {language === 'ms' ? 'Kedua-duanya sama besar' : 'Both are equal in size'}
              </option>
            </select>
          </div>

          <button
            type="submit"
            disabled={!q1Answer || !q2Answer || !q3Answer}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-xl font-fredoka font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>{language === 'ms' ? 'Hantar Jawapan' : 'Submit Answers'}</span>
          </button>
        </form>
      )}

      {/* SECTION 4: PROGRESSIVE FEEDBACK & DISCOVERY */}
      {assessmentSubmitted && (
        <div
          className={`p-5 rounded-2xl border-2 space-y-3 animate-fadeIn ${
            allCorrect ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-50 border-amber-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {allCorrect ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            ) : (
              <AlertCircle className="w-6 h-6 text-amber-600" />
            )}
            <h4 className="font-fredoka text-lg font-bold text-slate-800">
              {allCorrect
                ? language === 'ms'
                  ? 'Tahniah! Penemuan Hebat!'
                  : 'Congratulations! Great Discovery!'
                : language === 'ms'
                ? 'Petunjuk Fino untuk Semakan'
                : "Fino's Guidance for Review"}
            </h4>
          </div>

          <div className="font-quicksand font-semibold text-sm text-slate-700 space-y-2">
            {allCorrect ? (
              <p>
                {language === 'ms'
                  ? 'Syabas! Anda telah membuktikan bahawa semakin BESAR nombor penyebut, semakin KECIL saiz kepingan pecahan unit tersebut. Ini kerana keseluruhan dibahagikan kepada lebih banyak bahagian!'
                  : 'Bravo! You proved that the LARGER the denominator, the SMALLER the size of each unit fraction piece. This is because the whole is split into more pieces!'}
              </p>
            ) : (
              <ul className="list-disc pl-5 space-y-1">
                {!isQ1Correct && (
                  <li>
                    {language === 'ms'
                      ? 'Penyebut (bawah) menunjukkan JUMLAH SEMUA bahagian sama saiz.'
                      : 'Denominator (bottom) shows the TOTAL number of equal parts.'}
                  </li>
                )}
                {!isQ2Correct && (
                  <li>
                    {language === 'ms'
                      ? 'Pengangka (atas) menunjukkan bilangan bahagian yang kita AMBIL.'
                      : 'Numerator (top) shows the number of parts TAKEN.'}
                  </li>
                )}
                {!isQ3Correct && (
                  <li>
                    {language === 'ms'
                      ? 'Ingat! Pembahagian 3 keping (1/3) memberikan kepingan LEBIH BESAR berbanding pembahagian 8 keping (1/8).'
                      : 'Remember! Dividing into 3 pieces (1/3) yields LARGER pieces than dividing into 8 pieces (1/8).'}
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
