import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCartCount, selectCartItems, selectCartTotal, selectIsCartOpen } from "../../store/cart/cart.selector";
import CartItem from "../cart-item/cart-item.component";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { Button, Grid } from '@mui/material';
import { KeyboardArrowLeftOutlined } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { ReactComponent as ShoppingSvg } from "../../assets/shopping-bag.svg";


const CartItems = styled('div')({
    height: '80vh',
    display: 'flex',
    marginTop: '50px',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'scroll',
})

const ShoppingIcon = styled(ShoppingSvg)({
    width: '150px',
    height: '150px',
})

const style = {
  position: 'absolute',
  top: 0,
  right: 0,
  width: 380,
  height: '100vh',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  p: 4,
  boxShadow: 24,
};

const CartDropdown = () => {
    const dispatch = useDispatch()
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartItems = useSelector(selectCartItems);
    const cartCount = useSelector(selectCartCount)
    const cartTotal = useSelector(selectCartTotal)
    const navigate = useNavigate();
    const handleClose = () => dispatch(setIsCartOpen(!isCartOpen));

    const goToShop = () => {
        handleClose();
        navigate("/shop")
    }
        
    const handleCheckout = () => {
        navigate("/checkout")
        handleClose();
    };

    return (
            <Modal
            open={isCartOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                    <Button onClick={handleClose}>
                        <KeyboardArrowLeftOutlined />
                        <Typography variant="body1">Your Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})</Typography>
                    </Button>
                    <CartItems>
                        {cartItems.length 
                        ? (
                        cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
                        ) 
                        : ( <>
                        <ShoppingIcon size={50} />
                        <Typography variant='body1' sx={{ m: '50px auto' }}>Your shopping cart is empty</Typography>
                        </>
                        )}
                        {cartItems < 1 
                        ? (<Button variant="contained" onClick={goToShop}>Continue shopping</Button>)
                        : (<>
                    <Grid sx={{mb: 3, ml: 'auto', fontSize: 28}} >Subtotal: €{cartTotal}</Grid>
                    <Button variant="contained" onClick={handleCheckout}>Pay With Stripe</Button>
                    </>)}
                    </CartItems>
            </Box>
        </Modal>
    )
}

export default CartDropdown;