import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native"
import { useRoute } from "@react-navigation/native"
import { useState } from "react"
import { ActivityIndicator } from "react-native"
import { useEffect } from "react"
import { Video } from "expo-av"
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from "react-native-responsive-screen";
import axios from "axios";
import { useRef } from "react"


export default function MovieDetails(){
    const route = useRoute()
    const {movieID, productID} = route.params
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState(null)
    const videoRef = useRef(null);
    const dub = false;
    const [anime, setAnime] = useState([])

    const numericPart = movieID.match(/\d+/);
    const episode = parseInt(numericPart[0], 10)
    

    useEffect(()=>{
        setLoading(true)
        async function getProductFromApi(){
            const apiRes = await fetch(`https://api.consumet.org/meta/anilist/info/${productID}?provider=gogoanime&dub=${dub}`)
            const final = await apiRes.json()
            
            if(final){
                setLoading(false)
                setAnime(final)
            }  
        }

        getProductFromApi()
    },[])

   useEffect(() => {
        setLoading(true)
            async function getProductFromApi() {
                // const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
                // headers: {
                //     'User-Agent': USER_AGENT,
                //     'X-Requested-With': 'XMLHttpRequest',
                // }
                try {
                    const apiRes = await axios.get(`https://api.consumet.org/meta/anilist/watch/${movieID}`); 
                    setLoading(false) 
                    setProducts(apiRes.data)
                }
                catch (error) {
                    console.log(error)
                }
            }
        getProductFromApi()
    },[])

    const setOrientation = async () => {
        const currentOrientation = await ScreenOrientation.getOrientationAsync();
    
        if (currentOrientation === ScreenOrientation.Orientation.PORTRAIT_UP) {
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
          );
        } else {
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT_UP
          );
        }
      };

    if(loading){
        return(
            <ActivityIndicator style={styles.loader} color={'#0377fc'} size="large"/>
        )
    }

    return(
        <ScrollView style={{marginTop:-2.5}} vertical={true}>
            <Video
            source={{
              uri:
                products?.sources[3].url ||
                products?.sources[products?.sources?.length - 1]?.url,
              headers: {
                Referer: products?.headers?.Referer,
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
              },
            }}
            ref={videoRef}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
            onFullscreenUpdate={setOrientation}
            style={{ width: wp("100%"), height: hp("30%") }}
            posterStyle={{
              resizeMode: "contain",
            }}
            
            shouldPlay
            useNativeControls
            onError={(e) => {
              console.log(e);
            }}
          />

            <View style={styles.episodeTopContainer}>
                <Text style={styles.episodeStyle}>Episode</Text>
            </View>

            

            
            <View style={styles.episodeContainer}>
                {anime.episodes?.map((episode) => (
                    <TouchableOpacity key={episode.id}  onPress={()=>handleOnPress(episode.id, anime.id)} >
                    <Text style={styles.EpisodeEdit}>
                        {'Episode' + ' '+`${episode.number}`}
                    </Text>
                    </TouchableOpacity>
                ))}
                
            </View>
    
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    loader:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    episodeTopContainer:{
        marginLeft:10,
        marginRight:10,
        marginBottom: 20,
        borderBottomWidth:1,
        borderColor:"#c2c4c4"
    },
    episodeStyle:{
        fontSize:18,
        fontWeight:'bold',
        marginBottom:8,
        marginTop:20
    },
    episodeContainer:{
        flex:1,
        flexWrap: 'wrap',
        flexDirection:'row',
        marginLeft:5,
        marginRight:5,
        marginBottom:25
      },
      EpisodeEdit:{
        alignSelf: 'flex-start',
        paddingLeft:9,
        borderWidth:1,
        backgroundColor:'#e8eaeb',
        padding:3,
        borderColor:'black',
        color:'black',
        borderRadius:4,
        margin:5,
        width:110,
        height:30,
        marginRight:12
      },
})