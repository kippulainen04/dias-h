import { useContext } from "react";
import { ReactComponent as ShoppingSvg } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../context/cart.context";
import styled from "styled-components"

export const ShoppingIcon = styled(ShoppingSvg)`
width: 24px;
height: 24px;
`

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
            <ShoppingIcon/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainers>
    )
}

export default CartIcon;