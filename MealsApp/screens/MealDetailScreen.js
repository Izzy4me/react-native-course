import React from 'react';
import {Button,  View, Text, StyleSheet } from 'react-native';

const MealDetailScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>The Meal Detail Screen!</Text>
      <Button
        title="Go back to categories"
        onPress={() => {
          props.navigation.popToTop();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MealDetailScreen;
