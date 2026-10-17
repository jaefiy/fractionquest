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
  home: string;
  resetProgress: string;
  confirmReset: string;
  activitySpaceNotice: string;
  finoSays: string;
  languageName: string;
  toggleMotion: string;
  reducedMotionOn: string;
  reducedMotionOff: string;
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
    home: "Halaman Utama",
    resetProgress: "Mula Semula Kembara",
    confirmReset: "Adakah anda pasti mahu memulakan semula kembara anda dari awal?",
    activitySpaceNotice: "Ruang Aktiviti Interaktif Matematik (Bakal Ditambah dalam Tugas Seterusnya)",
    finoSays: "Kata Fino:",
    languageName: "Bahasa Melayu",
    toggleMotion: "Mod Animasi",
    reducedMotionOn: "Animasi Dikurangkan",
    reducedMotionOff: "Animasi Penuh",
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
    home: "Home",
    resetProgress: "Reset Adventure",
    confirmReset: "Are you sure you want to restart your adventure from the beginning?",
    activitySpaceNotice: "Interactive Mathematics Activity Area (Reserved for future task implementation)",
    finoSays: "Fino says:",
    languageName: "English",
    toggleMotion: "Animation Mode",
    reducedMotionOn: "Reduced Motion On",
    reducedMotionOff: "Full Animation On",
  },
};
