import { View, Text, Image, FlatList } from "react-native";
import LeaderboardItem from "../../components/LeaderboardItem";
import BackButton from "../../components/BackButton";
import ProfilePhoto from "../../components/ProfilePhoto";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { useEffect, useState } from "react";
import { set } from "zod";
import { ImageBackground } from "react-native";

const rank1path = require("./../../assets/rank1.png");
const rank2path = require("./../../assets/rank2.png");
const rank3path = require("./../../assets/rank3.png");
const medalpath = require("./../../assets/medal.png");


// Replace this with your actual response
const response = [
    {
        name: "Micko",
        avatar: "https://th.bing.com/th/id/OIP.k8B9aSEHBPFn8A_U5_d7uwHaFF?rs=1&pid=ImgDetMain",
        point: 20,
        count_win: "2"
    },
    {
        name: "Salma",
        avatar: "https://avatar.iran.liara.run/public/34",
        point: 0,
        count_win: null
    },
    {
        name: "Salma",
        avatar: "https://avatar.iran.liara.run/public/33",
        point: 0,
        count_win: null
    },
    {
        name: "Azmi",
        avatar: "https://avatar.iran.liara.run/public/36",
        point: 0,
        count_win: null
    }
];

export default function Leaderboard() {
    const [authToken, setAuthToken] = useState("");
    const [leaderboardItems, setLeaderboardItems] = useState([]);

    useEffect(() => {

        const getAuthToken = async () => {
            try {
                return await SecureStore.getItemAsync('authToken');
            } catch (err) {
                console.error("An error occurred while fetching auth token:", err.message);
            }
        };

        const fetchLeaderboard = async () => {
            try {

                const authToken = await getAuthToken();
                if (!authToken) {
                    console.error("Auth token is missing.");
                    return;
                }
                setAuthToken(authToken);
                // console.log(authToken, 'authToken')
                const response = await axios.get('https://project-rakamin-api.vercel.app/leaderboards', {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });

                // Map the response data
                const formattedData = Object.values(response.data).map((item) => {
                    return {
                        name: item.name,
                        avatar: item.avatar,
                        point: item.point,
                        count_win: item.count_win
                    };
                });

                // Set leaderboard items
                setLeaderboardItems(formattedData);
                // console.log(formattedData, 'formattedData')

            } catch (err) {
                if (err.response?.status === 401) {
                    console.error("Authentication failed. Please check your token.");
                } else {
                    console.error("An error occurred while fetching data:", err.message);
                }
            }
        }
        fetchLeaderboard();
    }, [])

    const renderItem = ({ item, index }) => {
        // if (index < 3) return (<></>)
        if (index >= 3)
            return (
                <LeaderboardItem
                    rank={index + 1}
                    name={item.name}
                    point={item.point}
                    avatar={item.avatar}
                />
            );
    }

    return (
        <ImageBackground source={require('./../../assets/background-leaderboard.png')} style={{ flex: 1, backgroundColor: "#878787", paddingTop: 20, paddingHorizontal: 20 }}>
            <View
                style={{
                    position: "absolute",
                    top: 33,
                    left: 17,
                    backgroundColor: "white",
                    borderRadius: 100,
                    zIndex: 2
                }}
            >
                <BackButton onPress={() => router.back()} />
            </View>
            <View style={{ flex: 1 }}>
                {/* Top section with the leaderboard */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "flex-end",
                        paddingTop: 30,
                        justifyContent: "center"
                    }}
                >
                    <View style={{ alignItems: "center", rowGap: 12 }}>
                        <Text
                            style={{
                                color: "black",
                                fontFamily: 'Poppins-Bold',
                                fontSize: 16
                            }}
                        >
                            {leaderboardItems[1]?.name}
                        </Text>
                        <Text
                            style={{
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                                borderRadius: 12,
                                backgroundColor: "#ffc436",
                                color: "white",
                                fontFamily: 'Poppins-Bold'
                            }}
                        >
                            {leaderboardItems[1]?.point}
                        </Text>
                        <Image source={rank2path} />
                    </View>
                    <View style={{ alignItems: "center", rowGap: 12 }}>
                        <Image source={medalpath} style={{ marginBottom: -30, zIndex: 1 }} />
                        <ProfilePhoto size={81} />
                        <Text
                            style={{
                                color: "black",
                                fontFamily: 'Poppins-Bold',
                                fontSize: 16
                            }}
                        >
                            {leaderboardItems[0]?.name}
                        </Text>
                        <Text
                            style={{
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                                borderRadius: 12,
                                backgroundColor: "#ffc436",
                                color: "white",
                                fontFamily: 'Poppins-Bold'
                            }}
                        >
                            {leaderboardItems[0]?.point}
                        </Text>
                        <Image source={rank1path} />
                    </View>
                    <View style={{ alignItems: "center", rowGap: 12 }}>
                        <Text
                            style={{
                                color: "black",
                                fontFamily: 'Poppins-Bold',
                                fontSize: 16
                            }}
                        >
                            {leaderboardItems[2]?.name}
                        </Text>
                        <Text
                            style={{
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                                borderRadius: 12,
                                backgroundColor: "#ffc436",
                                color: "white",
                                fontFamily: 'Poppins-Bold'
                            }}
                        >
                            {leaderboardItems[2]?.point}
                        </Text>
                        <Image source={rank3path} />
                    </View>
                </View>
                {/* Bottom section with the full leaderboard */}
                <View
                    style={{
                        flex: 1,
                        width: "100%",
                        backgroundColor: "#0C356A",
                        padding: 17,
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                    }}
                >
                    <FlatList
                        data={leaderboardItems}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={renderItem}
                    // contentContainerStyle={{ gap: 25 }}
                    />
                </View>
            </View>
        </ImageBackground>
    );
}
