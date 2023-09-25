import {View, Text, StyleSheet, FlatList} from "react-native"
import { useContext } from "react"
import { Context } from "../../context"
import ProductListItem from "../../components/ProductListItem"

export default function ProductListing(){
    const {loading, products} = useContext(Context) 

    return(
        <View>   
            <FlatList data={products} renderItem={(itemData) => <ProductListItem title={itemData.item.title} ></ProductListItem>} keyExtractor={(itemData) =>itemData.id} numColumns={2}/>
        </View>
    )
}


const styles = StyleSheet.create({
    loader:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})