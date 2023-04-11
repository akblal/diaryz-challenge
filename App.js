import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Modal, TouchableOpacity } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import Checkbox from 'expo-checkbox';
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker';

export default function App() {



  const todayDate = new Date();
  const startDate = getFormatedDate(todayDate.setDate(todayDate.getDate()), 'YYYY/MM/DD');

  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [text, setText] = useState('');
  const [completed, setCompleted] = useState(false);
  const [openDateTimeModal, setOpenDateTimeModal] = useState(false);
  const [list, setList] = useState([])
  const [counter, setCounter] = useState(0);

  const handleOpenDateTimeModal = () => {
    setOpenDateTimeModal(!openDateTimeModal);
  }

  const handleChangeDate = (newDate) => {
    setDate(newDate);
  }

  const handleChangeTime = (newTime) => {
    setTime(newTime);
  }

  const handleChangeText = (newText) => {
    setText(newText);
  }

  const handleCompletion = (id) => {
    setCompleted(!completed)
  }

  const saveReminder = () => {
    let day = date.substring(8);
    let month = date.substring(5,7);
    let year = date.substring(0,4);
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
    <View style= {styles.container}>
      <View style= {styles.title}>
        <Text>
          Reminder App
        </Text>
      </View>

      <View style= {styles.userInput}>
        <Text>Reminder: </Text>

        <TextInput
          style= {[styles.input, styles.reminder]}
          onChangeText = {handleChangeText}
          value= {text}
        />

        <View style= {styles.buttonRow}>
          <TouchableOpacity onPress= {handleOpenDateTimeModal} style= {styles.button}>
            <Text>Select Date and Time</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress= {saveReminder} style= {(!date || !time || !text) ? styles.buttonDisabled : styles.button} disabled= {!date || !time || !text}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>


      <Modal
      animationType= 'slide'
      transparent= 'true'
      visible= {openDateTimeModal}>
        <View style= {styles.centerView}>
          <View style= {styles.modalView}>
          <DatePicker
            mode= 'datepicker'
            selected= {date}
            minimumDate= {startDate}
            onDateChange= {handleChangeDate}
            onTimeChange = {handleChangeTime}
          />
            <TouchableOpacity onPress= {handleOpenDateTimeModal} style= {(date && time) ? styles.button : null}>
              {date && time && <Text>Select</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      <View style= {styles.reminderList}>
        {list.map((item) =>
          <View style= {styles.reminderLayout} key= {item.id}>
            <Checkbox
              value= {item.completed}
              onValueChange= {() => !item.completed}
              style= {styles.checkbox}
            />
            <View >
              <Text>{item.date} @ {item.time}</Text>
              <Text>{item.text} {item.id}</Text>

            </View>
          </View>
        )}
      </View>

      <StatusBar style="auto" />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: 'red',
  },

  title: {
    flex: 1,
    marginTop: 70,
  },

  userInput: {
    flex: 2,
    marginTop: 20,
  },

  reminderList: {
    flex: 5,
    marginTop: 20,
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },

  reminder: {
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
    margin: 20,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },

  reminderLayout: {
    flexDirection: 'row',
    columnGap: 10,
    marginBottom: 20,
  },

  checkbox: {

  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  buttonDisabled: {
    margin: 20,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'grey',

  }
});

// {date && time && text && <TouchableOpacity onPress= {saveReminder} style= {styles.button}>
//         <Text>Save</Text>
//       </TouchableOpacity>}