import { StyleSheet, Pressable, Image } from "react-native";

export default function Camera(){
    return(
        <Pressable style={styles.container}>
            <Image style={styles.image} source={require('../assets/dslr-camera.png')}>
            </Image>
        </Pressable>
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
    image: {
        maxHeight: 80,
        maxWidth: 100,
        margin: 'auto',
    },
});
