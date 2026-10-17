import { Language } from '../data/translations';

export interface QuizQuestion {
  id: number;
  question: Record<Language, string>;
  options: {
    id: string;
    text: Record<Language, string>;
  }[];
  correctOptionId: string;
}

export const PRE_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: {
      ms: "Apakah fungsi utama PENYEBUT (nombor di bahagian bawah pecahan)?",
      en: "What is the main role of the DENOMINATOR (bottom number of a fraction)?",
    },
    options: [
      {
        id: "A",
        text: {
          ms: "Menunjukkan jumlah semua bahagian sama saiz dalam satu keseluruhan",
          en: "Shows the total number of equal parts in a whole",
        },
      },
      {
        id: "B",
        text: {
          ms: "Menunjukkan bilangan bahagian yang diambil atau dilorek",
          en: "Shows the number of parts taken or shaded",
        },
      },
      {
        id: "C",
        text: {
          ms: "Menunjukkan hasil tambah pengangka dan penyebut",
          en: "Shows the sum of numerator and denominator",
        },
      },
      {
        id: "D",
        text: {
          ms: "Menunjukkan nombor pendarab pecahan",
          en: "Shows the fraction multiplier",
        },
      },
    ],
    correctOptionId: "A",
  },
  {
    id: 2,
    question: {
      ms: "Antara kepingan pecahan unit 1/3 dan 1/6, kepingan manakah yang LEBIH BESAR?",
      en: "Between unit fraction pieces 1/3 and 1/6, which piece is LARGER?",
    },
    options: [
      {
        id: "A",
        text: {
          ms: "1/6 kerana 6 lebih besar daripada 3",
          en: "1/6 because 6 is larger than 3",
        },
      },
      {
        id: "B",
        text: {
          ms: "1/3 kerana keseluruhan dibahagikan kepada bahagian yang lebih sedikit (lebih besar)",
          en: "1/3 because the whole is divided into fewer (larger) parts",
        },
      },
      {
        id: "C",
        text: {
          ms: "Kedua-duanya sama besar",
          en: "Both are equal in size",
        },
      },
      {
        id: "D",
        text: {
          ms: "Tidak dapat dipastikan tanpa pembaris",
          en: "Cannot be determined without a ruler",
        },
      },
    ],
    correctOptionId: "B",
  },
  {
    id: 3,
    question: {
      ms: "Antara berikut, yang manakah pecahan setara bagi 1/4?",
      en: "Which of the following is an equivalent fraction for 1/4?",
    },
    options: [
      { id: "A", text: { ms: "2/8", en: "2/8" } },
      { id: "B", text: { ms: "2/4", en: "2/4" } },
      { id: "C", text: { ms: "1/8", en: "1/8" } },
      { id: "D", text: { ms: "3/8", en: "3/8" } },
    ],
    correctOptionId: "A",
  },
  {
    id: 4,
    question: {
      ms: "Apakah syarat UTAMA sebelum kita boleh menambah dua pecahan wajar?",
      en: "What is the MAIN requirement before we can add two proper fractions?",
    },
    options: [
      {
        id: "A",
        text: {
          ms: "Pengangka mesti bernilai sama",
          en: "Numerators must have the same value",
        },
      },
      {
        id: "B",
        text: {
          ms: "Penyebut mesti disamakan nilai penyebut sepunya terlebih dahulu",
          en: "Denominators must be made equal using a common denominator first",
        },
      },
      {
        id: "C",
        text: {
          ms: "Tambah terus pengangka dengan pengangka dan penyebut dengan penyebut",
          en: "Add numerators directly to numerators and denominators to denominators",
        },
      },
      {
        id: "D",
        text: {
          ms: "Tukar semua pecahan kepada nombor bercampur",
          en: "Convert all fractions to mixed numbers",
        },
      },
    ],
    correctOptionId: "B",
  },
  {
    id: 5,
    question: {
      ms: "Seorang murid menambah 1/3 + 1/5 dan mendapat jawapan 2/8. Mengapakah jawapan ini KURANG TEPAT?",
      en: "A pupil added 1/3 + 1/5 and got 2/8. Why is this answer INCORRECT?",
    },
    options: [
      {
        id: "A",
        text: {
          ms: "Kerana murid menambah penyebut secara terus tanpa menukar kepada saiz bahagian sepunya terlebih dahulu",
          en: "Because the pupil added denominators directly without converting to common piece sizes first",
        },
      },
      {
        id: "B",
        text: {
          ms: "Kerana 1 + 1 bukannya 2",
          en: "Because 1 + 1 is not 2",
        },
      },
      {
        id: "C",
        text: {
          ms: "Kerana 3 + 5 bukannya 8",
          en: "Because 3 + 5 is not 8",
        },
      },
      {
        id: "D",
        text: {
          ms: "Jawapan 2/8 sebenarnya adalah tepat",
          en: "The answer 2/8 is actually correct",
        },
      },
    ],
    correctOptionId: "A",
  },
];

