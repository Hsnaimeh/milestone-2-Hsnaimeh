import { Image, StyleSheet, View } from 'react-native'
import React from 'react'

export default function Logo() {
    return (
        <View style={styles.img}>

            <Image
                source={require('../../assets/icon.png')}
                style={{ width: 300, height: 300 }}
            />
        </View>
    )
}




const styles = StyleSheet.create({
    img: {
        paddingTop: 60,
        justifyContent: 'center',
        alignItems: 'center'

    }
})