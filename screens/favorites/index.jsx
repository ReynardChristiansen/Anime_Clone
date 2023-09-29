import {View, Text, StyleSheet} from "react-native"
import { Context } from "../../context"
import FavoriteItemDetails from "../../components/FavoriteItemDetails"
import { useContext } from "react"
import { FlatList } from "react-native"

export default function Favorites(){
    const {favoriteItems, handleRemoveFav} = useContext(Context)
    if(favoriteItems== ''){
        return(
            <View style={styles.nofav}>
                <Text>There is No Favorite Product</Text>
                
            </View>
        )
    }
    
    return(
        <View>
            <FlatList data={favoriteItems} renderItem={(itemData)=> <FavoriteItemDetails handleRemoveFav={handleRemoveFav} id={itemData.item.id} image={itemData.item.image} title={itemData.item.title}></FavoriteItemDetails>}numColumns={2} keyExtractor={(itemData) =>itemData.id} />
        </View>
    )
    
}

const styles = StyleSheet.create({
    nofav:{
        alignItems:'center',
        flex:1,
        justifyContent:'center',
        fontWeight:'bold'
    }
})