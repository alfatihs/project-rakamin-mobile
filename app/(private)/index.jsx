import { View, Text, TouchableOpacity, FlatList, Image, ImageBackground } from "react-native";
import ProfilePhoto from "../../components/ProfilePhoto";
import PlayButton from "../../components/PlayButton";
import LogoutButton from "../../components/LogoutButton";
import { useNavigation, router } from 'expo-router';
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import HomePlaceholder from "../../components/HomePlaceholder";
import { useMusic } from "../providers/MusicProvider";
import { Ionicons } from '@expo/vector-icons';
// import Ready from "../online/ready";


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
    const { isMuted, muteMusic, unmuteMusic, playClickSound } = useMusic();
    const [muted, setMuted] = useState(isMuted)
    const [isFetching, setIsFetching] = useState(false);
    const [profileData, setProfileData] = useState({
        avatar: "",
        email: "",
        id: "",
        name: "",
        point: 0
    })

    const [historyData, setHistoryData] = useState([])

    const getProfileData = async () => {
        try {
            setIsFetching(true);

            // Retrieve the authentication token
            const authToken = await SecureStore.getItemAsync('authToken');
            if (!authToken) {
                alert('Anda harus login terlebih dahulu');
                router.replace('/login');
                return; // Exit early if there's no token
            }

            // Fetch profile data
            const res = await axios.get(PROFILE_API_URL, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            // Check if the response status is not OK (200)
            if (res.status !== 200) {
                alert('Terjadi kesalahan. Silakan login kembali');
                router.replace('/login');
                return; // Exit early on failure
            }

            // Extract and process profile data
            const profile = res.data?.data;
            if (!profile) {
                throw new Error('Invalid profile data received');
            }

            console.log(profile, 'res data data');
            setProfileData(profile);

            // Save userId to SecureStore
            await SecureStore.setItemAsync('userId', profile?.id.toString());
            console.log(`UserId (${profile?.id}) saved to SecureStore`);
        } catch (error) {
            console.error('Error fetching profile data:', error);
            alert('Terjadi kesalahan. Silakan coba lagi.');
            router.replace('/login'); // Redirect to login on error
        } finally {
            setIsFetching(false); // Ensure the fetching state is updated
        }
    };




    const fetchHistory = async (userID, setHistoryItems) => {
        try {

            console.log(userID, 'userID!')
            // Retrieve auth token
            setIsFetching(true);
            const authToken = await SecureStore.getItemAsync('authToken');
            if (!authToken) {
                console.error("Auth token is missing.");
                setIsFetching(false);
                return;
            }

            const response = await axios.get(HISTORY_API_URL, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            if (response.status !== 200) {
                console.error("Failed to fetch history data.");
                setIsFetching(false);
                return;
            }
            else {
            }


            const formattedData = Object.values(response?.data.data).map((item) => {
                const isPlayer1 = item?.player1_id === userID; // Determine if we are Player 1
                // console.log('player 1?', isPlayer1)
                const result = isPlayer1
                    ? item.win === parseInt(userID) ? 'win' : item.draw ? 'draw' : 'lose'
                    : item.win === parseInt(userID) ? 'win' : item.draw ? 'draw' : 'lose';
                const opponentAvatar = isPlayer1
                    ? item.player2_avatar || 'https://via.placeholder.com/64'
                    : item.player1_avatar || 'https://via.placeholder.com/64';

                // console.log(opponentAvatar, 'opponentAvatar', isPlayer1, 'player1?')

                return {
                    id: item.id,
                    result,
                    avatar: opponentAvatar,
                };
            });

            setHistoryItems(formattedData);
            setIsFetching(false);
        } catch (err) {
            setIsFetching(false);
            if (err.response?.status === 401) {
                console.error("Authentication failed. Please check your token.");
            } else {
                console.error("An error occurred while fetching data:", err.message);
            }
        }
    };

    useEffect(() => {
        getProfileData();
    }, []);

    useEffect(() => {
        if (profileData.id) {
            fetchHistory(profileData.id, setHistoryData);
        }
    }, [profileData.id]);


    const navigation = useNavigation();
    return (
        isFetching ? <HomePlaceholder></HomePlaceholder> :
            <ImageBackground style={{ padding: 20, flex: 1, justifyContent: 'space-between' }} source={backgroundImagePath} resizeMode="cover">
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5, alignItems: 'center' }}>
                        {isMuted !== null &&
                            <TouchableOpacity onPress={() => {
                                isMuted ? unmuteMusic() : muteMusic()

                            }}>
                                <Ionicons name={isMuted ? 'volume-mute-outline' : 'volume-high-outline'} size={20}></Ionicons>
                            </TouchableOpacity>
                        }
                        <LogoutButton onPress={() => {
                            playClickSound()
                            navigation.popTo('login');
                            SecureStore.deleteItemAsync('authToken');
                        }}></LogoutButton>
                    </View>
                    <View style={{ alignItems: "center", rowGap: 13 }}>
                        <ProfilePhoto imgurl={profileData?.avatar}></ProfilePhoto>
                        <Text style={{ textAlign: 'center', fontSize: 18, color: '#0c356a', fontFamily: 'Poppins-Bold' }}>{`Hi ${profileData?.name} !`}</Text>
                        <Text style={{ textAlign: 'center', color: '#0c356a', fontFamily: 'Poppins-Regular' }}>Lihat peringkatmu <Text style={{ fontFamily: 'Poppins-Bold' }}
                            onPress={() => {
                                playClickSound()
                                router.navigate('leaderboard')
                            }} >di sini</Text></Text>
                    </View>
                </View>
                <PlayButton text='Main' onPress={() => {
                    playClickSound()
                    router.push('selectmode')
                }} fontSize={36} width={172} />
                <View style={{ widht: '100%', rowGap: 20, height: 200 }}>
                    <TouchableOpacity onPress={() => {
                        playClickSound();
                        router.push({
                            pathname: 'history',
                            params: {
                                userID: profileData.id
                            }
                        })
                    }}>
                        <Text style={{ fontFamily: 'Poppins-Bold' }}>{`Riwayat Permainan >`}</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={historyData}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        horizontal={true}
                        contentContainerStyle={{ gap: 10 }}
                        showsHorizontalScrollIndicator={false}
                        item

                    // style={{ backgroundColor: 'red', height: 20 }}

                    >
                    </FlatList>
                </View>
            </ ImageBackground>
    )
}