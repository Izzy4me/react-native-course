import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Modal
  } from 'react-native';


export default function GoalInput(props) {
    const [enteredGoal, setEnteredGoal] = useState('');

    const goalInputHandler = enteredText => {
        setEnteredGoal(enteredText);
    };

    const addGoalHandler = () => {
        props.onAddGoal(enteredGoal);
        setEnteredGoal('');
    };

    return(
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Course Goal"
                    style={styles.input}
                    onChangeText={goalInputHandler}
                    value={enteredGoal}
                />
                {/* We trigger function from App.js and need to pass the variable */}
                {/* 1st option is use anonymous function: onPress={() => props.onAddGoal(enteredGoal)} */}
                {/* 2nd option is to preconfigure function with bind() feature: props.onAddGoal.bind(this, enteredGoal); */}
                <View style={styles.buttonContainer}>
                  {/* We can't just add style to button, we need seperate view for them!  */}
                  <View style={styles.button}><Button title="Add" onPress={addGoalHandler} /></View>
                  <View style={styles.button}><Button title="Cancel" onPress={props.onCancel} color="red"/></View>
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    inputContainer: {
    flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    input: {
      width: '80%',
      borderColor: 'black',
      borderWidth: 1,
      padding: 10,
      marginBottom: 10
    },
    buttonContainer: {
      width: '80%', 
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    button: {
        flex: 0.5,
    }
  });