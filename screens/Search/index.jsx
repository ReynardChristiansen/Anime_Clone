import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { ActivityIndicator } from 'react-native';
import ProductListItem from '../../components/ProductListItem';
import { useNavigation } from '@react-navigation/native';

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [anime, setAnime] = useState([]);
  const navigation = useNavigation()
  const [totalPages, settotalPages] = useState(null)
  const delay = 1000;
  const [currentPage, setCurrentPage] =useState(1)
  const [x, setx] = useState(false)

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setLoading(true)
      setTimeout(()=>{
        setLoading(false)
        }, 1500)
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setLoading(true)
      setTimeout(()=>{
        setLoading(false)
        }, 1500)
    }
  };

  useEffect(() => {
    let timeoutId;
    async function getProductFromApi() {
      setTimeout(()=>{
          setx(true)
      }, 1500)

      try {
        const apiRes = await fetch(
          `https://api.consumet.org/meta/anilist/advanced-search?query=${value}&page=${currentPage}`
        );
        const final = await apiRes.json();
        setAnime(final.results);
        settotalPages(final.totalPages)
        setx(false)
        
      } catch (error) {
        console.log(error);
      }
    }

    clearTimeout(timeoutId);
    if (value.trim() !== '') {
      timeoutId = setTimeout(getProductFromApi, delay);
    }

    return () => clearTimeout(timeoutId);
  }, [value, currentPage]);

  const handleOnPress = (getId)=>{
    navigation.navigate('productDetails',{
        productID : getId
    })
  };

  if(loading){
    return(
        <ActivityIndicator style={styles.loader} color={'#0377fc'} size="large"/>
    )
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
            onChangeText={(text) => setValue(text)}
            value={value}
            style={styles.input}
            placeholder="Search..."
          />
          <Icon name="search1" color={'#b5b3b3'} size={20} />
        </View>
      </View>

        {value ? 
        (
            <View style={styles.rowContainer}>
              {anime.map((item) => (
                <View style={styles.column} key={item.id}>
                  <ProductListItem
                    title={item.title}
                    image={item.image}
                    onPress={() => handleOnPress(item.id)}
                  />
                </View>
              ))}
            </View>
          )
        : 
        <Text></Text>}
                
        {value && x==true?
        <View style={styles.bottomContainer}>
            <View style={styles.buttonContainer}>
                <Icon name="doubleleft" color="#0377fc" size={20}  title="Previous" onPress={handlePreviousPage} disabled={currentPage === 1} />
            </View>

            <Text>{currentPage}</Text>

            <View style={styles.buttonContainer}>
                <Icon name="doubleright" color="#0377fc" size={20} title="Next" onPress={handleNextPage} disabled={currentPage === totalPages} />
            </View>
        </View>
            :
        <Text></Text>
        }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between", 
    alignItems: "center", 
    paddingHorizontal: 30, 
    marginTop:15,
    marginBottom:20,
  },
  rowContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    paddingHorizontal: 2,
  },
  column: {
    width: '50%', 
    marginBottom: 10, 
  },
  container: {
    padding: 10,
    alignItems: 'center',
  },
  searchBar: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 20,
    width: 350,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    marginLeft: 20,
    width: 280,
    justifyContent: 'space-between',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
