import React, { Component } from "react";
import { View } from "react-native";

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
      let q = [];

      for (question of res.results) {
        const answer = { text: question.correct_answer, correct: true };
        let options = question.incorrect_answers.map(option => {
          return { text: option, correct: false };
        });
        options.push(answer);
        options = this.shuffle(options);

        q.push({
          question: question.question,
          options: options,
          rightopt: answer
        });
      }

      console.log(q)

      this.setState({ loaded: true, questions: q, currentQuestion: 0 }, () => console.log(this.state));
      
    });
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  handleAnswer = answer => () => {
    console.log(this.state);
    this.setState(previousState => {
      return {
        ...previousState,
        answers: previousState.answers.concat([answer])
      };
    });
  };

  correctQuestions = () => {
    return this.state.answers.filter(value => value == true).length
  };

  fetchQuestions(number) {
    return fetch(`https://opentdb.com/api.php?amount=${number}`).then(res =>
      res.json()
    );
  }

  render() {
    return this.state.loaded ? (
        
        <Question
          question={this.state.questions[this.state.answers.length]}
          answerHandler={this.handleAnswer}
        />
    ) : (
      <Panel text={"Loading, please wait"} />
    );
  }
}
