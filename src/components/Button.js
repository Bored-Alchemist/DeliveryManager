
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default ({ color, text, click }) => {
    return (
        <TouchableOpacity onPress={click} style={styles.button_2}>
            <Text style={{...styles.login, backgroundColor:color}}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button_2: {
        flex:1,
    },
    login: {
        // backgroundColor:'lightgreen',
        borderRadius: 90,
        textAlign:'center',
        alignContent:'flex-end',
        alignItems:'center',
        justifyContent:'flex-end',
        paddingVertical: 12,
        color: 'white',
        fontWeight:'bold',
        fontSize:16,
        marginHorizontal:10
    }
})
