import React,{useEffect} from 'react';
import { View, StyleSheet, BackHandler, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { light_white, h, w } from '../assets/commons';
import TextInput from '../components/Input';
import Button from '../components/Button';

export default ({navigation}) => {
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

    return (
        <ImageBackground style={styles.mainContainer} source={require('../assets/bgimage.jpg')}>
                <View style={styles.transContainer}>
                    <View style={styles.container}>
                        <Image source={require('../assets/logo.png')} />
                    </View>

                    <View style={styles.inputContainer}>
                        <View>
                            <Text style={styles.top_title}>FORGOT YOUR</Text>
                            <Text style={styles.title}>PASSWORD</Text>
                            <Text style={styles.bottom_text}>Select which contact details should we use to reset your password</Text>
                        </View>
                        <View style={styles.inputCard}>
                            <Text style={styles.input_label}>Via email</Text>
                            <TextInput name='email' placeholder='Email' icon='mail' />
                        </View>
                    </View>
                    <View style={styles.footer}>
                       <TouchableOpacity style={styles.forgot_text}>
                       </TouchableOpacity>
                       <View style={styles.login_button}>
                            <Button color="red" text="Reset" />
                       </View>
                    </View>
                </View>
            </ImageBackground>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex:1
    },
    container: {
        flex: 0.6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        flex: 0.7,
        marginHorizontal: w * 0.08
    },
    buttonContainer: {
        flex: 0.7,
        // paddingTop: h * 0.06
    },
    transContainer: {
        flex: 1,
        position: 'relative',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    footer: {
        flex: 0.2
    },
    title: {
        fontSize:42,
        color:'white',
        fontWeight:'bold'
    },
    sub_title: {
        marginTop: 10
    },
    inputCard: {
        marginTop:30,
        backgroundColor:'white',
        borderRadius: 10,
        paddingHorizontal:0,
        paddingVertical:0
    },
    footer: {
        display:'flex',
        flexDirection:'row',
        flex:0.1
    },
    forgot_text: {
        flex:1,
        justifyContent:'center',
        marginHorizontal:15
    },
    login_button: {
        flex:0.6,
        justifyContent:'center',
    },
    input_label: {
        marginHorizontal:10,
        marginTop:10
    },
    top_title: {
        color:'white',
        fontWeight:'bold',
        fontSize:18
    },
    bottom_text: {
        color:'white',
        marginTop:10
    }
 });