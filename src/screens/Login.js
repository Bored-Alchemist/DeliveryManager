import React, {useEffect, useState} from 'react';
import { View, StyleSheet, BackHandler, Text, TouchableOpacity, ImageBackground, Image, AsyncStorage, StatusBar } from 'react-native';
import { light_white, h, w } from '../assets/commons';
import Button from '../components/Button';
import TextInput from '../components/Input';
import { ScrollView } from 'react-native-gesture-handler';
import { loginUser, showError } from '../action/auth';
import { connect } from 'react-redux';

const Login = ({navigation, route, loginUser, showError}) => {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
          backHandler.remove();
        };
      }, []);

      function handleBackButtonClick() {
        navigation.goBack();
        return true;
    }

    const [loginForm, setLoginForm] = useState({mobile:'', otp:''})

    useEffect(()=>{
        console.log(route.params);
        if(route.params.otp) {
            console.log('otp', route.params.otp)
            setLoginForm({mobile: route.params.number, otp: route.params.otp})
        }

    },[]);
    const changeInput = (e) => {
        
        setLoginForm({...loginForm,mobile: e})
    }

    const changeInputOtp = (e) => {
        setLoginForm({...loginForm,otp: e})
    }

    const submit = async () => {
        if(!loginForm.mobile || loginForm.mobile == '') {
            showError('Mobile number is required!');
            return;
        }

        if(!loginForm.otp || loginForm.otp == '') {
            showError('OTP is required!');
            return;
        }
        const response = await loginUser(loginForm);
        if(response.success) {
            AsyncStorage.setItem('loggedIn', 'true')
            navigation.navigate('Dashboard');
        }
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
                        <TextInput name="mobile" change={changeInput} value={loginForm.mobile}  placeholder="Mobile" />
                        <TextInput name="otp" change={changeInputOtp} value={loginForm.otp} placeholder="OTP" />
                    </View>
                    {/* <View style={styles.buttonContainer}> */}
                        <TouchableOpacity style={styles.button_2} onPress={() => submit()}>
                            <Text style={{padding:15, marginHorizontal:15, color: 'white', }}>
                                LOGIN
                            </Text>
                        </TouchableOpacity>
                    {/* </View> */}
            </View>
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
        justifyContent: 'center'
    },
    top: {
        flex:1
    },
    bottom: {
        flex:1,
        marginTop: 20
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
    }
 });

 const mapStateToProps = state => ({

})

 export default connect(
    mapStateToProps, {
        loginUser, showError
    }
) (Login)