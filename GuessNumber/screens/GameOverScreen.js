import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomButton from '../components/CustomButton';

import DefaultStyles from '../constants/default-styles';

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Number guessed, end of a game!</Text>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/success.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <Text>The choosen number was <Text style={DefaultStyles.highlight}>{props.userNumber}</Text></Text>
        <Text>It tooks <Text style={DefaultStyles.highlight}>{props.roundsCounter}</Text> rounds to quess it.</Text>
      </View>
      <CustomButton onPress={props.onRestart}>New game!</CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 200,
    borderWidth: 2,
    borderColor: 'black',
    // cropping image to fit our circular borders
    overflow: 'hidden',
    margin: 10,
  },
  resultContainer: {
    textAlign: 'center',
    margin: 15,
  }
});

export default GameOverScreen;