import React,{useEffect, useState} from 'react';
import { View, StyleSheet, BackHandler, Text, TouchableOpacity, ImageBackground, Image, AsyncStorage} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import Header from '../components/Header';
import {getVendors, storeCafeDensity, showError} from '../action/auth';
import { connect } from 'react-redux';
import Input from '../components/Input';

const Vendors = ({navigation, route, getVendors, storeCafeDensity, showError}) => {
    const [vendors, setVendors] = useState([])
    const [density, setDensity] = useState(null);

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

    useEffect(()=>{
        console.log(route.params);
        fetchVendors()
    },[])

    const changeInput = (e,name) => {
        setDensity(e);
    }

    const fetchVendors = async () => {
        const response = await getVendors({org_id: route.params.id, cafename: route.params.cafename});
        if(response.success) {
            console.log(response.data.data);
            setVendors(response.data.data)
        }
    }

    const submit = async () => {
        if(!density || density == '') {
            showError('Density value is required!');
            return;
        }
        const user = await AsyncStorage.getItem('user');
        console.log(JSON.parse(user));
        const response = await storeCafeDensity({
            dm_id: JSON.parse(user).dm_id,
            org_id: route.params.id,
            density_value: density,
            cafe_name: route.params.cafename
        });
        if(response.success) {
            // success
            console.log(response);
            setDensity(null);
            
        }
    }

    const redirectToCheck = async (vendor) => {
        console.log(vendor.split('-'))
        const user = await AsyncStorage.getItem('user');
        console.log(JSON.parse(user));
        navigation.navigate('Checklist',{org_id: route.params.id, dm_id: JSON.parse(user).dm_id,v_id: vendor.split('-')[1]})
    }
    return (
        <ScrollView style={styles.mainContainer}>
            <Header navigation={navigation} />
            <View style={styles.card}>
                <Text style={styles.title}>
                    LIST OF VENDORS
                </Text>
                {vendors && vendors.length > 0 && vendors.map((vendor, index) => 
                <TouchableOpacity onPress={()=>redirectToCheck(vendor)} key={index} style={styles.listContainer}>
                    <Text style={styles.listTitle}>
                        {index+1}) {vendor.split('-')[1]}
                    </Text>
                    <View style={{justifyContent:'center',alignItems:'center',alignContent:'center'}}>
    <Image style={{justifyContent:'center',alignItems:'center',alignContent:'center', marginRight:30}} source={require('../assets/end.png')} />
    </View>
                </TouchableOpacity>)}

                
            </View>


            <View style={styles.card}>
                <View style={styles.sensorContainer}>
                    <Text style={{fontSize:18, marginBottom:10, fontWeight:'bold'}}>Sensor Activate</Text>
                </View>


                <View style={styles.CafeContainer}>
                    <Text style={{fontSize:18, marginBottom:10}}>Cafeteria Density</Text>
                </View>

                <View >
                    {/* <Text style={styles.center}>
                        Value
                    </Text> */}

                    <Input name="density" placeholder="Value" value={density} change={changeInput} />
                </View>
            </View>

            <TouchableOpacity onPress={()=>submit()} style={styles.buttonContainer}>
                <Text style={styles.button}>
                    Submit
                </Text>
            </TouchableOpacity>
            
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
        justifyContent: 'center',
        padding:20
    },
    card: {
        backgroundColor:'#FFFDFD',
        borderRadius: 10,
        margin:10,
        padding:20,
        elevation:10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom:10,
        flex:1
    },
    listContainer: {
        backgroundColor:'#ffffff',
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 10,
        display:'flex',
        flexDirection:'row',
        elevation:10
    },
    listTitle: {
        fontSize:22,
        marginHorizontal:15,
        padding:7,
        flex:1
    },
    sensorContainer: {
        flex:1,
        alignItems:'center',
        flexDirection:'column',
        paddingBottom: 90
    },
    CafeContainer: {
        flex:1,
        // alignItems:'center'
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
        backgroundColor:'#FA575A',
        margin:20,
        borderRadius:10,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        padding:4
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
        getVendors, storeCafeDensity, showError
    }
) (Vendors)