export const POST_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: {
      ms: "Berapakah hasil tambah bagi 1/2 + 1/4?",
      en: "What is the sum of 1/2 + 1/4?",
    },
    options: [
      { id: "A", text: { ms: "2/6", en: "2/6" } },
      { id: "B", text: { ms: "3/4", en: "3/4" } },
      { id: "C", text: { ms: "2/4", en: "2/4" } },
      { id: "D", text: { ms: "1/6", en: "1/6" } },
    ],
    correctOptionId: "B",
  },
  {
    id: 2,
    question: {
      ms: "Apakah penyebut sepunya terkecil (PST) bagi penambahan 1/3 + 1/5?",
      en: "What is the lowest common denominator (LCD) for adding 1/3 + 1/5?",
    },
    options: [
      { id: "A", text: { ms: "8", en: "8" } },
      { id: "B", text: { ms: "15", en: "15" } },
      { id: "C", text: { ms: "10", en: "10" } },
      { id: "D", text: { ms: "12", en: "12" } },
    ],
    correctOptionId: "B",
  },
  {
    id: 3,
    question: {
      ms: "Berapakah hasil tambah 1/3 + 1/5 dalam bentuk termudah?",
      en: "What is the sum of 1/3 + 1/5 in simplest form?",
    },
    options: [
      { id: "A", text: { ms: "2/8", en: "2/8" } },
      { id: "B", text: { ms: "8/15", en: "8/15" } },
      { id: "C", text: { ms: "2/15", en: "2/15" } },
      { id: "D", text: { ms: "1/15", en: "1/15" } },
    ],
    correctOptionId: "B",
  },
  {
    id: 4,
    question: {
      ms: "Aina minum 1/6 liter jus epal dan 1/2 liter jus oren dari botol berkapasiti sama. Berapakah jumlah isi padu jus yang diminum oleh Aina?",
      en: "Aina drank 1/6 liter of apple juice and 1/2 liter of orange juice from identical bottles. What is the total volume of juice Aina drank?",
    },
    options: [
      { id: "A", text: { ms: "2/8 liter", en: "2/8 liter" } },
      { id: "B", text: { ms: "4/6 liter (atau 2/3 liter)", en: "4/6 liter (or 2/3 liter)" } },
      { id: "C", text: { ms: "1/8 liter", en: "1/8 liter" } },
      { id: "D", text: { ms: "3/6 liter", en: "3/6 liter" } },
    ],
    correctOptionId: "B",
  },
  {
    id: 5,
    question: {
      ms: "Antara langkah berikut, yang manakah LANGKAH PERTAMA yang BETUL untuk menyelesaikan 1/4 + 1/6?",
      en: "Which of the following is the CORRECT FIRST STEP to solve 1/4 + 1/6?",
    },
    options: [
      {
        id: "A",
        text: {
          ms: "Tukar 1/4 kepada 3/12 dan 1/6 kepada 2/12",
          en: "Convert 1/4 to 3/12 and 1/6 to 2/12",
        },
      },
      {
        id: "B",
        text: {
          ms: "Tambah 1 + 1 untuk pengangka dan 4 + 6 untuk penyebut",
          en: "Add 1 + 1 for numerator and 4 + 6 for denominator",
        },
      },
      {
        id: "C",
        text: {
          ms: "Darab 1/4 dengan 1/6 terus",
          en: "Multiply 1/4 by 1/6 directly",
        },
      },
      {
        id: "D",
        text: {
          ms: "Kekalkan pengangka dan tolak penyebut",
          en: "Keep numerators and subtract denominators",
        },
      },
    ],
    correctOptionId: "A",
  },
];
