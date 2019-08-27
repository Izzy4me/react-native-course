import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export default function GoalItem(props) {
    return (
      <TouchableOpacity activeOpacity={0.4} onPress={props.onDelete}>
        <View style={styles.listItem} onTouch>
            <Text>{props.title}</Text>
        </View>
      </TouchableOpacity>
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