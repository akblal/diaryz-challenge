import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Keyboard, TextInput, TouchableWithoutFeedback, Modal } from 'react-native';
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker';

const TimePickerModal = ({ openTimeModal, handleChangeTime}) => {

  return (
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
  )
}

export default TimePickerModal

const styles = StyleSheet.create({

  modalContainer: {
    height: '90%',
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

})