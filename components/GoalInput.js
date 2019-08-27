import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button
  } from 'react-native';


export default function GoalInput(props) {
    const [enteredGoal, setEnteredGoal] = useState('');

    const goalInputHandler = enteredText => {
        setEnteredGoal(enteredText);
    };

    return(
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Course Goal"
                style={styles.input}
                onChangeText={goalInputHandler}
                value={enteredGoal}
            />
            {/* We trigger function from App.js and need to pass the variable */}
            {/* 1st option is use anonymous function: onPress={() => props.onAddGoal(enteredGoal)} */}
            {/* 2nd option is to preconfigure function with bind() feature */}
            <Button title="Add" onPress={props.onAddGoal.bind(this, enteredGoal)} />
        </View>
    );
};


const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    input: {
      width: '80%',
      borderColor: 'black',
      borderWidth: 1,
      padding: 10
    },
  });