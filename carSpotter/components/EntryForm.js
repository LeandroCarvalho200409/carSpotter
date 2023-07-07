import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from "@react-native-picker/picker";
import Camera from "./Camera";

export default function EntryForm(){
    const navigation = useRouter();

    const [makes, setMakes] = useState([])
    const [selectedMake, setSelectedMake] = useState("Audi")
    const [modelValue, setModel] = useState("")
    const [yearValue, setYear] = useState("")
    const [fuelValue, setFuel] = useState("")
    const [versionValue, setVersion] = useState("")
    const url = 'https://car-data.p.rapidapi.com/cars/makes';
    const options = {
	    method: 'GET',
	    headers: {
		    'X-RapidAPI-Key': 'bcbaec63bemshda0e76c0976014fp120cddjsn9047454a219a',
		    'X-RapidAPI-Host': 'car-data.p.rapidapi.com'
	    }
    };

    useEffect(() => {
        async function storeData(value){
            await AsyncStorage.setItem('makes', JSON.stringify(value));
        }

        async function fetchMakes(){
            try {
                const response = await fetch(url, options);
                const result = await response.json();
                setMakes(result)
                storeData(result)
            } catch (error) {
                console.error(error);
            }
        }

        fetchMakes()
    }, [])

    async function saveData(){
        var object = {make: selectedMake, model: modelValue, year: yearValue, fuel: fuelValue, version: versionValue}
        console.log(modelValue)
        if(await AsyncStorage.getItem('carsList4') !== null){
            var storageString = await AsyncStorage.getItem('carsList4')
            var storageArray = storageString.split(';')
            var index = storageArray.length
            object.id = index
            storageArray.push(JSON.stringify(object))
            console.log(storageArray)
            var newStorageString = ""
            storageArray.forEach((entry, idx) => {
                newStorageString = newStorageString + entry

                if(idx !== (storageArray.length-1)){
                    newStorageString = newStorageString + ";"
                }
            })
            console.log(newStorageString)
            await AsyncStorage.setItem('carsList4', newStorageString)
        }else{

            AsyncStorage.setItem('carsList4', JSON.stringify(object))
        }

        navigation.back()
    }

    return(
        <View style={styles.container}>
            <Text style={styles.subtitle}>New Entry</Text>
            <Camera></Camera>
            <Text style={styles.label}>Make: </Text>
            <View style={styles.border}>
            <Picker
            selectedValue={selectedMake}
            onValueChange={(itemValue, itemIndex) => {
                setSelectedMake(itemValue)
            }}
            style={styles.picker}
            dropdownIconColor={'#f2b407'}
            >
                {makes.map((make, idx) => <Picker.Item label={make} value={make}/>)}
            </Picker>
            </View>
            <Text style={styles.label}>Model: </Text>
            <TextInput style={styles.textinput} onChangeText={(value) => setModel(value)}></TextInput>
            <Text style={styles.label}>Year: </Text>
            <TextInput style={styles.textinput} onChangeText={(value) => setYear(value)}></TextInput>
            <Text style={styles.label}>Fuel: </Text>
            <TextInput style={styles.textinput} onChangeText={(value) => setFuel(value)}></TextInput>
            <Text style={styles.label}>Version (optional): </Text>
            <TextInput style={styles.textinput} onChangeText={(value) => setVersion(value)}></TextInput>
            <Pressable style={styles.save} onPress={(e) => saveData()}><Text style={styles.saveText}>Save</Text></Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    subtitle: {
        fontSize: 16,
        color: '#f2b407',
    },
    save: {
        width: 246,
        maxHeight: 50,
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center',
        borderStyle: 'solid',
        borderColor: '#f2b407',
        borderWidth: 2,
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    saveText: {
        color: '#f2b407',
        fontSize: 16,
        fontWeight: 'bold'
    },
    textinput: {
        width: 303,
        height: 30,
        borderBottomColor: '#f2b407',
        borderStyle: 'solid',
        borderBottomWidth: 2,
        color: '#f2b407',
    },
    label: {
        fontSize: 12,
        marginTop: 10,
        color: '#f2b407',
    },
    border: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#f2b407',
    },
    container: {
        backgroundColor: '#2e2e2d',
        marginTop: 10,
        marginBottom: 'auto',
      },
      picker: {
        color: '#f2b407',
        width: 303,
        minHeight: 50,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#f2b407',
      }
});
