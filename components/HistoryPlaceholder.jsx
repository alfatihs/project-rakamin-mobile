import { View } from 'react-native';

export default function HistryPlaceholder() {
    return (
        <View style={{ width: '100%', rowGap: 20, height: 200 }}>
            {/* History Title Skeleton */}

            {/* History Item Skeleton */}
            <View style={{
                width: '100%',
                height: 75,
                backgroundColor: '#E0E0E0',
                borderRadius: 20,
            }} />
            <View style={{
                width: '100%',
                height: 75,
                backgroundColor: '#E0E0E0',
                borderRadius: 20,
            }} />
            <View style={{
                width: '100%',
                height: 75,
                backgroundColor: '#E0E0E0',
                borderRadius: 20,
            }} />
        </View>
    )
}