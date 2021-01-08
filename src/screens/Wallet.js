import React,{useEffect, useState} from 'react';
import { View, StyleSheet, BackHandler, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import TextInput from '../components/Input';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import Header from '../components/Header';
import {fetchEmployeeAmount, showError,refillEmployeeAmount } from '../action/auth';
import { connect } from 'react-redux';

const Wallet = ({navigation, fetchEmployeeAmount, showError,refillEmployeeAmount}) => {
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [userData, setUser] = useState(null);
    const [refill_amount, setRefillAmount] = useState('');

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

    const changeEmail = (e, name) => {
        setEmail(e)
    }
    const submit = async () => {
        if(!email || email == '') {
            showError('Employee ID is required!')
            return;
        }
        const response = await fetchEmployeeAmount({email});
        if(response.success) {
            //success
            console.log(response)
            setAmount(response.data.amount)
            setUser(response.data);
        }
    }

    const changeInput = (e, name) => {
        setRefillAmount(e);
    }

    const submitAmount = async () => {
        if(!refill_amount || refill_amount == '') {
            showError('Refill amount is required!');
            return;
        }
        console.log(userData);
        const response = await refillEmployeeAmount({
            wallet_id: userData.wallet_id,
            amount: userData.amount,
            refill_amount: refill_amount,
            cust_id: userData.cust_id,
            dm_id: userData.dm_id,
        });
        if(response.success) {
            // success
            setUser(null)
            setAmount('');
            setEmail('');
            setRefillAmount('');
        }
    }

    return (
        <ScrollView style={styles.mainContainer}>
            <Header navigation={navigation} />
            <View style={styles.card}>
                <Text style={styles.title}>
                    Wallet Refill
                </Text>
                <TextInput name="email" inputColor="black" placeholder="Employee ID" value={email} change={changeEmail} />
                <TouchableHighlight onPress={()=>submit()} style={{backgroundColor:'#FA575A',
        marginTop:20,
        marginBottom:20,
        borderRadius:10,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'}}>
                <Text style={styles.button}>
                   Submit
                </Text>
            </TouchableHighlight>
                <TextInput disabled={true} value={amount} name="mobile" inputColor="black" placeholder="Current Balance" />
                <TextInput name="amount" type="numeric" inputColor="black" placeholder="Refill Amount" value={refill_amount} change={changeInput} />
            </View>

            <TouchableHighlight onPress={()=>submitAmount()} style={styles.buttonContainer}>
                <Text style={styles.button}>
                    Refill
                </Text>
            </TouchableHighlight>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        backgroundColor:'#FFFDFD',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding:20
    },
    card: {
        
        borderRadius: 10,
        margin:10,
        padding:20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom:10
    },
    buttonContainer: {
        backgroundColor:'#FA575A',
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

 const mapStateToProps = state => ({

})


export default connect(
    mapStateToProps, {
        refillEmployeeAmount, fetchEmployeeAmount, showError
    }
) (Wallet)