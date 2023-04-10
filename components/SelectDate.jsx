import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Modal, TouchableOpacity } from 'react-native';
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker';

const SelectDate = (openDateTimeModal) => {

  return (
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
  )
}

export default SelectDate

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
})