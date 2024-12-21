import { View, Text } from "react-native";
export default function LeaderboardItem({ rank, name, point }) {
    return (
        <View style={{ paddingVertical: 30, paddingHorizontal: 20, backgroundColor: 'white', marginVertical: 10, borderRadius: 10, flexDirection: 'row', columnGap: 30 }}>
            <View><Text>4</Text></View>
            <View>
                <Text style={{ fontSize: 16 }}>Arvie</Text>
                <Text style={{ color: 'grey' }}>590 points</Text>
            </View>
        </View>
    )
}