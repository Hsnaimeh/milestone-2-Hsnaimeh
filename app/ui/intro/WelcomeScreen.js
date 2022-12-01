import {StyleSheet, View} from 'react-native';

import Logo from '../../compenents/register/Logo'
import Welcome from "../../compenents/register/Welcome"
import Input from "../../compenents/register/Input"

export default function RegisterScreen() {
    return (
        <View style={styles.container}>
            <Logo/>
            <Welcome/>
            <Input/>

        </View>
    );
}

const styles = StyleSheet.create({
    // container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    // },
});