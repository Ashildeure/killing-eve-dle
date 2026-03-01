"use client"

import { useState, useEffect, KeyboardEvent } from "react"
import { characters } from "@/data/characters"
import { Character } from "@/types/character"
import Image from "next/image"

type Props = {
  onGuess: (character: Character) => void
  guesses: Character[]
}

export default function GuessInput({ onGuess, guesses }: Props) {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [filtered, setFiltered] = useState<Character[]>([])

  useEffect(() => {
    // Filtrer par query et exclure les persos déjà devinés
    let list = characters.filter(
      c =>
        c.name.toLowerCase().includes(query.toLowerCase()) &&
        !guesses.some(g => g.id === c.id)
    )

    // Trier : noms qui commencent par la lettre entrée d'abord
    if (query.length > 0) {
      const firstLetter = query[0].toLowerCase()
      list.sort((a, b) => {
        const aIdx = a.name.toLowerCase().indexOf(firstLetter)
        const bIdx = b.name.toLowerCase().indexOf(firstLetter)
        return aIdx - bIdx
      })
    }

    setFiltered(list)
  }, [query, guesses])

  const selectCharacter = (character: Character) => {
    onGuess(character)
    setQuery("")
    setOpen(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filtered.length > 0) {
      e.preventDefault()
      selectCharacter(filtered[0])
    }
  }

  return (
    <div className="guess-input-wrapper">
      {/* Input */}
      <input
        className="guess-input"
        placeholder="Search character..."
        value={query}
        onChange={e => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
      />

      {/* Dropdown autocomplete */}
      {open && query && (
        <div className="autocomplete-dropdown">
          {filtered.length === 0 && (
            <div className="p-3 text-zinc-400 text-sm">No character found</div>
          )}
          {filtered.map(character => (
            <div
              key={character.id}
              onClick={() => selectCharacter(character)}
              className="autocomplete-item"
            >
              <Image
                src={character.image}
                alt={character.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <span>{character.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}