import { Pressable, Text } from "react-native";
export default function Button({ text = 'click me!', handlePress = () => { console.log('clicked!') } }, widthtype = 'full') {
    return (<Pressable onPress={handlePress} style={[{ borderRadius: 10, padding: 5, backgroundColor: 'black' }, widthtype === 'full' ? {} : {}]}>
        <Text style={{ textAlign: 'center', color: 'white' }}>{text}</Text>
    </Pressable>)
}