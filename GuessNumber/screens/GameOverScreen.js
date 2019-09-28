import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>Number guessed, end of a game!</Text>
      <Text>Number was: {props.userNumber}</Text>
      <Text>Number of rounds: {props.roundsNumber}</Text>
      <Button title="New game!" onPress={props.onRestart} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }
});

export default GameOverScreen;