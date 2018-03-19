import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Panel extends React.Component{
  render(){
    return( 
      <View style={styles.panel}>
        <Text style={{color: 'white'}}>{this.props.text}</Text>
      </View>
    )
  }
}

class Question extends React.Component{
  
  constructor(props){
    super(props)
    this.state = {q: "loading", opt1: "loading...", opt2: "loading...", opt3: "loading...", opt4: "loading...", rightopt: "loading..."}
    this.fetchQuestion().then(res => {
      if(res.response_code !== 0){
        console.err("Something went wrong :/")
        return
      }

      const question = res.results[0]
      const answer = question.correct_answer
      let options = question.incorrect_answers
      options.push(answer)
      options = this.shuffle(options) 

      //console.log(options)

      this.setState(prev => {
        return {q: question.question, opt1: options[0], opt2: options[1], opt3: options[2], opt4: options[3], rightopt: answer} 
      })
    })  
    
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

  fetchQuestion(){
    return fetch("https://opentdb.com/api.php?amount=1")
      .then(res => res.json())
    
  }

  render(){
    return( 
    <View style={styles.question}> 
      <View style={{flex:1}}>
        <Panel text={this.state.q}></Panel>
      </View>
      <View style={{flex:1, flexDirection: 'row'}}>
        <Panel text={this.state.opt1}></Panel>
        <Panel text={this.state.opt2}></Panel>
      </View>
      <View style={{flex:1, flexDirection: 'row'}}>
        <Panel text={this.state.opt3}></Panel>
        <Panel text={this.state.opt4}></Panel>
      </View> 
    </View>
    )}
}


export default class App extends React.Component {
  render() {
    return (
      <Question></Question>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: {
    backgroundColor: 'skyblue',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  panel: {
    backgroundColor: '#222',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center' 
  }
});