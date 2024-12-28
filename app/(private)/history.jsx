import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { ImageBackground, View, Text, FlatList } from 'react-native';
import BackButton from '../../components/BackButton';
import * as SecureStore from 'expo-secure-store';
import HistoryItem from '../../components/HistoryItem';
import HistryPlaceholder from '../../components/HistoryPlaceholder';
import { set } from 'zod';
import { useMusic } from '../providers/MusicProvider';


const getAuthToken = async () => {
    try {
        return await SecureStore.getItemAsync('authToken');
    } catch (err) {
        // console.error("An error occurred while fetching auth token:", err.message);
    }
};

const renderItem = ({ item }) => (
    <HistoryItem result={item.result} name={item.name} avatar={item.avatar} />
);

export default function History() {
    const { playClickSound } = useMusic();
    const [isFetching, setIsFetching] = useState(false);

    const fetchHistory = async (userID, setHistoryItems) => {
        setIsFetching(true);

        try {
            // Retrieve auth token
            const authToken = await getAuthToken();
            if (!authToken) {
                // console.error("Auth token is missing.");
                setIsFetching(false);
                return;
            }

            // Fetch history data
            const response = await axios.get('https://project-rakamin-api.vercel.app/history', {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            // console.log(response.data.data, 'response data!')

            // Map the response data
            const formattedData = Object.values(response.data.data).map((item) => {
                const isPlayer1 = item.player1_id === userID; // Determine if we are Player 1
                const result = isPlayer1
                    ? item.win === parseInt(userID) ? 'win' : item.draw ? 'draw' : 'lose'
                    : item.win === parseInt(userID) ? 'win' : item.draw ? 'draw' : 'lose';

                // Extract opponent's name and avatar
                const opponentName = isPlayer1 ? item.player2_name || 'Unknown Player' : item.player1_name || 'Unknown Player';
                const opponentAvatar = isPlayer1
                    ? item.player2_avatar || 'https://via.placeholder.com/64'
                    : item.player1_avatar || 'https://via.placeholder.com/64';

                return {
                    id: item.id,
                    result,
                    name: opponentName,
                    avatar: opponentAvatar,
                };
            });

            // Set history items
            setHistoryItems(formattedData);
            setIsFetching(false);
        } catch (err) {
            if (err.response?.status === 401) {
                // console.error("Authentication failed. Please check your token.");
                alert('Authentication failed. Please check your token.');
            } else {
                // console.error("An error occurred while fetching data:", err.message);
                alert('An error occurred while fetching data:', err.message);
            }
            setIsFetching(false);
        }
    };

    const { userID } = useLocalSearchParams();
    // console.log(userID, 'userId!')
    const [historyItems, setHistoryItems] = useState([]);
    useEffect(() => {
        fetchHistory(userID, setHistoryItems);
    }, [userID]);

    return (
        <ImageBackground
            style={{ flex: 1, paddingTop: 90, paddingBottom: 60, paddingHorizontal: 32, rowGap: 37 }}
            source={require('./../../assets/history-background.png')}
            resizeMode="cover"
        >
            <View style={{ position: 'absolute', top: 33, left: 17 }}>
                <BackButton onPress={() => { playClickSound(); router.back() }} />
            </View>
            <Text style={{ textAlign: 'center', fontSize: 18, color: '#0c356a', fontFamily: 'Poppins-Bold' }}>Riwayat Permainan</Text>
            {isFetching ? <HistryPlaceholder /> :
                <FlatList
                    data={historyItems}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ gap: 25 }}
                />}
        </ImageBackground>
    );
}

