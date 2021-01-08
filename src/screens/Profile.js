import React from 'react';
import {ScrollView, View,Text, StyleSheet} from 'react-native';
import Header from '../components/Header';

const Profile = ({navigation}) => {
    return (
        <ScrollView style={styles.mainContainer}>
            <Header navigation={navigation} />
            <Text style={styles.title}>Profile</Text>
            <View style={styles.profile}>
                <Text>ok</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop:10,
        padding:20,

    },
    profile: {
        margin:10,
        padding:20,
        elevation:10
    }
})

export default Profile
