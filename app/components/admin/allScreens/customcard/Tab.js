import React, { useState } from "react";
import { TouchableOpacity, FlatList, Text, View, StyleSheet } from "react-native";
import { darkGreen } from "../../../Constants";


function TabButton({ name, activeTab, onHandleSearchType }) {
  return (
    <TouchableOpacity
      style={styles.btn(name, activeTab)}
      onPress={onHandleSearchType}
    >
      <Text style={styles.btnText(name, activeTab)}>{name}</Text>
    </TouchableOpacity>
  );
}

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            onHandleSearchType={() => setActiveTab(item)}
          />
        )}
        contentContainerStyle={{ columnGap: 6 }}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      marginTop: 12,
      marginBottom: 6,
    },
    btn: (name, activeTab) => ({
      paddingVertical: 14,
      paddingHorizontal: 18,
      backgroundColor: name === activeTab ? darkGreen : "#F3F4F8",
      borderRadius: 14,
      marginLeft: 2,
      shadowColor: 'white',
    }),
    btnText: (name, activeTab) => ({
      fontSize: 12,
      color: name === activeTab ? "#C3BFCC" : "#AAA9B8",
    }),
});

export default Tabs;
