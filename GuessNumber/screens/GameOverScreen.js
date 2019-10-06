import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';
import { ScreenOrientation } from 'expo';

import CustomButton from '../components/CustomButton';
import DefaultStyles from '../constants/default-styles';

const GameOverScreen = props => {
  ScreenOrientation.unlockAsync();
  return (
    <ScrollView>
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
    </ScrollView>
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
    width: Dimensions.get('window').width < Dimensions.get('window').height ? Dimensions.get('window').width * 0.7 : Dimensions.get('window').height * 0.7,
    height: Dimensions.get('window').width < Dimensions.get('window').height ? Dimensions.get('window').width * 0.7 : Dimensions.get('window').height * 0.7,
    borderRadius: (Dimensions.get('window').width < Dimensions.get('window').height ? Dimensions.get('window').width * 0.7 : Dimensions.get('window').height * 0.7) / 2,
    borderWidth: 2,
    borderColor: 'black',
    // cropping image to fit our circular borders
    overflow: 'hidden',
    margin: Dimensions.get('window').height / 30,
  },
  resultContainer: {
    textAlign: 'center',
    margin: Dimensions.get('window').height > 600 ? 15 : Dimensions.get('window').height / 60,
  }
});

export default GameOverScreen;