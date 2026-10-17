export function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const temp = y;
    y = x % y;
    x = temp;
  }
  return x || 1;
}

export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

export function getMultiples(n: number, count: number = 10): number[] {
  const result: number[] = [];
  for (let i = 1; i <= count; i++) {
    result.push(n * i);
  }
  return result;
}

export function isCommonMultiple(val: number, d1: number, d2: number): boolean {
  return val > 0 && val % d1 === 0 && val % d2 === 0;
}

export function checkEquivalent(
  origNum: number,
  origDen: number,
  targetNum: number,
  targetDen: number
): boolean {
  if (origDen === 0 || targetDen === 0) return false;
  return origNum * targetDen === targetNum * origDen;
}

export type DiagnosisResult = {
  isCorrect: boolean;
  code:
    | 'CORRECT_LCD'
    | 'CORRECT_COMMON_DENOMINATOR'
    | 'ADDED_DENOMINATORS_DIRECTLY'
    | 'UNCHANGED_NUMERATOR'
    | 'INCORRECT_MULTIPLIER'
    | 'NON_COMMON_DENOMINATOR'
    | 'INVALID_INPUT';
  feedback: {
    ms: string;
    en: string;
  };
};

export function diagnoseFractionAdditionConversion(
  n1: number,
  d1: number,
  n2: number,
  d2: number,
  userN1: number,
  userD1: number,
  userN2: number,
  userD2: number
): DiagnosisResult {
  if (
    isNaN(userN1) ||
    isNaN(userD1) ||
    isNaN(userN2) ||
    isNaN(userD2) ||
    userD1 <= 0 ||
    userD2 <= 0
  ) {
    return {
      isCorrect: false,
      code: 'INVALID_INPUT',
      feedback: {
        ms: 'Sila masukkan nombor bulat bernilai positif bagi penyebut.',
        en: 'Please enter positive whole numbers for denominators.',
      },
    };
  }

  // Check if denominators are equal
  if (userD1 !== userD2) {
    return {
      isCorrect: false,
      code: 'NON_COMMON_DENOMINATOR',
      feedback: {
        ms: 'Penyebut kedua-dua pecahan belum sama! Tukar kedua-duanya supaya penyebutnya bernilai sama.',
        en: 'The denominators of both fractions are not equal yet! Convert both so they share the same denominator.',
      },
    };
  }

  const chosenD = userD1;

  // Check if chosen denominator is a valid common multiple of d1 and d2
  if (chosenD % d1 !== 0 || chosenD % d2 !== 0) {
    return {
      isCorrect: false,
      code: 'NON_COMMON_DENOMINATOR',
      feedback: {
        ms: `Nombor ${chosenD} bukannya gandaan sepunya bagi ${d1} dan ${d2}. Pilih nombor yang boleh dibahagi tepat oleh ${d1} dan ${d2}.`,
        en: `The number ${chosenD} is not a common multiple of ${d1} and ${d2}. Choose a number divisible by both ${d1} and ${d2}.`,
      },
    };
  }

  // Check equivalence of fraction 1
  const frac1Valid = checkEquivalent(n1, d1, userN1, chosenD);
  // Check equivalence of fraction 2
  const frac2Valid = checkEquivalent(n2, d2, userN2, chosenD);

  if (!frac1Valid || !frac2Valid) {
    // Check specific misconception: pupil multiplied denominator but kept numerator unchanged
    if (userN1 === n1 && userD1 !== d1) {
      return {
        isCorrect: false,
        code: 'UNCHANGED_NUMERATOR',
        feedback: {
          ms: `Ingat! Apabila penyebut ${d1} didarab untuk menjadi ${chosenD}, pengangka (${n1}) juga MESTI didarab dengan nombor yang sama!`,
          en: `Remember! When denominator ${d1} is multiplied to become ${chosenD}, the numerator (${n1}) MUST also be multiplied by the same factor!`,
        },
      };
    }

    if (userN2 === n2 && userD2 !== d2) {
      return {
        isCorrect: false,
        code: 'UNCHANGED_NUMERATOR',
        feedback: {
          ms: `Ingat! Apabila penyebut ${d2} didarab untuk menjadi ${chosenD}, pengangka (${n2}) juga MESTI didarab dengan nombor yang sama!`,
          en: `Remember! When denominator ${d2} is multiplied to become ${chosenD}, the numerator (${n2}) MUST also be multiplied by the same factor!`,
        },
      };
    }

    return {
      isCorrect: false,
      code: 'INCORRECT_MULTIPLIER',
      feedback: {
        ms: 'Nilai pengangka tidak setara. Pastikan anda mendarab pengangka dan penyebut dengan faktor yang sama.',
        en: 'The numerator values are not equivalent. Ensure you multiply numerator and denominator by the exact same factor.',
      },
    };
  }

  const calculatedLcm = lcm(d1, d2);
  if (chosenD === calculatedLcm) {
    return {
      isCorrect: true,
      code: 'CORRECT_LCD',
      feedback: {
        ms: `Tepat sekali! Anda telah menukar kedua-dua pecahan menggunakan Penyebut Sepunya Terkecil (${calculatedLcm}).`,
        en: `Spot on! You converted both fractions using the Lowest Common Denominator (${calculatedLcm}).`,
      },
    };
  } else {
    return {
      isCorrect: true,
      code: 'CORRECT_COMMON_DENOMINATOR',
      feedback: {
        ms: `Syabas! ${chosenD} ialah penyebut sepunya yang sah! (Petunjuk: Penyebut sepunya terkecil ialah ${calculatedLcm}, tetapi ${chosenD} juga tepat secara matematik).`,
        en: `Great job! ${chosenD} is a valid common denominator! (Hint: The lowest common denominator is ${calculatedLcm}, but ${chosenD} is mathematically valid too).`,
      },
    };
  }
}
