import React,
  {
    useEffect,
    useRef,
    useState
  } from 'react';
import { 
  View,
  Text,
  ScrollView,
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

const renderListItem = (value, counter) => (
    <View key={value} style={styles.listItem}>
      <Text>#{counter} </Text>
      <Text>{value}</Text>
    </View>
);


const GameScreen = (props) => {
  const initialGuess = generateRandomNumber(0, 100, props.userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [previousGuesses, setPreviousGuesses] = useState([initialGuess]);
  const [roundsCounter, setRoundsCounter] = useState(0);  //

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
      currentBottomBoundary.current = currentGuess + 1;
    }

    // current gives us most recent value of this reference
    const nextGuessedNumber = generateRandomNumber(
      currentBottomBoundary.current,
      currentTopBoundary.current,
      currentGuess
    );
    setCurrentGuess(nextGuessedNumber);
    setPreviousGuesses(previousGuesses => [nextGuessedNumber, ...previousGuesses])
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
      <View style={styles.listContainer}>
      {/* contentContainerStyle is only way to add alignItems and justifyContent here */}
        <ScrollView contentContainerStyle={styles.list}>
          {previousGuesses.map((guess, index) => renderListItem(guess, previousGuesses.length - index))}
        </ScrollView>
      </View>
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
  },
  list: {
    // "To be able to grow and take as much space as it can get" - perfect for scrollable
    flexGrow: 1,
    // Important if list item won't have width of 100%
    alignItems: 'center',
  },
  listItem: {
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    // important to keep our list item's 1 per line!
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  listContainer: {
    // Flex = 1 is needed on Android to make Scrollable inside really Scrollable
    flex: 1,
    width: '80%',
  },
});

export default GameScreen;