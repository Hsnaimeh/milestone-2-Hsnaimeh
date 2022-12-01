import {Button, StyleSheet, View} from 'react-native';

import Logo from '../../../compenents/register/Logo'
import Welcome from "../../../compenents/register/Welcome"
import Input from "../../../compenents/register/Input"


const LoginScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Logo/>
            <Welcome/>
            <Input/>

            <View style={styles.btnLogin}>
                <Button
                    title="Login"
                    onPress={
                        () => navigation.navigate('Main', { name: 'Jane' })

                    }
                />
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff'
    },
    btnLogin: {
        width: '100%',
        flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        marginTop: 20,
        padding: 15,
        borderColor: "black",
        fontSize: 18, borderRadius: 20
    }

});

export default LoginScreen