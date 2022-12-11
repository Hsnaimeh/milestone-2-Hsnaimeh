import {
    Alert,
    FlatList,
    Image,
    Pressable,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import React, {useEffect, useRef} from "react";
import {FAB, IconButton, MD3Colors} from "react-native-paper";
import {SearchBar} from 'react-native-elements';
import {BottomSheetModal, BottomSheetModalProvider,} from "@gorhom/bottom-sheet";
import {useFocusEffect} from '@react-navigation/native';

import {AntDesign, Entypo} from "@expo/vector-icons";

const Network = require('../../../constant/Network');

const PatientsScreen = ({navigation}) => {

    const [data, setData] = React.useState([])
    // const [patient, setPatient] = React.useState('')
    const [loading, setLoading] = React.useState(false);
    const [deleteButtonPress, setDeleteButtonPress] = React.useState('');
    const [isOpen, setIsOpen] = React.useState(false);

    const [searchText, setSearchText] = React.useState('');
    const [filteredData, setFilteredData] = React.useState([]);

    const [filterCondition, setFilterCondition] = React.useState("All");

    const search = (searchText) => {
        setSearchText(searchText);

        let filteredData = data.filter(function (item) {
            return item.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase());
        });

        setFilteredData(filteredData);
    };

    function onFilterChanged(condition) {

        let filteredData = data.filter(function (item) {
            if (condition === "All") {
                return filteredData
            }
            return item.condition.toLocaleLowerCase().includes(condition.toLocaleLowerCase());
        });

        setFilteredData(filteredData)
    }

    useFocusEffect(
        React.useCallback(() => {
            return () => bottomSheetModalRef.current?.close()
        }, [])
    );

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

    useEffect(() => {
        onFilterChanged(filterCondition)
        // setDeleteButtonPress(false)

    }, [filterCondition])


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
        return data.item.condition.toLocaleLowerCase() === "Critical".toLocaleLowerCase();
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
                        setDeleteButtonPress(item)
                    }
                }
            ]
        );
    }

    const renderItem = (data) =>

        <TouchableOpacity onPress={() => navigation.navigate('PatientDetails',
            {argsPatient: data.item})
        }>

            <View style={[styles.card,{backgroundColor: isOpen ? "rgba(221,221,221,0.55)" : "white"}]}>
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
                            {argsPatient: data.item})

                    }}
                />

            </View>
        </TouchableOpacity>


    const bottomSheetModalRef = useRef(null)
    const snapPoints = ["25%", "48%", "75%"]


    function handlePresentFilter() {
        if (!isOpen) {
            bottomSheetModalRef.current?.present();
            setTimeout(() => {
                setIsOpen(true);
            }, 100);
        } else {
            bottomSheetModalRef.current?.close();
            setTimeout(() => {
                setIsOpen(false);
            }, 100);
        }

    }

    return (

        <BottomSheetModalProvider>
            <View style={[
                styles.container,
                {
                    backgroundColor: isOpen ? "rgba(221,221,221,0.55)" : "white",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 0.29,
                    shadowRadius: 4.65,

                    elevation: 7
                },
            ]}>


                <View style={{flexDirection: "row"}}>


                    <View style={{flex: 0.9,}}>
                        <SearchBar
                            inputStyle={{backgroundColor: isOpen ? "rgba(221,221,221,0.55)" : "white"}}
                            containerStyle={{
                                backgroundColor: isOpen ? "rgba(221,221,221,0.55)" : "white",
                                borderWidth: 1, borderRadius: 5}}
                            inputContainerStyle={{backgroundColor: isOpen ? "rgba(221,221,221,0.55)" : "white"}}
                            placeholderTextColor={'#g5g5g5'}
                            round={true}
                            lightTheme={true}
                            placeholder="Search..."
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={search}
                            value={searchText}
                        />
                    </View>
                    <View style={{flex: 0.2}}>

                        <IconButton
                            icon={"filter"} iconColor={isOpen ? "#0582b9" : "#333333"} size={40}
                            onPress={handlePresentFilter}
                        />
                    </View>

                </View>

                <View>
                    <FlatList
                        data={filteredData && filteredData.length > 0 ? filteredData : data}
                        keyExtractor={item => item._id}
                        refreshing={loading}
                        scrollEnabled={!isOpen}
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


                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    backgroundStyle={{
                        borderRadius: 50,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                    }}
                >

                    <View style={styles.bottomContentContainer}>
                        <Text style={styles.bottomTitle}>Filter</Text>


                        <Pressable style={styles.row} onPress={() => setFilterCondition("All")}>
                            <Text style={styles.subtitle}>All</Text>
                            {filterCondition === "All" ? (
                                <AntDesign name="checkcircle" size={24} color="#4A98E9"/>
                            ) : (
                                <Entypo name="circle" size={24} color="#56636F"/>
                            )}
                        </Pressable>
                        <Pressable style={styles.row} onPress={() => setFilterCondition("Critical")}>
                            <Text style={styles.subtitle}>Critical</Text>
                            {filterCondition === "Critical" ? (
                                <AntDesign name="checkcircle" size={24} color="#4A98E9"/>
                            ) : (
                                <Entypo name="circle" size={24} color="#56636F"/>
                            )}
                        </Pressable>

                        <Pressable style={styles.row} onPress={() => setFilterCondition("Normal")}>
                            <Text style={styles.subtitle}>Normal</Text>
                            {filterCondition === "Normal" ? (
                                <AntDesign name="checkcircle" size={24} color="#4A98E9"/>
                            ) : (
                                <Entypo name="circle" size={24} color="#56636F"/>
                            )}
                        </Pressable>

                    </View>

                </BottomSheetModal>

            </View>

        </BottomSheetModalProvider>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "gray"
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
    bottomContentContainer: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 15
    },
    bottomTitle: {
        fontWeight: "900",
        letterSpacing: .5,
        fontSize: 16,
    },
    title: {
        fontWeight: "900",
        letterSpacing: 0.5,
        fontSize: 16,
    },
    subtitle: {
        color: "#101318",
        fontSize: 14,
        fontWeight: "bold",
    },
    row: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
    },
});
export default PatientsScreen