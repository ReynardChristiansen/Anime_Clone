import {View, Text, StyleSheet} from "react-native"
import { useRoute } from "@react-navigation/native"
import { useNavigation } from "@react-navigation/native"
import { useEffect } from "react"
import { useState } from "react"
import { ActivityIndicator } from "react-native"
import DetailsItem from "../../components/DetailsItem"




export default function ProductDetails(){
    const route = useRoute()
    const navigation = useNavigation()
    const {productID} = route.params
    const dub = false;

    const [loading, setLoading] = useState(false)
    const [productDetailData, setproductDetailData ] = useState([])

    useEffect(()=>{
        setLoading(true)
        async function getProductFromApi(){
            
                const apiRes = await fetch(`https://api.consumet.org/meta/anilist/info/${productID}?provider=gogoanime&dub=${dub}`)
                const final = await apiRes.json()
            
            if(final){
                setLoading(false)
                setproductDetailData(final)
            }  
        }

        getProductFromApi()
    },[])

    if(loading){
        return(
            <ActivityIndicator style={styles.loader} color={'#0377fc'} size="large"/>
        )
    }

    
  

    
    return(
        <View>
            <DetailsItem productDetailData={productDetailData}></DetailsItem>
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