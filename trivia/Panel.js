import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import styles from './styles'


export default class Panel extends Component{
    render(){
      return( 
        <View style={styles.panel}>
          <Text style={{color: 'white'}}>{this.props.text}</Text>
        </View>
      )
    }
  }