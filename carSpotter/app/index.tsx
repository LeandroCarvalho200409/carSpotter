
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, View, Image } from 'react-native';
import Page from '../components/Page';
import { useRouter, Stack } from 'expo-router'
import Carlist from '../components/CarList'
import { PermissionsAndroid } from "react-native";
import { useEffect } from 'react';


export default function App() {
  const navigation = useRouter();

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Storage reading",
          message:
            "We need permission to access your storage",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the EXTERNAL_STORAGE");
      } else {
        console.log("EXTERNAL_STORAGE permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestStoragePermission()
  }, [])

  return (
    <>
    <Stack.Screen
    options={{
      title: "Homepage",
    }}
  />
      <View style={styles.container}>
        <Page></Page>
        <Carlist></Carlist>
        <Pressable style={styles.button} onPress={() => navigation.push("/newEntry")}>
          <Image style={styles.image} source={require('../assets/wheel.png')}>
          </Image>
        </Pressable>
        <StatusBar style="auto" />
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
  button: {
    borderRadius: 100,
    backgroundColor: '#f2b407',
    maxHeight: 80,
    maxWidth: 80,
    marginBottom: 20,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    maxHeight: 70,
    maxWidth: 70,
  },
});
