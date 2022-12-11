import {Alert, Button, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View} from "react-native";
import React, {useCallback, useEffect} from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {Controller, useForm} from 'react-hook-form';

import colors from '../../../../res/colors';

const UpdateRecordScreen = ({route, navigation}) => {

    const {patient, record} = route.params;


    // const [type, setType] = React.useState('');

    const [buttonPress, setButtonPress] = React.useState(false);

    const [dropTypeOpen, setDropTypeOpen] = React.useState(false);

    const [reading, setReading] = React.useState(record.reading);
    const [typeValue, setTypeValue] = React.useState(record.type);

    const [dropType, setDropType] = React.useState([
        {label: "Blood Pressure", value: "blood_pressure"},
        {label: "Respiratory Rate", value: "respiratory_rate"},
        {label: "Blood_oxygen Level", value: "blood_oxygen_level"},
        {label: "Heartbeat Rate", value: "heartbeat_rate"},
    ]);

    const {handleSubmit, control} = useForm();

    const onTypeOpen = useCallback(() => {
    }, []);


    useEffect(() => {

        if (buttonPress) {
            addRecord()
        }
        setButtonPress(false)

    }, [buttonPress])


    const addRecord = async () => {


        await fetch('https://patients-app-api.herokuapp.com/patients/' + patient._id + '/tests/' + record._id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: typeValue,
                reading: reading,


            })

        }).then((response) => response.json())
            .then((json) => {

                Alert.alert("Message", "Record Update Successfully ", [

                    {
                        text: "OK",
                        onPress: () => {
                            navigation.pop()
                        }
                    }
                ])

            })
            .catch((error) => {
                console.error(error);
            });
    }


    return (


        <View style={styles.container}>


            <View style={{flex: 1}}>


                <KeyboardAvoidingView
                    style={styles.inputGroup}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}>


                    <View>

                        <Text style={styles.label}>Type</Text>
                        <Controller
                            name="Type"
                            defaultValue=""
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <View style={styles.dropdownGender}>
                                    <DropDownPicker
                                        style={styles.dropdown}
                                        open={dropTypeOpen}
                                        value={typeValue} //typeValue
                                        items={dropType}
                                        setOpen={setDropTypeOpen}
                                        setValue={setTypeValue}
                                        setItems={setDropType}
                                        placeholder="Select Type"
                                        placeholderStyle={styles.placeholderStyles}
                                        onOpen={onTypeOpen}
                                        onChangeValue={onChange}
                                        zIndex={3000}
                                        zIndexInverse={1000}
                                    />
                                </View>
                            )}
                        />
                    </View>
                    <View style={styles.containerInput}>
                        <TextInput style={styles.input}
                                   defaultValue={record.reading}
                                   placeholder="Reading"

                                   placeholderTextColor={colors.light}
                                   onChangeText={data => setReading(data)}/>
                    </View>


                </KeyboardAvoidingView>


                <View style={styles.button}>
                    <Button
                        title="Update Record"
                        onPress={
                            () => {
                                setButtonPress(true)
                                // navigation.navigate('Patient Details',
                                //     {patient: null})
                            }

                        }
                    />
                </View>


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
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff'
    },
    containerInput: {
        width: '50%', padding: 5
    }, inputGroup: {
        flex: .95,
        flexDirection: "column", justifyContent: "center", alignItems: "center"
    },
    input: {
        padding: 10, borderColor: "black", borderWidth: 1, fontSize: 14, borderRadius: 12,
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
        fontSize: 20
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
        justifyContent: "center", alignItems: "center",
        marginTop: 20,
        padding: 15,
        borderColor: "black",
        fontSize: 18, borderRadius: 20
    },
    dropdownGender: {
        marginHorizontal: 10,
        width: "50%",
        marginBottom: 15,
    },
    dropdown: {
        borderColor: "#B7B7B7",
        height: 50,
    },
    placeholderStyles: {
        color: "grey",
    },
});
export default UpdateRecordScreen