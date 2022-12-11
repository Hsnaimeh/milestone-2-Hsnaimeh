import {Button, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect} from "react";
import {IconButton, MD3Colors} from "react-native-paper";
import getTypeLabel from "../../../../_test_/RecordTypeUtil";
import getDateFormat from "../../../getDateFormat";

const DetailsPatientScreen = ({route, navigation}) => {

    const {argsPatient} = route.params;

    // const tests = patient.tests

    function isCritical(condition) {
        if (condition === undefined) {
            return false

        }
        return condition.toLocaleLowerCase() == "Critical".toLocaleLowerCase();
    }

    const [loading, setLoading] = React.useState(false);
    const [patient, setPatient] = React.useState([])

    const fetchPatient = async () => {
        setLoading(true);

        // Network.BASE_URL+Network.BASE_URL.GET_PATIENTS
        fetch("https://patients-app-api.herokuapp.com/patients/" + argsPatient._id)
            .then(response => response.json())
            .then((jsonResponse) => {
                setLoading(false);
                setPatient(jsonResponse.data)
            })
            .catch(error => {
                    setLoading(false);
                    console.log(error)
                }
            )
    }


    useEffect(() => {
        fetchPatient()

    }, [])


    const renderItem = (tests) =>

        <TouchableOpacity onPress={() => navigation.navigate('UpdateRecord',
            {patient: patient, record: tests.item})}>
            <View style={{
                flex: 1,
                flexDirection: "row",
                marginHorizontal: 8,
                marginTop: 8,
                backgroundColor: tests.index === 0 ? "#95d3fb" : "#fff",
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5
            }}>

                {/*style={[styles.text, touched && invalid ? styles.textinvalid : styles.textvalid]}*/}
                {/*<Text style={{ opacity: "blue" == "blue" ? 1 : 0, textAlign:"right" }}>Retry</Text>*/}

                <View style={{
                    flex: .6,
                    flexDirection: "column"
                }}>
                    <Text style={{margin: 16, flex: .03}}>{getTypeLabel(tests.item.type)}</Text>
                    <Text style={{
                        marginStart: 16,
                        marginBottom: 16,
                        flex: 1
                    }}>{"Date: " + getDateFormat(tests.item.date)}</Text>
                </View>
                <Text style={{margin: 16, flex: .3}}>{tests.item.reading}</Text>

                <IconButton style={{flex: .1}}
                            icon="delete"
                            iconColor={MD3Colors.error50}
                            size={20}
                            onPress={() => {


                            }}
                />
            </View>
        </TouchableOpacity>


    return (


        <View style={{flex: 1}}>

            <View style={styles.card}>

                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    textAlign: "center",
                }}>
                    <Image
                        style={styles.tinyLogo}
                        source={{uri: patient.photo}}/>


                    <View style={{flexDirection: "column"}}>

                        <Text style={styles.label_text}>{patient.name}</Text>

                    </View>

                    <Text
                        style={isCritical(patient.condition) ? styles.criticalStatus : styles.normalStatus}>{patient.condition}</Text>
                </View>

                <View style={styles.label_value}>
                    <Text style={styles.label_text}>Gender : </Text>
                    <Text style={styles.label_text}>{patient.gender}</Text>
                </View>

                <View style={styles.label_value}>
                    <Text style={styles.label_text}>Phone : </Text>
                    <Text style={styles.label_text}>{patient.mobile}</Text>
                </View>

                <View style={styles.label_value}>
                    <Text style={styles.label_text}>Address : </Text>
                    <Text style={styles.label_text}>{patient.address}</Text>
                </View>

                <View style={styles.label_value}>
                    <Text style={styles.label_text}>Birthdate : </Text>
                    <Text style={styles.label_text}>{patient.birthdate}</Text>
                </View>

                <View style={styles.label_value}>
                    <Text style={styles.label_text}>Last Update : </Text>
                    <Text style={styles.label_text}>{getDateFormat(patient.createdAt)}</Text>
                </View>


            </View>

            <View style={{
                flexDirection: "row"
            }}>

                <View style={{flex: .5}}>
                    <Text style={styles.title_text}>Records : </Text>
                </View>
                <View style={{flex: .5, margin: 16}}>
                    <Button
                        title="Create Record"

                        onPress={
                            () => {
                                navigation.navigate(
                                    'AddRecord',
                                    {patient: patient}
                                )
                            }

                        }
                    />
                </View>
            </View>
            <View style={{marginHorizontal: 16, flexDirection: "row"}}>
                <Text style={{flex: .6, flexDirection: "row"}}>Record Type</Text>
                <Text style={{flex: .4, flexDirection: "row"}}>Reading</Text>
            </View>

            <View style={{flex: 1}}>
                <FlatList
                    data={patient.tests}
                    keyExtractor={item => item._id}
                    refreshing={loading}
                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={fetchPatient}/>
                    }
                    renderItem={item => renderItem(item)}
                />
            </View>

        </View>
    )
};


const styles = StyleSheet.create({
    tinyLogo: {
        width: 100,
        height: 100,
        margin: 8,
        borderRadius: 100 / 5
    },
    card: {
        margin: 8,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    cardRecord: {
        flex: 1,
        flexDirection: "row",
        margin: 8,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    label_value: {
        flexDirection: "row",
    },
    label_text: {
        marginStart: 8,
        color: "#000"
    },
    title_text: {
        margin: 16,
        color: "#000",
        alignContent: 'center',
        fontSize: 30
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
    button: {
        width: '100%',
        flexDirection: "column",
        justifyContent: "flex-end", alignItems: "flex-end",
        marginTop: 20,
        padding: 15,
        borderColor: "black",
        fontSize: 18, borderRadius: 20
    }
});
export default DetailsPatientScreen