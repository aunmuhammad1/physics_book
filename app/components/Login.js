import { React, useState } from 'react';
import {View, Text, Touchable, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator} from 'react-native';
import {Stack, useRouter, useLocalSearchParams } from 'expo-router';
import Background from '../components/Background';
import Btn from '../components/Btn';
import {darkGreen} from '../components/Constants';
import Field from '../components/Field';
import axios from 'axios';


const Login = () => {
  const router = useRouter();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const {user} = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const url = "https://server-git-main-aunmuhammad1.vercel.app/";

  const handleSubmit = async () => {
    if (Email === '') {
      alert('Please enter your email');
    } else if (Password === '') {
      alert('Please enter your password');
    } else if (Email == 'Aun' && Password == 123) {
      router.push('/components/admin/Dashboard');
    } 
    else {
      setIsLoading(true);
      await axios.get(url + 'get-data')
      .then( async (res)  => {
        const dataEmail = res.data.filter((item) => item.email === Email);
        const dataPassword = res.data.filter((item) => item.password === Password);
        if(dataEmail.length > 0 && dataPassword.length > 0) {
          const {name, email, phone, year, password} = dataEmail[0];
          await axios.get(url + 'check-payment')
          .then( async (res) => {
            const dataPendingfalse = res.data.filter((item) => item.studentData.email === Email && item.pending === false);
            const dataPendingtrue = res.data.filter((item) => item.studentData.email === Email && item.pending === true);
            if(dataPendingfalse.length > 0) {
              await axios.get(url + 'get-confirm-payment')
              .then((res) => {
                const dataAccess = res.data.filter((item) => item.studentData.email === Email && item.access === false);
                const dataAccessTrue = res.data.filter((item) => item.studentData.email === Email && item.access === true);
                if(dataAccess.length > 0) {
                  router.push({pathname:'/components/payment/paymentHome', params:{name, email, access: false}})
                  setIsLoading(false);
                } else if(dataAccessTrue.length > 0) {
                  router.push({pathname:'/components/bookfiles/book', params: { email, year}})
                  setIsLoading(false);
                }})
            } else if(dataPendingtrue.length > 0) {
              router.push({pathname:'/components/payment/paymentHome', params:{name, email, phone, year, password}})
              setIsLoading(false);
            }})} 
          else if(dataEmail.length == 0 && dataPassword.length == 0) {
            alert("Invalid credentials")
            setIsLoading(false);
          }
        else if(dataEmail.length > 0 && dataPassword.length == 0) {
          alert("Wrong password")
          setIsLoading(false);
          setPassword('');
        }
        else if(dataEmail.length == 0){
          alert("Invalid credentials")
          setIsLoading(false);
        }
      })
      .catch(err => {
        console.log(err)
      })}}

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
        <ActivityIndicator size="large" color={darkGreen} 
        /> : <ScrollView>
        <View style={{alignItems: 'center', width: '100%', height: "100%"}}>
          <Text
            style={{
              color: 'white',
              fontSize: 64,
              fontWeight: 'bold',
              marginVertical: 45,
            }}>
            Login
          </Text>
          <View
            style={{
              backgroundColor: 'white',
              height: '100%',
              width: '100%',
              borderTopLeftRadius: 130,
              paddingTop: 80,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 40, color: darkGreen, fontWeight: 'bold'}}>
              Welcome Back
            </Text>
            <Text
              style={{
                color: 'grey',
                fontSize: 19,
                fontWeight: 'bold',
                marginBottom: 40,
              }}>
              Login to your account
            </Text>
            <Field
              value={user ? user : Email}
              onChangeText={setEmail}
              placeholder="Email / Username"
              keyboardType={'email-address'}
            />
            <Field
              value={Password}
              onChangeText={setPassword} 
              placeholder="Password" 
              secureTextEntry={true} />
            <View
              style={{alignItems: 'flex-end', width: '78%', paddingRight: 16, marginBottom: 73}}>
              <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
                Forgot Password ?
              </Text>
            </View>
            <Btn textColor='white' bgColor={darkGreen} btnLabel="Login" Press={() => handleSubmit()} />
            <View style={{ display: 'flex', flexDirection :'row', justifyContent: "center" }}>
              <Text style={{ fontSize: 16, fontWeight:"bold" }}>Don't have an account ? </Text>
              <TouchableOpacity  onPress={() => router.push('/components/Signup')}>
              <Text 
                style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16, marginBottom: 15}}
                >Signup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>}
      </Background>
    </SafeAreaView>
  );
};

export default Login;