import React from 'react';
import { FinoMascot, FinoExpression } from '../FinoMascot';

interface DialoguePanelProps {
  dialogue: string;
  expression?: FinoExpression;
  title?: string;
  className?: string;
}

export const DialoguePanel: React.FC<DialoguePanelProps> = ({
  dialogue,
  expression = 'welcoming',
  title = "Fino",
  className = '',
}) => {
  return (
    <div className={`flex flex-col sm:flex-row items-center gap-4 bg-cream-200/90 border-2 border-peach-300 rounded-3xl p-4 sm:p-5 shadow-sm ${className}`}>
      <div className="flex-shrink-0">
        <FinoMascot expression={expression} size="sm" />
      </div>

      <div className="relative flex-1 bg-white/90 border border-peach-200 rounded-2xl p-4 text-slate-700 shadow-inner">
        {/* Speech Bubble Arrow */}
        <div className="hidden sm:block absolute -left-3 top-1/2 -translate-y-1/2 w-0 h-0 border-y-8 border-y-transparent border-r-8 border-r-white" />

        <div className="flex items-center gap-2 mb-1">
          <span className="font-fredoka text-sm font-semibold text-fino-darkOrange bg-peach-100 px-2.5 py-0.5 rounded-full border border-peach-300">
            {title}
          </span>
        </div>

        <p className="text-base sm:text-lg leading-relaxed font-quicksand font-medium text-slate-800">
          "{dialogue}"
        </p>
      </div>
    </div>
  );
};
