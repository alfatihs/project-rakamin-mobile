import { TouchableOpacity, View, Text } from 'react-native';

export default function PlayButton() {
    return (
        <TouchableOpacity style={{
            width: 162,
            height: 70,
            backgroundColor: '#277BC0',
            borderColor: '#0C356A',
            borderWidth: 1,
            borderRadius: 8,
            paddingVertical: 7,
            paddingHorizontal: 8,
            justifyContent: 'center',
            alignSelf: 'center'
        }}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#A1CFF5'
            }}>
                <Text style={{ fontWeight: 'bold', fontSize: 36, color: 'white', borderColor: 'black' }}>Main</Text>
            </View>
        </TouchableOpacity>
    )
}