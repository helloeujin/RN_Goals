// import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Button,
} from "react-native";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  const startAddGoalHandler = () => {
    setModalIsVisible(true);
  };

  const addGoalHandler = (enteredGoalText) => {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
  };

  const deleteGoalHandler = (id) => {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goals) => goals.id != id);
    });
  };

  // useEffect(() => {
  //   console.log(".......");
  //   console.log("courseGoals", courseGoals);
  //   console.log(".......");
  // }, [courseGoals]);
  // {/* {modalIsVisible ? <GoalInput onAddGoal={addGoalHandler} /> : ""} */}
  return (
    <View style={styles.appContainer}>
      <Button
        title="Add New Goal"
        color="#5e0acc"
        onPress={startAddGoalHandler}
      />

      <GoalInput visible={modalIsVisible} onAddGoal={addGoalHandler} />

      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          renderItem={(itemData) => {
            return (
              // <Text>{itemData.item.text}</Text>

              <GoalItem
                text={itemData.item.text}
                id={itemData.item.id}
                onDeleteItem={() => deleteGoalHandler(itemData.item.id)}
              />

              // <Pressable onPress={() => deleteGoalHandler(itemData.item.id)}>
              //   <View style={styles.goalItem}>
              //     <Text style={styles.goalText}>{itemData.item.text}</Text>
              //   </View>
              // </Pressable>
            );
          }}
          keyExtractor={(item, index) => item.id}
          alwaysBounceVertical={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalText: {
    color: "white",
  },
});
