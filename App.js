/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet, Text, View,
  Animated,
  PanResponder,
  Image
} from 'react-native';
import Draggable from './Draggable'

type Props = {};
export default class App extends Component<Props> {
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.dropZone}>
          <Text style={styles.textDrog}>Drop them here!</Text>
          
        </View>
        
        <View style={styles.viewContent}>
          <View style={styles.rowBall}>
            <Draggable title={'0'}/>
            <Draggable title={'1'}/>
            <Draggable title={'2'}/>
            <Draggable title={'3'}/>
            <Draggable title={'4'}/>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textDrog: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  dropZone: {
    height: 200,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewContent: {
    marginTop: 100,
  },
  rowBall: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
