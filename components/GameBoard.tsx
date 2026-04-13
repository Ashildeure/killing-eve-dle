"use client"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { characters } from "@/data/characters"
import { compareCharacter } from "@/lib/compareCharacter"
import GuessInput from "./GuessInput"
import FeedbackRow from "./FeedbackRow"
import LocaleSwitcher from "./LocaleSwitcher"
import { Character } from "@/types/character"

export default function GameBoard() {
  const t = useTranslations()

  const [solution, setSolution] = useState<Character>(() =>
    characters[Math.floor(Math.random() * characters.length)]
  )

  const winGifs = [
    "/gifs/win1.gif", "/gifs/win2.gif", "/gifs/win3.gif",
    "/gifs/win4.gif", "/gifs/win5.gif", "/gifs/win6.gif"
  ]

  const [winGif, setWinGif] = useState<string | null>(null)
  const [guesses, setGuesses] = useState<{ guess: Character; feedback: any }[]>([])
  const [won, setWon] = useState(false)

  function handleGuess(character: Character) {
    if (won) return
    const feedback = compareCharacter(character, solution)
    setGuesses(prev => [...prev, { guess: character, feedback }])
    if (character.id === solution.id) {
      setWon(true)
      setWinGif(winGifs[Math.floor(Math.random() * winGifs.length)])
    }
  }

  function playAgain() {
    setSolution(characters[Math.floor(Math.random() * characters.length)])
    setGuesses([])
    setWon(false)
    setWinGif(null)
  }

  return (
    <div className="container">
      <LocaleSwitcher />

      <h1>{t("title")} <span style={{ color: '#e11d48' }}>.dle</span></h1>
      <p style={{ textAlign: 'center', color: '#ccc', marginBottom: '2rem' }}>{t("subtitle")}</p>

      <div className="game-board">
        {/* En-têtes — nouvel ordre */}
        <div className="grid-header">
          <div>{t("headers.name")}</div>
          <div>{t("headers.gender")}</div>
          <div>{t("headers.nationality")}</div>
          <div>{t("headers.occupation")}</div>
          <div>{t("headers.affiliation")}</div>
          <div>{t("headers.season")}</div>
        </div>

        <div style={{ marginTop: '1rem' }}>
          {guesses.map((g, i) => (
            <FeedbackRow key={i} guess={g.guess} feedback={g.feedback} />
          ))}
        </div>

        {!won && (
          <div style={{ marginTop: '1.5rem' }}>
            <GuessInput onGuess={handleGuess} guesses={guesses.map(g => g.guess)} />
          </div>
        )}

        {won && (
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <p style={{ color: '#22c55e', fontWeight: 'bold' }}>{t("youGotIt")}</p>
            <button onClick={playAgain} className="play-again" style={{ marginTop: '1rem' }}>
              ⭮ {t("playAgain")}
            </button>
          </div>
        )}

        {winGif && (
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
            <img src={winGif} alt="Victory gif" style={{
              width: '100%', maxWidth: '350px',
              borderRadius: '12px', boxShadow: '0 0 20px rgba(225,29,72,0.4)'
            }} />
          </div>
        )}
      </div>
    </div>
  )
}