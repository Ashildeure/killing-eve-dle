import { Character } from "@/types/character"

function hasMatch(arr1: string[], arr2: string[]) {
  return arr1.some(value => arr2.includes(value))
}

export function compareCharacter(
  guess: Character,
  solution: Character
) {
  return {
    seasonStart:
      guess.seasonStart === solution.seasonStart
        ? "correct"
        : guess.seasonStart > solution.seasonStart
        ? "higher"
        : "lower",

    occupations: hasMatch(guess.occupations, solution.occupations),
    affiliations: hasMatch(guess.affiliations, solution.affiliations),
    nationalities: hasMatch(guess.nationalities, solution.nationalities),
    gender: guess.gender === solution.gender
  }
}