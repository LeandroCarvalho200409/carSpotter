import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, View, Image } from 'react-native';
import Page from './components/Page';

export default function App() {
  return (
    <View style={styles.container}>
      <Page></Page>
      <Pressable style={styles.button}>
        <Image style={styles.image} source={require('./assets/wheel.png')}>

        </Image>
      </Pressable>
      <StatusBar style="auto" />
    </View>
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
