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
    <button
        onClick={handleShare}
        className="mt-4 bg-white text-black px-4 py-2 rounded"
    >
        Share Result
    </button>
    )
}