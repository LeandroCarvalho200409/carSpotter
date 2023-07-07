import { StyleSheet, Pressable, Image, View, TouchableOpacity, Text, Button } from "react-native";
import { useState, useRef, useEffect } from "react";
import { Camera, CameraType } from 'expo-camera'
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function CameraComponent(props){
    const [status, requestPermission] = Camera.useCameraPermissions();
    const navigation = useRouter();
    const [photoURIState, setPhotoURIState] = useState('../assets/dslr-camera.png')

    
    useEffect(() => {
        async function getPhoto(){
            var photoURI = await AsyncStorage.getItem('photo')
            console.log(photoURI)
            if(photoURI !== null){
                setPhotoURIState(photoURI)
                photo = photoURI
            }
        }

        const interval = setInterval(() => {
            getPhoto()
          }, 1000);
          return () => clearInterval(interval);
    }, [])

  if (!status?.granted) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <Text style={{ textAlign: "center" }}>
          We need access to your camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

    return(
        <View>
            <Pressable style={styles.container} onPress={() => navigation.push('/camera')}>
                <Image source={{ uri: photoURIState }}>
                </Image>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        maxWidth: 303,
        maxHeight: 147,
        backgroundColor: '#d9d9d9',
        marginTop: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#d9d9d9',
        width: 303,
        height: 147,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        maxHeight: 80,
        maxWidth: 100,
        margin: 'auto',
    },
});
