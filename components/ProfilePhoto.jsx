import { Image, View, StyleSheet } from "react-native"

export default function ProfilePhoto({ imgurl = 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Dog-512.png', size = 120 }) {
    return (
        <Image source={{ uri: imgurl }} width={size} height={size} style={styles.image}></Image>
    )
}

const styles = StyleSheet.create({
    image: {
        borderRadius: 100,
    }

})