import { ImageBackground, View, FlatList } from 'react-native';

export default function HomePlaceholder() {
    return (

        <ImageBackground
            style={{ padding: 20, flex: 1, justifyContent: 'space-between' }}
            source={require('./../assets/home-background.png')}
            resizeMode="cover"
        >
            <View>
                {/* Logout Button Skeleton */}
                <View style={{
                    width: 100,
                    height: 40,
                    backgroundColor: '#E0e0e0',
                    borderRadius: 10,
                    marginBottom: 20,
                    alignSelf: 'flex-end',
                }} />

                {/* Profile Section Skeleton */}
                <View style={{ alignItems: "center", rowGap: 13 }}>
                    {/* Profile Photo Skeleton */}
                    <View style={{
                        width: 100,
                        height: 100,
                        backgroundColor: '#E0E0E0',
                        borderRadius: 50,
                    }} />
                    {/* Name Skeleton */}
                    <View style={{
                        marginTop: 10,
                        width: 150,
                        height: 20,
                        backgroundColor: '#E0E0E0',
                        borderRadius: 4,
                    }} />
                    {/* Additional Text Skeleton */}
                    <View style={{
                        marginTop: 5,
                        width: 200,
                        height: 16,
                        backgroundColor: '#E0E0E0',
                        borderRadius: 4,
                    }} />
                </View>
            </View>

            {/* Play Button Skeleton */}
            <View style={{
                alignSelf: 'center',
                width: 172,
                height: 60,
                backgroundColor: '#E0E0E0',
                borderRadius: 30,
                marginBottom: 20,
            }} />

            {/* History Section Skeleton */}
            <View style={{ width: '100%', rowGap: 20, height: 200 }}>
                {/* Title Skeleton */}
                <View style={{
                    width: 180,
                    height: 20,
                    backgroundColor: '#E0E0E0',
                    borderRadius: 4,
                    marginBottom: 10,
                }} />
                {/* Horizontal List Skeleton */}
                <FlatList
                    data={[1, 2, 3, 4, 5]} // Dummy array for placeholders
                    keyExtractor={(item) => item.toString()}
                    horizontal={true}
                    renderItem={() => (
                        <View style={{
                            width: 120,
                            height: 150,
                            backgroundColor: '#E0E0E0',
                            borderRadius: 10,
                            marginRight: 10,
                        }} />
                    )}
                    contentContainerStyle={{ gap: 10 }}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </ImageBackground>
    )
}

