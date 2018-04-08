import React, { Component } from "react";
import Question from "./Question";
import Panel from "./Panel";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      currentQuestion: 0,
      loaded: false
    };

    this.fetchQuestions(props.nQuestions).then(questions =>
      this.setState({ loaded: true, questions: questions })
    );
  }

  handleAnswer(answer) {
    this.setState(previousState => {
      return {
        ...previousState,
        answers: previousState.answers.concat([answer])
      };
    });
  }

  fetchQuestions(number) {
    return fetch(`https://opentdb.com/api.php?amount=${number}`).then(res =>
      res.json()
    );
  }

  render() {
    this.state.loaded ? (
      <Question
        question={this.props.questions[this.state.currentQuestion]}
        answerHandler={this.handleAnswer}
      />
    ) : (
      <Panel text={"Loading, please wait"} />
    );
  }
}
