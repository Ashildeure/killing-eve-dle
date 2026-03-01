import { Character } from "@/types/character"

function compareArray(arr1: string[], arr2: string[]) {
    if (arr1.length === 0 && arr2.length === 0) {
        return "correct"
    }
    const common = arr1.filter(value => arr2.includes(value))

    if (common.length === 0) return false
    if (common.length === arr1.length && common.length === arr2.length)
        return "correct"

    return "semi"
}

export function compareCharacter(
  guess: Character,
  solution: Character
) {
  return {
    name: guess.id === solution.id ? "correct" : false,

    seasonStart:
      guess.seasonStart === solution.seasonStart
        ? "correct"
        : guess.seasonStart < solution.seasonStart
        ? "higher"
        : "lower",

    occupations: compareArray(guess.occupations, solution.occupations),
    affiliations: compareArray(guess.affiliations, solution.affiliations),
    nationalities: compareArray(guess.nationalities, solution.nationalities),

    gender: guess.gender === solution.gender
  }
}