/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  Linking,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

// UI Styles
import { styles, headingBG } from './Styles';

import {API, graphqlOperation} from 'aws-amplify';
import {createTasks, updateTasks, deleteTasks} from './graphql/mutations';
import {listTasks} from './graphql/queries';

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

type Task = {
  "id"?: number,
  "title": string,
  "description": string,
}

////////////
// Main application
function App(): JSX.Element {
  const initialState: Task = {
    title: "",
    description: "",
  }
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formState, setFormState] = useState(initialState);

  useEffect(() => {
    fetchTasks();
  }, []);

  function setInput(key, value) {
    setFormState({...formState, [key]: value});
  }

  function selectTask(task: Task) {
    setFormState({
      "id": task.id,
      "title": task.title,
      "description": task.description
    })
  }

  async function deleteTask(task: Task) {
    let target : Task = {
      "id": task.id,
      "title": task.title,
      "description": task.description
    }
    try {
      console.log(target);
      await API.graphql(graphqlOperation(deleteTasks, {input: {"id": task.id}}));
      fetchTasks();
    } catch (err) {
      console.log('error deleting task:', err);
    }
  }

  async function fetchTasks() {
    try {
      const taskData = await API.graphql(graphqlOperation(listTasks));
      const tasks = taskData.data.listTasks.items;
      setTasks(tasks);
    } catch (err) {
      console.log('error fetching tasks');
    }
  }

  async function addTask() {
    try {
      if (!formState.title || !formState.description) return;
      const task = {...formState};
      setFormState(initialState);
      console.log(task)
      if (task.id == null) {
        await API.graphql(graphqlOperation(createTasks, {input: task}));
      } else {
        await API.graphql(graphqlOperation(updateTasks, {input: task}));
      }
      fetchTasks();
    } catch (err) {
      console.log('error creating task:', err);
    }
  }

  return (
    <SafeAreaView style={styles.Main}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={headingBG}
      />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.Heading}>
        <Text style={styles.TitleText}>Task App</Text>
        <Text style={styles.SubTitle}>powered by Amplify</Text>
      </View>
      </TouchableWithoutFeedback>
      <View>
        <TextInput
          onChangeText={value => setInput('title', value)}
          style={styles.input}
          value={formState.title}
          placeholder="New Task Title"
        />
        <TextInput
          onChangeText={value => setInput('description', value)}
          style={styles.input}
          value={formState.description}
          placeholder="Description"
        />
        <Pressable
          style={({pressed}) => [ styles.ButtonBasic, pressed ? styles.ButtonDown : styles.ButtonUp ]}
          onPress={addTask}
          >
          <Text style={styles.ButtonLabel}>Upload Task</Text>
        </Pressable>
      </View>
      <ScrollView>
        {
          tasks.length == 0 ? <Text style={styles.Text}>No tasks to display</Text> :null
        }
        {tasks.map((task, index) => (
          <View key={task.id ? task.id : index} style={styles.TodoContainer}>
            <View style={styles.Todo}>
              <Pressable
                style={({pressed}) => [ styles.ButtonBasic, pressed ? styles.ButtonDown : null ]}
                onPress={() => selectTask(task)}
                >
                <Text style={styles.TodoTitle}>{task.title}</Text>
                <Text style={styles.TodoDescription}>{task.description}</Text>
              </Pressable>
            </View>
            <View>
              <Pressable
                style={({pressed}) => [ styles.ButtonBasic, pressed ? styles.ButtonDown : styles.ButtonUp ]}
                onPress={() => deleteTask(task)}
                >
                <Text style={styles.ButtonLabel}>Delete</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
