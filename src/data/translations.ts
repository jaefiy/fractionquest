export type Language = 'ms' | 'en';

export interface TranslationStructure {
  appTitle: string;
  subtitle: string;
  mascotName: string;
  startAdventure: string;
  continueAdventure: string;
  adventureMap: string;
  chapter: string;
  chapterShort: string;
  welcomeHeading: string;
  welcomeIntro: string;
  kssrStandard: string;
  learningFocus: string;
  progressTitle: string;
  completed: string;
  locked: string;
  unlocked: string;
  nextChapter: string;
  prevChapter: string;
  nextActivity: string;
  prevActivity: string;
  home: string;
  resetProgress: string;
  confirmReset: string;
  activitySpaceNotice: string;
  finoSays: string;
  languageName: string;
  toggleMotion: string;
  reducedMotionOn: string;
  reducedMotionOff: string;
  submitAnswer: string;
  tryAgain: string;
  checkAnswer: string;
  nextChallenge: string;
  exploreTitle: string;
  predictTitle: string;
  attemptTitle: string;
  discoverTitle: string;
  hintTitle: string;
  ch1PredictPrompt: string;
  ch1PredictEqual: string;
  ch1PredictAIsBigger: string;
  ch1PredictBIsBigger: string;
  ch1PredictSubmit: string;
  ch1AssessmentTitle: string;
  ch1Q1Title: string;
  ch1Q2Title: string;
  ch1Q3Title: string;
  ch2SubdivideTitle: string;
  ch2SelectMultiplier: string;
  ch2OriginalValue: string;
  ch2EquivalentValue: string;
  ch2PuzzleTitle: string;
  ch3MultiplesTitle: string;
  ch3SelectMultiplesFor: string;
  ch3SelectCommonDenominator: string;
  ch3ConvertFractionsTitle: string;
}

