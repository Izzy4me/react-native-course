import React, {useState} from 'react';
import { 
  StyleSheet,
  View,
  FlatList,
} from 'react-native';

import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {

  // using React hooks instead of setState
  const [courseGoals, setCourseGoals] = useState([]);

  const addGoalHandler = (goalTitle) => {
    setCourseGoals(currentGoals => [
      ...currentGoals,                                      // previous state
      { key: Math.random().toString(), value: goalTitle }  // new element for flat list
    ]);
  };

  return (
    <View style={styles.screen}>
    {/* We passed function which can be binded - we can use it in our child component */}
      <GoalInput onAddGoal={addGoalHandler} />
      <FlatList
        data={courseGoals}
        // renderItem must returns react-dom element
        renderItem={itemData => <GoalItem title={itemData.item.value} />}
        // we can use keyExtractor if we don't want use 'key' or 'id' 
        // but generate/extract it from other attributes
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 5
  },
  listItem: {
    padding: 5,
    marginTop: 5,
    backgroundColor: '#00cc66',
    borderColor: 'black',
    borderWidth: 1
  }
});
