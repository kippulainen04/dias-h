import { styled } from "@mui/material/styles";
import PaymentForm from "../../components/payment-form/payment-form.component";

const CheckoutContainer = styled('div')({
    width: '55%',
    minHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '50px auto',
})

const Checkout = () => {
    return (
        <CheckoutContainer>
            <PaymentForm />
        </CheckoutContainer>
    )
}

export default Checkout;