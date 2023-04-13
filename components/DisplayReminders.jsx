import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';

const DisplayReminders = ({ list, completeReminder }) => {

  return (
    <View style= {styles.reminderListContainer}>
      <View style= {styles.reminderListTitleContainer}>
        <Text>here are your reminders:</Text>
      </View>
      <View style= {styles.reminderList}>
        {list.map((item) =>
          <TouchableOpacity style= {item.completed ? styles.reminderCardCompleted : styles.reminderCardIncomplete} key= {item.id} onPress= {() => completeReminder(item.id)}>
            <Checkbox
              value= {item.completed}
              onValueChange= {() => completeReminder(item.id)}
              style= {styles.checkbox}
              color= {item.completed ? 'green' : 'red'}
            />
            <View >
              <Text style= {styles.reminderDateTime}>{item.date} @ {item.time}</Text>
              <Text style= {styles.reminderText}>{item.text}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default DisplayReminders

const styles = StyleSheet.create({

  reminderListContainer: {
    flex: 5,
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
  },

  reminderListTitleContainer: {
    width: '100%',
  },

  reminderListContainer: {
    flex: 5,
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
  },

  reminderListTitleContainer: {
    width: '100%',
  },

  reminderCardCompleted: {
    flexDirection: 'row',
    columnGap: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: 'lightgreen',
    width: 300,
    padding: 10,
    borderRadius: 8,
  },

  reminderCardIncomplete: {
    flexDirection: 'row',
    columnGap: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: 'pink',
    width: 300,
    padding: 10,
    borderRadius: 8,
  },

  reminderDateTime: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
  },

  reminderText: {
    fontSize: 18,
    paddingRight: 30,
  },

})