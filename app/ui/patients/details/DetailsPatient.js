import React from "react";
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default class PatientsScreen extends React.Component {
    state = {
        data: []
    }

    componentDidMount() {
        this.fetchUsersData();
    }

    fetchUsersData = async () => {
        fetch("https://e39d4f97-3c5b-48ba-a2c5-2d1935eff5c1.mock.pstmn.io/patients")
            .then(response => response.json())
            .then((jsonResponse) => {

                this.setState({data: jsonResponse})
            })
            .catch(error => console.log(error))
    }

    renderItem = (data) =>

        <TouchableOpacity>
            <View style={styles.card}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: data.item.url + '' + new Date().getTime(),
                    }}/>
                <Text style={styles.name}>{data.item.name}</Text>

            </View>
        </TouchableOpacity>


    render() {

        return (
            <View>
                <FlatList
                    data={this.state.data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={item => this.renderItem(item)}
                />
            </View>
        )
    };
}

const styles = StyleSheet.create({
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
    }
});
