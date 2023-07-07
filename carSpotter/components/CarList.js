import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, Text, View, StyleSheet, Pressable, Image } from "react-native";
import { useRouter } from 'expo-router';

export default function CarList(){
    const [data, setData] = useState()

    const navigation = useRouter();


    useEffect(() => {
        async function getData(){
            var storage = await AsyncStorage.getItem('carsList4')
            if(storage !== null){
                var storageArray = storage.split(";")
                var objectArray = []

                for(let i=0; i<storageArray.length; i++){
                    var object = JSON.parse(storageArray[i])
                    objectArray.push(object)
                }

                setData(objectArray)
            }
        }

        const interval = setInterval(() => {
            getData()
        }, 2000);

          return () => clearInterval(interval);
    }, [])

    return(
        <View style={styles.container}>
            <Text style={styles.subtitle}>My Entries</Text>
            <FlatList
            data={data}
            renderItem={({item, idx}) => <Pressable style={styles.entry} onPress={(e) => navigation.push('/entry/'+JSON.stringify(item))}>
                <View style={styles.entryContainer}>
                    <Image style={styles.image} source={require('../assets/brabus-e-v12.jpg')}></Image>
                    <View>
                        <Text style={styles.entryText}>{item.make} {item.model}</Text>
                        <Text style={styles.entryText}>2023-02-02</Text>
                    </View>
                    <View style={styles.entryContainer2}>
                        <Text style={styles.entryText}>Year: {item.year}</Text>
                        <Text style={styles.entryText}>Location: Veraona, IT</Text>
                    </View>
                </View>
                </Pressable>}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    image: {
        maxHeight: 30,
        maxWidth: 100,
        marginRight: 5,
        marginTop: 5
    },
    subtitle: {
        fontSize: 16,
        color: '#f2b407',
        marginTop: 30,
    },
    container: {
        maxHeight: 450,
        flex: 1,
        width: 300,
        marginBottom: 50
    },
    entryContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    entry: {
        height: 60,
        borderBottomColor: '#f2b407',
        borderBottomWidth: 2,
        marginTop: 3,
    },
    entryText: {
        fontSize: 12,
        color: '#f2b407',
        maxWidth: 100,
    },
    entryContainer2: {
        marginLeft: 'auto'
    }
})
