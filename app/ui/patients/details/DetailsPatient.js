import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {FAB} from "react-native-paper";

const DetailsPatientScreen = ({route}) => {

    const {patient} = route.params;
    const tests = patient.tests

    function isCritical(condition) {
        return condition.toLocaleLowerCase() == "Critical".toLocaleLowerCase();
    }


    const renderItem = (tests) =>

        <TouchableOpacity>
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
                <Text style={{margin: 16, flex: .7}}>{tests.item.type}</Text>
                <Text style={{margin: 16, flex: .3}}>{tests.item.reading}</Text>
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
                        source={{uri: patient.photo}}/>


                    <View style={{flexDirection: "column"}}>

                        <Text style={styles.label_text}>{patient.name}</Text>

                    </View>

                    <Text
                        style={isCritical(patient.condition) ? styles.criticalStatus : styles.normalStatus}>{patient.condition}</Text>
                </View>

                <View style={styles.label_value}>
                    <Text style={styles.label_text}>Gender : </Text>
                    <Text style={styles.label_text}>{patient.gender}</Text>
                </View>

                <View style={styles.label_value}>
                    <Text style={styles.label_text}>Phone : </Text>
                    <Text style={styles.label_text}>{patient.mobile}</Text>
                </View>

                <View style={styles.label_value}>
                    <Text style={styles.label_text}>Address : </Text>
                    <Text style={styles.label_text}>{patient.address}</Text>
                </View>

                <View style={styles.label_value}>
                    <Text style={styles.label_text}>Birthdate : </Text>
                    <Text style={styles.label_text}>{patient.birthdate}</Text>
                </View>

                <View style={styles.label_value}>
                    <Text style={styles.label_text}>Phone : </Text>
                    <Text style={styles.label_text}>{patient.mobile}</Text>
                </View>
                {/*<Text style={styles.name}>{data.item.address}</Text>*/}
                {/*<Text style={styles.name}>{data.item.email}</Text>*/}
                {/*<Text style={styles.name}>{data.item.mobile}</Text>*/}
                {/*<Text style={styles.name}>{data.item.email}</Text>*/}
                {/*<Text style={styles.name}>{data.item.birthdate}</Text>*/}
                {/*<Text style={styles.name}>{data.item.gender}</Text>*/}


            </View>
            <Text style={styles.title_text}>Records : </Text>

            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => console.log('Pressed')}
            />

            <View>
                <Text style={{flex: .5}}>Record Type</Text>
                <Text style={{flex: .5}}>Reading</Text>
            </View>
            <FlatList
                data={tests}
                keyExtractor={item => item._id}
                renderItem={item => renderItem(item)}
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
});
export default DetailsPatientScreen