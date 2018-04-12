import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import Panel from "./Panel";
import styles from "./styles";

const QuestionButton = props => (
  <View
    style={{
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#222"
    }}
  >
    <Button title={props.title} onPress={props.onPress} />
  </View>
);

/*
<QuestionButton
          style={{ width: 120 }}
          title={props.question.options[0].text.toString()}
          onPress={props.answerHandler(0)}
        />
*/

const optionGroups = (opt, answerHandler) => {
  if(opt.length == 2){
    return (
      <View style={{flex: 1, flexDirection: "row"}}>
        {options(opt, answerHandler)}
      </View>
    )
  }
  else{
    return (
      <View style={{flex: 1, flexDirection: "column"}}>
        <View style={{flex: 1, flexDirection: "row"}}>
          {options(opt.slice(0, 2), answerHandler)}
        </View>
        <View style={{flex: 1, flexDirection: "row"}}>
        {options(opt.slice(2), answerHandler)}
      </View>
    </View>
    )
  }
}

const options = (options, answerHandler) =>
  options.map( (opt, i) => (
    <QuestionButton
      style={{ width: 120 }}
      title={opt.text}
      onPress={answerHandler(opt.correct)}
      key={i}
    />
  ));

export default props => {
  return (
    <View style={styles.question}>
      <View style={{ flex: 1 }}>
        <Panel text={props.question.question} />
      </View>
      <View style={{ flex: 1 }}>
        {optionGroups(props.question.options, props.answerHandler)}
      </View>
    </View>
  );
};
