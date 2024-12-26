import { View, Image, Text } from "react-native";

export default function PlayerCard({ name = '', avatar = '' }) {
    console.log(avatar, 'player card avatar!')

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{
                width: 67,
                height: 67,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: '#ffc436',
                backgroundColor: 'white',
                position: 'absolute',
                zIndex: 1,
            }} source={avatar !== '' ? { uri: avatar } : {}}></Image>
            <Text style={[{
                textAlign: "left",
                paddingVertical: 15,
                width: '100%',
                marginLeft: 10,
                paddingLeft: 90,
                fontWeight: 'bold',
                borderRadius: 10,
                color: '#0c356a'
            },
            name !== null ? { backgroundColor: '#FFC436' } : { backgroundColor: '#FFF0CE' },
            ]}>
                {name !== null ? name : 'Menunggu user...'}
            </Text>
        </View>
    )
}

