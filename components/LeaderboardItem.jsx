import { View, Text, Image } from "react-native";

export default function LeaderboardItem({ rank, name, point, avatar }) {
    return (
        <View
            style={{
                backgroundColor: "white",
                borderRadius: 10,
                flexDirection: "row",
                columnGap: 20,
                paddingHorizontal: 20,
                paddingVertical: 15,
                alignItems: "center",
                marginBottom: 25
            }}
        >
            <View
                style={{
                    borderRadius: 100,
                    borderWidth: 1,
                    borderColor: "#E6E6E6",
                    width: 30,
                    height: 30,
                    justifyContent: "center"
                }}
            >
                <Text style={{ color: "#858494", fontFamily: 'Poppins-Bold', textAlign: "center" }}>
                    {rank}
                </Text>
            </View>
            <Image
                source={{ uri: avatar }}
                style={{ width: 40, height: 40, borderRadius: 20 }}
            />
            <View>
                <Text style={{ fontSize: 16, fontFamily: 'Poppins-Bold' }}>{name}</Text>
                <Text style={{ color: "grey" }}>{point}</Text>
            </View>
        </View>
    );
}
