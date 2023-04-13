import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Modal, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, SafeAreaView } from 'react-native';
import Checkbox from 'expo-checkbox';
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker';

import AppTitle from './components/AppTitle.jsx';
import GetDate from './components/GetDate.jsx';
import GetTime from './components/GetTime.jsx';
import GetText from './components/GetText.jsx';
import DatePickerModal from './components/DatePickerModal.jsx';
import TimePickerModal from './components/TimePickerModal.jsx';
import DisplayReminders from './components/DisplayReminders.jsx';

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

        <AppTitle />

        <View style= {styles.userInput}>
          <GetDate date= {date} handleOpenDateModal= {handleOpenDateModal} />
          <GetTime time= {time} handleOpenTimeModal= {handleOpenTimeModal} />
          <GetText date= {date} time= {time} text= {text} saveReminder= {saveReminder} handleChangeText= {handleChangeText} />
        </View>

        <DatePickerModal openDateModal= {openDateModal} date= {date} startDate= {startDate} handleChangeDate= {handleChangeDate} handleOpenDateModal= {handleOpenDateModal} />
        <TimePickerModal openTimeModal= {openTimeModal} handleChangeTime= {handleChangeTime}/>

        <DisplayReminders list= {list} completeReminder= {completeReminder}/>

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

  userInput: {
    flex: 2,
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },

});
