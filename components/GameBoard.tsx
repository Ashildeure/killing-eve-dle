"use client"

import { useState } from "react"
import { characters } from "@/data/characters"
import { compareCharacter } from "@/lib/compareCharacter"
import GuessInput from "./GuessInput"
import FeedbackRow from "./FeedbackRow"
import ShareButton from "./ShareButton"
import { Character } from "@/types/character"

export default function GameBoard() {
  const [solution, setSolution] = useState<Character>(() => {
    return characters[Math.floor(Math.random() * characters.length)]
  })

  const winGifs = [
    "/gifs/win1.gif",
    "/gifs/win2.gif",
    "/gifs/win3.gif",
    "/gifs/win4.gif",
    "/gifs/win5.gif",
    "/gifs/win6.gif"
    ]

    const [winGif, setWinGif] = useState<string | null>(null)
    const [guesses, setGuesses] = useState<
    { guess: Character; feedback: any }[]
    >([])

    const [won, setWon] = useState(false)

    function handleGuess(character: Character) {
        if (won) return

        const feedback = compareCharacter(character, solution)
        setGuesses(prev => [...prev, { guess: character, feedback }])

        if (character.id === solution.id) {
            setWon(true)

            const randomGif =
            winGifs[Math.floor(Math.random() * winGifs.length)]

            setWinGif(randomGif)
        }
    }

    function playAgain() {
        const random =
            characters[Math.floor(Math.random() * characters.length)]
        setSolution(random)
        setGuesses([])
        setWon(false)
        setWinGif(null)
    }

    return (
    <div className="container">
        <h1>Killing Eve <span style={{color:'#e11d48'}}>.dle</span></h1>
        <p style={{textAlign:'center', color:'#ccc', marginBottom:'2rem'}}>Guess the character</p>

        <div className="game-board">

        {/* En-têtes */}
        <div className="grid-header">
            <div>Name</div>
            <div>Season</div>
            <div>Occupation</div>
            <div>Affiliation</div>
            <div>Nationality</div>
            <div>Gender</div>
        </div>

        {/* Feedbacks */}
        <div style={{marginTop:'1rem'}}>
            {guesses.map((g, i) => (
            <FeedbackRow
                key={i}
                guess={g.guess}
                feedback={g.feedback}
            />
            ))}
        </div>

        {/* Input si pas encore gagné */}
        {!won && (
            <div style={{marginTop:'1.5rem'}}>
            <GuessInput onGuess={handleGuess} guesses={guesses.map(g => g.guess)} />
            </div>
        )}

        {/* Message victoire & boutons */}
        {won && (
            <div style={{textAlign:'center', marginTop:'1.5rem'}}>
            <p style={{color:'#22c55e', fontWeight:'bold'}}>🎉 You got it!</p>

            <button
                onClick={playAgain}
                className="play-again"
                style={{marginTop:'1rem'}}
            >
                ⭮ Play Again
            </button>
            </div>
        )}
        {winGif && (
            <div style={{ marginTop: "1.5rem", display: "flex", justifyContent:"center" }}>
                <img
                src={winGif}
                alt="Victory gif"
                style={{
                    width: "100%",
                    maxWidth: "350px",
                    borderRadius: "12px",
                    boxShadow: "0 0 20px rgba(225,29,72,0.4)"
                }}
                />
            </div>
        )}

        </div>
    </div>
    )
}