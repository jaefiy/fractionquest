import React from 'react';

interface StorybookCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'cream' | 'sage' | 'peach' | 'lavender' | 'skyblue';
  hasBorderDecoration?: boolean;
}

export const StorybookCard: React.FC<StorybookCardProps> = ({
  children,
  className = '',
  variant = 'cream',
  hasBorderDecoration = true,
}) => {
  const variantStyles = {
    cream: 'bg-cream-50 border-peach-200 text-slate-800',
    sage: 'bg-sage-50 border-sage-200 text-slate-800',
    peach: 'bg-peach-50 border-peach-200 text-slate-800',
    lavender: 'bg-lavender-50 border-lavender-200 text-slate-800',
    skyblue: 'bg-skyblue-50 border-skyblue-200 text-slate-800',
  }[variant];

  return (
    <div
      className={`relative rounded-storybook border-4 shadow-storybook transition-all duration-300 p-6 md:p-8 ${variantStyles} ${className}`}
    >
      {hasBorderDecoration && (
        <>
          {/* Top-left corner star decoration */}
          <div className="absolute -top-3 -left-3 text-peach-400 select-none">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
            </svg>
          </div>
          {/* Top-right corner star decoration */}
          <div className="absolute -top-3 -right-3 text-sage-400 select-none">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
            </svg>
          </div>
        </>
      )}
      {children}
    </div>
  );
};
