import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { Grid } from '@mui/material';
import { styled as style } from "@mui/material/styles";
import styled from "styled-components"
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";
import PaymentForm from "../../components/payment-form/payment-form.component";

const CheckoutContainer = styled.div`
    width: 55%;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px auto 0;
`
const CheckoutHeader = styled.div`
width: 100%;
padding: 10px 0;
display: flex;
justify-content: space-between;
border-bottom: 1px solid darkgrey;
`

const HeaderBlock = style('div')({
    textTransform: 'capitalize',
    width: '23%',
    '&:last-child': {
        width: '8%'
      },
})
const Checkout = () => {

    const cartItems = useSelector(selectCartItems)
    const cartTotal = useSelector(selectCartTotal)

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock className="header-block">
                    <span>Describtion</span>
                </HeaderBlock>
                <HeaderBlock className="header-block">
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock className="header-block">
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock className="header-block">
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {cartItems.map((cartItem) => (
                        <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
            ))}
            <Grid sx={{mt: 30, ml: 'auto', fontSize: 36}} className="total">Total: ${cartTotal}</Grid>
            <PaymentForm />
        </CheckoutContainer>
    )
}

export default Checkout;