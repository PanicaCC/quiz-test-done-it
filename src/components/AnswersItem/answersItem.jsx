import React from "react"
import "./answersItem.scss"

const AnswersItem = props => {

    const { answer } = props.answer

    return (
        <li
            className={"collection-item quiz__active--item"}
            onClick={() => props.onAnswerQuiz()}
        >
            { answer }
        </li>
    )

}

export default AnswersItem