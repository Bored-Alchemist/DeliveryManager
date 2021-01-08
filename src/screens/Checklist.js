import React,{useState, useEffect} from 'react';
import { View, StyleSheet, Text, TextInput, BackHandler } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../components/Header';
import TextInput2 from '../components/Input';
import {cafeteriaRemark, showError} from '../action/auth';
import { connect } from 'react-redux';

const Checklist = ({navigation, cafeteriaRemark, showError,route}) => {
    const [form,setForm] = useState({hygine: '', qualityoffood: '', cleaness:'', staff_attend:'',stock:'', other:'', remark:''})

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

    const setHygine = (value) => {
        setForm({...form, hygine: value});
    }

    const setQuality = (value) => {
        setForm({...form, qualityoffood: value});
    }

    const setClean = (value) => {
        setForm({...form, cleaness: value});
    }

    const changeInput = (e, name) => {
        setForm({...form, [name]: e})
    }

    const setStock = (value) => {
        setForm({...form, stock: value});
    }

    const submit = async () => {
        const { hygine, qualityoffood, cleaness, staff_attend, stock, other, remark } = form;

        if(!hygine || hygine == '') {
            showError('Please select any option from hygine!');
            return;
        }

        if(!qualityoffood || qualityoffood == '') {
            showError('Please select any option from quality of food!');
            return;
        }

        if(!cleaness || cleaness == '') {
            showError('Please select any option from cleanliness of kitchen!');
            return;
        }

        if(!staff_attend || staff_attend == '') {
            showError('Staff attendance is required!');
            return;
        }

        if(!stock || stock == '') {
            showError('Please select any option from stock!');
            return;
        }

        if(!other || other == '') {
            showError('Other is required!');
            return;
        }

        if(!remark || remark == '') {
            showError('Remark is required!');
            return;
        }
        const formt = {...form, org_id: route.params.org_id, v_id: route.params.v_id, dm_id: route.params.dm_id}
        console.log(formt)
        const response = await cafeteriaRemark(formt);
        if(response.success) {
            console.log(response)
            navigation.navigate('Dashboard');
        }
    }
    return (
        <ScrollView style={styles.mainContainer}>
            <Header navigation={navigation} />
            <View style={styles.card}>
                {/* <View style={styles.titleContainer}> */}
                    <Text style={styles.title}>
                        Checklist of duty manager
                    </Text>
                {/* </View> */}
                <View style={styles.item_1}>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>
                            Hygiene
                        </Text>
                    </View>
                <View style={styles.listContainer}>
                    

                    <View style={{...styles.green_item, borderColor:form.hygine == 'good' ? '#FA575A' : '#D7D7D7',}}>
                    <TouchableOpacity onPress={()=>setHygine('good')} >
                        <Text style={{padding:10}}>
                            Good
                        </Text>
                    </TouchableOpacity>
                    </View>

                    <View style={{...styles.green_item, borderColor:form.hygine == 'ok' ? '#FA575A' : '#D7D7D7',}}>
                    <TouchableOpacity onPress={()=>setHygine('ok')} >
                        <Text style={{padding:10}}>
                            OK
                        </Text>
                    </TouchableOpacity>
                    </View>

                    <View style={{...styles.green_item, borderColor:form.hygine == 'bad' ? '#FA575A' : '#D7D7D7',}}>
                    <TouchableOpacity onPress={()=>setHygine('bad')} >
                        <Text style={{padding:10}}>
                            Bad
                        </Text>
                    </TouchableOpacity>
                    </View>

                    
                </View>
                <View style={styles.item_1}>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>
                            Quality of Food
                        </Text>
                    </View>
                <View style={styles.listContainer}>
                    

                    <View style={{...styles.green_item, borderColor:form.qualityoffood == 'good' ? '#FA575A' : '#D7D7D7',}}>
                    <TouchableOpacity onPress={()=>setQuality('good')} >
                        <Text style={{padding:10}}>
                            Good
                        </Text>
                    </TouchableOpacity>
                    </View>

                    <View style={{...styles.green_item, borderColor:form.qualityoffood == 'ok' ? '#FA575A' : '#D7D7D7',}}>
                    <TouchableOpacity onPress={()=>setQuality('ok')} >
                        <Text style={{padding:10}}>
                            OK
                        </Text>
                    </TouchableOpacity>
                    </View>

                    <View style={{...styles.green_item, borderColor:form.qualityoffood == 'bad' ? '#FA575A' : '#D7D7D7',}}>
                    <TouchableOpacity onPress={()=>setQuality('bad')} >
                        <Text style={{padding:10}}>
                            Bad
                        </Text>
                    </TouchableOpacity>
                    </View>

                   
                </View>


                <View style={styles.item_1}>
                        <Text style={{marginLeft:10, fontWeight: "bold"}}>
                            Clieanliness of Kitchen
                        </Text>
                    </View>
                <View style={styles.listContainer}>
                    

                    <View style={{...styles.green_item, borderColor:form.cleaness == 'good' ? '#FA575A' : '#D7D7D7',}}>
                    <TouchableOpacity onPress={()=>setClean('good')} >
                        <Text style={{padding:10}}>
                            Good
                        </Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{...styles.green_item, borderColor:form.cleaness == 'ok' ? '#FA575A' : '#D7D7D7',}}>
                    <TouchableOpacity onPress={()=>setClean('ok')} >
                        <Text style={{padding:10}}>
                            OK
                        </Text>
                    </TouchableOpacity>
                    </View>

                    <View style={{...styles.green_item, borderColor:form.cleaness == 'bad' ? '#FA575A' : '#D7D7D7',}}>
                    <TouchableOpacity onPress={()=>setClean('bad')} >
                        <Text style={{padding:10}}>
                            Bad
                        </Text>
                    </TouchableOpacity>
                    </View>

                    
                </View>

                <TextInput2 type="numeric" name="staff_attend" placeholder="Staff Attendance" inputColor="black" value={form.staff_attend} change={changeInput} />
                <View style={{flex:1.3,
                marginTop:20,
        justifyContent:'center',
        backgroundColor:'white',
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5}}>
                        <Text style={{marginLeft:10, fontWeight: "bold"}}>
                            Stock
                        </Text>
                    </View>
                <View style={styles.listContainer}>
                    

                    <View style={{...styles.green_item, borderColor:form.stock == 'maintained' ? '#FA575A' : '#D7D7D7',}}>
                    <TouchableOpacity onPress={()=>setStock('maintained')} >
                        <Text style={{padding:10}}>
                            Maintained
                        </Text>
                    </TouchableOpacity>
                    </View>

                    <View style={{...styles.green_item, borderColor:form.stock == 'not maintained' ? '#FA575A' : '#D7D7D7',}}>
                    <TouchableOpacity onPress={()=>setStock('not maintained')} >
                        <Text style={{padding:10}}>
                            Not Maintained
                        </Text>
                    </TouchableOpacity>
                    </View>
                </View>

            </View>

           <View style={{marginHorizontal:10}}>
                <TextInput2 name="other" inputColor="black" placeholder="Other" value={form.other} change={changeInput} />
           </View>

           <View style={styles.card_bottom}>
               <Text style={{fontSize:18, fontWeight:'bold'}}>
                   Remarks by The Duty Manager
               </Text>
               
           </View>
           <View style={{backgroundColor:'#F1EFEF', 
        marginHorizontal:10,
        padding:10,borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,}}>
                   {/* <Text style={{paddingBottom:30}}>
                       Its advice that vendor should increase no. of staff which help him in making service prompt.
                   </Text> */}

<View style={{ flex: 1, marginVertical: 0 }}>
                 <TextInput value={form.remark} name="remark" onChangeText={(e)=>changeInput(e,'remark')} multiline={true} numberOfLines={3} style={{ backgroundColor: '#F3F3F4', marginHorizontal: 0, textAlign: 'left',  }} />
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
        backgroundColor:'#ffffff'
    },
    button: {
        padding:10,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        color: 'white',
        fontWeight:'bold',
        fontSize:18
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding:20
    },
    card: {
        backgroundColor:'#ffffff',
        borderRadius: 10,
        margin:10,
        padding:10
    },
    card_bottom: {
        backgroundColor:'white',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        marginTop:10,
        marginEnd:10,
        marginStart:10,
        padding:10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        padding:5
    },
    titleContainer: {
        backgroundColor: '#FC0202',
        alignItems:'center',
        alignContent:'center',
        justifyContent:'center',
        borderRadius:5,
        marginBottom: 20,
    },
    listContainer: {
        display:'flex',
        flexDirection:'row',
        marginTop:10,
        marginBottom:10
    },
    listTitle: {
        fontSize:22,
        marginHorizontal:15,
        padding:7,
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
        backgroundColor:'#FA575A',
        marginTop:20,
        marginLeft:10, marginRight:10,
        marginBottom:20,
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
    },
    item_1: {
        flex:2,
        justifyContent:'center',
        backgroundColor:'white',
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5,
        marginTop:10,
        
    },
    item: {
        flex:1,
        
        borderColor:'white',
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center'
    },
    green_item: {
        flex:1,
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        margin:6
    }
 });


 const mapStateToProps = state => ({

})


export default connect(
    mapStateToProps, {
        cafeteriaRemark, showError
    }
) (Checklist)