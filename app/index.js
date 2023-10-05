import React from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Background from './components/Background';
import Btn from './components/Btn';
import { darkGreen, green } from './components/Constants';


const Home = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: '',
          }}
      />
      <Background>
        <View style={styles.mainContainer}>
          <View style={styles.textContainer}>
            <Text style={{ color: 'white', fontSize: 50 }}>Let's start</Text>
            <Text style={{ color: 'white', fontSize: 50, marginBottom: 40 }}>
              Coding
            </Text>
            </View>
          <View style={styles.btnContainer}>
            <Btn
              bgColor={green}
              textColor="white"
              btnLabel="Login"
              Press={() => router.push('/components/Login')}
            />
            <Btn
              bgColor="white"
              textColor={darkGreen}
              btnLabel="Signup"
              Press={() => router.push('/components/Signup')}
            />
          </View>
          </View>
      </Background>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    justifyContent: 'space-around',
  },
  btnContainer: {
    alignItems: 'center',
  },
  textContainer: {
    marginHorizontal: 20,
  },
});

export default Home;
