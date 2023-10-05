import {View, Text, SafeAreaView} from 'react-native';
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView } from 'react-native-gesture-handler';



const details = () => {
    const{_id, name, email, password, year, date, access, prove, pending} = useLocalSearchParams();
    return(
        <SafeAreaView>
            <Stack.Screen
                options={{ headerShown: true, headerTitle: email }}
            />
            <ScrollView>
                <View>
                    <Text>{name}</Text>
                    <Text>{email}</Text>
                    <Text>{password}</Text>
                    <Text>{year}</Text>
                    <Text>{date}</Text>
                    <Text>{access}</Text>
                    <Text>{prove}</Text>
                    <Text>{pending}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default details;