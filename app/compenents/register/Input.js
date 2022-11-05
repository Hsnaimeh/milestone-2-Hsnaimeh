import {KeyboardAvoidingView, Platform, StyleSheet, TextInput, View} from 'react-native'
import React from 'react'

export default function Logo() {
    return (<KeyboardAvoidingView
            style={styles.inputGroup}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>

            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Name"/>
            </View>
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Email"/>
            </View>
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Password" secureTextEntry/>
            </View>

        </KeyboardAvoidingView>

    )
}


const styles = StyleSheet.create({

    inputGroup: {
        flexDirection: "column", justifyContent: "center", alignItems: "center"
    }, input: {
        padding: 15, borderColor: "black", borderWidth: 1, fontSize: 18, borderRadius: 20,

    }, container: {
        width: '80%', padding: 5
    }
})