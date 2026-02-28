import React from "react"
import { Character } from "@/types/character"

type Props = {
  guess: Character
  feedback: any
}

function box(value: string | number, status: string | boolean) {
  let className = "feedback-box"
  let display: React.ReactNode = value

  if (status === true || status === "correct") {
    className += " correct"
  } 
  else if (status === "semi") {
    className += " semi-correct"
  }
  else if (status === false) {
    className += " incorrect"
  } 
  else if (status === "higher") {
    className += " incorrect"
    display = <>▲ {value}</>
  } 
  else if (status === "lower") {
    className += " incorrect"
    display = <>▼ {value}</>
  }

  return <div className={className}>{display}</div>
}

export default function FeedbackRow({ guess, feedback }: Props) {
  return (
    <div className="feedback-row">
      {box(guess.name, feedback.name)}
      {box(
            guess.seasonStart,
            feedback.seasonStart === "semi" ? false : feedback.seasonStart
        )}
      {box(guess.occupations.join(", "), feedback.occupations)}
      {box(guess.affiliations.join(", ") || "None", feedback.affiliations)}
      {box(guess.nationalities.join(", "), feedback.nationalities)}
      {box(guess.gender, feedback.gender)}
    </div>
  )
}