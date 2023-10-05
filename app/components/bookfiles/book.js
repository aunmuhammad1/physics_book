import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";

const Book = () => {
    const { email, year } = useLocalSearchParams();

    const header = (email) => (
        <Stack.Screen
            options={{
                headerShown: true,
                headerTitle: email,
            }}
        />
    )
    
    if(year == "First Year") {
        return(
            <SafeAreaView>
                {header(email)}
                <ScrollView>
                    <View>
                        <Text>First Year Books</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    } else if (year == "Second Year") {
        return(
            <SafeAreaView>
                {header(email)}
                <ScrollView>
                    <View>
                        <Text>Second Year Books</Text>
                    </View>
                </ScrollView>
            </SafeAreaView> 
        )
    }
}
export default Book;
