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
import { useNavigation } from "@react-navigation/native"

export default function MovieDetails(){
    const route = useRoute()
    const {movieID, productID} = route.params
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState(null)
    const videoRef = useRef(null);
    const dub = false;
    const [anime, setAnime] = useState([])
    let temp = movieID
    let filterTemp = temp.match(/\d+/);
    let setEpisodeNumber = parseInt(filterTemp[0], 10)
    const [index, setTes] = useState(setEpisodeNumber);
    const [StringMovieID, setStringMovieID] = useState(movieID)
    const [rerender, setRerender] = useState(0);

    const handleOnPress = (newMovieID, id) => {
        temp = newMovieID
        setTes(temp)
        setStringMovieID(id)
        setRerender((prevRerender) => prevRerender + 1);
      };

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
                    const apiRes = await axios.get(`https://api.consumet.org/meta/anilist/watch/${StringMovieID}`); 
                    setLoading(false) 
                    setProducts(apiRes.data)
                }
                catch (error) {
                    console.log(error)
                }
            }
        getProductFromApi()
    },[StringMovieID])

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
        <ScrollView key={rerender} style={{marginTop:-2.5}} vertical={true}>
            <Video
            source={{
              uri:
                products?.sources[3].url ||
                products?.sources[products?.sources?.length - 1]?.url,
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
                {anime.episodes?.map((episode, n) => (
                    <TouchableOpacity key={episode.id}  onPress={()=>handleOnPress(episode.number, episode.id)} >
                        {index === n+1 ?
                        <Text style={styles.EpisodeEditSpecial}>
                            {'Episode' + ' '+`${episode.number}`}
                        </Text> : 
                        
                        <Text style={styles.EpisodeEdit}>
                            {'Episode' + ' '+`${episode.number}`}
                        </Text>}
                    
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
      EpisodeEditSpecial:{
        alignSelf: 'flex-start',
        paddingLeft:9,
        borderWidth:1,
        backgroundColor:'#0377fc',
        padding:3,
        borderColor:'#0377fc',
        color:'white',
        borderRadius:4,
        margin:5,
        width:110,
        height:30,
        marginRight:12,
        shadowColor: '#171717',
        elevation: 10,
        shadowColor: 'black',
      },
})