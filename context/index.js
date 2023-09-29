import { createContext, useEffect, useState } from "react";

export const Context = createContext(null)

const ProductContext = ({children}) =>{
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [favoriteItems, setFavoriteItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1);

   

    const addToFavorites = (productID)=>{
        let cpyFavoriteItem = [...favoriteItems]
        const index = cpyFavoriteItem.findIndex(item => item.id === productID)

        if(index === -1){
            const getCurrentProductItem = products.find(item => item.id == productID)
            cpyFavoriteItem.push({
                title : getCurrentProductItem.title,
                id: productID,
                image :  getCurrentProductItem.image
            })
        }
        else{
            cpyFavoriteItem[index] ={
                ...cpyFavoriteItem[index]
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
            try{
                const apiRes = await fetch(`https://api.consumet.org/meta/anilist/popular?page=${currentPage}`)
                const final = await apiRes.json()
                setLoading(false)
                setProducts(final.results)
                
            }
            catch(error){
                console.log(error)
            } 
        }

        getProductFromApi()
    },[currentPage])

    return(
        <Context.Provider value={{products, loading, addToFavorites, handleRemoveFav, favoriteItems, currentPage, setCurrentPage, }}>
            {children}
        </Context.Provider>
    )
}

export default ProductContext;