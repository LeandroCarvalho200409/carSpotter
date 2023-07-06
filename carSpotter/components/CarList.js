import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from "react-native";

export default function CarList(){
    const [data, setData] = useState()


    useEffect(() => {
        async function getData(){
            var storage = await AsyncStorage.getItem('carsList3')
            var storageArray = storage.split(";")
            var objectArray = []

            for(let i=0; i<storageArray.length; i++){
                var object = JSON.parse(storageArray[i])
                objectArray.push(object)
            }

            setData(objectArray)
        }
    }, [])

    return(
        <FlatList
        data={data}
        renderItem={({item}) => <Text>{item.model}</Text>}
        />
    );

}
