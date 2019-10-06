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
  Button,
  FlatList,
  Dimensions
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

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
      <Text>#{listLength - itemData.index} </Text>
      <Text>{itemData.item}</Text>
    </View>
);

const GameScreen = (props) => {
  const initialGuess = generateRandomNumber(0, 100, props.userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [previousGuesses, setPreviousGuesses] = useState([initialGuess.toString()]);
  const [roundsCounter, setRoundsCounter] = useState(0);

  // Number will be guessed from <currentBottomBoundary, currentTopBoundary) 
  const currentBottomBoundary = useRef(1);
  const currentTopBoundary = useRef(100);
  const { userChoice, onGameOver } = props;

  // For styling
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height
  );

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });
  // End of styling rotate-things

  
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
    setPreviousGuesses(previousGuesses => [nextGuessedNumber.toString(), ...previousGuesses])
    setRoundsCounter(currentRound => currentRound + 1);
  }

  // Styling
  let listContainerStyle = styles.listContainer;
  if (Dimensions.get('window').width < 600) {
    listContainerStyle = styles.listContainerXS;
  }
  if (availableDeviceHeight < 800) {
    return (
      <View style={styles.screen}>
        <Text style>Opponent's Guess</Text>
        <View style={styles.controls}>
          <CustomButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name="md-remove-circle" size={24}></Ionicons>
          </CustomButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <CustomButton onPress={nextGuessHandler.bind(this, 'greater')}>
            <Ionicons name="md-add-circle" size={24}></Ionicons>
          </CustomButton>
        </View>
        <View style={listContainerStyle}>
          <FlatList
              keyExtractor={key => key}
              contentContainerStyle={styles.list}
              data={previousGuesses}
              renderItem={renderListItem.bind(this, previousGuesses.length)}
          />
        </View>
      </View>
    );
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
      <View style={styles.listContainerStyle}>
        <FlatList
          keyExtractor={key => key}
          contentContainerStyle={styles.list}
          data={previousGuesses}
          renderItem={renderListItem.bind(this, previousGuesses.length)}
        />
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
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 300,
    maxWidth: '80%'
  },
  list: {
    // "To be able to grow and take as much space as it can get" - perfect for scrollable
    flexGrow: 1,
    // Important if list item won't have width of 100%. Working for ScrollableView
    // alignItems: 'center',
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
    width: '100%',
  },
  listContainer: {
    // Flex = 1 is needed on Android to make Scrollable inside really Scrollable
    flex: 1,
    width: '70%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%'
  },
  // List container style for small devices
  listContainerXS: {
    flex: 1,
    width: '85%',
  },
});

export default GameScreen;