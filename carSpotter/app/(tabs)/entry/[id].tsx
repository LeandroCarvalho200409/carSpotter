import { View, Text, Image, Pressable } from "react-native";
import { Stack, useSearchParams, useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import Page from '../../../components/Page'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CarEntry (){

    const navigation = useRouter();

    const { id } = useSearchParams();
    var object = JSON.parse(id)

    async function deleteItem() {
        var storage = await AsyncStorage.getItem('carsList4')
        console.log(storage)
        var storageArray = storage.split(';')
        var newStorageArray = []
        for(let i=0; i<storageArray.length; i++){
            if(i !== object.id){
                newStorageArray.push(storageArray[i])
            }
        }
        var newStorageString = ""
        for(let i=0; i<newStorageArray.length; i++){
            newStorageString = newStorageString + newStorageArray[i]

            if(i !== (newStorageArray.length-1)){
                newStorageString = newStorageString + ";"
            }
        }
        console.log(newStorageString)
        await AsyncStorage.setItem('carsList4', newStorageString)

        navigation.back()
    }

    return(
        <>
        <Stack.Screen
        options={{
        title: "Entry",
        }}
        />
        <View style={styles.container}>
            <Page></Page>
            <View style={styles.entryContainer}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.subtitle}>{object.make} {object.model} {object.version}</Text>
                        <Text style={styles.text}>2022-12-23</Text>
                    </View>
                    <Pressable style={styles.deleteButton} onPress={(e) => deleteItem()}>
                        <Image style={styles.deleteIcon} source={require('../../../assets/delete.png')}>

                        </Image>
                    </Pressable>
                </View>
                <Image source={require('../../../assets/brabus-e-v12.jpg')} style={styles.image}></Image>
                <Text style={styles.text}>Make: {object.make}</Text>
                <Text style={styles.text}>Model: {object.model}</Text>
                <Text style={styles.text}>Year: {object.year}</Text>
                <Text style={styles.text}>Fuel: {object.fuel}</Text>
                <Text style={styles.text}>Version: {object.version}</Text>
            </View>
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
    subtitle: {
        color: '#f2b407',
        fontSize: 16,
    },
    entryContainer: {
        width: 303,
        flex: 1,
        marginTop: 30
    },
    text: {
        fontSize: 12,
        color: '#f2b407',
        marginVertical: 10
    },
    image: {
        width: 303,
        height: 150,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        maxHeight: 60
    },
    deleteButton: {
        maxWidth: 40,
        height: 40,
        backgroundColor: '#f57242',
        borderRadius: 100,
        marginLeft: 'auto',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    deleteIcon: {
        width: 20,
        height: 20,
    }
})