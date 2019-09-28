import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const prepareNewGameHandler = () => {
    _resetRoundsCounter();
    setUserNumber(null);
  };

  const startGameHandler = selectedNumber => {  // from where is this selected number? XD
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = numberOfRounds => {
    setGuessRounds(numberOfRounds);
  };

  const _resetRoundsCounter = () => {
    setGuessRounds(0);
  }

  let content = <StartGameScreen onStartGame={startGameHandler}/>;

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen
        userChoice={userNumber}
        onGameOver={gameOverHandler}
      />
    );
  } else if (guessRounds > 0) {
    content = <GameOverScreen
      userNumber={userNumber}
      roundsCounter={guessRounds}
      onRestart={prepareNewGameHandler}
    />;
  }

  return (
    <View style={styles.container}>
      <Header title="Guess a Number!" />
        {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
