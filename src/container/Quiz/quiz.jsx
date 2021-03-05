import React, { Component } from "react"
import dataJSON from "../../test.json"

import "./quiz.scss"
import ActiveQuiz from "../../components/ActiveQuiz/activeQuiz";

let timerId = null

export default class Quiz extends Component {

    state = {
        activeQuestion: 0,
        quiz: null,
        timer: null
    }

    componentDidMount() {
        this.setState({
            quiz: dataJSON,
            timer: dataJSON.time
        })
    }

    onAnswerQuizHandler = () => {
        if(this.isQuizFinished()){
            console.log("Finished")
        } else {
            this.setState({
                timer: this.state.quiz.time,
                activeQuestion: this.state.activeQuestion + 1,
            })
            window.clearTimeout(timerId)
        }
    }

    startTimer = () => {
        if (!!this.state.quiz.time){
            if (this.state.timer > 0){
                let seconds = this.state.timer
                timerId = setTimeout(() => {
                    this.setState({
                        timer: seconds - 1
                    })
                }, 1000)
            } else {
                this.onAnswerQuizHandler()
            }
        }
    }

    isQuizFinished(){
        return this.state.activeQuestion === this.state.quiz.data.length
    }

    retryQuizHandler = () => {
        this.setState({
            activeQuestion: 0,
            quiz: dataJSON,
            timer: dataJSON.time
        })
    }

    render(){
        if (!this.state.quiz){
            return <p>Loading</p>
        }
        const { data, title } = this.state.quiz
        const answersCount = data.length

        return (
            <div className={'quiz #e0f2f1 teal lighten-5'}>
                <div className="container">
                    <div className="row">
                        <div className="col s12 l10 offset-l1 xl8 offset-xl2">
                            {
                                !this.isQuizFinished()
                                ? <h3 className={"center"}><strong>{ title }</strong></h3>
                                : null
                            }
                            {
                                this.isQuizFinished()
                                ?
                                    <div className="row">
                                        <div className="quiz__result card blue-grey darken-1">
                                            <div className="card-content white-text">
                                                <span className="card-title">Спасибо за пройденый тест</span>
                                                <p>Мы свяжемся с Вами в скором времени.</p>
                                            </div>
                                            <div className="card-action">
                                                <button
                                                    onClick={ this.retryQuizHandler }
                                                    type={"button"}
                                                    className={"btn"}>
                                                    Пройти тест ещё раз
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                :
                                <ActiveQuiz
                                    image={ data[this.state.activeQuestion].image }
                                    startTimer={ this.startTimer }
                                    time={ this.state.timer }
                                    onAnswerQuiz={ this.onAnswerQuizHandler }
                                    question={ data[this.state.activeQuestion].question }
                                    answers={ data[this.state.activeQuestion].type.test.options }
                                    answersCount={ answersCount }
                                    activeQuestion={ this.state.activeQuestion + 1 }
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}