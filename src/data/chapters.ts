import { Language } from './translations';

export interface Chapter {
  id: number;
  title: Record<Language, string>;
  learningPurpose: Record<Language, string>;
  storyIntro: Record<Language, string>;
  finoDialogue: Record<Language, string>;
  themeColor: 'cream' | 'sage' | 'peach' | 'lavender' | 'skyblue';
  iconName: string;
}

export const chaptersData: Chapter[] = [
  {
    id: 1,
    title: {
      ms: "1. Misteri Bahagian Pecahan",
      en: "1. The Mystery of Fraction Pieces",
    },
    learningPurpose: {
      ms: "Mengenal pasti pengangka, penyebut dan konsep bahagian sama saiz sebelum membuat penambahan.",
      en: "Identify numerators, denominators, and equal-part concepts prior to fraction addition.",
    },
    storyIntro: {
      ms: "Fino menjumpai sebahagian halaman daripada Buku Pecahan Ajaib di tepi sungai! Namun, corak dan bahagiannya terpisah. Fino perlu memahami makna pengangka dan penyebut untuk menyusun semula kepingan misteri ini.",
      en: "Fino found scattered pages of the Magical Fraction Book by the river! However, the patterns and parts are separated. Fino needs to understand the meaning of numerators and denominators to assemble these mystery pieces.",
    },
    finoDialogue: {
      ms: "Kawan-kawan! Ingat ya, pengangka ialah bahagian yang kita ambil (di atas), manakala penyebut ialah jumlah semua bahagian sama saiz (di bawah)!",
      en: "Friends! Remember, the numerator is the part we take (top), while the denominator is the total number of equal parts (bottom)!",
    },
    themeColor: 'peach',
    iconName: 'Puzzle',
  },
  {
    id: 2,
    title: {
      ms: "2. Hutan Pecahan Setara",
      en: "2. The Forest of Equivalent Fractions",
    },
    learningPurpose: {
      ms: "Memahami pecahan setara dengan mendarab pengangka dan penyebut dengan nombor yang sama.",
      en: "Understand equivalent fractions by multiplying the numerator and denominator by the same number.",
    },
    storyIntro: {
      ms: "Perjalanan Fino diteruskan ke Hutan Pecahan Setara. Di sini, pokok-pokok tumbuh mengikut nisbah pecahan yang seimbang! Untuk melepasi hutan ini, Fino mesti mencari pecahan yang nilainya sama walaupun angka penyebutnya berbeza.",
      en: "Fino's journey continues into the Forest of Equivalent Fractions. Here, trees grow in balanced fraction proportions! To pass through the forest, Fino must find fractions with equal value despite having different denominators.",
    },
    finoDialogue: {
      ms: "Lihat! 1/2 adalah sama nilainya dengan 2/4 dan 4/8! Apabila kita darab atas dan bawah dengan nombor yang sama, nilainya tidak berubah!",
      en: "Look! 1/2 has the exact same value as 2/4 and 4/8! When we multiply top and bottom by the same number, its value remains equal!",
    },
    themeColor: 'sage',
    iconName: 'Trees',
  },
  {
    id: 3,
    title: {
      ms: "3. Jambatan Bahagian Sama Saiz",
      en: "3. The Bridge of Equal Parts",
    },
    learningPurpose: {
      ms: "Menukar pecahan supaya mempunyai penyebut sepunya sebelum boleh ditambah.",
      en: "Convert fractions to have a common denominator before they can be added together.",
    },
    storyIntro: {
      ms: "Fino tiba di sebuah jambatan gantung yang terputus. Papan jambatan ini mempunyai saiz pembahagian yang berbeza! Fino tidak boleh menggabungkan dua keping papan melainkan saiz pembahagiannya (penyebut) dijadikan sama terlebih dahulu.",
      en: "Fino arrives at a broken suspension bridge. The bridge planks have different division sizes! Fino cannot combine two planks unless their division sizes (denominators) are made equal first.",
    },
    finoDialogue: {
      ms: "Kawan-kawan! Cuba perhatikan papan jambatan ini. Bolehkah kita menggabungkan dua keping papan jika saiz pembahagiannya berbeza? Mari terokai gandaan penyebut untuk mencari saiz bahagian yang sama!",
      en: "Friends! Look closely at these bridge planks. Can we join two planks if their division sizes are different? Let's explore denominator multiples to find equal division sizes!",
    },
    themeColor: 'skyblue',
    iconName: 'Bridge',
  },
  {
    id: 4,
    title: {
      ms: "4. Istana Penambahan Pecahan",
      en: "4. The Castle of Fraction Addition",
    },
    learningPurpose: {
      ms: "Menambah dua pecahan wajar penyebut berbeza dan mempermudahkan jawapan.",
      en: "Add two proper fractions with different denominators and simplify the final sum.",
    },
    storyIntro: {
      ms: "Pintu Istana Penambahan Pecahan terkunci rapat! Pintu ajaib ini hanya akan terbuka apabila Fino berjaya menambah dua pecahan wajar yang mempunyai penyebut berbeza dengan betul.",
      en: "The doors of the Castle of Fraction Addition are locked tight! This magical door will only open when Fino successfully adds two proper fractions with different denominators correctly.",
    },
    finoDialogue: {
      ms: "Langkah mudah: 1) Samakan penyebut dengan pecahan setara. 2) Tambah PENGANGKA sahaja. 3) Kekalkan PENYEBUT sepunya!",
      en: "Easy steps: 1) Match denominators using equivalent fractions. 2) Add NUMERATORS only. 3) Keep the common DENOMINATOR!",
    },
    themeColor: 'lavender',
    iconName: 'Castle',
  },
  {
    id: 5,
    title: {
      ms: "5. Misi Terakhir Pecahan",
      en: "5. The Final Fraction Quest",
    },
    learningPurpose: {
      ms: "Mengaplikasi kemahiran penambahan pecahan wajar untuk melengkapkan Buku Pecahan Ajaib.",
      en: "Apply proper fraction addition skills to complete and restore the Magical Fraction Book.",
    },
    storyIntro: {
      ms: "Inilah bab terakhir! Fino telah sampai ke puncak Gunung Pecahan. Semua halaman telah dikumpul, tetapi kepingan terakhir memerlukan Fino menyelesaikan cabaran penambahan pecahan untuk memulihkan keajaiban buku!",
      en: "This is the final chapter! Fino has reached the peak of Fraction Mountain. All pages have been gathered, but the final piece requires Fino to solve the fraction addition challenge to restore the book's magic!",
    },
    finoDialogue: {
      ms: "Syabas pengembara bijak! Mari kita selesaikan cabaran terakhir ini bersama-sama dan pulihkan Buku Pecahan Ajaib!",
      en: "Bravo smart explorer! Let's solve this final challenge together and restore the Magical Fraction Book!",
    },
    themeColor: 'cream',
    iconName: 'Sparkles',
  },
];
