import { Text, ImageBackground, Image, TouchableOpacity, View } from "react-native";
import PlayButton from "../../components/PlayButton";
import { router } from "expo-router";
export default function SelectMode() {
    return (

        <ImageBackground
            source={require('./../../assets/background-image.png')}
            resizeMode="cover"
            style={{ flex: 1, paddingHorizontal: 35, justifyContent: 'center', alignItems: 'center', gap: 50 }}
        >
            <TouchableOpacity onPress={() => router.push('offline')}  >
                <Image style={{ borderRadius: 8, marginBottom: -20 }} source={require('./../../assets/vs-computer.png')}></Image>
                <PlayButton text='vs Komputer' onPress={() => router.push('offline')} size='medium'></PlayButton>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }}>
                <Image style={{ borderRadius: 8, marginBottom: -20 }} source={require('./../../assets/vs-player.png')}></Image>
                <PlayButton text='vs Manusia' onPress={() => { }} size='medium'></PlayButton>
            </TouchableOpacity>

        </ImageBackground >
    )
}