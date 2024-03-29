import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ProductContext from './context';
import ProductListing from './screens/productListing';
import Favorites from './screens/favorites';
import ProductDetails from './screens/productDetails';
import Search from './screens/Search';
import Icon from 'react-native-vector-icons/AntDesign';
import { useEffect, useState } from 'react';
import MovieDetails from './screens/MovieDetails';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function BottomTabs(){
  return(
    <Tab.Navigator>
      <Tab.Screen name="productListing"component={ProductListing}options={{headerTitleAlign: 'center', title:'Home',tabBarLabel: 'Home',tabBarIcon: ({ color, size }) => (<Icon name="home" color={color} size={20} />),}}/>
      <Tab.Screen name="search" component={Search} options={{headerTitleAlign: 'center', title:'Search',tabBarLabel: 'Search',tabBarIcon: ({ color, size }) => (<Icon name="search1" color={color} size={20} />),}}/>
      <Tab.Screen name="favorites" component={Favorites} options={{headerTitleAlign: 'center', title:'Favorites',tabBarLabel: 'Favorites', tabBarIcon: ({ color, size }) => (<Icon name="heart" color={color} size={20} />),}}/>
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
                  <Stack.Screen options={{title:'Anime Details', headerTitleAlign: 'center'}} name="productDetails" component={ProductDetails}/>
                  <Stack.Screen options={{title:'Movie Details', headerTitleAlign: 'center'}} name="movieDetails" component={MovieDetails}/>
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