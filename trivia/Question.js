import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import Panel from "./Panel";
import styles from "./styles";

export default props => 
    <View style={styles.question}>
      <View style={{ flex: 1 }}>
        <Panel text={props.question.question} />
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Panel text={props.question.opt1} />
        <Panel text={props.question.opt2} />
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Panel text={props.question.opt3} />
        <Panel text={props.question.opt4} />
      </View>
    </View>
