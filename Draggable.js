/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform, StyleSheet, Text, View,
  Animated,
  PanResponder,
  Image
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class Draggable extends Component<Props> {
  constructor (props) {
    super(props) 
    this.state=({
      showDraggable: true,
      index: 1
    })
    this.pan = new Animated.ValueXY()
    this.scale = new Animated.Value(1)
    this.opacity = new Animated.Value(1)
  }
  componentWillMount () {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => this.onPanResponderGrant(e, gestureState),
      onPanResponderMove: Animated.event([
        null,
        {dx: this.pan.x, dy: this.pan.y}
      ]),
      onPanResponderRelease: (e, {vx, vy, moveY}) => this.onPanResponderRelease(e, {vx, vy, moveY})
    })
  }

  onPanResponderGrant = (e, gestureState) => {
    this.pan.setOffset({x: this.pan.x._value, y: this.pan.y._value})
    this.pan.setValue({x: 0, y: 0})
    Animated.spring(this.scale, {
      toValue: 1.5,
      friction: 3
    }).start()
    this.setState({index: 1000})
  }
  onPanResponderRelease = (e, {vx, vy, moveY}) => {
    this.setState({index: 1})
    if (moveY < 200) {
      Animated.timing(this.opacity, {
        toValue: 0,
        duration: 700
      }).start(() =>
        this.setState({
          showDraggable: false
        })
      );
    } else {
      Animated.spring(this.pan, {
        toValue: 1,
        friction: 5
      }).start()
      Animated.spring(this.scale, {
        toValue: 1,
        friction: 3
      }).start()
    }
  }
  
  render() {
    const { title } = this.props
    const [translateX, translateY] = [this.pan.x, this.pan.y]
    const transformStyle = {transform: [{translateX}, {translateY}, {scale: this.scale}]}

    return (
          <Animated.View 
            style={[styles.poly, transformStyle, {opacity: this.opacity, zIndex: this.state.index}]}
            {...this._panResponder.panHandlers}
          >
            <Text style={styles.title}>{title || '0'}</Text>
          </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  poly: {
    width: 50, 
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
    borderRadius: 7
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
