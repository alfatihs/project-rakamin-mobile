import { Text, ScrollView, FlatList, View, Image } from "react-native";
import HistoryItem from "../../components/HistoryItem";
import BackButton from "../../components/BackButton";
import { router } from "expo-router";

const renderItem = ({ item }) => (
    <HistoryItem />
)

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
    {
        id: 6,
        result: 'win',
        win: 4,
        lose: 0
    },
    {
        id: 7,
        result: 'win',
        win: 4,
        lose: 0
    },
    {
        id: 8,
        result: 'win',
        win: 4,
        lose: 0
    },
    {
        id: 9,
        result: 'win',
        win: 4,
        lose: 0
    },
    {
        id: 10,
        result: 'win',
        win: 4,
        lose: 0
    },
    {
        id: 11,
        result: 'win',
        win: 4,
        lose: 0
    }
]

export default function History({ data = dataSample }) {
    return (
        <View style={{ paddingTop: 116, paddingBottom: 60, paddingHorizontal: 32, rowGap: 37 }}>
            <View style={{ position: 'absolute', top: 33, left: 17 }}>
                <BackButton onPress={() => router.back()}></BackButton>
            </View>
            <Text style={{ textAlign: 'center', fontSize: 18, color: '#505050' }}>Riwayat Permainan</Text>
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ gap: 25 }}
            />
        </View>
    )
}