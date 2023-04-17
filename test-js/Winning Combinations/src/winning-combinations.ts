type WinningCombinationsResult = [number, number[]][];

function call(lines: number[]): WinningCombinationsResult {
  const winningNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const losingNumbers = [10, 11, 12, 13, 14, 15];
  const wildCard = 0;

  const results: WinningCombinationsResult = [];

  // Check for three matching winning numbers in a row
  for (let i = 0; i < lines.length - 2; i++) {
    const currentNumber = lines[i];
    if (
      winningNumbers.includes(currentNumber) &&
      currentNumber === lines[i + 1] &&
      currentNumber === lines[i + 2]
    ) {
      const matchingIndices = [i, i + 1, i + 2];
      results.push([currentNumber, matchingIndices]);
    }
  }

  // Check for wild card combinations
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === wildCard) {
      // Check for three matching numbers with a wild card in the middle
      if (i > 0 && i < lines.length - 1) {
        const prevNumber = lines[i - 1];
        const nextNumber = lines[i + 1];
        if (prevNumber === nextNumber && winningNumbers.includes(prevNumber)) {
          const matchNumber = prevNumber;
          const matchingIndices = [i - 1, i, i + 1];
          lines[i] = matchNumber;
          results.push([matchNumber, matchingIndices]);
        }
      }

      // Check for adjacent winning numbers
      const adjacentNumbers = [];
      if (i > 0) adjacentNumbers.push(lines[i - 1]);
      if (i < lines.length - 1) adjacentNumbers.push(lines[i + 1]);
      for (const number of adjacentNumbers) {
        if (winningNumbers.includes(number)) {
          const matchingIndices = [i];
          for (let j = i - 1; j >= 0; j--) {
            if (lines[j] === wildCard || lines[j] === number) {
              matchingIndices.unshift(j);
            } else {
              break;
            }
          }
          for (let j = i + 1; j < lines.length; j++) {
            if (lines[j] === wildCard || lines[j] === number) {
              matchingIndices.push(j);
            } else {
              break;
            }
          }
          results.push([number, matchingIndices]);
        }
      }
    }
  }

  // Check for all losing numbers or all wild cards
  const allLosingNumbers = lines.every((number) =>
    losingNumbers.includes(number)
  );
  const allWildCards = lines.every((number) => number === wildCard);
  if (allLosingNumbers || allWildCards) {
    const matchingIndices = lines.map((_, i) => i);
    const matchNumber = allLosingNumbers ? losingNumbers[0] : wildCard;
    results.push([matchNumber, matchingIndices]);
  }

  return results;
}

export const WinningCombinations = { call };
