import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet} from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import Background from "../Background";
import Btn from "../Btn";
import axios from "axios";
import { darkGreen } from "../Constants";
import * as Clipboard from 'expo-clipboard';
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { encode, decode } from "base-64";

const paymentHome = () => {
    const [selectImage, setSelectImage] = useState('');
    const {name, email, phone, password, year, access, selectedValue} = useLocalSearchParams();
    const [isAccess, setIsAccess] = useState(access);
    const [isLoading, setIsLoading] = useState(false);
    const [base64, setBase64] = useState('');


    if(selectedValue !== undefined) {
        year = selectedValue;
    }

    const userData = {
        name: name,
        email: email,
        phone: phone,
        password: password,
        year: year,
        date: new Date(),
    }


    const url = "https://server-git-main-aunmuhammad1.vercel.app/";

    const handleUploadbtn = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
    
        if (status === 'granted') {
            const response = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            });

            if (!response.canceled) { 
                setSelectImage(response.assets[0].uri);
                setBase64(encode(response.assets[0].uri));
            }
        }
    }


    const handleDoneBtn = async () =>{
        setIsLoading(true);
        await axios.put(url + 'update-payment', {email: email});
        await axios.post(url + 'confirm-payment', {studentData: userData, prove: base64, access: false});
        setIsLoading(false);
        setIsAccess(true);
    }

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync('03236307633');
        alert("Copied to clipboard");
    };

    if(!access) {
        return (
            <SafeAreaView>
                <Stack.Screen
                    options={{
                        headerShown: true,
                        headerTitle: name,
                    }}
                />
                <Background>
                    {isLoading ? 
                        <ActivityIndicator style={{alignContent: "center", justifyContent: 'center'}} size="large" color="#00ff00" 
                    /> : <ScrollView>
                        <View>
                            <Text
                                style={styles.mainText}>
                                Payment
                            </Text>
                            {isAccess ? 
                            <View style={styles.mainContainer}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: "center", marginBottom: 434 }}>Please wait for admin to confirm it</Text>
                            </View> : <View style={styles.mainContainer}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: "center", marginBottom: 20 }}>Your total amount is Rs. 1000</Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: "center", marginBottom: 20 }}>Please send your payment to the following account</Text>
                            <View 
                                style={{ 
                                    flexDirection: 'row',
                                    alignItems: 'center', 
                                    justifyContent: 'space-around', 
                                    width: '100%', 
                                    paddingHorizontal: 20, 
                                    marginTop: 20,
                                    marginVertical: 90,
                                }}
                            >
                                <Image
                                    source={require('../../../assets/jazzcash.png')}
                                    style={{ width: 100, height: 50 }}
                                />
                                <TouchableOpacity onPress={copyToClipboard}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>03236307633</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ fontSize: 15, width: '80%', textAlign: "center", marginTop: 20 }}>After sending the payment, please upload screenshot below and wait for 2 days</Text>
                            <Btn
                            bgColor= {darkGreen}
                            btnLabel={'Upload'}
                            textColor={'white'}
                            Press={handleUploadbtn}
                            />
                            {selectImage ? <Image source={{ uri: selectImage }} style={{ width: 100, height: 100, marginTop: 20 }} /> : null
                            }
                            <Btn
                            bgColor= {darkGreen}
                            btnLabel={'Done'}
                            textColor={'white'}
                            Press={handleDoneBtn}
                            />
                        </View>}
                            
                        </View>
                    </ScrollView>
                    }
                </Background>
            </SafeAreaView>
    
        );  
    } else {
        return (
            <SafeAreaView>
                <Stack.Screen
                    options={{
                        headerShown: true,
                        headerTitle: name,
                    }}
                />
                <Background>
                    <View>
                        <Text
                            style={styles.mainText}>
                            Payment
                        </Text>
                        <View style={styles.mainContainer}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: "center", marginBottom: 20 }}>Please wait for admin to confirm it</Text>
                    </View>
                    </View>
                </Background>
            </SafeAreaView>
        );  
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 130,
        paddingTop: 80,
        alignItems: 'center',
    },
    mainText: {
        color: 'white',
        fontSize: 64,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
    }
});

export default paymentHome;