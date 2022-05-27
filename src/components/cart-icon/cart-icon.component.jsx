import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../context/cart.context";
import styled from "styled-components"

export const CartIconContainers = styled.div`
width: 45px;
height: 45px;
position: relative;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
`

export const ItemCount = styled.span`
position: absolute;
font-size: 10px;
font-weight: bold;
bottom: 12px;
`


const CartIcon = () => {
    const { cartCount, isCartOpen, setIsCartOpen} = useContext(CartContext)
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)
    return (
        <CartIconContainers onClick={toggleIsCartOpen}>
            <ShoppingIcon style={{ width: 24, height: 24}}/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainers>
    )
}

export default CartIcon;