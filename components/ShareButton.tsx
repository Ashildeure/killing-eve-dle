"use client"

type Props = {
  attempts: number
  won: boolean
}

export default function ShareButton({ attempts, won }: Props) {
  function handleShare() {
    const text = `Killing Eve .dle\n${won ? "Solved in " + attempts + " tries" : "Failed today"}`
    navigator.clipboard.writeText(text)
    alert("Copied to clipboard!")
  }

  return (
    <button onClick={handleShare} className="play-again">
      Share Result
    </button>
  )
}