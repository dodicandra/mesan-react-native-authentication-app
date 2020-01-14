import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {font} from "../../../theme";
import moment from "moment/moment";

export default function EventItem({item, index}){
    return (

        <View style={{flex: 1, flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 16}}>
            {/*<PanelItem {...article}/>*/}
            <Image source={{uri: item.image}}
                   style={{width: 100, height: 100, marginRight: 12, borderRadius: 4, backgroundColor: "#CCC"}}/>
            <View style={{flex: 1, borderWidth: 1}}>
                <Text style={{
                    color: "#545454",
                    fontSize: 16,
                    lineHeight: 22,
                    marginBottom: 4,
                    fontFamily: font,
                    fontWeight: "500"
                }}>
                    {item.name}
                    {/*{"Classic Hip-Hop Night at Public Works."}*/}
                </Text>
                <Text style={{color: "#A39E9D", fontSize: 15, lineHeight: 20, marginBottom: 4, fontFamily: font}}>


                    {moment(item.start_date).format('ddd, MMM DD . h:mma')}


                </Text>
                <Text style={{
                    color: "#A39E9D",
                    fontSize: 15,
                    lineHeight: 20,
                    marginBottom: 4,
                    fontFamily: font
                }}>{item.location}</Text>
            </View>
        </View>
    )
};

EventItem.defaultProps = {
    // title: null,
    // ctaText: null,
    // onPress:{},
    // style: {},
    // titleStyle: {},
    // ctaStyle: {},
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    footerText: {
        fontSize: 16,
        fontFamily: "Helvetica Neue",
        color: "#636466"
    },

    footerCTA: {
        fontSize: 16,
        color: "#733AC2",
        fontWeight: "500",
        fontFamily: "Helvetica Neue"
    }
});