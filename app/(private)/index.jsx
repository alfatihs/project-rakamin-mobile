import { View, Text, TouchableOpacity, FlatList, Image, ImageBackground } from "react-native";
import ProfilePhoto from "../../components/ProfilePhoto";
import Ionicons from '@expo/vector-icons/Ionicons';
import PlayButton from "../../components/PlayButton";
import LogoutButton from "../../components/LogoutButton";
import { useNavigation, router } from 'expo-router';
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

const PROFILE_API_URL = "https://project-rakamin-api.vercel.app/profile";
const HISTORY_API_URL = "https://project-rakamin-api.vercel.app/history";

const AvatarGradientColors = {
    win: ['#BAFFEC', 'rgba(17, 0, 255, 0.1)'], // Light to dark blue
    lose: ['#bd251f', 'rgba(255, 82, 82, 0.1)'], // Light to dark red
    draw: ['#d3d3d3', 'rgba(75, 75, 75, 0.1)'], // Light to dark grey
}

const renderItem = ({ item }) => {
    const colors = AvatarGradientColors[item.result] || AvatarGradientColors.draw;
    // console.log(item, 'item!');
    return (
        <View
        // style={{ position: 'relative', width: 64, height: 64 }}
        >
            {/* Gradient Overlay */}
            <LinearGradient
                colors={colors}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: 100,
                    zIndex: 3,
                    height: 100
                }}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0.5, y: 0 }}
            />
            {/* Avatar Image */}
            <Image
                source={{ uri: item.avatar }}
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                    backgroundColor: 'white',
                    zIndex: 2,
                }}
            />
        </View>

    )
}
const backgroundImagePath = require('./../../assets/background-image.png')

export default function Home() {
    const [profileData, setProfileData] = useState({
        avatar: "",
        email: "",
        id: "",
        name: "",
        point: 0
    })

    const [historyData, setHistoryData] = useState([])

    const getProfileData = async () => {
        const authToken = await SecureStore.getItemAsync('authToken');
        if (!authToken) {
            alert('Anda harus login terlebih dahulu');
            router.replace('/login');
        }
        else {
            const res = await axios.get(PROFILE_API_URL,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                }
            );
            // console.log(res.data, res.status, 'res')
            if (res.status !== 200) {
                alert('Terjadi kesalahan. Silakan login kembali');
                router.replace('/login');
            }
            else {
                // console.log(res.data.data, 'data');
                setProfileData(res.data.data);
            }

        }
    }


    const fetchHistory = async (userID, setHistoryItems) => {
        try {
            // Retrieve auth token
            const authToken = await SecureStore.getItemAsync('authToken');
            if (!authToken) {
                console.error("Auth token is missing.");
                return;
            }

            const response = await axios.get(HISTORY_API_URL, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            const formattedData = Object.values(response.data.data).map((item) => {
                const isPlayer1 = item.player1_id === userID; // Determine if we are Player 1
                const result = isPlayer1
                    ? item.win === parseInt(userID) ? 'win' : item.draw ? 'draw' : 'lose'
                    : item.win === parseInt(userID) ? 'win' : item.draw ? 'draw' : 'lose';

                const opponentAvatar = isPlayer1
                    ? item.player2_avatar || 'https://via.placeholder.com/64'
                    : item.player1_avatar || 'https://via.placeholder.com/64';

                return {
                    id: item.id,
                    result,
                    avatar: opponentAvatar,
                };
            });
            // console.log(formattedData, 'formattedData!!!')

            // Set history items
            setHistoryItems(formattedData);
        } catch (err) {
            if (err.response?.status === 401) {
                console.error("Authentication failed. Please check your token.");
            } else {
                console.error("An error occurred while fetching data:", err.message);
            }
        }
    };

    useEffect(() => {
        getProfileData();
        fetchHistory(profileData.id, setHistoryData);
    }, [])



    const navigation = useNavigation();
    return (
        <ImageBackground style={{ padding: 20, flex: 1, justifyContent: 'space-between' }} source={backgroundImagePath} resizeMode="cover">
            <View>
                <LogoutButton onPress={() => {
                    navigation.popTo('login');
                    SecureStore.deleteItemAsync('authToken');
                }}></LogoutButton>
                <View style={{ alignItems: "center", rowGap: 13 }}>
                    <ProfilePhoto imgurl={profileData?.avatar}></ProfilePhoto>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, color: '#505050' }}>{`Hi ${profileData?.name} !`}</Text>
                    <Text style={{ textAlign: 'center', color: '#505050' }}>Lihat peringkatmu <Text style={{ fontWeight: 'bold' }} onPress={() => router.navigate('leaderboard')} >di sini</Text></Text>
                </View>
            </View>
            <PlayButton text='Main' onPress={() => router.push('selectmode')} size='big' />
            <View style={{ widht: '100%', rowGap: 20, height: 200 }}>
                <TouchableOpacity onPress={() => router.push({
                    pathname: 'history',
                    params: {
                        userID: profileData.id
                    }
                })}>
                    <Text style={{ fontWeight: 'bold' }}>{`Riwayat Permainan >`}</Text>
                </TouchableOpacity>
                <FlatList
                    data={historyData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    horizontal={true}
                    contentContainerStyle={{ gap: 10 }}
                    showsHorizontalScrollIndicator={false}
                // style={{  }}
                >
                </FlatList>
            </View>
        </ ImageBackground>
    )
}