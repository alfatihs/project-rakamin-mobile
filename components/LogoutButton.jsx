import {
    TouchableOpacity
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

export default function LogoutButton({ onPress }) {
    return (
        <TouchableOpacity style={{ alignSelf: 'flex-end', padding: 8, borderRadius: 100 }} onPress={onPress}>
            <Ionicons name='exit-outline' size={20} color='#676F69'></Ionicons>
        </TouchableOpacity>
    )
}