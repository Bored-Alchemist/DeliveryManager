import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, BackHandler, Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { getCafe } from '../action/auth';
import axios from 'axios';

const Cafelist =  ({route, navigation, getCafe}) => {
    const [cafes, setCafes] = useState([]);

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
        console.log('api called 2');
        axios.post('http://food.breeur.in/api/getcafelist.php', {org_id: route.params.id})
        .then( response => {
            setCafes(response.data.data)
            console.log(response.data)
        })
        .catch(err => {
            console.log(err)
        })
        
    },[]);

    

    const redirectToVendors = (cafeandid) => {
        const id = route.params.id;
        const cafe = cafeandid.split('-')[0]
        navigation.navigate('Vendors', {id: id, cafename: cafe});
    }

    return (
        <ScrollView style={styles.mainContainer}>
            <Header navigation={navigation} />
            <View style={styles.card}>
                    <Text style={styles.title}>
                        LIST OF CAFES
                    </Text>

    {cafes ? cafes.map((cafe, index) =>
    <TouchableOpacity key={index} style={styles.list} onPress={() => redirectToVendors(cafe)}>
        <Text style={styles.comapnies}>
        {cafe.split('-')[0]}
        </Text>
        <View style={{justifyContent:'center',alignItems:'center',alignContent:'center'}}>
        <Image style={{justifyContent:'center',alignItems:'center',alignContent:'center', marginRight:30}} source={require('../assets/end.png')} />
        </View>
    
    </TouchableOpacity>
    ) : <TouchableOpacity style={styles.list}>
            <Text style={styles.comapnies}>
            There is no company to find here!!!
            </Text>
        </TouchableOpacity>
        }
            </View>
            
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
        backgroundColor:'#FFFDFD',
        borderRadius: 10,
        margin:10,
        padding:20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom:10
    },
    comapnies: {
        fontSize:22,
        marginHorizontal:15,
        padding:7,
        flex:1
    },
    list: {
        backgroundColor:'#ffffff',
        borderRadius: 3,
        marginTop: 10,
        marginBottom: 10,
        display:'flex',
        flexDirection:'row',
        elevation:10,
        padding:5
    }
 });


 const mapStateToProps = state => ({

})


export default connect(
    mapStateToProps, {
        getCafe
    }
) (Cafelist)