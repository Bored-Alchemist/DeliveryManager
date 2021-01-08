import React ,{useEffect} from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { light_white, h, w } from '../assets/commons';
import Button from '../components/Button';

export default () => {
    return (
        <View style={styles.mainContainer}>
                    <View style={styles.container}>
                        <Image source={require('../assets/MAIN.png')} />
                    </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        backgroundColor: '#ED2124'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        flex: 0.5,
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
    sub_title: {
        color: 'white',
        fontWeight:'bold',
        fontSize: 20
    },
    title: {
        fontSize:42,
        color:'white',
        fontWeight:'bold'
    },
    footer: {
        color: 'white'
    },
    footer_1: {
        marginTop: 20
    },
    footer_button: {
        flex:0.2,
        display:'flex',
        flexDirection:'row'
    }
 });