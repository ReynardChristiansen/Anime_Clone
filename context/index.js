import { createContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import FavoriteItem from "../components/favoriteItem";
//create the context

//provide the context

//consume the context

export const Context = createContext(null)

const ProductContext = ({children}) =>{
    //list of products
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [favoriteItems, setFavoriteItems] = useState([])

    const addToFavorites = (productID, reason)=>{
        let cpyFavoriteItem = [...favoriteItems]
        const index = cpyFavoriteItem.findIndex(item => item.id === productID)

        if(index === -1){
            const getCurrentProductItem = products.find(item => item.id == productID)
            cpyFavoriteItem.push({
                title : getCurrentProductItem.title,
                id: productID,
                reason
            })
        }
        else{
            cpyFavoriteItem[index] ={
                ...cpyFavoriteItem[index],reason
            }
        }

        setFavoriteItems(cpyFavoriteItem)
    }

    const handleRemoveFav=(getCurrentID)=>{
        let cpyFavoriteItem = [...favoriteItems]
        cpyFavoriteItem = cpyFavoriteItem.filter(item=>item.id !== getCurrentID)
        setFavoriteItems(cpyFavoriteItem)
    }

    console.log(favoriteItems)

    useEffect(()=>{
        setLoading(true)
        async function getProductFromApi(){
            
            const apiRes = await fetch('https://dummyjson.com/products')
            const final = await apiRes.json()
            if(final){
                setTimeout(()=>{
                    setLoading(false)
                }, 2000)
                
                setProducts(final.products)
            }
            
            
        }

        getProductFromApi()
    },[])


    return(
        

        <Context.Provider value={{products, loading, addToFavorites, handleRemoveFav, favoriteItems}}>
            {children}
        </Context.Provider>
    )
}

export default ProductContext;