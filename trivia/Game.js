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

    this.fetchQuestions(props.nQuestions).then(res => {
      let q = []

      for(question of res.results){
        const answer = question.correct_answer
        let options = question.incorrect_answers
        options.push(answer)
        options = this.shuffle(options) 

        q.push({
          "question": question.question,
          "opt1": options[0], "opt2": options[1], "opt3": options[2], "opt4": options[3],
          "rightopt": answer
        })
      }
      
      this.setState(previousState => { return { loaded: true, questions: q, currentQuestion: 0 }})
    });
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
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
    return this.state.loaded ? (
      <Question
        question={this.state.questions[this.state.currentQuestion]}
        answerHandler={this.handleAnswer}
      />
    ) : (
      <Panel text={"Loading, please wait"} />
    );
  }
}
