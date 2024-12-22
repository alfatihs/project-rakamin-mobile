import { View, Text } from "react-native";
export default function LeaderboardItem({ rank, name, point }) {
    return (
        <View style={{

            backgroundColor: 'white',
            borderRadius: 10,
            flexDirection: 'row',
            columnGap: 30,
            paddingHorizontal: 30,
            paddingVertical: 20,
            alignItems: 'center'

        }}>
            <View style={{
                borderRadius: 100,
                borderWidth: 1,
                borderColor: '#E6E6E6',
                width: 25,
                height: 25,
                justifyContent: 'center',
            }}>
                <Text style={{ color: '#858494', fontWeight: 'bold', textAlign: 'center' }}>4</Text>
            </View>
            <View style={{}}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Arvie</Text>
                <Text style={{ color: 'grey' }}>590</Text>
            </View>
        </View>
    )
}