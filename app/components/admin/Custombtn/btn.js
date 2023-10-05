import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {darkGreen, green} from '../../Constants';

export default function Btn({btnLabel, Press}) {
  return (
    <TouchableOpacity
    onPress={Press}
      style={{
        backgroundColor: darkGreen,
        borderRadius: 100,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        alignItems: 'center',
        width: '90%',
        paddingVertical: 7,
        marginVertical: 10,
        marginHorizontal: 18,
      }}>
      <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
}