import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';

const DatePickerModal = ({ openDateModal, date, startDate, handleChangeDate, handleOpenDateModal }) => {

  return (
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

              <View style= {styles.buttonRow}>
                <TouchableOpacity >
                  <Text style= {styles.button} onPress= {handleOpenDateModal}>Back</Text>
                </TouchableOpacity>
                {date ?
                  <TouchableOpacity >
                    <Text style= {styles.button} onPress= {handleOpenDateModal}>Select</Text>
                  </TouchableOpacity> :
                  <Text style= {styles.buttonDisabled}>Select</Text>
                  }
              </View>
            </View>
          </View>
        </Modal>
  )
}

export default DatePickerModal

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

  buttonRow: {
    flexDirection: 'row',
    width: 150,
    justifyContent: 'space-between',
  },

  buttonDisabled: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'lightgrey',
    opacity: 0.5
  },

  button: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },

})