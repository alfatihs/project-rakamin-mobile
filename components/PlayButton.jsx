import { TouchableOpacity, View, Text } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function PlayButton({ text, onPress, fontSize, width }) {

    return (
        <LinearGradient colors={['#277BC0', '#0C356A']} style={{
            width: width || 200,
            borderColor: '#0C356A',
            borderWidth: 1,
            borderRadius: 12,
            paddingVertical: 7,
            paddingHorizontal: 8,
            justifyContent: 'center',
            alignSelf: 'center',
        }}>
            <TouchableOpacity
                onPress={onPress}
            >
                <LinearGradient
                    colors={['#A1CFF5', '#277BC0']}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: '#4083D9',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        width: '100%',
                        borderRadius: 12
                    }}>
                    <View style={{

                    }}>
                        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: fontSize, color: 'white', borderColor: 'black' }}>{text}</Text>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        </LinearGradient>
    )
}