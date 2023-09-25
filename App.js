import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ProductContext from './context';
import ProductListing from './screens/productListing';
import Favorites from './screens/favorites';
import ProductDetails from './screens/productDetails';
import Search from './screens/Search';
import Icon from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function BottomTabs(){
  return(
    <Tab.Navigator>
      <Tab.Screen name="productListing"component={ProductListing}options={{title:'Anime',tabBarLabel: 'Anime',tabBarIcon: ({ color, size }) => (<Icon name="home" color={color} size={20} />),}}/>
      <Tab.Screen name="search" component={Search} options={{title:'Search',tabBarLabel: 'Search',tabBarIcon: ({ color, size }) => (<Icon name="search1" color={color} size={20} />),}}/>
      <Tab.Screen name="favorites" component={Favorites} options={{title:'Favorites',tabBarLabel: 'Favorites', tabBarIcon: ({ color, size }) => (<Icon name="heart" color={color} size={20} />),}}/>
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <ProductContext>
        <View style={styles.container}>
          <StatusBar style="auto"></StatusBar>

          <NavigationContainer>
              <Stack.Navigator>
                  <Stack.Screen options={{headerShown:false}} name="bottomTabs" component={BottomTabs}/>
                  <Stack.Screen options={{title:'Product Details'}} name="productDetails" component={ProductDetails}/>
              </Stack.Navigator>
          </NavigationContainer>
        </View>
    </ProductContext>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});