import { Text, ImageBackground, Image, TouchableOpacity, View, BackHandler, TouchableWithoutFeedback } from "react-native";
import PlayButton from "../../components/PlayButton";
import { router } from "expo-router";
import OnlineModal from "../../components/OnlineModal";
import { useState, useEffect } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { set } from "zod";


export default function SelectMode() {

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            if (modalVisible) {
                setModalVisible(false);
                return true;
            }
            return false;
        });

        return () => backHandler.remove();
    }, [modalVisible]);

    const ModalOverlay = () => {
        return (
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>

                <View style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.62)',
                    position: 'absolute',
                    zIndex: 3,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',

                }}

                >
                    <TouchableWithoutFeedback>
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <View style={{ width: '90%', paddingRight: 5 }}>
                                <Ionicons
                                    name='close-circle-outline'
                                    style={{ marginBottom: -28, zIndex: 4, alignSelf: 'flex-end', marginTop: 5 }}
                                    size={20}
                                    color={'rgba(80, 80, 80, 0.5)'}
                                    onPress={() => setModalVisible(false)}
                                ></Ionicons>
                            </View>

                            <OnlineModal />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        )
    }


    return (
        <ImageBackground
            source={require('./../../assets/background-image.png')}
            resizeMode="cover"
            style={{ flex: 1, gap: 50 }}
        >
            {modalVisible && <ModalOverlay />}
            <View style={{ paddingHorizontal: 35, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => router.push('offline')} style={{ marginBottom: 22 }}  >
                    <Image style={{ borderRadius: 8, marginBottom: -20 }} source={require('./../../assets/vs-computer.png')}></Image>
                    <PlayButton text='vs Komputer' onPress={() => router.push('offline')} size='medium'></PlayButton>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setModalVisible(true) }}>
                    <Image style={{ borderRadius: 8, marginBottom: -20 }} source={require('./../../assets/vs-player.png')}></Image>
                    <PlayButton text='vs Manusia' onPress={() => { setModalVisible(true) }} size='medium'></PlayButton>
                </TouchableOpacity>
            </View>

        </ImageBackground >
    )
}