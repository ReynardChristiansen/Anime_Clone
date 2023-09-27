import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from "react-native-responsive-screen";
import { useEffect } from "react";
import { Pressable } from "react-native";
import {Video } from 'expo-av';
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function DetailsItem({ productDetailData}) {
    const temp = [...(productDetailData?.genres || [])];
    const x = productDetailData.description;
    const tempx = `${x}`
    const description = tempx.replace(/<br\s*\/?>|<\/br\s*\/?>|<i\s*\/?>|<\/i\s*\/?>|<b\s*\/?>|<\/b\s*\/?>/g, '');
    const [isDescriptionExpanded, setDescriptionExpanded] = useState(false); 
    const [id, setId] = useState('')
    const navParameter = useNavigation()

    const toggleDescription = () => {
      setDescriptionExpanded(!isDescriptionExpanded);
    };

    const handleOnPress = (getId)=>{
        navParameter.navigate('movieDetails',{
          movieID : getId
      })
    };

    return (
      <ScrollView style={styles.container} vertical={true}>
        <Image style={styles.pictureImage} source={{ uri: productDetailData?.image }} onError={(error) => console.error('Image loading error:', error)} />
        <Text style={styles.font}>{productDetailData.title?.english == null? productDetailData.title?.romaji : productDetailData.title?.english}</Text>
        <ScrollView style={styles.genresContainer} horizontal={true}>
          {temp.map((genre, index) => (
            <Text key={index} style={styles.genresEdit}>
              {genre}
            </Text>
          ))}
        </ScrollView>
  
        <View style={styles.descriptionEdit}>
          <Text>
            {isDescriptionExpanded ? description : description.substring(0, 200)}
          </Text>
          {description.length > 200 && (
            <TouchableOpacity onPress={toggleDescription}>
              <Text style={styles.readMoreLink}>
                {isDescriptionExpanded ? "Read Less" : "Read More"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.episodeTopContainer}>
          <Text style={styles.episodeStyle}>Episode</Text>
        </View>
          
        <View style={styles.episodeContainer}>
          
            {productDetailData.episodes?.map((episode) => (
              <TouchableOpacity key={episode.id}  onPress={()=>handleOnPress(episode.id)} >
                <Text style={styles.EpisodeEdit}>
                  {'Episode' + ' '+`${episode.number}`}
                </Text>
              </TouchableOpacity>
            ))}
          
        </View>

        

        
      </ScrollView>
    );
  }


const styles = StyleSheet.create({
  episodeStyle:{
    fontSize:18,
    fontWeight:'bold',
    marginBottom:8
  },
  episodeTopContainer:{
    marginLeft:10,
    marginRight:10,
    marginBottom: 20,
    borderBottomWidth:1,
    borderColor:"#c2c4c4"
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
    pictureImage:{
        width: "$full", 
        height: 370,
        borderRadius: 16,
        margin:10,
    },
    descriptionEdit:{
        margin:10,
        textAlign: 'justify',
        paddingBottom:20
    },
    font:{
        fontSize:28,
        fontWeight:'bold',
        margin:10,
    },
    genresEdit:{
        alignSelf: 'flex-start',
        marginRight:7,
        borderWidth:1,
        padding:3,
        borderColor:'#0377fc',
        color:'#0377fc',
        fontWeight:'bold',
        borderRadius:4
    },
    genresContainer:{
        flexDirection:'row',
        marginLeft:10,
        marginRight:10,
    },
    readMoreLink: {
        color: '#0377fc',
        flex:1,
        marginLeft: wp('70%'),
        textAlign:'right',
    },
})