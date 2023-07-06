
import React from "react";
import { StyleSheet, Text, View } from 'react-native';

export default function Page(props){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>CarSpotted</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        color: '#f2b407',
        fontWeight: 'bold',
        fontSize: 32,
    },
    container: {
        maxHeight: 40,
        marginBottom: 'auto',
        marginTop: 30,
    }
  });
