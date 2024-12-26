import { Image, View, Text } from 'react-native';
import PlayButton from './PlayButton';
import { router } from 'expo-router';

const onlineModalImage = require('./../assets/room-modals.png');

const handleBuatArena = () => {
    const roomID = '123456';
    console.log('Join room with ID:', roomID);
    router.replace('online/roommaster', { roomID: roomID });
}

const handleGabungArena = () => {
    router.replace('online/joinroom');
}

export default function OnlineModal() {
    return (
        <View style={{
            // flex: 1,
            justifyContent: 'center',
            backgroundColor: '#fffbf0',
            paddingTop: 80,
            paddingBottom: 30,
            width: '90%',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#c9c9c9',
        }}>
            <Image source={onlineModalImage} style={{ alignSelf: 'center', width: '100%' }} resizeMode='cover'></Image>
            <View style={{ alignItems: 'center', gap: 10, marginTop: -40 }}>
                <PlayButton text='Gabung Arena' onPress={handleGabungArena} fontSize={24} width={220} ></PlayButton>
                <PlayButton text='Buat Arena' onPress={handleBuatArena} fontSize={24} width={220} ></PlayButton>
            </View>
        </View >
    )
}