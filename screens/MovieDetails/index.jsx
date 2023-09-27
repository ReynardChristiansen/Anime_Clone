import {View, Text, StyleSheet} from "react-native"
import { useRoute } from "@react-navigation/native"
import { useState } from "react"
import { ActivityIndicator } from "react-native"
import { useEffect } from "react"

export default function MovieDetails(){
    const route = useRoute()
    const {movieID} = route.params
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])

    useEffect(() => {
      setLoading(true);
    
      async function getProductFromApi() {
       
          const apiRes = await fetch(`https://api.consumet.org/meta/anilist/watch/${movieID}`);
          const final = await apiRes.json();
    
          if (final) {
            setLoading(false);
            setProducts(final);
          }
      }
    
      getProductFromApi()
    }, []);
    
    console.log(products)


    if(loading){
        return(
            <ActivityIndicator style={styles.loader} color={'#0377fc'} size="large"/>
        )
    }

    return(
        <View>
            <Text>MovieDetails kontol</Text>
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