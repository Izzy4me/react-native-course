import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const generateRandomNumber = (min, max, excluded) => {
    const min = Math.floor(min);
    const max = Math.ceil(max);
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    
    if (randomNumber === excluded) {
        return generateRandomNumber(min, max, excluded);
    } else {
        return randomNumber;
    }
};

const GameScreen = (props) => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomNumber(0, 100, props.props.userNumber));
};

const styles = StyleSheet.create({});

export default GameScreen;