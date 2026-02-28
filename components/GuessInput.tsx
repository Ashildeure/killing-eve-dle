"use client"

import { useState } from "react"
import { characters } from "@/data/characters"
import { Character } from "@/types/character"

type Props = {
    onGuess: (character: Character) => void
}

export default function GuessInput({ onGuess }: Props) {
    const [input, setInput] = useState("")

    function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const found = characters.find(
        c => c.name.toLowerCase() === input.toLowerCase()
    )

    if (found) {
        onGuess(found)
        setInput("")
    }
    }

    return (
    <form onSubmit={handleSubmit} className="mt-4">
        <input
        className="border p-2 w-full text-black"
        placeholder="Enter character name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />
    </form>
    )
}