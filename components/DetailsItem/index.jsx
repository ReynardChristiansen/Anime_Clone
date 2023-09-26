import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from "react-native-responsive-screen";

export default function DetailsItem({ productDetailData }) {
    const temp = [...(productDetailData?.genres || [])];
    const x = productDetailData.description;
    const tempx = `${x}`
    const description = tempx.replace(/<br\s*\/?>|<\/br\s*\/?>|<i\s*\/?>|<\/i\s*\/?>|<b\s*\/?>|<\/b\s*\/?>/g, '');
    const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  
    const toggleDescription = () => {
      setDescriptionExpanded(!isDescriptionExpanded);
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

        

        
      </ScrollView>
    );
  }


const styles = StyleSheet.create({
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