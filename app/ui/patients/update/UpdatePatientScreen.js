import {Alert, Button, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect} from "react";
import {IconButton, MD3Colors} from "react-native-paper";
import colors from "../../../res/colors";

const UpdatePatientScreen = ({route, navigation}) => {

    const {argsPatient} = route.params;
    const tests = argsPatient.tests

    function isCritical(condition) {
        return condition.toLocaleLowerCase() == "Critical".toLocaleLowerCase();
    }

    const [name, setName] = React.useState(argsPatient.name);
    const [gender, setGender] = React.useState(argsPatient.gender);
    const [phone, setPhone] = React.useState(argsPatient.phone);
    const [address, setAddress] = React.useState(argsPatient.address);


    const [buttonPress, setButtonPress] = React.useState(false);


    useEffect(() => {
        if (buttonPress) {
            updatePatient()
        }
        setButtonPress(false)

    }, [buttonPress])


    const updatePatient = async () => {


        await fetch('https://patients-app-api.herokuapp.com/patients/' + argsPatient._id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                address: address,
                phone: phone,
                gender: gender,
            })

        }).then((response) => response.json())
            .then((json) => {
                if (json._id === undefined) {
                    Alert.alert("Message", json.message)
                    return
                }

                Alert.alert("Message", " Updated Successfully ")

            })
            .catch((error) => {
                console.error(error);
            });
    }

    const renderItem = (tests) =>

        <TouchableOpacity onPress={() => navigation.navigate('UpdateRecord',
            {patient: argsPatient, record: tests.item})}>
            <View style={{
                flex: 1,
                flexDirection: "row",
                marginHorizontal: 8,
                marginTop: 8,
                backgroundColor: 'white',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5
            }}>
                <Text style={{margin: 16, flex: .6}}>{tests.item.type}</Text>
                <Text style={{margin: 16, flex: .3}}>{tests.item.reading}</Text>

                <IconButton style={{flex: .1}}
                            icon="delete"
                            iconColor={MD3Colors.error50}
                            size={20}
                            onPress={() => {


                            }}
                />

                <IconButton
                    icon={"pen"}
                    iconColor={"#ca8a00"}
                    size={20}
                    onPress={() => {

                        navigation.navigate('UpdateRecord',
                            {patient: patient, record: tests.item})

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
                        source={{uri: argsPatient.image}}/>


                    <View style={{flexDirection: "column"}}>

                        <Text style={styles.label_text}>{argsPatient.name}</Text>

                    </View>

                    <Text
                        style={isCritical(argsPatient.condition) ? styles.criticalStatus : styles.normalStatus}>{argsPatient.condition}</Text>
                </View>

                <View style={styles.containerInput}>
                    <Text style={styles.label_text}>Name : </Text>
                    <TextInput style={styles.input}
                               defaultValue={argsPatient.name}
                               placeholder="Name"

                               placeholderTextColor={colors.light}
                               onChangeText={data => setName(data)}/>
                </View>

                <View style={styles.containerInput}>
                    <Text style={styles.label_text}>Gender : </Text>
                    <TextInput style={styles.input}
                               defaultValue={argsPatient.gender}
                               placeholder="Gender"
                               placeholderTextColor={colors.light}
                               onChangeText={data => setGender(data)}/>
                </View>


                <View style={styles.containerInput}>
                    <Text style={styles.label_text}>Phone : </Text>
                    <TextInput style={styles.input}
                               defaultValue={argsPatient.mobile}
                               placeholder="Phone"
                               placeholderTextColor={colors.light}
                               onChangeText={data => setPhone(data)}/>
                </View>

                <View style={styles.containerInput}>
                    <Text style={styles.label_text}>Address : </Text>
                    <TextInput style={styles.input}
                               defaultValue={argsPatient.address}
                               placeholder="Address"
                               placeholderTextColor={colors.light}
                               onChangeText={data => setAddress(data)}/>
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
                    data={tests}
                    keyExtractor={item => item._id}
                    renderItem={item => renderItem(item)}
                />
            </View>

            <Button
                title="Update Patient"
                onPress={
                    () => {
                        setButtonPress(true)
                    }

                }
            />

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
    },
    containerInput: {
        width: '50%', padding: 5, flexDirection: "row", justifyContent: "center", alignItems: "center",
    },
    input: {
        width: 150,
        padding: 3, borderColor: "black", borderWidth: 1, fontSize: 14, borderRadius: 8,
    },

});
export default UpdatePatientScreen