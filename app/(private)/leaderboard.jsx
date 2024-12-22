import { View, Text, Image, FlatList } from "react-native";
import LeaderboardItem from '../../components/LeaderboardItem';
import BackButton from "../../components/BackButton";
import ProfilePhoto from "../../components/ProfilePhoto";
import { router } from "expo-router";

const rank1path = require('./../../assets/rank1.png');
const rank2path = require('./../../assets/rank2.png');
const rank3path = require('./../../assets/rank3.png');
const medalpath = require('./../../assets/medal.png');

const data = [
    { id: 1, name: 'Azmi' },
    { id: 2, name: 'Azim' },
    { id: 3, name: 'Arvie' },
    { id: 4, name: 'Pras' },
];

const renderItem = ({ item }) => <LeaderboardItem />;
export default function Leaderboard() {

    return (

        <View style={{ flex: 1, backgroundColor: '#878787', padding: 20 }}>
            <View style={{
                position: 'absolute',
                top: 33,
                left: 17,
                backgroundColor: 'white',
                borderRadius: 100,
                zIndex: 2,
            }}>
                <BackButton onPress={() => router.back()} />
            </View>
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        paddingTop: 30,
                        justifyContent: 'center',
                    }}
                >
                    <View style={{ alignItems: 'center', rowGap: 12 }}>
                        <Text
                            style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 16,
                            }}
                        >
                            Azmi
                        </Text>
                        <Text
                            style={{
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                                borderRadius: 12,
                                backgroundColor: '#949494',
                                color: 'white',
                                fontWeight: 'bold',
                            }}
                        >
                            210
                        </Text>
                        <Image source={rank2path} />
                    </View>
                    <View style={{ alignItems: 'center', rowGap: 12 }}>
                        <Image source={medalpath} style={{ marginBottom: -30, zIndex: 1 }} />
                        <ProfilePhoto size={81} />
                        <Text
                            style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 16,
                            }}
                        >
                            Azmi
                        </Text>
                        <Text
                            style={{
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                                borderRadius: 12,
                                backgroundColor: '#949494',
                                color: 'white',
                                fontWeight: 'bold',
                            }}
                        >
                            210
                        </Text>
                        <Image source={rank1path} />
                    </View>
                    <View style={{ alignItems: 'center', rowGap: 12 }}>
                        <Text
                            style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 16,
                            }}
                        >
                            Azmi
                        </Text>
                        <Text
                            style={{
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                                borderRadius: 12,
                                backgroundColor: '#949494',
                                color: 'white',
                                fontWeight: 'bold',
                            }}
                        >
                            210
                        </Text>
                        <Image source={rank3path} />
                    </View>
                </View>
                <View
                    style={{
                        flex: 1,
                        width: '100%',
                        backgroundColor: "#e7e7e7",
                        padding: 17,
                        borderRadius: 20,
                    }}
                >
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        contentContainerStyle={{ gap: 25 }}
                    />
                </View>
            </View>
        </View>
    );
}
