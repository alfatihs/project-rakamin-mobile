import { View, Text, FlatList, Image } from "react-native";
import HistoryItem from "../../components/HistoryItem";

export default function History() {
    return (
        <View style={{ padding: 20, borderRadius: 10, flexDirection: 'row' }}>
            <HistoryItem></HistoryItem>
            <HistoryItem></HistoryItem>
            <HistoryItem></HistoryItem>
        </View>
    )
}