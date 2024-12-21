import { View, Text, ScrollView } from "react-native";
import ProfilePhoto from "../../components/ProfilePhoto";
import Button from "../../components/Button";
import Leaderboard from "./leaderboard";

export default function Home() {
    return (
        <View style={{ alignItems: 'center', padding: 20, }}>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 2, widht: '100%', marginBottom: 20, alignItems: "center", rowGap: 20 }}>
                <ProfilePhoto></ProfilePhoto>
                <Text style={{ textAlign: 'center' }}>User Satu</Text>
                <Button width-type='fit' text="Start your trips" ></Button>
            </View>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 2, widht: '100%', marginBottom: 20, alignItems: "", rowGap: 20 }}>
                <Text style={{ fontWeight: 'bold' }}>History</Text>
                <Leaderboard />
                {/* <ScrollView style={{ flexShrink: 1 }} horizontal={true}>
                    <ProfilePhoto></ProfilePhoto>
                    <ProfilePhoto></ProfilePhoto>
                    <ProfilePhoto></ProfilePhoto>
                    <ProfilePhoto></ProfilePhoto>
                    <ProfilePhoto></ProfilePhoto>
                </ScrollView> */}
            </View>
        </View>
    )
}