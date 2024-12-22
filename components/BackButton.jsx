import {
    TouchableOpacity
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

export default function BackButton({ onPress }) {
    return (
        <TouchableOpacity style={{ alignSelf: 'flex-start', padding: 8, borderRadius: 100 }} onPress={onPress}>
            <Ionicons name='arrow-back' size={20} color='#676F69'></Ionicons>
        </TouchableOpacity>
    )
}