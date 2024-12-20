import { View, Text, FlatList } from "react-native";

export default function History() {
    return (
        <View>
            <Text>Ini History Page</Text>
            <FlatList
                data={[
                    { key: 'Debit Card' },
                    { key: 'Credit Card' },
                    { key: 'Cash' },
                    { key: 'E-Wallet' },
                    { key: 'Bank Transfer' },
                ]}
                renderItem={({ item }) => <Text>{item.key}</Text>}
            />
        </View>
    )
}