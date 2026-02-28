"use client"

import { useState } from "react"
import { getDailyCharacter } from "@/lib/getDailyCharacter"
import { compareCharacter } from "@/lib/compareCharacter"
import GuessInput from "./GuessInput"
import FeedbackRow from "./FeedbackRow"
import ShareButton from "./ShareButton"
import { Character } from "@/types/character"

const solution = getDailyCharacter()

export default function GameBoard() {
    const [guesses, setGuesses] = useState<
    { guess: Character; feedback: any }[]
    >([])

    const [won, setWon] = useState(false)

    function handleGuess(character: Character) {
    if (won) return

    const feedback = compareCharacter(character, solution)

    if (character.id === solution.id) {
        setWon(true)
    }

    setGuesses([...guesses, { guess: character, feedback }])
    }

    return (
    <div className="max-w-4xl mx-auto p-4 text-white">
        <h1 className="text-3xl font-bold mb-4">
        Killing Eve .dle
        </h1>

        <div className="grid grid-cols-6 gap-2 font-bold">
        <div>Name</div>
        <div>Season</div>
        <div>Job</div>
        <div>Org</div>
        <div>Nation</div>
        <div>Gender</div>
        </div>

        {guesses.map((g, i) => (
        <FeedbackRow
            key={i}
            guess={g.guess}
            feedback={g.feedback}
        />
        ))}

        {!won && <GuessInput onGuess={handleGuess} />}

        {won && (
        <ShareButton
            attempts={guesses.length}
            won={won}
        />
        )}
    </div>
    )
}