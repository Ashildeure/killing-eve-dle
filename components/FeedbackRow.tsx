import { Character } from "@/types/character"

type Props = {
  guess: Character
  feedback: any
}

function box(value: string | number, status: string | boolean) {
  let className = "feedback-box"

  if (status === true || status === "correct") className += " correct"
  else if (status === false) className += " incorrect"
  else if (status === "higher") className += " higher"
  else if (status === "lower") className += " lower"

  return <div className={className}>{value}</div>
}

export default function FeedbackRow({ guess, feedback }: Props) {
  return (
    <div className="feedback-row">
      {box(guess.name, true)}
      {box(guess.seasonStart, feedback.seasonStart)}
      {box(guess.occupations.join(", "), feedback.occupations)}
      {box(guess.affiliations.join(", ") || "None", feedback.affiliations)}
      {box(guess.nationalities.join(", "), feedback.nationalities)}
      {box(guess.gender, feedback.gender)}
    </div>
  )
}