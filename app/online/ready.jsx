import { View, Text } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import PlayerCard from "../../components/PlayerCard";

export default function Ready() {
    const { player1_name, player2_name, player1_image, player2_image } = useLocalSearchParams();

    const router = useRouter();
    const [countdown, setCountdown] = useState(3);
    const [showCountdown, setShowCountdown] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowCountdown(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (showCountdown && countdown > 0) {
            const countdownTimer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(countdownTimer);
        } else if (showCountdown && countdown === 0) {
            router.replace("/online/OnlineGameScreen");
        }
    }, [countdown, showCountdown, router]);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FFFBF0" }}>
            {showCountdown ? (
                <Text style={{ fontSize: 64, fontFamily: 'Poppins-Bold', color: "#0c356a" }}>
                    {countdown > 0 ? countdown : ""}
                </Text>
            ) : (
                <View>
                    <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 24, marginBottom: 136, textAlign: "center", color: '#0c356a' }}>Semua telah siap!</Text>
                    <View style={{ gap: 34, paddingHorizontal: 35 }}>
                        <PlayerCard name={player1_name} avatar={player1_image}></PlayerCard>
                        <PlayerCard name={player2_name} avatar={player2_image}></PlayerCard>
                    </View>
                </View>
            )}
        </View>
    );
}
