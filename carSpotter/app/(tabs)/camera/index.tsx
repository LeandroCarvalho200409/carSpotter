import { Camera } from 'expo-camera'
import { View, TouchableOpacity, Image, ImageBackground, Button, Text } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as MediaLibrary from 'expo-media-library'

export default function CameraPage(){
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [lastPhotoURI, setLastPhotoURI] = useState(null);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState()
    const cameraRef = useRef(null);
    const navigation = useRouter()

    useEffect(() => {
      async function getMediaLibraryPermission() {
        const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

        setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted")
      }
      getMediaLibraryPermission()
    }, [])



    async function setPhotoURI() {
      console.log("Photo URI: "+lastPhotoURI)
      var asset = await MediaLibrary.createAssetAsync(lastPhotoURI)

      console.log(asset)

      var album = await MediaLibrary.createAlbumAsync('Cars', asset)

      console.log(album)
      await AsyncStorage.setItem('photo', asset.uri)

      navigation.back()
    }

    if (lastPhotoURI !== null) {
        return (
          <ImageBackground
            source={{ uri: lastPhotoURI }}
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.2,
                alignSelf: "flex-end",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#666",
                marginBottom: 40,
                marginLeft: 20,
              }}
              onPress={() => {
                setLastPhotoURI(null);
              }}
            >
              <Text style={{ fontSize: 30, padding: 10, color: "white" }}>❌</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.2,
                alignSelf: "flex-end",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#666",
                marginBottom: 40,
                marginLeft: 20,
              }}
              onPress={() => {
                setPhotoURI()
              }}
            >
              <Text style={{ fontSize: 30, padding: 10, color: "white" }}>Save</Text>
            </TouchableOpacity>
          </ImageBackground>
        );
      }

    return(
        <>
        <Stack.Screen
            options={{
                title: "Camera",
            }}
        />
        <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.2,
              alignSelf: "flex-end",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#666",
              marginBottom: 40,
              marginLeft: 20,
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 30, padding: 10, color: "white" }}>♻</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 0.2,
              alignSelf: "flex-end",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#666",
              marginBottom: 40,
              marginLeft: 20,
            }}
            onPress={async () => {
              if (cameraRef.current) {
                let photo = await cameraRef.current.takePictureAsync();
                setLastPhotoURI(photo.uri);
                console.log(photo.uri)
              }
            }}
          >
            <Text style={{ fontSize: 30, padding: 10, color: "white" }}>📸</Text>
          </TouchableOpacity>
        </View>
      </Camera>
        </>
    );
}
