import {Platform, KeyboardAvoidingView, StyleSheet, TextInput, View, Button} from 'react-native';

import Logo from '../../../compenents/register/Logo'
import Welcome from "../../../compenents/register/Welcome"
import Input from "../../../compenents/register/Input"
import React from "react";

export default function RegisterScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Logo/>


            <KeyboardAvoidingView
                style={styles.inputGroup}
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.containerInput}>
                <TextInput style={styles.input} placeholder="Name"/>
            </View>

            <View style={styles.containerInput}>
                <TextInput style={styles.input} placeholder="Email"/>
            </View>
            <View style={styles.containerInput}>
                <TextInput style={styles.input} placeholder="Password" secureTextEntry/>
            </View>
            </KeyboardAvoidingView>


            <View style={styles.button}>
                <Button
                    title="Register"
                    onPress={
                        () => navigation.navigate('MainStack', { name: 'Jane' })
                    }
                />
            </View>
        </View>

    );
}

const styles = StyleSheet.create({


    inputGroup: {
        flexDirection: "column", justifyContent: "center", alignItems: "center"
    }, input: {
        padding: 15, borderColor: "black", borderWidth: 1, fontSize: 18, borderRadius: 20,
    }, containerInput: {
        width: '80%', padding: 5
    },
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff'
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