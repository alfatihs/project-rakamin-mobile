import { View, Text, Image } from "react-native";
export default function HistoryItem() {
    return (
        <View style={{ padding: 8, borderRadius: 20, flexDirection: 'row', columnGap: 20, borderWidth: 2, borderColor: '#efeefc' }}>
            {/* <Text>Ini History Page</Text> */}
            <Image source={{ uri: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png', width: 64, height: 64, borderRadius: 20 }} ></Image>
            <View style={{ rowGap: 12 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Kamu Menang</Text>
                <Text style={{ fontSize: 12, color: '#505050' }}>dari User X</Text>
            </View>
        </View>
    )
}