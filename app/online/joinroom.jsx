import { ImageBackground, View, Text, TextInput, ActivityIndicator } from "react-native";
import { useState } from "react";
import Button from "../../components/ButtonAuth";
import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import BackButton from "../../components/BackButton";
import { useMusic } from "../providers/MusicProvider";

const backgroundImagePath = require('./../../assets/background-joinroom.png')

const JOIN_ROOM_API_URL = "https://project-rakamin-api.vercel.app/rooms/join";
const ROOM_INFO_API_URL = "https://project-rakamin-api.vercel.app/rooms/info";


export default function JoinRoom() {
    const { playClickSound } = useMusic();
    const [isLoading, setIsLoading] = useState(false);
    const [roomID, setRoomID] = useState('');
    // const [authToken, setAuthToken] = useState

    const getAuthToken = async () => {
        const authToken = await SecureStore.getItemAsync('authToken');
        if (!authToken) {
            Alert.alert('Authentication Required', 'Anda harus login terlebih dahulu!', [
                { text: 'OK', onPress: () => { playClickSound(); router.replace('/login') } },
            ]);
            return;
        }
        return authToken;
    }

    const handleJoinRoom = async () => {
        try {
            setIsLoading(true);
            const authToken = await getAuthToken();
            if (!authToken) {
                setIsLoading(false);
                return;
            }

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
            // console.log(response.data.data, 'response data')

            if (response.data.data.gameStatus === 'playing') {
                // console.log('room is active, getting room data..')
                await SecureStore.setItemAsync('roomID', response.data.data.roomId.toString());
                await SecureStore.setItemAsync('position', 'player2');
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
            // console.error('Error joining room:', error);
            alert('Gagal bergabung ke Arena!');
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <ImageBackground source={backgroundImagePath} style={{
            flex: 1,
            paddingHorizontal: 35,

            paddingTop: 200

        }}

        >
            <View style={{ position: 'absolute', left: 20, top: 20, backgroundColor: 'white', borderRadius: 100 }}>
                <BackButton onPress={() => { playClickSound(); router.back() }} />
            </View>

            <Text style={{ fontFamily: 'Poppins-Bold' }}>Masukkan kode Arena di bawah ini!</Text>
            <TextInput
                value={roomID}
                onChangeText={(text) => setRoomID(text)}
                placeholder="Masukkan kode Arena..."
                keyboardType="number-pad"
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

            {isLoading ? <ActivityIndicator size="large" color="#0c356a" /> :
                <Button text='Masuk Arena' onPress={() => { playClickSound(); handleJoinRoom() }} bgColor="#0C356A"></Button>
            }



        </ImageBackground>
    )
}