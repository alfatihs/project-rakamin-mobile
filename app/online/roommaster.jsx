import { ImageBackground, View, Text, TouchableOpacity, ToastAndroid, Alert } from "react-native";
import * as Clipboard from 'expo-clipboard';
import { useState, useEffect } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import PlayerCard from "../../components/PlayerCard";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { router } from "expo-router";
import BackButton from "../../components/BackButton";
import { useMusic } from "../providers/MusicProvider";



const backgroundImagePath = require('./../../assets/background-roommaster.png')


const CREATE_ROOM_API_URL = "https://project-rakamin-api.vercel.app/rooms";


export default function RoomMaster() {
    const { playClickSound } = useMusic();

    const [roomID, setRoomID] = useState(0);
    const [player1_name, setPlayer1_name] = useState(null);
    const [player2_name, setPlayer2_name] = useState(null);
    const [player1_image, setPlayer1_image] = useState(null);
    const [player2_image, setPlayer2_image] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [fetchingRoomData, setFetchingRoomData] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {

            Alert.alert(
                'Waktu habis',
                'Silakan buat Arena baru atau bergabung ke Arena yang telah dibuat lawanmu',
                [
                    { text: 'OK' },
                ]
            );
            router.replace('/login');
        }, 60000);

        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        console.log('get room id!')

        const getRoomID = async () => {
            setFetchingRoomData(true);
            console.log('fetching room data..!');
            try {

                const authToken = await SecureStore.getItemAsync('authToken');
                if (!authToken) {
                    Alert.alert('Authentication Required', 'Anda harus login terlebih dahulu!', [
                        { text: 'OK', onPress: () => { playClickSound(); router.replace('/login') } },
                    ]);
                    setFetchingRoomData(false);
                    return;
                }

                const response = await axios.post(
                    CREATE_ROOM_API_URL,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );

                setRoomID(response.data.data.id);
                setPlayer1_name(response.data.data.p1.name);
                setPlayer1_image(response.data.data.p1.avatar);

                console.log(response.data.data.id, 'response data')
                await SecureStore.setItemAsync('roomID', response.data.data.id.toString());
                await SecureStore.setItemAsync('position', 'player1');

            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Gagal membuat room. Silakan coba lagi.');
            } finally {
                setFetchingRoomData(false);
                console.log('done fetching room data!');
            }
        };

        getRoomID();
    }, [router]);


    useEffect(() => {
        let intervalId;

        const startFetching = async () => {
            try {
                if (player1_name !== null && player2_name !== null) {
                    console.log('gas!')
                    clearInterval(intervalId);
                    router.replace({
                        pathname: '/online/ready',
                        params: {
                            player1_name,
                            player1_image,
                            player2_name,
                            player2_image,
                            roomID
                        }
                    });
                }

                if (roomID === 0) return;

                intervalId = setInterval(async () => {

                    if (!isFetching) {
                        setIsFetching(true);
                        console.log('feching room data...!')

                        try {
                            await getRoomData();
                            console.log('result', player1_name, player2_name)

                        } catch (error) {
                            console.error('Error fetching room data:', error);
                        } finally {
                            setIsFetching(false);
                            console.log('done fetching room data!')

                        }

                    }
                }, 3000);
            } catch (error) {
                console.error('Error setting up periodic fetching:', error);
            }
        };

        startFetching();


        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [roomID, player1_name, player2_name]);

    const getRoomData = async () => {
        console.log('getting room data!')
        try {
            const authToken = await SecureStore.getItemAsync('authToken');
            if (!authToken) {
                Alert.alert('Authentication Required', 'Anda harus login terlebih dahulu!', [
                    { text: 'OK', onPress: () => { playClickSound(); router.replace('/login') } },
                ]);
                return;
            }
            // console.log('room id is ', roomID)

            console.log('fetching room data..!')

            const response = await axios.post(
                `https://project-rakamin-api.vercel.app/rooms/info`,
                {
                    roomId: roomID,
                },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            console.log('Refetched room data:', response.data);

            setPlayer1_name(response.data.data.p1.name);
            setPlayer1_image(response.data.data.p1.avatar);
            setPlayer2_name(response.data.data.p2.name);
            setPlayer2_image(response.data.data.p2.avatar);
        } catch (error) {
            console.error('Error fetching room data:', error);
        }
    };

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(roomID.toString());
        ToastAndroid.show("ID room berhasil disalin!", 2)
    };






    return (
        <ImageBackground source={backgroundImagePath} style={{ flex: 1, paddingHorizontal: 35, paddingVertical: 63 }}>
            <View style={{ position: 'absolute', left: 20, top: 20, backgroundColor: 'white', borderRadius: 100 }}>
                <BackButton onPress={() => { playClickSound(); router.back() }} />
            </View>
            <View>
                {fetchingRoomData ? (<>
                    <View style={{ width: 200, height: 17, backgroundColor: "#D0D0D0", borderRadius: 25 }}></View>
                    <View style={{ width: 150, height: 24, backgroundColor: "#D0D0D0", borderRadius: 25, marginBottom: 82 }}></View>
                    <View style={{ width: 300, height: 30, backgroundColor: "#D0D0D0", borderRadius: 25, alignSelf: 'center' }}></View>
                    <View style={{ width: 200, height: 30, backgroundColor: "#D0D0D0", borderRadius: 25, alignSelf: 'center', marginBottom: 100 }}></View>
                </>)
                    :
                    (<>
                        <Text style={{ marginBottom: 6, fontFamily: 'Poppins-Regular' }}>Bagikan kode Arena ke teman mu!</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 82 }}>
                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20 }}>{`ID room: ${roomID}`}</Text>
                            <TouchableOpacity onPress={() => { playClickSound(); copyToClipboard() }} style={{
                                backgroundColor: '#FFC436',
                                borderRadius: 100,
                                padding: 4,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Ionicons name='copy-outline' color={'#0c356a'} size={20}></Ionicons>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ textAlign: 'center', fontSize: 24, color: '#0c356a', marginBottom: 104, fontFamily: 'Poppins-Bold' }}>Minta teman mu untuk segera masuk</Text>
                    </>)
                }
                <View style={{ gap: 34 }}>
                    <PlayerCard name={player1_name} avatar={player1_image}></PlayerCard>
                    <PlayerCard name={player2_name} avatar={player2_image}></PlayerCard>
                </View>
            </View>
        </ImageBackground>
    )
}