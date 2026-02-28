import { Character } from "@/types/character"

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

    occupation:
        guess.occupation === solution.occupation,

    affiliation:
        guess.affiliation === solution.affiliation,

    nationality:
        guess.nationality === solution.nationality,

    gender:
        guess.gender === solution.gender
    }
}