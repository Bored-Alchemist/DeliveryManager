
import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

export default ({ icon, disabled, value,type, name, change, placeholder, secure, bgColor, inputColor }) => {
    return (
        <View style={{...styles.inputContainer,backgroundColor: bgColor ? bgColor : '#F3F3F4'}}>
                     <View style={{ flex: 0.85, paddingLeft: 10 }}>
                     <TextInput editable={disabled ? false : true} keyboardType={type ? type : 'default'} onChangeText={(e) => change(e, name)} value={value} name='name' placeholder={placeholder} secureTextEntry={secure} placeholderTextColor={inputColor ? inputColor : '#838383'} style={{color:inputColor ? inputColor : '#838383'}} />
                     </View>
                
                 </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        
        borderRadius: 5,
        paddingVertical: 5,
        marginVertical: 6
    },
    input: {
        color: '#838383'
    }
})
