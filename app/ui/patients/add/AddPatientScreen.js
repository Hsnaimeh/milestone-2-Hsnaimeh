import {Alert, Button, Image, KeyboardAvoidingView, Platform, StyleSheet, TextInput, View} from "react-native";
import React, {useEffect} from "react";

import colors from '../../../res/colors';

const AddPatientScreen = ({navigation}) => {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [birthdate, setBirthdate] = React.useState('');
    const [image, setImage] = React.useState("https://source.unsplash.com/random/75×75/?person,face" + new Date().getTime());

    const [newPatient, setNewPatient] = React.useState([])
    const [buttonPress, setButtonPress] = React.useState(false);


    useEffect(() => {
        if (buttonPress) {
            addPatient()
        }
        setButtonPress(false)

    }, [buttonPress])


    const addPatient = async () => {


        await fetch('https://patients-app-api.herokuapp.com/patients', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                birthdate: birthdate,
                gender: gender,
                mobile: phone,
                address: address,
                photo: image

                // name: "name"+ new Date().getTime(),
                // email: "email",
                // birthdate: "birthdate",
                // gender: "gender",
                // mobile: "phone",
                // address: "address"
            })

        }).then((response) => response.json())
            .then((json) => {
                if (json._id === undefined) {
                    console.error(json.message);
                    Alert.alert("Message", json.message)
                    return
                }

                setNewPatient(json)
                // console.error(json);

                Alert.alert("Message", json.name + " Created Successfully ")

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

                    <Image
                        style={styles.tinyLogo}
                        source={{uri: image}}/>

                    <View style={styles.containerInput}>
                        <TextInput style={styles.input} placeholder="Name"
                                   placeholderTextColor={colors.light}
                                   onChangeText={data => setName(data)}
                        />
                    </View>


                    <View style={styles.containerInput}>
                        <TextInput style={styles.input} placeholder="Email"
                                   placeholderTextColor={colors.light}
                                   onChangeText={data => setEmail(data)}/>
                    </View>

                    <View style={styles.containerInput}>
                        <TextInput style={styles.input} placeholder="Phone"
                                   placeholderTextColor={colors.light}
                                   onChangeText={data => setPhone(data)}/>
                    </View>

                    <View style={styles.containerInput}>
                        <TextInput style={styles.input} placeholder="Gender"
                                   placeholderTextColor={colors.light}
                                   onChangeText={data => setGender(data)}/>
                    </View>

                    <View style={styles.containerInput}>
                        <TextInput style={styles.input} placeholder="Address"
                                   placeholderTextColor={colors.light}
                                   onChangeText={data => setAddress(data)}/>
                    </View>

                    <View style={styles.containerInput}>
                        <TextInput style={styles.input} placeholder="birthdate"
                                   placeholderTextColor={colors.light}
                                   onChangeText={data => setBirthdate(data)}/>
                    </View>

                    <View style={styles.containerInput}>
                        <TextInput style={styles.input} placeholder="Image URL"
                                   placeholderTextColor={colors.light}
                                   onChangeText={data => setImage(data)}/>
                    </View>

                </KeyboardAvoidingView>


                <View style={styles.button}>
                    <Button
                        title="Create Patient"
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
        width: '80%', padding: 5
    }, inputGroup: {
        flex: .95,
        flexDirection: "column", justifyContent: "center", alignItems: "center"
    },
    input: {
        padding: 15, borderColor: "black", borderWidth: 1, fontSize: 18, borderRadius: 20,
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
    }
});
export default AddPatientScreen