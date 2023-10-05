import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl} from "react-native";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import Card from "./customcard/card";
import Tabs from "./customcard/Tab";
import axios from "axios";


const Home = () => {
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState('All Students');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const onRefresh = () => {};

    const tabs = ['All Students', 'Pending', 'Paid', 'Register'];

    const url = "https://server-git-main-aunmuhammad1.vercel.app/";


    if (activeTab == 'Pending'){
        axios.get(url + 'check-payment')
        .then((res) => {
            const data = res.data;
            setData(data);
        })
    }
    else if (activeTab == 'Paid' || activeTab == 'All Students'){
        axios.get(url + 'get-confirm-payment')
        .then((res) => {
            const data = res.data;
            setData(data);
        })
    } else if (activeTab == 'Register'){
        axios.get(url + 'get-data')
        .then((res) => {
            const data = res.data;
            setData(data);
        })
    }

    const displayFilterContent = () => {
        if (activeTab == 'All Students'){
            return (
                data.map((item) => {
                    if(item.access == true){
                        const studentData = item.studentData;
                        return <Card
                            key={item._id} 
                            studentData={studentData}
                            handleNavigate={() => router.push({pathname:`/components/admin/allScreens/details/${item?._id}`, params:{_id: item._id, name:item.studentData.name, email:item.studentData.email, phone:item.studentData.phone, year:item.studentData.year, password:item.studentData.password, date:item.studentData.date, access:item.access, prove:item.prove}})}
                        />
                    }
                })
            )
        }
        else if (activeTab == 'Pending'){
            return (
                data.map((item) => {
                    if(item.pending == true){
                        const studentData = item.studentData;
                        return <Card
                            key={item._id} 
                            studentData={studentData}
                            handleNavigate={() => {
                                router.push({pathname:`/components/admin/allScreens/details/${item?._id}`, params:{_id: item._id, name:item.studentData.name, email:item.studentData.email, phone:item.studentData.phone, year:item.studentData.year, password:item.studentData.password, date:item.studentData.date, pending:item.pending}})
                            }} 
                        />
                    }
                })
            )
        }
        else if (activeTab == 'Paid'){
            return (
                data.map((item) => {
                    if(item.access == false){
                        const studentData = item.studentData;
                        return <Card
                            key={item._id} 
                            studentData={studentData}
                            handleNavigate={() => router.push({pathname:`/components/admin/allScreens/details/${item?._id}`, params:{_id: item._id, name:item.studentData.name, email:item.studentData.email, phone:item.studentData.phone, year:item.studentData.year, password:item.studentData.password, date:item.studentData.date, prove:item.prove, access:item.access}})}  
                        />
                    }
                })
            )
        } else if (activeTab == 'Register'){
            return (
                data.map((item) => {
                    const studentData = item;
                    return <Card
                        key={item._id}
                        studentData={studentData}
                        handleNavigate={() => router.push({pathname:`/components/admin/allScreens/details/${item?._id}`, params:{_id: item._id, name:item.studentData.name, email:item.studentData.email, phone:item.studentData.phone, year:item.studentData.year, password:item.studentData.password, date:item.studentData.date}})} 
                    />
                })
            )
        }
    };


    return (
        <View style={styles.container}>
            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {isLoading ? 
                    <ActivityIndicator size="large" color="white"
                    /> : displayFilterContent()
                }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height : "100%",
        flex: 1,
        backgroundColor: "green",
        padding: 12,
        justifyContent: 'space-between',
    },
});



export default Home;