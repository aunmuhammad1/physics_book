import React, { useState } from 'react';
import {
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView,   
  Modal,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Stack, useRouter} from 'expo-router';
import Background from './Background';
import Btn from './Btn';
import {darkGreen} from './Constants';
import Field from './Field';
import axios from 'axios';


const Signup = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [year, setyear] = useState(null);
  const[isLoading, setIsLoading] = useState(false);

  const data = [
    { label: 'First Year', value: 'option1' },
    { label: 'Second Year', value: 'option2' },
  ];
  const handleSelect = (label) => {
    setyear(label);
    setIsOpen(false);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [wrong, setWrong] = useState(false);

  const onChangeTextconfirm = (text) => {
    setConfirmPassword(text);
    if (text !== password) {
      setWrong(true);
    } else {
      setWrong(false);
    }
  };

  const studentData = {
    name: name,
    email: email,
    year: year,
    password: password,
    phone: phone,
    date: new Date(),
  }


  const url = "https://server-git-main-aunmuhammad1.vercel.app/"

  const handleSubmit = async () => {
    if (name === '') {
      alert(deviceBrand,'Please enter your name');
    } else if (email === '') {
      alert('Please enter your email');
    } else if (year === '') {
      alert('Please select your year of study');
    } else if (phone === '') {
      alert('Please enter your phone number');
    } else if (password === '') {
      alert('Please enter your password');
    } else {
      setIsLoading(true);
      await axios.get(url + 'get-data')
      .then( async (res)  => {
        const checkemail = res.data.filter((item) => item.email === email);
        const checkphone = res.data.filter((item) => item.phone === phone);
        if(checkemail.length !== 0 || checkphone.length !== 0){
          alert("You are already registered");
          router.push({pathname:'/components/Login', params: {user: email}});
          setIsLoading(false);
          setName('');
          setEmail('');
          setyear('');
          setPhone('');
          setPassword('');
          setConfirmPassword('');
        }
        else {
          await axios.post( url + 'send-data', studentData)
            .then( async ()  => {
              await axios.post(url + 'make-payment', {
                studentData: studentData,
                pending: true,
              })
              router.push({ pathname: '/components/payment/paymentHome', params: {name, email, phone, password, year}});
              setIsLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });

          setName('');
          setEmail('');
          setyear('');
          setPhone('');
          setPassword('');
          setConfirmPassword('');
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: '',
        }}
      />
      <Background>
        {isLoading ? 
        <ActivityIndicator size="large" color="#00ff00" 
        /> : <ScrollView>
          <View>
            <Text
              style={{
                color: 'white',
                fontSize: 64,
                fontWeight: 'bold',
                marginVertical: 13,
                textAlign: 'center',
              }}>
              Register
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 19,
                fontWeight: 'bold',
                marginBottom: 20,
                textAlign: 'center',
              }}>
              Create a new account
            </Text>
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                height: '100%',
                borderTopLeftRadius: 130,
                paddingTop: 50,
                alignItems: 'center',
              }}>
              <Field 
                placeholder="Full Name"
                value={name}
                onChangeText={(text) => setName(text)} 
                />
              <Field
                value={email}
                placeholder="Email / Username"
                onChangeText={(text) => setEmail(text)}
                keyboardType={'email-address'}
              />
              
              <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
                <View>
                  <Text style={styles.textStyle}>{year || 'Select an option........'}</Text>
                </View>
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={true}
                visible={isOpen}
                onRequestClose={() => setIsOpen(false)}
              >
                <TouchableOpacity
                  style={styles.modalOverlay}
                  activeOpacity={1}
                  onPress={() => setIsOpen(false)}
                >
                  <View style={styles.modalContent}>
                    <FlatList
                      data={data}
                      keyExtractor={(item) => item.value}
                      renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleSelect(item.label)}>
                          <Text style={styles.modalItem}>{item.label}</Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </TouchableOpacity>
              </Modal>
              <Field
                value={phone}
                onChangeText={(text) => setPhone(text)} 
                placeholder="Contact Number" 
                keyboardType={'number-pad'} 
              />
              <Field
                value={password}
                onChangeText={(text) => setPassword(text)} 
                placeholder="Password" 
                secureTextEntry={true} 
                />
              <Field
                value={confirmPassword}
                onChangeText={onChangeTextconfirm} 
                placeholder="Confirm Password" 
                secureTextEntry={true} 
              />
              {wrong ? <Text style={{color: 'red', fontSize: 15, marginBottom: 10}}>
                Password does not match
              </Text> : null}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <Text style={{color: 'grey', fontSize: 15}}>
                  By signing in, you agree to our{' '}
                </Text>
                <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 15}}>
                  Terms & Conditions
                </Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent :"center",
                  width: '78%',
                  paddingRight: 16,
                  marginBottom: 45,
                }}>
                <Text style={{color: 'grey', fontSize: 15}}>
                  and {" "}
                </Text>
                <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 15}}>
                  Privacy Policy
                </Text>
              </View>
              <Btn
                textColor="white"
                bgColor={darkGreen}
                btnLabel="Next"
                Press={handleSubmit}
              />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  Already have an account ?{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => router.push('/components/Login')}>
                  <Text
                    style={{color: darkGreen, fontWeight: 'bold', fontSize: 16, marginBottom: 5}}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>}
      </Background>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 15,
    color: darkGreen,
  },
  dropdownButton: {
    borderRadius: 100, 
    paddingHorizontal: 10,
    paddingVertical: 4, 
    width: '78%', 
    backgroundColor: 'rgb(220,220, 220)', 
    marginVertical: 10
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'rgb(220,220, 220)',
    width: 200,
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  modalItem: {
    color: darkGreen,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Signup;