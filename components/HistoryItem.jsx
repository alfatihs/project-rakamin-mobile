import { View, Text, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function HistoryItem({ result = 'draw', name = 'User X', avatar }) {
    const gradientColors = {
        win: ['#a1c4fd', '#c2e9fb'], // Light to dark blue
        lose: ['#bd251f', '#57110f'], // Light to dark red
        draw: ['#d3d3d3', '#a9a9a9'], // Light to dark grey
    };

    const colors = gradientColors[result] || gradientColors.draw;

    return (
        <LinearGradient
            colors={colors}
            style={{
                padding: 8,
                borderRadius: 20,
                flexDirection: 'row',
                columnGap: 20,
                borderWidth: 2,
                borderColor: '#efeefc'
            }}
        >
            <Image
                source={{ uri: avatar, width: 64, height: 64, borderRadius: 100 }}
                style={{ backgroundColor: 'white', borderRadius: 100 }}
            />
            <View style={{ rowGap: 12 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, colors: 'white' }}>
                    {result === 'win' ? `Kamu Menang` : result === 'draw' ? `Kamu Seri` : `Kamu Kalah`}
                </Text>
                <Text style={{ fontSize: 12, color: 'white' }}>dari {name}</Text>
            </View>
        </LinearGradient>
    );
}
