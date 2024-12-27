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
    router.push('online/joinroom');
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
                <PlayButton text='Gabung Arena' size='big' onPress={handleGabungArena}></PlayButton>
                <PlayButton text='Buat Arena' size='big' onPress={handleBuatArena}></PlayButton>
            </View>
        </View >
    )
}