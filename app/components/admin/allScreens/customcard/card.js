import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import { darkGreen } from "../../../Constants";

const Card = ({ studentData, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
        <View style={styles.textContainer}>
            <Text style={styles.Name}>
                {studentData.name}
            </Text>
            <Text style={styles.username}>
              {studentData.email}
            </Text>
        </View>
        <View style={styles.statusContainer}>
            <Text style={styles.status}>
                {studentData.year}
            </Text>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      padding: 14,
      marginVertical: 8,
      borderRadius: 12,
      backgroundColor: "#FFF",
      shadowColor: 'black',
    },
    Name: {
      fontSize: 16,
      fontWeight: "bold",
      color: 'black',
    },
    statusContainer: {
      width: 60,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
    },
    textContainer: {
      flex: 1,
      marginHorizontal: 16,
    },
    status: {
      fontSize: 16,
      color: darkGreen,
    },
    username: {
      fontSize: 14,
      color: 'black',
      marginTop: 3,
    },
});


export default Card;