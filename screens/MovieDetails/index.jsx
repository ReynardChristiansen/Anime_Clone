import {View, Text, StyleSheet} from "react-native"
import { useRoute } from "@react-navigation/native"
import { useState } from "react"
import { ActivityIndicator } from "react-native"
import { useEffect } from "react"
import { Video } from "expo-av"
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from "react-native-responsive-screen";

export default function MovieDetails(){
    const route = useRoute()
    const {movieID} = route.params
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])

    useEffect(() => {
      setLoading(true);
    
      async function getProductFromApi() {
          if(movieID == ''){
            console.log('no movid id')
          }
          else{
            const apiRes = await fetch(`https://api.consumet.org/meta/anilist/watch/${movieID}`);
            const final = await apiRes.json();
    
            if (final) {
                setTimeout(()=>{
                        setLoading(false)
                }, 2000)

                setProducts(final);
            }
          }
          
      }
    
      getProductFromApi()
    }, []);
    
    if(loading){
        return(
            <ActivityIndicator style={styles.loader} color={'#0377fc'} size="large"/>
        )
    }

    
    

    return(
        <View>
            <Text>Hello</Text>
            
            {/* {products ? (
      <Video
        source={{
          uri:
            products?.sources[3]?.url ||
            products?.sources[products?.sources?.length - 1]?.url,
        }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="contain"
        style={{ width: wp("100%"), height: hp("30%") }}
        posterStyle={{
          resizeMode: "contain",
        }}
        
        onError={(e) => {
          console.log(e);
        }}
      />
    ) : (
      <Text>No video source available</Text>
    )} */}
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