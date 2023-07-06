import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Page from './components/Page';

export default function App() {
  return (
    <View style={styles.container}>
      <Page></Page>
      <Pressable>

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
  }
});
