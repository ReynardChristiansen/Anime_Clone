import {View, Text, StyleSheet, FlatList, Pressable, Image} from "react-native"
import { TouchableOpacity } from "react-native"

export default function ProductListItem({title, image, onPress}){
   
    return(
        <View style={styles.productItemOuterContainer}>
            
            <Pressable onPress={onPress} >
                <View> 
                    <Image source={{ uri: image}} onError={(error) => console.error('Image loading error:', error)}  style={styles.pitcureImage}/>
                    <Text  style={styles.font} numberOfLines={1}>{title.english}</Text>
                </View>
            </Pressable>
            
        </View>
    )
}


const styles = StyleSheet.create({
    productItemOuterContainer:{
        flex:1,
        margin:16,
        height:200,
    },
    productItemInnerContainer:{
        flex:1,
        padding:15,
        justifyContent:'center',
        alignContent:'center'
    },
    pitcureImage:{
        width: "$full", 
        height: 190,
        borderRadius: 5,
        
    },
    
})