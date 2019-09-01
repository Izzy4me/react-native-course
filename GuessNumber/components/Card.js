import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
    // props.children are all attributes given in such component
    // { ...styles.card, ...props.style } trick gives us opportunity 
    // to override some styles with props.style
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    // elevation is Android only. There are 'shadow' variables on iOS
    elevation: 5,
  }
});

export default Card;
