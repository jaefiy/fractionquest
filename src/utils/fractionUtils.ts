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

export function simplifyFraction(num: number, den: number): { num: number; den: number } {
  if (den === 0) return { num, den };
  const divisor = gcd(num, den);
  return {
    num: num / divisor,
    den: den / divisor,
  };
}

export function addFractions(
  n1: number,
  d1: number,
  n2: number,
  d2: number
): {
  num: number;
  den: number;
  simplifiedNum: number;
  simplifiedDen: number;
  commonDen: number;
} {
  const commonDen = lcm(d1, d2);
  const eqN1 = n1 * (commonDen / d1);
  const eqN2 = n2 * (commonDen / d2);
  const num = eqN1 + eqN2;
  const simplified = simplifyFraction(num, commonDen);

  return {
    num,
    den: commonDen,
    simplifiedNum: simplified.num,
    simplifiedDen: simplified.den,
    commonDen,
  };
}

export type DiagnosisResult = {
  isCorrect: boolean;
  code:
    | 'CORRECT_LCD'
    | 'CORRECT_COMMON_DENOMINATOR'
    | 'CORRECT_SIMPLIFIED'
    | 'CORRECT_EQUIVALENT'
    | 'ADDED_DENOMINATORS_DIRECTLY'
    | 'ADDED_NUMERATORS_AND_DENOMINATORS_SEPARATELY'
    | 'UNCHANGED_NUMERATOR'
    | 'UNCHANGED_NUMERATOR_CONVERSION'
    | 'INCORRECT_COMMON_DENOMINATOR'
    | 'INCORRECT_MULTIPLIER'
    | 'NON_COMMON_DENOMINATOR'
    | 'ARITHMETIC_ERROR'
    | 'INCORRECT_SUM'
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

export function diagnoseFractionAdditionSum(
  n1: number,
  d1: number,
  n2: number,
  d2: number,
  userN: number,
  userD: number
): DiagnosisResult {
  if (isNaN(userN) || isNaN(userD) || userD <= 0) {
    return {
      isCorrect: false,
      code: 'INVALID_INPUT',
      feedback: {
        ms: 'Sila masukkan nombor bulat bernilai positif bagi penyebut jawapan.',
        en: 'Please enter positive whole numbers for the answer denominator.',
      },
    };
  }

  // Misconception 1: Pupil added numerators and denominators separately (e.g. 1/3 + 1/5 = 2/8)
  if (userN === n1 + n2 && userD === d1 + d2) {
    return {
      isCorrect: false,
      code: 'ADDED_NUMERATORS_AND_DENOMINATORS_SEPARATELY',
      feedback: {
        ms: `Anda mungkin telah menambah pengangka dan penyebut secara berasingan (${n1}+${n2}=${userN} dan ${d1}+${d2}=${userD}). Ingat, penyebut menunjukkan saiz bahagian dan MESTI disamakan terlebih dahulu sebelum menambah pengangka sahaja!`,
        en: `You may have added the numerators and denominators separately (${n1}+${n2}=${userN} and ${d1}+${d2}=${userD}). Remember, denominators represent piece sizes and MUST be made equal before adding numerators only!`,
      },
    };
  }

  // Calculate true sum
  const sumObj = addFractions(n1, d1, n2, d2);
  const isMathCorrect = checkEquivalent(sumObj.num, sumObj.den, userN, userD);

  if (isMathCorrect) {
    const isSimplified = userN === sumObj.simplifiedNum && userD === sumObj.simplifiedDen;
    if (isSimplified) {
      return {
        isCorrect: true,
        code: 'CORRECT_SIMPLIFIED',
        feedback: {
          ms: `Tepat sekali! Jawapan anda ${userN}/${userD} adalah betul dan dalam bentuk termudah!`,
          en: `Spot on! Your answer ${userN}/${userD} is correct and in simplest form!`,
        },
      };
    } else {
      return {
        isCorrect: true,
        code: 'CORRECT_EQUIVALENT',
        feedback: {
          ms: `Jawapan ${userN}/${userD} adalah tepat! Bolehkah anda mempermudahkannya kepada ${sumObj.simplifiedNum}/${sumObj.simplifiedDen}?`,
          en: `The answer ${userN}/${userD} is correct! Can you simplify it to ${sumObj.simplifiedNum}/${sumObj.simplifiedDen}?`,
        },
      };
    }
  }

  // Check if chosen denominator is a valid common multiple of d1 and d2
  const isValidCommonDenom = userD % d1 === 0 && userD % d2 === 0;

  if (!isValidCommonDenom) {
    return {
      isCorrect: false,
      code: 'INCORRECT_COMMON_DENOMINATOR',
      feedback: {
        ms: `Anda mungkin telah memilih penyebut (${userD}) yang bukannya gandaan sepunya bagi ${d1} dan ${d2}. Pilih nombor gandaan sepunya seperti ${sumObj.commonDen}.`,
        en: `You may have chosen a denominator (${userD}) that is not a common multiple of ${d1} and ${d2}. Choose a common multiple like ${sumObj.commonDen}.`,
      },
    };
  }

  // If common denominator is valid, check if pupil added original numerators directly on common denominator
  if (userN === n1 + n2) {
    return {
      isCorrect: false,
      code: 'UNCHANGED_NUMERATOR_CONVERSION',
      feedback: {
        ms: `Anda mungkin terlupa menukar pengangka kepada pecahan setara sebelum menambah. Apabila penyebut ditukar kepada ${userD}, pengangka juga MESTI didarab!`,
        en: `You may have forgotten to convert the numerators into equivalent fractions before adding. When changing the denominator to ${userD}, numerators MUST also be multiplied!`,
      },
    };
  }

  // If common denominator is valid, but numerator calculation is wrong
  const eqN1 = n1 * (userD / d1);
  const eqN2 = n2 * (userD / d2);
  const expectedN = eqN1 + eqN2;

  return {
    isCorrect: false,
    code: 'ARITHMETIC_ERROR',
    feedback: {
      ms: `Anda mungkin telah memilih penyebut sepunya yang betul (${userD}), tetapi terdapat kesilapan pengiraan pengangka. (${n1}/${d1} = ${eqN1}/${userD}, ${n2}/${d2} = ${eqN2}/${userD}). Hasil tambah pengangka sepatutnya ${expectedN}.`,
      en: `You may have selected a correct common denominator (${userD}), but made an arithmetic error in the numerators. (${n1}/${d1} = ${eqN1}/${userD}, ${n2}/${d2} = ${eqN2}/${userD}). The numerator sum should be ${expectedN}.`,
    },
  };
}
