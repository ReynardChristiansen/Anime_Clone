import {View, Text, StyleSheet, FlatList, Pressable, Image} from "react-native"
import { TouchableOpacity } from "react-native"

export default function DetailsItem({productDetailData}){
   
    return(
        <View >
            <Text>{productDetailData.id}</Text>
        </View>
    )
}


const styles = StyleSheet.create({

})