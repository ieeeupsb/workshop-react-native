import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import styles from './styles'
import Game from './Game'


export default class App extends React.Component {
  render() {
    return (
      <Game nQuestions='4'></Game>
    );
  }
}

