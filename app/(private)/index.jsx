import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import ProfilePhoto from "../../components/ProfilePhoto";
import Ionicons from '@expo/vector-icons/Ionicons';
import PlayButton from "../../components/PlayButton";
import LogoutButton from "../../components/LogoutButton";
import { Link, useNavigation, router } from 'expo-router';

const backgroundImagePath = require('./../../assets/batik.png')

const dataSample = [
    {
        id: 1,
        result: 'win',
        win: 3,
        lose: 1
    },
    {
        id: 2,
        result: 'lose',
        win: 2,
        lose: 2
    },
    {
        id: 3,
        result: 'win',
        win: 4,
        lose: 0
    },
    {
        id: 4,
        result: 'win',
        win: 4,
        lose: 0
    },
    {
        id: 5,
        result: 'win',
        win: 4,
        lose: 0
    },
]


const renderItem = ({ item }) => (
    <Image style={{ width: 100, height: 100, borderRadius: 8 }} source={{ uri: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' }}></Image>
)

export default function Home() {
    return (
        <View style={{ padding: 20, flex: 1, justifyContent: 'space-between' }}>
            <Image source={backgroundImagePath} style={{ width: 300, height: 200, position: 'absolute', bottom: 0, left: -100 }} resizeMode={'contain'}></Image>
            <View>
                <LogoutButton></LogoutButton>
                <View style={{ alignItems: "center", rowGap: 13 }}>
                    <ProfilePhoto></ProfilePhoto>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, color: '#505050' }}>Hi Azmi!</Text>
                    <Text style={{ textAlign: 'center', color: '#505050' }}>Lihat peringkatmu <Text style={{ fontWeight: 'bold' }} onPress={() => router.navigate('leaderboard')} >di sini</Text></Text>
                </View>
            </View>
            <PlayButton />
            <View style={{ widht: '100%', rowGap: 20, height: 200 }}>
                <TouchableOpacity onPress={() => router.push('history')}>
                    <Text style={{ fontWeight: 'bold' }}>{`Riwayat Permainan >`}</Text>
                </TouchableOpacity>
                <FlatList
                    data={dataSample}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    horizontal={true}
                    contentContainerStyle={{ gap: 10 }}
                >
                </FlatList>
            </View>
        </View >
    )
}