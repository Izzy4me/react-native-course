import React,
  {
    useEffect,
    useRef,
    useState
  } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  Alert,
  Button
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';


const generateRandomNumber = (min, max, excluded) => {
  min = Math.floor(min);
  max = Math.ceil(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  
  if (randomNumber === excluded) {
    return generateRandomNumber(min, max, excluded);
  } else {
    return randomNumber;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(generateRandomNumber(0, 100, props.userNumber));
  const [roundsCounter, setRoundsCounter] = useState(0);

  // Number will be guessed from <currentBottomBoundary, currentTopBoundary) 
  const currentBottomBoundary = useRef(1);
  const currentTopBoundary = useRef(100);
  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(roundsCounter);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry, I am bad in Math...', style: 'cancel' }
      ]);
      return;
    }

    if (direction === 'lower') {
      // Not .current is read-only!
      currentTopBoundary.current = currentGuess;
    } else {
      currentBottomBoundary.current = currentGuess;
    }

    // current gives us most recent value of this reference
    const nextGuessedNumber = generateRandomNumber(
      currentBottomBoundary.current,
      currentTopBoundary.current,
      currentGuess
    );
    setCurrentGuess(nextGuessedNumber);
    setRoundsCounter(currentRound => currentRound + 1);
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <CustomButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name="md-remove-circle" size={24}></Ionicons>
        </CustomButton>
        <CustomButton onPress={nextGuessHandler.bind(this, 'greater')}>
            <Ionicons name="md-add-circle" size={24}></Ionicons>
        </CustomButton>
      </Card>
    </View>
  );

};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%'
  }
});

export default GameScreen;