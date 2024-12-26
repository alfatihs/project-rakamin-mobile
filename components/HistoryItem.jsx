import { View, Text, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function HistoryItem({ result = 'draw', name = 'User X', avatar }) {
    const ContainerGradientColors = {
        win: ['#277BC0', '#0C356A'], // Light to dark blue
        lose: ['#BD2520', '#57110F'], // Light to dark red
        draw: ['#d3d3d3', '#a9a9a9'], // Light to dark grey
    };

    const AvatarGradientColors = {
        win: ['#BAFFEC', 'rgba(17, 0, 255, 0.1)'], // Light to dark blue
        lose: ['#bd251f', 'rgba(255, 82, 82, 0.1)'], // Light to dark red
        draw: ['#d3d3d3', 'rgba(75, 75, 75, 0.1)'], // Light to dark grey
    }

    const containerColors = ContainerGradientColors[result] || ContainerGradientColors.draw;
    const avatarColors = AvatarGradientColors[result] || AvatarGradientColors.draw;

    return (
        <LinearGradient
            colors={containerColors}
            style={{
                padding: 8,
                borderRadius: 20,
                flexDirection: 'row',
                columnGap: 20,
                borderWidth: 2,
                borderColor: '#efeefc',
            }}
        >
            <View
            // style={{ position: 'relative', width: 64, height: 64 }}
            >
                {/* Gradient Overlay */}
                <LinearGradient
                    colors={avatarColors}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 100,
                        zIndex: 3,
                    }}
                    start={{ x: 0.5, y: 1 }}
                    end={{ x: 0.5, y: 0 }}
                />
                {/* Avatar Image */}
                <Image
                    source={{ uri: avatar }}
                    style={{
                        width: 64,
                        height: 64,
                        borderRadius: 100,
                        backgroundColor: 'white',
                        zIndex: 2,
                    }}
                />
            </View>
            <View style={{ rowGap: 12 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>
                    {result === 'win' ? `Kamu Menang` : result === 'draw' ? `Kamu Seri` : `Kamu Kalah`}
                </Text>
                <Text style={{ fontSize: 12, color: 'white' }}>dari {name}</Text>
            </View>
        </LinearGradient>
    );
}
