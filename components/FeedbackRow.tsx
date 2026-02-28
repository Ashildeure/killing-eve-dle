import { Character } from "@/types/character"

type Props = {
    guess: Character
    feedback: any
}

function box(value: string | number, status: string | boolean) {
    let bg = "bg-gray-700"

    if (status === true || status === "correct") bg = "bg-green-600"
    if (status === false) bg = "bg-red-600"
    if (status === "higher") bg = "bg-yellow-500"
    if (status === "lower") bg = "bg-blue-500"

    return (
    <div className={`${bg} p-2 rounded text-sm`}>
        {value}
    </div>
    )
}

export default function FeedbackRow({ guess, feedback }: Props) {
    return (
    <div className="grid grid-cols-6 gap-2 mt-2">
        {box(guess.name, true)}
        {box(guess.seasonStart, feedback.seasonStart)}
        {box(guess.occupation, feedback.occupation)}
        {box(guess.affiliation, feedback.affiliation)}
        {box(guess.nationality, feedback.nationality)}
        {box(guess.gender, feedback.gender)}
    </div>
    )
}