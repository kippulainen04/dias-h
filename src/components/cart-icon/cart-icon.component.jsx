import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const CartIconContainers = styled('div')({
    width: '45px',
    height: '45px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
}));


const CartIcon = () => {
    const dispatch = useDispatch()

    const cartCount = useSelector(selectCartCount)
    const isCartOpen = useSelector(selectIsCartOpen)

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    return (
        <CartIconContainers onClick={toggleIsCartOpen}>
            <IconButton aria-label="cart">
                <StyledBadge badgeContent={cartCount} color="primary">
                    <ShoppingCartIcon />
                </StyledBadge>
            </IconButton>
        </CartIconContainers>
    )
}

export default CartIcon;
