import React, {useState} from 'react';
import { 
  StyleSheet,
  View,
  FlatList,
  Button
} from 'react-native';

import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {

  // using React hooks instead of setState
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddModalVisible, setAddModalVisible] = useState(false);

  const addGoalHandler = (goalTitle) => {
    setCourseGoals(currentGoals => [
      ...currentGoals,                                      // previous state
      { key: Math.random().toString(), value: goalTitle }  // new element for flat list
    ]);
    setAddModalVisible(false);
  };

  const removeGoalHandler = (goalId) => {
    setCourseGoals(currentGoals =>{
      return currentGoals.filter( goal => goal.key !== goalId);
    });
  };

  const cancelAddGoalModalHandler = () => {
    setAddModalVisible(false);
  };

  return (
    <View style={styles.screen}>
    {/* We passed function which can be binded - we can use it in our child component */}

      <Button title="Add new goal" onPress={() => setAddModalVisible(true)}/>
      <GoalInput
        visible={isAddModalVisible}
        onAddGoal={addGoalHandler}
        onCancel={cancelAddGoalModalHandler}
      />
      <FlatList
        data={courseGoals}
        renderItem={
          itemData => <GoalItem
              title={itemData.item.value} 
              // We have 2 options here as well - we can pass the id and make bind in the child component
              onDelete={removeGoalHandler.bind(this, itemData.item.key)}
          />
        }
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
