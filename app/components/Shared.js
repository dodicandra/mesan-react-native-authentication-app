import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Badge} from 'react-native-elements';

//HEADER COMPONENT
export const Header = (props) => {
    let {title, style} = props;

    return (
        <View style={[styles.header, style]}>
            <Text style={styles.headerText}>
                {title}
            </Text>
        </View>
    )
};

Header.defaultProps = {
    title: "",
    style: {}
};

//ERROR COMPONENT
export const ErrorText = ({error}) => {
    return <Text style={styles.errorText}>{error}</Text>
};

ErrorText.defaultProps = {
    error: ""
};


//ERROR COMPONENT
export const Error = ({error, onRetry}) => {
    return (
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Text style={{fontSize: 16}}>
                {`${error.message}`}
            </Text>
            <Text style={{color: "blue", fontSize: 16, padding: 8}} onPress={onRetry}>Tap to retry</Text>
        </View>
    )
};

Error.defaultProps = {
    error: "",
    onRetry:null
};



const styles = StyleSheet.create({
    header: {
        height: 50,
        justifyContent: "center"
    },

    headerText: {
        fontSize: 25,
        color: "#362068",
        fontWeight: "400",
        fontFamily: "Helvetica Neue"
    },

    errorText:{
        marginBottom: 8,
        color:"red"
    }
});