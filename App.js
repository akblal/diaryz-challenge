import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Modal, TouchableOpacity } from 'react-native';
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker';

export default function App() {

  const todayDate = new Date();
  const startDate = getFormatedDate(todayDate.setDate(todayDate.getDate()), 'YYYY/MM/DD');

  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [text, setText] = useState();
  const [openDateTimeModal, setOpenDateTimeModal] = useState(false);
  const [list, setList] = useState([])

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

  const saveReminder = () => {
    let reminder = {
      date: date,
      time: time,
      text: text
    }
    let copy = list.slice();
    copy.push(reminder)
    setList(copy)
    setDate()
    setTime()
    setText()
  }

  return (
    <View style= {styles.container}>
      <Text>Reminder: </Text>

      <TextInput
        style= {[styles.input, styles.reminder]}
        onChangeText = {handleChangeText}
      />

      <TouchableOpacity onPress= {handleOpenDateTimeModal} style= {styles.button}>
        <Text>Open</Text>
      </TouchableOpacity>

      {date && time && text && <TouchableOpacity onPress= {saveReminder} style= {styles.button}>
        <Text>Save</Text>
      </TouchableOpacity>}

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
            <TouchableOpacity onPress= {handleOpenDateTimeModal}>
              {date && time && <Text>Select</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {list.map((item) =>

          <Text>{item.date} {item.time} {item.text}</Text>

      )}
      <StatusBar style="auto" />

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  }


});
