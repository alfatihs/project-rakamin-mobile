import { TouchableOpacity, View, Text } from 'react-native';
import { router } from 'expo-router';

export default function PlayButton({ text, onPress, size }) {
    const textSize = size === 'big' ? 36 : 27;
    return (
        <TouchableOpacity
            style={{
                minWidth: 172,
                backgroundColor: '#277BC0',
                borderColor: '#0C356A',
                borderWidth: 1,
                borderRadius: 8,
                paddingVertical: 7,
                paddingHorizontal: 8,
                justifyContent: 'center',
                alignSelf: 'center',
            }}
            onPress={onPress}
        >
            <View style={[{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#A1CFF5',
                paddingHorizontal: 10,
                paddingVertical: 5
            },
                , text === 'Buat Arena' || text === 'Gabung Arena' ? {
                    width: 250
                } : {}]}>
                <Text style={{ fontWeight: 'bold', fontSize: textSize, color: 'white', borderColor: 'black' }}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}