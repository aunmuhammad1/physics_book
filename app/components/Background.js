import React from 'react';
import {View, ImageBackground, StyleSheet} from 'react-native';

const Background = ({ children }) => {
  return (
    <View>
      <ImageBackground source={require("../../assets/leaves.jpg")} style={{ height: '100%' }} />
      <View style={styles.Container}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    width: '100%', 
    height: '100%',
    position: "absolute",
  },
});

export default Background;