import React, { useState, useEffect } from 'react';
import { 
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Alert,
    Dimensions,
    ScrollView,
} from 'react-native';
import { ScreenOrientation } from 'expo';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/colors';
import CustomButton from '../components/CustomButton';

const StartGameScreen = props => {

  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  // Styling properties
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get('window').width / 4
  );
  // Blocking change of screen orientation here
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  
  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (!validateInput(chosenNumber)) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99.',
        [
          {text: 'Okay', style: 'destructive', onPress: resetInputHandler},
        ]
      );
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);    // could be a line lower because renderCycle isn't immediately
    setEnteredValue('');
    Keyboard.dismiss();
  };

  const validateInput = (chosenNumber) => {
    return (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) ? false : true;
  }

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    };
    Dimensions.addEventListener('change', updateLayout);
    // Cleanup - before rotation, because we unmount component!!!
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <CustomButton title="START GAME"
          onPress={() => props.onStartGame(selectedNumber)}
        >
          START GAME
        </CustomButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
        <View style={styles.screen}>
          <Text style={styles.title}>Start new game!</Text>
          <Card style={styles.inputContainer}>
            <Text>Select a number</Text>
            <Input 
              style={styles.input}
              blurOnSubmit
              autoCorrect={false}
              keyboardType="number-pad"
              maxLength={2}
              onChangeText={numberInputHandler}
              value={enteredValue}
            />
            <View style={styles.buttonsContainer}>
              <View style={{width: buttonWidth}}>
                <Button
                  title="Confirm"
                  onPress={confirmInputHandler}
                  color={Colors.accept}
                />
              </View>
              <View style={{width: buttonWidth}}>
              <Button
                title="Reset"
                onPress={resetInputHandler}
                color={Colors.reject}
              />
              </View>
            </View>
          </Card>
          {confirmedOutput}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  inputContainer: {
    minWidth: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginBottom: 2,
  },
  // button: {
  //   width: Dimensions.get('window').width / 4, 
  // },
  input: {
    width: 50,
    textAlign: 'center'
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center'
  }
});

export default StartGameScreen;