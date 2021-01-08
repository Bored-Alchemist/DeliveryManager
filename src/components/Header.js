import React, {useState} from 'react';
import { View, Image, StyleSheet, Text,TouchableOpacity ,TouchableHighlight,Modal, AsyncStorage, StatusBar} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default ({ color, text, click, navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const logoutUser = async () => {
        setModalVisible(false);
        AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('loggedIn');
        navigation.navigate('Home');
    }
    return (
        <View style={styles.header}>
            <View style={{padding:10, flexDirection:'row', flex:1, display:'flex'}}>
            <TouchableOpacity onPress={()=>navigation.navigate('Profile')} style={{flex:1}}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setModalVisible(true)} style={{justifyContent:'center',alignItems:'center',alignContent:'center'}}>
              <Ionicons name="ios-log-out" color="white" size={50} />
            </TouchableOpacity>
            </View>


            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to logout?</Text>

            <View style={{justifyContent:'center',alignContent:'center',alignItems:'center', display:'flex',flexDirection:'row'}}>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#4caf50" }}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.textStyle}>No</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#f44336" }}
              onPress={() => {
                logoutUser();
              }}
            >
              <Text style={styles.textStyle}>Yes</Text>
            </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

        </View>
    )
}
const styles = StyleSheet.create({
    logo: {
        flex:1,
        height: 50,
        width: 50
    },
    header: {
        backgroundColor:'#FA575A',
        borderBottomEndRadius: 10,
        borderBottomStartRadius:10,
        elevation:2
    },
    user: {
        height: 50,
        width: 50 
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        flex:1,
        margin:10
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})