export const translations: Record<Language, TranslationStructure> = {
  ms: {
    appTitle: "FractionQuest: Kembara Pecahan Fino",
    subtitle: "Inovasi Pembelajaran Matematik Tahun 4 KSSR",
    mascotName: "Fino Si Musang",
    startAdventure: "Mula Kembara",
    continueAdventure: "Teruskan Kembara",
    adventureMap: "Peta Kembara",
    chapter: "Bab",
    chapterShort: "Bab",
    welcomeHeading: "Selamat Datang ke Buku Pecahan Ajaib!",
    welcomeIntro: "Oh tidak! Halaman Buku Pecahan Ajaib telah hilang dan diterbangkan angin kencang. Mari bantu Fino si musang pengembara mengumpul semula semua halaman dengan menyelesaikan kembara pecahan!",
    kssrStandard: "Standard Kandungan 2.1 (Pecahan) - Standard Pembelajaran 2.1.2: Menambah dua pecahan wajar yang penyebutnya berbeza.",
    learningFocus: "Fokus Pembelajaran: Menambah dua pecahan wajar dengan penyebut tidak sama menggunakan pecahan setara dan penyebut sepunya.",
    progressTitle: "Kemajuan Kembara",
    completed: "Selesai",
    locked: "Terkunci",
    unlocked: "Boleh Diterokai",
    nextChapter: "Bab Seterusnya",
    prevChapter: "Bab Sebelum",
    nextActivity: "Aktiviti Seterusnya",
    prevActivity: "Aktiviti Sebelum",
    home: "Halaman Utama",
    resetProgress: "Mula Semula Kembara",
    confirmReset: "Adakah anda pasti mahu memulakan semula kembara anda dari awal?",
    activitySpaceNotice: "Ruang Aktiviti Interaktif Matematik",
    finoSays: "Kata Fino:",
    languageName: "Bahasa Melayu",
    toggleMotion: "Mod Animasi",
    reducedMotionOn: "Animasi Dikurangkan",
    reducedMotionOff: "Animasi Penuh",
    submitAnswer: "Hantar Jawapan",
    tryAgain: "Cuba Lagi",
    checkAnswer: "Semak Jawapan",
    nextChallenge: "Cabaran Seterusnya",
    exploreTitle: "1. Terokai Jalur Pecahan",
    predictTitle: "2. Ramalkan Saiz Pecahan Unit",
    attemptTitle: "3. Soalan Minda",
    discoverTitle: "4. Penemuan Fino",
    hintTitle: "Petunjuk Fino",
    ch1PredictPrompt: "Apabila penyebut bertambah besar, apakah yang berlaku kepada saiz satu bahagian (pecahan unit)?",
    ch1PredictEqual: "Saiz bahagian kekal sama",
    ch1PredictAIsBigger: "Pecahan dengan penyebut kecil mempunyai bahagian LEBIH BESAR",
    ch1PredictBIsBigger: "Pecahan dengan penyebut besar mempunyai bahagian LEBIH BESAR",
    ch1PredictSubmit: "Sahkan Ramalan",
    ch1AssessmentTitle: "Uji Kefahaman Anda",
    ch1Q1Title: "Apakah fungsi PENYEBUT (nombor di bawah)?",
    ch1Q2Title: "Apakah fungsi PENGANGKA (nombor di atas)?",
    ch1Q3Title: "Antara 1/3 dan 1/8, yang manakah kepingan pecahan yang lebih besar?",
    ch2SubdivideTitle: "Bina Pecahan Setara dengan Pembahagian Semula",
    ch2SelectMultiplier: "Pilih pengganda pembahagian:",
    ch2OriginalValue: "Pecahan Asal:",
    ch2EquivalentValue: "Pecahan Setara:",
    ch2PuzzleTitle: "Cabaran Menukar Pecahan Setara",
    ch3MultiplesTitle: "Penjelajah Gandaan Sepunya",
    ch3SelectMultiplesFor: "Pilih gandaan bagi:",
    ch3SelectCommonDenominator: "Pilih Penyebut Sepunya yang sesuai:",
    ch3ConvertFractionsTitle: "Tukar Pecahan kepada Penyebut Sepunya",
  },
  en: {
    appTitle: "FractionQuest: Fino's Fraction Adventure",
    subtitle: "Year 4 KSSR Mathematics Learning Innovation",
    mascotName: "Fino the Explorer Fox",
    startAdventure: "Start Adventure",
    continueAdventure: "Continue Adventure",
    adventureMap: "Adventure Map",
    chapter: "Chapter",
    chapterShort: "Ch.",
    welcomeHeading: "Welcome to the Magical Fraction Book!",
    welcomeIntro: "Oh no! The pages of the Magical Fraction Book have scattered in a strong gust of wind. Help Fino the explorer fox recover all pages by embarking on a fraction adventure!",
    kssrStandard: "Content Standard 2.1 (Fractions) - Learning Standard 2.1.2: Add two proper fractions with different denominators.",
    learningFocus: "Learning Focus: Adding two proper fractions with unequal denominators using equivalent fractions and common denominators.",
    progressTitle: "Adventure Progress",
    completed: "Completed",
    locked: "Locked",
    unlocked: "Available",
    nextChapter: "Next Chapter",
    prevChapter: "Previous Chapter",
    nextActivity: "Next Activity",
    prevActivity: "Previous Activity",
    home: "Home",
    resetProgress: "Reset Adventure",
    confirmReset: "Are you sure you want to restart your adventure from the beginning?",
    activitySpaceNotice: "Interactive Mathematics Activity Area",
    finoSays: "Fino says:",
    languageName: "English",
    toggleMotion: "Animation Mode",
    reducedMotionOn: "Reduced Motion On",
    reducedMotionOff: "Full Animation On",
    submitAnswer: "Submit Answer",
    tryAgain: "Try Again",
    checkAnswer: "Check Answer",
    nextChallenge: "Next Challenge",
    exploreTitle: "1. Explore Fraction Bars",
    predictTitle: "2. Predict Unit Fraction Size",
    attemptTitle: "3. Mind Challenge",
    discoverTitle: "4. Fino's Discovery",
    hintTitle: "Fino's Hint",
    ch1PredictPrompt: "As the denominator gets larger, what happens to the size of one unit fraction piece?",
    ch1PredictEqual: "The piece size stays the same",
    ch1PredictAIsBigger: "Fraction with smaller denominator has BIGGER pieces",
    ch1PredictBIsBigger: "Fraction with larger denominator has BIGGER pieces",
    ch1PredictSubmit: "Confirm Prediction",
    ch1AssessmentTitle: "Test Your Understanding",
    ch1Q1Title: "What is the role of the DENOMINATOR (bottom number)?",
    ch1Q2Title: "What is the role of the NUMERATOR (top number)?",
    ch1Q3Title: "Between 1/3 and 1/8, which fraction piece is larger?",
    ch2SubdivideTitle: "Build Equivalent Fractions by Subdividing",
    ch2SelectMultiplier: "Select subdivision multiplier:",
    ch2OriginalValue: "Original Fraction:",
    ch2EquivalentValue: "Equivalent Fraction:",
    ch2PuzzleTitle: "Equivalent Fraction Conversion Challenge",
    ch3MultiplesTitle: "Common Multiple Explorer",
    ch3SelectMultiplesFor: "Select multiples for:",
    ch3SelectCommonDenominator: "Select a suitable Common Denominator:",
    ch3ConvertFractionsTitle: "Convert Fractions to Shared Denominator",
  },
};
