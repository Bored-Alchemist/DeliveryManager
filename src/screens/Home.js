import React, {useEffect, useState} from 'react';
import { View, StyleSheet, BackHandler, Text, TouchableOpacity, ImageBackground, Image,Modal,TouchableHighlight, AsyncStorage} from 'react-native';
import { light_white, h, w } from '../assets/commons';
import Button from '../components/Button';
import TextInput from '../components/Input';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import SwipeButton from 'rn-swipe-button';
import { connect } from 'react-redux';
import { generateOTP, showError } from '../action/auth';

const Home = ({navigation, generateOTP, showError}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const thumbIcon = () => <Icon name="arrowright" size={50}  />;
    const [signInForm, seSignInForm] = useState('');
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

    // useEffect(()=>{
    //     checkIsLoggedIn()
    // },[])

    const checkIsLoggedIn = async () => {
        let isLoggedIn = await AsyncStorage.getItem('user');
        console.log(isLoggedIn);
      if(isLoggedIn) {
        navigation.navigate('Dashboard');
        return false;
      } else {
          return true;
      }
    }

    const changeInput = (e, name) => {
        seSignInForm(e);
    }



    const submit = async () => {
        if(!signInForm || signInForm == '') {
            showError('Mobile number is required!');
            return;
        }
        const response = await generateOTP(signInForm);
        AsyncStorage.removeItem('mobile')
        if(response.success) {
            AsyncStorage.setItem('user', JSON.stringify(response.Data))
            console.log(response.Data)
            navigation.navigate('Login', {otp: response.Data.otp, number:  signInForm});
            seSignInForm('');
        }
    }

    const updateSwipeStatusMessage = () => {
        navigation.navigate('Login');
    }
    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.top}>
            <ImageBackground style={{ height: h*0.6,width:w}} source={require('../assets/ellipse.png')} >
                    <View style={styles.container}>
                        <Image source={require('../assets/logo.png')} />
                    </View>
            </ImageBackground>
            </View>
            
            <View style={styles.bottom}>
                    <View style={styles.inputContainer}>
                        <TextInput type="numeric" change={changeInput} value={signInForm} name="mobile" placeholder="Mobile" />
                    </View>
                    <View >
                        {/* <View style={{flex:1}}></View> */}
                        {/* <View style={styles.buttonContainer}> */}
                        <TouchableOpacity style={styles.button_2} onPress={() => submit()}>
                            <Text style={{padding:15, marginHorizontal:15, color: 'white', }}>
                                LOGIN
                            </Text>
                        </TouchableOpacity>
                    {/* </View> */}
                    </View>
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
        backgroundColor:'white'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    top: {
        flex:1
    },
    bottom: {
        flex:1,
        marginTop:20
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
        backgroundColor:'#FA575A',
        borderRadius:5,
        marginLeft:20,
        marginRight:20,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        marginTop:30
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
 const mapStateToProps = state => ({

})

 export default connect(
    mapStateToProps, {
        generateOTP, showError
    }
) (Home)