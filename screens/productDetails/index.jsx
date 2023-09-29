import {View, Text, StyleSheet, Modal} from "react-native"
import { useRoute } from "@react-navigation/native"
import { useNavigation } from "@react-navigation/native"
import { useEffect } from "react"
import { useState } from "react"
import { ActivityIndicator } from "react-native"
import DetailsItem from "../../components/DetailsItem"

import { useContext } from "react"
import { Context } from "../../context"
import { Button } from "react-native"
import Icon from 'react-native-vector-icons/AntDesign';
import { TextInput } from "react-native"
import { Pressable } from "react-native"

export default function ProductDetails(){
    const route = useRoute()
    const navigation = useNavigation()
    const {productID} = route.params
    const dub = false;
    const [loading, setLoading] = useState(false)
    const [productDetailData, setproductDetailData ] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const {addToFavorites, favoriteItems, handleRemoveFav} = useContext(Context)
    const isCurrentItemPresent = favoriteItems.filter(item=>item.id === productID);

    useEffect(()=>{
        navigation.setOptions({
            headerRight : ()=>{
                return(
                        <Icon name={isCurrentItemPresent != ''? "heart" : "hearto"} color='#d6211c' size={23} onPress={()=>setModalVisible(true)}></Icon>
                )
            }
        })
    },[favoriteItems])

    useEffect(()=>{
        setLoading(true)
        async function getProductFromApi(){
            try{
                const apiRes = await fetch(`https://api.consumet.org/meta/anilist/info/${productID}?provider=gogoanime&dub=${dub}`)
                const final = await apiRes.json()
                setLoading(false)
                setproductDetailData(final)
            }
            catch(error){
                console.log(error)
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

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}
        >
            

            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <View style={styles.favoritesModal}>
                        <Text style={styles.fontFavoritesModal}>Add To Favorites</Text>
                        <Text style={styles.fontFavoritesModals}>Add this anime to your favorites!</Text>
                    </View>

                    <View style={styles.buttonWraps}>
                        {isCurrentItemPresent.length > 0 ? 
                        (
                            <View>
                                <Pressable
                                    style={styles.buttonClose}
                                    onPress={() => {
                                        handleRemoveFav(productID)
                                        setModalVisible(!modalVisible);
                                    }}
                                >
                                    <Text style={styles.textStyleRemove}>Remove</Text>
                                </Pressable>
                            </View>
                        ) 
                        : 
                        (
                            <View>
                                <Pressable
                                    style={styles.buttonOpen}
                                    onPress={() => {
                                        addToFavorites(productID);
                                        setModalVisible(!modalVisible);
                                    }}
                                >
                                    <Text style={styles.textStyleAdd}>Add</Text>
                                </Pressable>
                            </View>
                        )}

                        <View>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    </View>
    )
}

const styles = StyleSheet.create({
    loader:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalView: {
        
        backgroundColor: 'white',
        borderRadius: 15,
        paddingTop:20,
        alignItems: 'center',
        shadowColor: '#000',
        
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      favoritesModal:{
        paddingBottom:20,
        marginBottom:10,
        borderBottomWidth:1,
        width:280,
        borderColor:'#c2c4c4'
      },
      fontFavoritesModal:{
        fontWeight:'bold',
        textAlign:'center',
      },
      fontFavoritesModals:{
        textAlign:'center',
      },
      buttonWraps:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:200,
      },
      buttonClose:{
        
        marginBottom:20
      },
      buttonOpen:{
        
        marginBottom:20
      },
      textStyleAdd:{
        color:'#0377fc',
        fontWeight:'bold'
      },
      textStyleRemove:{
        color:'#d6211c',
        fontWeight:'bold'
      },
      textStyle:{
        fontWeight:'bold'
      }

})