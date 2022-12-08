import {Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import React, {useEffect} from "react";
import {FAB, IconButton, MD3Colors} from "react-native-paper";
import {RefreshControl} from 'react-native-gesture-handler';
import {SearchBar} from 'react-native-elements';

const Network = require('../../../constant/Network');

const PatientsScreen = ({navigation}) => {

    const [data, setData] = React.useState([])
    // const [patient, setPatient] = React.useState('')
    const [loading, setLoading] = React.useState(false);
    const [deleteButtonPress, setDeleteButtonPress] = React.useState('');

    const [searchText, setSearchText] = React.useState('');
    const [filteredData, setFilteredData] = React.useState([]);


    const search = (searchText) => {
        setSearchText(searchText);

        let filteredData = data.filter(function (item) {
            return item.name.includes(searchText);
        });

        setFilteredData(filteredData);
    };

    // var patient1;

    useEffect(() => {
        fetchPatientsData()

    }, [])

    useEffect(() => {
        if (deleteButtonPress) {
            deletePatient(deleteButtonPress)
        }
        // setDeleteButtonPress(false)

    }, [deleteButtonPress])


    const deletePatient = async (patient) => {

        console.log("hishamtest " + patient.name)
        fetch('https://patients-app-api.herokuapp.com/patients/' + patient._id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((json) => {

                Alert.alert("Message", json.message)
                fetchPatientsData()

            })
            .catch((error) => {
                console.error(error);
            });
    }


    const fetchPatientsData = async () => {
        setLoading(true);

        // Network.BASE_URL+Network.BASE_URL.GET_PATIENTS
        fetch("https://patients-app-api.herokuapp.com/patients")
            .then(response => response.json())
            .then((jsonResponse) => {
                setLoading(false);
                setData(jsonResponse.data)
            })
            .catch(error => {
                    setLoading(false);
                    console.log(error)
                }
            )
    }


    function isCritical(data) {
        return data.item.condition.toLocaleLowerCase() == "Critical".toLocaleLowerCase();
    }

    async function confirmationButton1(item) {
        Alert.alert(
            "Delete " + item.name + " Patient",
            "Are sure to remove this patient from the system",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                        console.log("Cancel Pressed")
                    },
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => {
                        console.log("hishamtest confirmationButton1" + item.name)
                        setDeleteButtonPress(item)
                    }
                }
            ]
        );
    }

    const renderItem = (data) =>

        <TouchableOpacity onPress={() => navigation.navigate('PatientDetails',
            {patient: data.item})
        }>
            <View style={styles.card}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: data.item.photo
                    }}/>
                <Text style={styles.name}>{data.item.name}</Text>
                <Text
                    style={isCritical(data) ? styles.criticalStatus : styles.normalStatus}>{data.item.condition}</Text>


                <IconButton
                    icon="delete"
                    iconColor={MD3Colors.error50}
                    size={20}
                    onPress={() => {


                        confirmationButton1(data.item)

                    }}
                />


                <IconButton
                    icon={"pen"}
                    iconColor={"#ca8a00"}
                    size={20}
                    onPress={() => {

                        navigation.navigate('UpdatePatient',
                            {patient: data.item})

                    }}
                />

            </View>
        </TouchableOpacity>


    return (
        <View style={styles.container}>

            <SearchBar
                round={true}
                lightTheme={true}
                placeholder="Search..."
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={search}
                value={searchText}
            />

            <View>
                <FlatList
                    data={filteredData && filteredData.length > 0 ? filteredData : data}
                    keyExtractor={item => item._id}
                    refreshing={loading}

                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={fetchPatientsData}/>
                    }
                    renderItem={item => renderItem(item)}
                />

            </View>


            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => navigation.navigate('AddPatient')
                }
            />


        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tinyLogo: {
        width: 50,
        height: 50,
        margin: 8
    },
    card: {
        flexDirection: "row",
        margin: 8,
        backgroundColor: 'white',
        alignItems: "center",
        textAlign: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    name: {
        marginStart: 8,
        flex: 1
    },
    criticalStatus: {
        backgroundColor: '#920000',
        alignContent: 'center',
        color: '#fff',
        marginEnd: 10,
        fontWeight: 'bold',
        paddingHorizontal: 7,
        paddingVertical: 5
    },
    normalStatus: {
        backgroundColor: '#089200',
        alignContent: 'center',
        color: '#fff',
        marginEnd: 10,
        fontWeight: 'bold',
        paddingHorizontal: 7,
        paddingVertical: 5
    },
    // fab: {
    //     position: 'absolute',
    //     width: 40,
    //     height: 40,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     right: 20,
    //     fontSize:10,
    //     bottom: 20,
    //     backgroundColor: '#03A9F4',
    //     borderRadius: 15,
    //     elevation: 8
    // },
    fabIcon: {
        fontSize: 40,
        color: 'white'
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: "#ddd",

    },
});
export default PatientsScreen