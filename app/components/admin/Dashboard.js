import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView, Dimensions, Modal} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Icon } from '@rneui/themed';
import { useState } from "react";
import Btn from "./Custombtn/btn";
import Home from "./allScreens/Home";
import AddPdf from "./allScreens/AddPDF";


const Dashboard = () => {
    const router = useRouter();
    const [currentScreen, setCurrentScreen] = useState(<Home />);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const handlePress = () => {
        setIsSidebarOpen(true);
    };

    const btnpress = (props) =>{
        if(props == 'Home'){
            setCurrentScreen(<Home />);
            setIsSidebarOpen(false);
        } else if(props == 'addpdf'){
            setCurrentScreen(<AddPdf />);
            setIsSidebarOpen(false);
        }
    }

    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: '         Admin Dashboard',
                    headerLeft: () => (
                        <>
                            {isSidebarOpen ? null : (
                                <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
                                    <Icon name="menu" size={24} color="black" />
                                </TouchableOpacity>
                            )}
                        </>
                    )
                }}
            />
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={isSidebarOpen}
                onRequestClose={() => setIsSidebarOpen(false)}
            >
                <View style={styles.sidebar}>
                    <View style={styles.sidebarcontent}>
                        <View style={styles.sidebarHeader}>
                            <Btn
                                Press={() => {btnpress('Home')}} 
                                btnLabel="Home" />
                            <Btn 
                                Press={() => {btnpress('addpdf')}}
                                btnLabel="Add pdf" />
                        </View>
                        <View style={styles.sidebarfooter}>
                            <Btn
                                Press= {() => router.push('/')}
                                btnLabel="Logout" 
                            />
                        </View>
                    </View>
                </View>
            </Modal>
            <ScrollView>
                <View>
                    {currentScreen}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
        btnContainer: {
            width: 40,
            height: 40,
            backgroundColor: 'white',
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
        },
        sidebar: {
            marginTop: 56,
            width: Dimensions.get('window').width * 0.5,
            height: '93%', // Adjust the width as needed
            backgroundColor: 'white',
            elevation: 5, // Adds a shadow
        },
        sidebarcontent: {
            width: '100%',
            height: '100%',
            flex: 1,
            justifyContent: 'space-between',
        },
    });

export default Dashboard;