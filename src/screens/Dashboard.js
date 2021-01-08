import React,{useEffect, useState} from 'react';
import { View, StyleSheet, BackHandler, Text, TouchableOpacity, ImageBackground, Image, Modal, TouchableHighlight } from 'react-native';
import { light_white, h, w } from '../assets/commons';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../components/Header';

export default ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
          backHandler.remove();
        };
      }, []);

      function handleBackButtonClick() {
        setModalVisible(true);
        return true;
    }
    const reset = routeName => {
      return navigation.dispatch({
        index: 0,
        routes: [{name: routeName}]
      })
    }

    return (
        <ScrollView style={styles.mainContainer}>
            <Header navigation={navigation} />
            <TouchableOpacity onPress={()=>navigation.navigate('Companies')} style={styles.top}>
                <View style={{justifyContent:'center',
        alignContent:'center',
        alignItems:'center'}}>
                    <Image source={require('../assets/dash2.png')} />
                    <Text style={{color: '#0F0F0F', fontSize:30, fontWeight:'bold', marginTop:20,}}>List Of Companies</Text>
                </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>navigation.navigate('Wallet')} style={styles.bottom}>
            <View style={{justifyContent:'center',
        alignContent:'center',
        alignItems:'center'}}>
                    <Image source={require('../assets/dash1.png')} />
                    <Text style={{color: '#0F0F0F', fontSize:30, fontWeight:'bold', marginTop:20}}>Wallet Refill</Text>
                </View>
            </TouchableOpacity>

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
            <Text style={styles.modalText}>Are you sure you want to close this application?</Text>

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
                BackHandler.exitApp();
                setModalVisible(false);
              }}
            >
              <Text style={styles.textStyle}>Yes</Text>
            </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        backgroundColor:'white',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding:20
    },
    top: {
        backgroundColor:'#F3F3F4',
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        paddingTop: h/12,
        paddingBottom: h/12,
        margin:25,
        borderRadius:20,
        elevation:10
    },
    bottom: {
        backgroundColor:'#F3F3F4',
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        paddingTop: h/12,
        paddingBottom: h/12,
        margin:25,
        borderRadius:20,
        elevation:10
    },
    inputContainer: {
        // flex:1,
        paddingHorizontal:20
    },
    buttonContainer: {
        flex:1,
        display:'flex',
        flexDirection:'row',
        marginTop:30,
        paddingBottom:30,
        justifyContent:'center'
    },
    button_2: {
        backgroundColor:'#990303',
        borderRadius:10
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
 });