import { View, Text } from "react-native";
export default function HistoryItem() {
    return (
        <View style={{ padding: 20, borderRadius: 10, flexDirection: 'row' }}>
            {/* <Text>Ini History Page</Text> */}
            <Image source={{ uri: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' }}></Image>
            <View>
                <Text>Ranked</Text>
                <Text>Menang</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ borderRadius: 100, backgroundColor: 'red', width: 20, height: 20 }}></View>
                    <Text>3 win</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ borderRadius: 100, backgroundColor: 'blue', width: 20, height: 20 }}></View>
                    <Text>1 lose</Text>
                </View>
            </View>
        </View>
    )
}