import {View, Text, StyleSheet, FlatList, Pressable} from "react-native"

export default function ProductListItem({title}){
    
    return(
        <View style={styles.productItemOuterContainer}>
            <Pressable>
                <View>
                    <Text>{title}</Text>
                </View>
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    productItemOuterContainer:{
        flex:1,
        margin:16,
        height:160,
    },
    productItemInnerContainer:{
        flex:1,
        padding:15,
        justifyContent:'center',
        alignContent:'center'
    },
})