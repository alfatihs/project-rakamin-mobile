import { ImageBackground, View, Image } from "react-native";
import ButtonAuth from './../components/ButtonAuth';
import { router } from "expo-router";

export default function Tutorial() {
    return (
        <ImageBackground style={{ flex: 1, paddingHorizontal: 30, alignItems: 'center', justifyContent: 'center' }} resizeMode="cover" source={require('./../assets/home-background.png')}>
            <Image source={require('./../assets/tutorial1.png')} style={{ maxWidth: 280, minWidth: 200 }} resizeMode="contain" />

            <Image source={require('./../assets/tutorial2.png')} style={{ maxWidth: 280, minWidth: 200 }} resizeMode='contain' />
            <View style={{ width: 200, alignSelf: 'flex-end', marginTop: 20 }}>
                <ButtonAuth text='Next' bgColor={'#0c356a'} onPress={() => router.push('/login')} />
            </View>
        </ImageBackground>


    )
}