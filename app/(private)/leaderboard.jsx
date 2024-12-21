import { View, Text } from "react-native";
import LeaderboardItem from '../../components/LeaderboardItem'


export default function Leaderboard() {
    return (
        <View style={{ padding: 20 }}>
            <LeaderboardItem></LeaderboardItem>
            <LeaderboardItem></LeaderboardItem>
            <LeaderboardItem></LeaderboardItem>
            <LeaderboardItem></LeaderboardItem>
        </View>
    )
}