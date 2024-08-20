//Hook del carrito toda la logica para el carrito
import type { Guitar,CartItem } from "../types"
import { useState, useEffect, useMemo } from "react"
import { db } from "../Data/DataBase"


export const useCart = () => {

    const initialCart = () : CartItem[]  =>{
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart): []
    }

   const [data] = useState(db) 
   const [cart, setCart] = useState(initialCart)

   const MAX_ITEM = 5
   const MIN_ITEM = 1

   useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cart))
   },[cart])
   //funcion para agregar items al carrito usando el hook useState y el prop
   function addToCart(item : Guitar){
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    if(itemExists >= 0){
        if(cart[itemExists].quantity >= MAX_ITEM) return
        const updatedCart = [...cart]
        updatedCart[itemExists].quantity++
        setCart(updatedCart)
    }else{
        const newItem : CartItem = {...item,quantity :1}
        setCart([...cart, newItem])
    }
   }

   function removeFromCart(id: Guitar['id']){
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
   }

   function increaseQuantity(id : Guitar['id']){
    const updatedCart = cart.map(item =>{
        if(item.id === id && item.quantity <MAX_ITEM ){
            return{
                ...item,
                quantity: item.quantity +1
            }
        }
        return item
    })
    setCart(updatedCart)
   }

   function decreaseQuantity(id : Guitar['id']){
    const updatedCart = cart.map(item =>{
        if(item.id === id && item.quantity > MIN_ITEM ){
            return{
                ...item,
                quantity: item.quantity -1
            }
        }
        return item
    })
    setCart(updatedCart)
   }

   function clearCart(){
    setCart([])
   }


   //funciones del header

   const isEmpty = useMemo (() => cart.length === 0,[cart])
   const carTotal = useMemo (() => cart.reduce((total, item) => total + (item.quantity * item.price),0), [cart] )

    return{
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        carTotal
    }
}

