import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const GetTime = ({ time, handleOpenTimeModal}) => {

  return (
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
  )
}

export default GetTime

const styles = StyleSheet.create({
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },

  dateTimeContainerMissing: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },

  dateTime: {
    width: 70,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },

  dateTimeMissing: {
    width: 70,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },

  button: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },

})