import { startOfToday, startOfYear } from "date-fns";
import { differenceInCalendarWeeksWithOptions } from "date-fns/fp";
import seedrandom from "seedrandom";

export function range(from: number, to: number, step: number): number[] {
  if (from > to) return [];
  return [from, ...range(from + step, to, step)];
}

function shuffleArray<T>(original: T[], getRandom: () => number): T[] {
  const array = [...original];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(getRandom() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export function getReviewYTD(): number {
  const diffrence = differenceInCalendarWeeksWithOptions({ weekStartsOn: 1 });
  return Math.round(diffrence(startOfYear(new Date()), startOfToday()) / 2) + 1;
}

export function generateRandomSequence<T>(
  elements: T[],
  length: number,
  seed: string
): T[] {
  const result: T[] = [];
  const rngGen = seedrandom(seed);
  while (result.length < length) {
    const newShuffle = shuffleArray(elements, rngGen);
    if (newShuffle.at(0) === result.at(-1)) {
      // We don't want repeating values
      newShuffle.reverse();
    }
    while (result.length < length && newShuffle.length) {
      result.push(newShuffle.shift() as T);
    }
  }
  return result;
}
