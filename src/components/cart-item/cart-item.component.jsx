import { styled } from '@mui/material/styles';
import { Button, ButtonGroup, Grid, IconButton, Typography } from "@mui/material";
import { AddOutlined, CancelPresentationOutlined, RemoveOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.action';

const StyledGridRow = styled(Grid)({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
})

const StyledGridColumn = styled(Grid)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  });

const CartItemComponent = styled(Grid)({
    width: '100%',
    display: 'flex',
    height: '90px',
    marginBottom: '30px',
    p: 4,
    
    'img': {
      width: '30%',
      height: '100%',
      borderRadius: '9px',
    }
})

const CartItem = ({cartItem}) => {
    const dispatch = useDispatch();
     
    const {name, imageUrl, price, quantity } = cartItem
    const cartItems = useSelector(selectCartItems);
   
    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));
  
    const buttons = [
        <Button key="one" onClick={removeItemHandler}><RemoveOutlined /></Button>,
        <Button key="two">{quantity}</Button>,
        <Button key="three" onClick={addItemHandler}><AddOutlined /></Button>,
      ];

    return (
        <CartItemComponent>
                <StyledGridRow item>
                    <img src={imageUrl} alt={`${name}`} />
                    <StyledGridColumn sx={{ ml: 2, width: '180px' }} >
                        <Typography variant="body1" gutterBottom>{name}</Typography>
                        <ButtonGroup size="small" aria-label="small button group">
                            {buttons}
                        </ButtonGroup>
                    </StyledGridColumn>
                    <StyledGridColumn>
                        <Typography variant="body1" gutterBottom>€{price}</Typography>
                        <IconButton sx={{ mr: 1}} edge="start" aria-label="close" size="small" onClick={clearItemHandler}>
                            <CancelPresentationOutlined fontSize="inherit" />
                        </IconButton>
                    </StyledGridColumn>
                </StyledGridRow>
        </CartItemComponent>
    )
}

export default CartItem;