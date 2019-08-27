import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default function GoalItem(props) {
    return (
      <View style={styles.listItem}>
          <Text>{props.title}</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginTop: 10,
    backgroundColor: 'rgb(0,204,102)',
    borderColor: 'black',
    borderWidth: 1
  }
});