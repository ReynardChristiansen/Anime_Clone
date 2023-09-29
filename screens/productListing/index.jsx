import {View, Text, StyleSheet, FlatList, Image, Button} from "react-native"
import { useContext } from "react"
import { Context } from "../../context"
import Icon from 'react-native-vector-icons/AntDesign';
import { ActivityIndicator } from "react-native"
import { useNavigation } from "@react-navigation/native"
import ProductListItem from "../../components/ProductListItem";

export default function ProductListing(){
    const {loading, products,currentPage, setCurrentPage} = useContext(Context) 
    const totalPages = 1200;
    const navigation = useNavigation()

    const handlePreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };

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

    return(
        <View style={styles.container}>  
            <FlatList data={products} renderItem={(itemData) => <ProductListItem title={itemData.item.title} image={itemData.item.image} onPress={()=>handleOnPress(itemData.item.id)}></ProductListItem>} keyExtractor={(itemData) =>itemData.id} numColumns={2}/>
            
            <View style={styles.bottomContainer}>
                <View style={styles.buttonContainer}>
                    <Icon name="doubleleft" color="#0377fc" size={20}  title="Previous" onPress={handlePreviousPage} disabled={currentPage === 1} />
                </View>

                <Text>{currentPage}</Text>

                <View style={styles.buttonContainer}>
                    <Icon name="doubleright" color="#0377fc" size={20} title="Next" onPress={handleNextPage} disabled={currentPage === totalPages} />
                </View>
            </View>

        </View>   
    )
}

const styles = StyleSheet.create({
    loader:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    container: {
        marginBottom: 50,
      },
      buttonContainer: {
        flex: 1,
        alignItems: "center",
      },
      bottomContainer: {
        flexDirection: "row",
        justifyContent: "space-between", 
        alignItems: "center", 
        paddingHorizontal: 30, 
        marginTop:15
      },
})