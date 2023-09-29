import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { AirbnbRating, Rating } from "react-native-ratings";

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

    const handleOnPress = (movieIDs, productIDs)=>{
        navParameter.navigate('movieDetails',{
          movieID : movieIDs,
          productID : productIDs
      })
    };

    function calculateOutput(X) {
      let Y;
    
      if (X >= 100) {
        Y = 5;
      } else if (X >= 80) {
        Y = 4 + (X - 80) / (100 - 80); 
      } else if (X >= 60) {
        Y = 3 + (X - 60) / (80 - 60); 
      } else if (X >= 40) {
        Y = 2 + (X - 40) / (60 - 40); 
      } else if (X >= 20) {
        Y = 1 + (X - 20) / (40 - 20); 
      } else {
        Y = 0;
      }
    
      return Y;
    }

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

        <View style={styles.ratingContainer}>
          <View style={styles.detailContainer1}>
            <Rating tintColor="#f3f3f3" type='custom'ratingBackgroundColor="#e8eaeb" ratingCount={5} fractions={1} jumpValue={0.1} startingValue={calculateOutput(productDetailData?.rating)} imageSize={20}   readonly showReadOnlyText={false} showRating={false}/>
            <Text>{calculateOutput(productDetailData?.rating)}</Text>
          </View>
          <View style={styles.detailContainer2}>
            <Text>{productDetailData.status}</Text>
          </View>
          <View style={styles.detailContainer3}>
            <Text>{productDetailData.releaseDate}</Text>
          </View>
        </View>
  
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
              <TouchableOpacity key={episode.id}  onPress={()=>handleOnPress(episode.id, productDetailData.id)} >
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
  detailContainer1:{
    paddingTop:10,
    alignItems:'center',
    borderRightWidth:1,
    height:55,
    width:125,
    borderRightWidth:1,
    borderColor:"#c2c4c4"
  },
  detailContainer2:{
    paddingTop:15,
    alignItems:'center',
    borderRightWidth:1,
    height:55,
    width:125,
    borderRightWidth:1,
    borderColor:"#c2c4c4"
  },
  detailContainer3:{
    paddingTop:15,
    
    alignItems:'center',
    height:55,
    width:125,
  },
  ratingContainer:{
    marginTop:25,
    marginBottom:15,
    flex:1,
    flexDirection:'row',
    alignSelf: 'center',
    alignItems:'center'
  },
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