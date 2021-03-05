import React, { Component }  from "react";
import "./activeQuize.scss"
import AnswerList from "../AnswersList/answersList"

class ActiveQuiz extends Component {

    componentDidMount() {
        this.props.startTimer()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.startTimer()
    }

    render(){
        const {image, time, answers, onAnswerQuiz, activeQuestion, answersCount, question } = this.props

        return (
            <div className={"quiz__active"}>
                <h5>
                    Дайте ответы на все вопросы
                    <small>{ activeQuestion } из { answersCount }</small>
                </h5>
                {
                    image
                    ?
                        <div className={"quiz__active--image"}>
                            <img
                                className={"responsive-img"}
                                src={ image }
                                alt={`Картинка к вопросу ${ activeQuestion }`} />
                        </div>
                    : null

                }
                <p className={"quiz__active--question blue-text text-darken-5"}>
                    { question }
                </p>

                <AnswerList
                    onAnswerQuiz={ onAnswerQuiz }
                    answers={ answers }
                />
                {
                    time
                    ?
                        <p>
                            Осталось времени: &nbsp;
                            {time === 0 ? "Время вышло" : time }
                        </p>
                    : null
                }
            </div>
        )
    }
}
export default ActiveQuiz