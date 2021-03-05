import React from "react"
import "./answersList.scss"
import AnswersItem from "../AnswersItem/answersItem";

const AnswersList = props => {
    return (
        <ul className={"collection"}>
            { props.answers.map((answer) => {
                return (
                    <AnswersItem
                        onAnswerQuiz={ props.onAnswerQuiz }
                        key={answer.id}
                        answer={ answer }
                    />
                )
            })}
        </ul>
    )
}

export default AnswersList