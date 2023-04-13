import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Modal, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, SafeAreaView } from 'react-native';
import Checkbox from 'expo-checkbox';
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker';

export default function App() {

  const todayDate = new Date();
  const startDate = getFormatedDate(todayDate.setDate(todayDate.getDate()), 'YYYY/MM/DD');

  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [text, setText] = useState('');
  const [completed, setCompleted] = useState(false);
  const [openDateModal, setOpenDateModal] = useState(false);
  const [openTimeModal, setOpenTimeModal] = useState(false);
  const [list, setList] = useState([])
  const [counter, setCounter] = useState(0);

  const handleOpenDateModal = () => {
    setOpenDateModal(!openDateModal);
  }

  const handleOpenTimeModal = () => {
    setOpenTimeModal(!openTimeModal);
  }

  const handleChangeDate = (newDate) => {
    let day = newDate.substring(8);
    let month = newDate.substring(5,7);
    let year = newDate.substring(0,4);
    let formatDate = (month + '/' + day + '/' + year);
    setDate(formatDate);
  }

  const handleChangeTime = (newTime) => {
    setTime(newTime);
    handleOpenTimeModal();
  }

  const handleChangeText = (newText) => {
    setText(newText);
  }

  const completeReminder = (id) => {
    let copyList = list.slice();
    let index = copyList.findIndex(x => x.id === id);
    copyList[index].completed = !list[index].completed;
    setList(copyList);
  }

  const saveReminder = () => {
    let day = date.substring(3,5);
    let month = date.substring(0,2);
    let year = date.substring(6);
    let formatDate = (month + '/' + day + '/' + year);
    let hour = time.substring(0,2);
    let minute = time.substring(3);
    let sortDate = new Date (year, month, day, hour, minute)

    let reminder = {
      id: counter,
      date: formatDate,
      time: time,
      text: text,
      completed: false,
      sortDate: sortDate,
    }
    let increment = counter + 1;
    setCounter(increment);

    let copyList = list.slice();
    copyList.push(reminder)

    //sort list by date --> time --> length of text --> reminder id
    copyList.sort((a,b) => {
      if (b.sortDate - a.sortDate) {
        return a.sortDate - b.sortDate
      }
      if (b.sortDate === a.sortDate) {
        if (b.text.length - a.text.length) {
          return a.text.length - b.text.length
        } else {
          return a.id - b.id
        }
      }
    })

    //set the list of remminders and reset all values of the reminder
    setList(copyList)
    setDate()
    setTime()
    setText('')
  }

  return (
    <SafeAreaView style= {styles.container}>
      <ScrollView>
        <View style= {styles.title}>
          <Text style= {styles.appTitle}>
            reminder
          </Text>
        </View>

        <View style= {styles.userInput}>
          <View style= {date ? styles.dateTimeContainer : styles.dateTimeContainerMissing}>
            <Text>date:</Text>
            {date ?
              <View style= {styles.dateTime}>
                <Text >{date}</Text>
              </View> :
              <View style={styles.dateTimeMissing}>
                <Text></Text>
              </View>
            }
            <TouchableOpacity onPress= {handleOpenDateModal} style= {styles.button}>
                <Text>Choose</Text>
            </TouchableOpacity>
          </View>

          <View style= {time ? styles.dateTimeContainer : styles.dateTimeContainerMissing}>
            <Text>time:</Text>
            {time ?
              <View style= {styles.dateTime}>
                <Text >{time}</Text>
              </View> :
              <View style={styles.dateTimeMissing}>
                <Text></Text>
              </View>
            }

            <TouchableOpacity onPress= {handleOpenTimeModal} style= {styles.button}>
                <Text>Choose</Text>
            </TouchableOpacity>
          </View>
          <View style= {styles.centerContainer}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <TextInput
                style= {[styles.input]}
                onChangeText = {handleChangeText}
                value= {text}
                placeholder= 'Title'
              />
            </TouchableWithoutFeedback>
          </View>

          <View style= {styles.centerContainer}>
            <TouchableOpacity onPress= {saveReminder} style= {(!date || !time || !text) ? styles.buttonDisabled : styles.button} disabled= {!date || !time || !text}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
        style= {styles.modalContainer}
        animationType= 'slide'
        transparent= 'true'
        visible= {openDateModal}>
          <View style= {styles.centerView}>
            <View style= {styles.modalView}>
            <DatePicker
              mode= 'calendar'
              selected= {date}
              minimumDate= {startDate}
              onDateChange= {handleChangeDate}
            />
              <TouchableOpacity onPress= {handleOpenDateModal} style= {(date && time) ? styles.button : null}>
                {date && <Text>Select</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
        style= {styles.modalContainer}
        animationType= 'slide'
        transparent= 'true'
        visible= {openTimeModal}>
          <View style= {styles.centerView}>
            <View style= {styles.modalView}>
            <DatePicker
              mode= 'time'
              onTimeChange = {handleChangeTime}
            />
            </View>
          </View>
        </Modal>


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
                  color= 'green'
                />
                <View >
                  <Text style= {styles.reminderDateTime}>{item.date} @ {item.time}</Text>
                  <Text style= {styles.reminderText}>{item.text}</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  title: {
    flex: 2,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  appTitle: {
    fontSize: 80,
  },

  userInput: {
    flex: 2,
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  dateTimeContainer: {
    // borderColor: 'black',
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },

  dateTimeContainerMissing: {
    // borderColor: 'black',
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },

  dateTime: {
    // borderColor: 'red',
    // borderWidth: 1,
    width: 70,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },

  dateTimeMissing: {
    // borderColor: 'red',
    // borderWidth: 1,
    width: 70,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
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

  reminderList: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    height: '90%',
  },

  centerContainer: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: 240,
  },

  centerView : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 35,
    alignItems: 'center',
  },

  button: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
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

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  buttonDisabled: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'lightgrey',
    opacity: 0.5
  }
});
