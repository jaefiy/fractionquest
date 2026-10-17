import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import { Header } from './components/Header';
import { WelcomePage } from './components/WelcomePage';
import { ChapterView } from './components/ChapterView';
import { AdventureMap } from './components/AdventureMap';
import { chaptersData } from './data/chapters';

function MainContent() {
  const { progress } = useProgress();
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const currentChapterData = chaptersData.find((ch) => ch.id === progress.currentChapter);

  return (
    <div className={`min-h-screen flex flex-col bg-cream-100 ${reducedMotion ? 'reduced-motion' : ''}`}>
      <Header
        onOpenMap={() => setIsMapOpen(true)}
        reducedMotion={reducedMotion}
        setReducedMotion={setReducedMotion}
      />

      <main className="flex-1 py-4">
        {progress.currentChapter === 0 || !currentChapterData ? (
          <WelcomePage />
        ) : (
          <ChapterView
            chapter={currentChapterData}
            onOpenMap={() => setIsMapOpen(true)}
          />
        )}
      </main>

      <AdventureMap isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />

      <footer className="py-6 px-4 text-center border-t border-sage-200 text-xs font-quicksand font-semibold text-slate-500">
        <p>FractionQuest: Fino's Fraction Adventure • Inovasi MTES6023 Matematik Tahun 4 KSSR</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ProgressProvider>
        <MainContent />
      </ProgressProvider>
    </LanguageProvider>
  );
}
