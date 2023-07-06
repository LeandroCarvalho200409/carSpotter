import { View, StyleSheet } from "react-native";
import Page from "../../../components/Page";
import EntryForm from "../../../components/EntryForm";
import { Stack } from "expo-router";

export default function NewEntry(){
    return(
        <>
            <Stack.Screen
            options={{
                title: "New Entry",
            }}
            />
            <View style={styles.container}>
                <EntryForm></EntryForm>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2e2e2d',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
