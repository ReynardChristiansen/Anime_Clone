import { createContext, useEffect, useState } from "react";

export const Context = createContext(null)

const ProductContext = ({children}) =>{
    //list of products
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [favoriteItems, setFavoriteItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1);

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

    

    useEffect(()=>{
        setLoading(true)
        async function getProductFromApi(){
            
                const apiRes = await fetch(`https://api.consumet.org/meta/anilist/popular?page=${currentPage}`)
                const final = await apiRes.json()
            
            if(final){
                setLoading(false)
                setProducts(final.results)
            }  
        }

        getProductFromApi()
    },[currentPage])



    return(
        <Context.Provider value={{products, loading, addToFavorites, handleRemoveFav, favoriteItems, currentPage, setCurrentPage}}>
            {children}
        </Context.Provider>
    )
}

export default ProductContext;