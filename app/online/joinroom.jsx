import { ImageBackground, View, Text, TextInput } from "react-native";
import { useState } from "react";
import Button from "../../components/ButtonAuth";
import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

const backgroundImagePath = require('./../../assets/background-joinroom.png')

const JOIN_ROOM_API_URL = "https://project-rakamin-api.vercel.app/rooms/join";
const ROOM_INFO_API_URL = "https://project-rakamin-api.vercel.app/rooms/info";


export default function JoinRoom() {
    const [player1_id, setPlayer1_id] = useState('');
    const [player2_id, setPlayer2_id] = useState('');
    const [roomID, setRoomID] = useState('');
    const [authToken, setAuthToken] = useState('');

    const getAuthToken = async () => {
        const authToken = await SecureStore.getItemAsync('authToken');
        if (!authToken) {
            Alert.alert('Authentication Required', 'Anda harus login terlebih dahulu!', [
                { text: 'OK', onPress: () => router.replace('/login') },
            ]);
            return;
        }
        setAuthToken(authToken);
        return authToken;
    }

    const handleJoinRoom = async () => {
        try {
            const authToken = await getAuthToken();
            if (!authToken) return;

            const response = await axios.post(
                JOIN_ROOM_API_URL,
                {
                    roomId: roomID
                },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                }
            );
            console.log(response.data.data, 'response data')

            if (response.data.data.gameStatus === 'playing') {
                console.log('room is active, getting room data..')
                await SecureStore.setItemAsync('roomID', response.data.data.roomId.toString());
                router.replace({
                    pathname: '/online/ready',
                    params: {
                        roomID: roomID,
                        player1_name: response.data.data.p1.name,
                        player1_image: response.data.data.p1.avatar,
                        player2_name: response.data.data.p2.name,
                        player2_image: response.data.data.p2.avatar
                    }
                })

            }
            else {
                alert('Gagal bergabung ke Arena');
            }
        } catch (error) {
            console.error('Error joining room:', error);
        }
    }

    return (
        <ImageBackground source={backgroundImagePath} style={{
            flex: 1,
            paddingHorizontal: 35,

            paddingTop: 200

        }}

        >

            <Text style={{ fontWeight: 'bold' }}>Masukkan kode Arena di bawah ini!</Text>
            <TextInput
                value={roomID}
                onChangeText={(text) => setRoomID(text)}
                placeholder="Masukkan kode Arena..."
                style={{
                    borderWidth: 2,
                    borderRadius: 8,
                    padding: 12,
                    borderColor: '#c6c6c6',
                    marginTop: 8,
                    color: '#0c356a',
                    backgroundColor: 'white',
                    fontSize: 14, marginBottom: 200
                }}
            ></TextInput>

            <Button text='Masuk Arena' onPress={handleJoinRoom} bgColor="#0C356A"></Button>

        </ImageBackground>
    )
}