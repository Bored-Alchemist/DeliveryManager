import React,{useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, BackHandler, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../components/Header';

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
        <ScrollView style={styles.mainContainer}>
            <Header navigation={navigation} />
            <View style={styles.card}>
                <Text style={styles.title}>
                    LIST OF CAFETERIA
                </Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Checklist')} style={styles.listContainer}>
                    <Text style={styles.listTitle}>
                        1) ABC
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>navigation.navigate('Checklist')} style={styles.listContainer}>
                    <Text style={styles.listTitle}>
                        2) ABC
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={()=>navigation.navigate('Checklist')} style={styles.listContainer}>
                    <Text style={styles.listTitle}>
                        3) ABC
                    </Text>
                </TouchableOpacity>
            </View>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex:1
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding:20
    },
    card: {
        backgroundColor:'#FFF8F8',
        borderRadius: 10,
        margin:10,
        padding:20
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom:10
    },
    listContainer: {
        backgroundColor:'#E4DDDD',
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 10
    },
    listTitle: {
        fontSize:22,
        marginHorizontal:15,
        padding:7
    },
    sensorContainer: {
        flex:1,
        alignItems:'center',
        flexDirection:'column',
        paddingBottom: 90
    },
    CafeContainer: {
        flex:1,
        alignItems:'center'
    },
    center: {
        alignItems:'center',
        fontSize:20,
        marginHorizontal:15,
        padding:7,
        fontWeight:'bold'
    },
    cafeButton: {
        backgroundColor:'#E4DDDD',
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 10,
        alignItems:'center'
    },
    buttonContainer: {
        backgroundColor:'#4caf50',
        margin:20,
        borderRadius:10,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },
    button: {
        padding:10,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        color: 'white',
        fontWeight:'bold',
        fontSize:18
    }
 });