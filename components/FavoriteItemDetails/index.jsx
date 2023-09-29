import { View,Text, FlatList } from "react-native"
import { useContext } from "react"
import { Context } from "../../context"
import { StyleSheet } from "react-native"
import { useState, useEffect } from "react"
import { ActivityIndicator } from "react-native"
import { Pressable } from "react-native"
import { ImageBackground } from "react-native"

export default function Favorites({handleRemoveFav, id, image, title}){
    const {favoriteItems} = useContext(Context)
    const dub = false;
    const [loading, setLoading] = useState(false)


    if(loading){
        return(
            <ActivityIndicator style={styles.loader} color={'#0377fc'} size="large"/>
        )
    }
    
    if(favoriteItems== ''){
        return(
            <View style={styles.nofav}>
                <Text>There is No Favorite Product</Text>
            </View>
        )
    }
    else{
        return(
            <View style={styles.productItemOuterContainer}>
                <Pressable onPress={()=> handleRemoveFav(id)} >
                    <View> 
                        <ImageBackground source={{ uri: image}} onError={(error) => console.error('Image loading error:', error)}  style={styles.pictureImage} >
                            <ImageBackground source={{ uri: image}} onError={(error) => console.error('Image loading error:', error)}  style={styles.pictureImageTemp} blurRadius={60}>
                                <Text  style={styles.font} numberOfLines={1}>{title.english == null? title.romaji: title.english }</Text>
                            </ImageBackground>
                            
                        </ImageBackground>
                    </View>
                </Pressable>
            
                    
            </View>
        )
    }


}

const styles = StyleSheet.create({
    nofav:{
        alignItems:'center',
        flex:1,
        justifyContent:'center',
    },
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
        width: 164, 
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