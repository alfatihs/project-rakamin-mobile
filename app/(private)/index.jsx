import { View, Text } from "react-native";
import ProfilePhoto from "../../components/ProfilePhoto";

export default function Home() {
    return (
        <View style={{ width: '100%', justifyContent: 'center' }}>
            <Text>Ini Home Page</Text>
            <ProfilePhoto></ProfilePhoto>
        </View>
    )
}