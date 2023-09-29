import {View, Text, StyleSheet, FlatList, Pressable, Image, ImageBackground} from "react-native"

export default function ProductListItem({title, image, onPress}){
    return(
        <View style={styles.productItemOuterContainer}>
            <Pressable onPress={onPress} >
                <View> 
                    <ImageBackground source={{ uri: image}} onError={(error) => console.error('Image loading error:', error)}  style={styles.pictureImage} >
                        <ImageBackground source={{ uri: image}} onError={(error) => console.error('Image loading error:', error)}  style={styles.pictureImageTemp}blurRadius={60}>
                            <Text  style={styles.font} numberOfLines={1}>{title.english == null? title.romaji: title.english }</Text>
                        </ImageBackground>
                        
                    </ImageBackground>
                </View>
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    productItemOuterContainer:{
        flex:1,
        marginLeft:16,
        marginRight:16,
        marginTop:15,
        height:200,
    },
    productItemInnerContainer:{
        flex:1,
        padding:10,
        justifyContent:'center',
        alignContent:'center'
    },
    pictureImage:{
        width: "$full", 
        height: 190,
        borderRadius: 20,
        overflow: 'hidden'
    },
    font:{
        fontWeight:'bold',
        fontSize:15,
        color:'white',
        alignItems:'center',
        justifyContent: 'center',
        marginLeft:10,
        marginTop:6
    },
    pictureImageTemp:{
        width: "$full", 
        height: 40,
        marginTop:150,
    }
    
})