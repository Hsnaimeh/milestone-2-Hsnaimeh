import * as React from 'react';
import {FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

export default class HomeScreen extends React.Component {

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

    renderAppointmentItem = (data) =>

        <TouchableOpacity>
            <View style={styles.card}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: data.item.url + '' + new Date().getTime(),
                    }}/>
                <Text style={styles.name}>{data.item.name}</Text>
                <Text style={styles.date}>"11:00 AM"</Text>

            </View>
        </TouchableOpacity>

    renderExploreItem = (data) =>

        <TouchableOpacity>
            <View style={styles.cardExolore}>
                <Text style={styles.name}>{data.item.name}</Text>

            </View>
        </TouchableOpacity>

    render() {
        return (
            <View style={{}}>

                <View style={styles.tv_view_welcone}>
                    <Text style={styles.tv_welcome}>Hello, </Text>
                    <Text style={styles.tv_name}>Dr Alexander!</Text>
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Search For ..."
                    inlineImageLeft="search_icon"
                />


                <Text style={styles.section_title}>Today Appointment</Text>

                <View>
                    <FlatList
                        horizontal={true}
                        data={this.state.data}
                        keyExtractor={item => item.id.toString()}
                        renderItem={item => this.renderAppointmentItem(item)}
                    />
                </View>

                <Text style={styles.section_title}>Explore</Text>


                <View>
                    <FlatList
                        horizontal={true}
                        data={this.state.data}
                        keyExtractor={item => item.id.toString()}
                        renderItem={item => this.renderExploreItem(item)}
                    />
                </View>

                {/*<Text*/}
                {/*    onPress={() => alert('This is the "Home" screen.')}*/}
                {/*    style={{ fontSize: 26, fontWeight: 'bold' }}>Home Screen</Text>*/}
            </View>
        );

    }
}
const
    styles = StyleSheet.create({
        input: {
            margin: 12,
            borderWidth: 1,
            padding: 10,
            borderRadius: 20,
            borderColor: "black",
            flexDirection: "column",
            justifyContent: "center", alignItems: "center",
        },
        tv_view_welcone: {
            marginTop: 30,
            marginBottom:20,
            marginStart:8
        },
        tv_welcome: {
            fontSize: 20,
            color: '#0582b9'
        },
        tv_name: {
            fontSize: 30,
            fontWeight: 'bold',
            color: '#065171'
        }, section_title: {
            fontSize: 15,
            fontWeight: 'bold',
            marginStart: 8,
            marginTop:40,
            color: '#012433'

        }, card: {
            flexDirection: "column",
            margin: 8,
            backgroundColor: 'white',
            alignItems: "center",
            width:150,
            height:120,
            textAlign: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 1,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        cardExolore: {
            flexDirection: "column",
            padding: 10,
            margin:8,
            backgroundColor: 'white',
            alignItems: "center",
            textAlign: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 1,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },

        tinyLogo: {
            width: 50,
            height: 50,
            margin: 8
        }, name: {
            marginStart: 8,
        },
        date: {
            marginTop: 8,
            width:"100%",
            backgroundColor: '#0582b9',
            color:'#fff',
            alignItems:'center',
            justifyContent:'center'

        }


    });
