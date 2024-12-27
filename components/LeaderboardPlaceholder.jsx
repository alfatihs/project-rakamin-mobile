import React from 'react';
import { View, ImageBackground, Image, FlatList } from "react-native";
import BackButton from './BackButton';

const rank1path = require('./../assets/rank1.png');
const rank2path = require("./../assets/rank2.png");
const rank3path = require("./../assets/rank3.png");
const medalpath = require("./../assets/medal.png");

export default function LeaderboardPlaceholder() {
    return (
        <ImageBackground
            source={require('./../assets/background-leaderboard.png')}
            style={{ flex: 1, backgroundColor: "#878787", paddingTop: 20, paddingHorizontal: 20 }}
        >
            {/* Back Button Skeleton */}
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
                {/* Top section with the leaderboard skeleton */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "flex-end",
                        paddingTop: 30,
                        justifyContent: "center"
                    }}
                >
                    {/* Rank 2 Skeleton */}
                    <View style={{ alignItems: "center", rowGap: 12 }}>
                        <View style={{ width: 80, height: 20, backgroundColor: "#E0E0E0", borderRadius: 4 }} />
                        <View
                            style={{
                                width: 60,
                                height: 30,
                                backgroundColor: "#E0E0E0",
                                borderRadius: 12,
                            }}
                        />
                        <Image source={rank2path} style={{ width: 40, height: 40 }} />
                    </View>

                    {/* Rank 1 Skeleton */}
                    <View style={{ alignItems: "center", rowGap: 12 }}>
                        <Image source={medalpath} style={{ width: 50, height: 50, marginBottom: -30, zIndex: 1 }} />
                        <View
                            style={{
                                width: 81,
                                height: 81,
                                backgroundColor: "#E0E0E0",
                                borderRadius: 40.5,
                            }}
                        />
                        <View style={{ width: 80, height: 20, backgroundColor: "#E0E0E0", borderRadius: 4 }} />
                        <View
                            style={{
                                width: 60,
                                height: 30,
                                backgroundColor: "#E0E0E0",
                                borderRadius: 12,
                            }}
                        />
                        <Image source={rank1path} style={{ width: 40, height: 40 }} />
                    </View>

                    {/* Rank 3 Skeleton */}
                    <View style={{ alignItems: "center", rowGap: 12 }}>
                        <View style={{ width: 80, height: 20, backgroundColor: "#E0E0E0", borderRadius: 4 }} />
                        <View
                            style={{
                                width: 60,
                                height: 30,
                                backgroundColor: "#E0E0E0",
                                borderRadius: 12,
                            }}
                        />
                        <Image source={rank3path} style={{ width: 40, height: 40 }} />
                    </View>
                </View>

                {/* Bottom section with the full leaderboard skeleton */}
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
                        data={[1, 2, 3, 4, 5]} // Dummy data for skeleton rows
                        keyExtractor={(item) => item.toString()}
                        renderItem={() => (
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginBottom: 15,
                                    backgroundColor: "#E0E0E0",
                                    padding: 10,
                                    borderRadius: 10,
                                }}
                            >
                                {/* Skeleton for profile image */}
                                <View
                                    style={{
                                        width: 50,
                                        height: 50,
                                        backgroundColor: "#D0D0D0",
                                        borderRadius: 25,
                                        marginRight: 10,
                                    }}
                                />
                                {/* Skeleton for text */}
                                <View style={{ flex: 1 }}>
                                    <View style={{ width: "70%", height: 20, backgroundColor: "#D0D0D0", borderRadius: 4, marginBottom: 8 }} />
                                    <View style={{ width: "50%", height: 16, backgroundColor: "#D0D0D0", borderRadius: 4 }} />
                                </View>
                            </View>
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </ImageBackground>
    );
}
