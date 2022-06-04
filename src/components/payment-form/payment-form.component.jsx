import { useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector"
import { selectCurrentUser } from "../../store/user/user.selector"

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ReactComponent as Payment } from "../../assets/stripe.svg";
import AlertInfo from "./alert-info.component";



const PaymentFormContainer = styled(Grid)(({ theme }) => ({
    display: 'flex',
    height: '70vh',
    width: '75vw',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        marginTop: '30px',
        padding: 0,
        margin: 0
      },
}))

const StyledPaper = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    marginLeft: '30px',
    [theme.breakpoints.down('md')]: {
        marginLeft: 'unset',
        marginTop: '20px'
      },
}))

const FormContainer = styled('form')({
    width: '100%',
})

const PaymentContainer = styled(Grid)({
    display: 'flex', 
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
})

const StyledTypoGraphy = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        fontSize: '20px',
        marginTop: '5px'
      },
}))
const PaymentButton = styled(Button)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginTop: '20px',
    marginBottom: '15px',
})

const Stripe = styled(Payment)(({ theme }) => ({
    width: '70vw',
    height: '70vh',
    [theme.breakpoints.down('md')]: {
        width: '50vw',
        height: '50vh',
      },
}))

const RemindText = styled(Typography)`
    background: linear-gradient(
    to right,
    #ff9966,
    #ff5e62
  );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
`


const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async (e) => {
        e.preventDefault();
        if(!stripe || !elements) { 
            return;
        }

        setIsProcessingPayment(true);

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: amount * 100 }),
          }).then((res) => {
            return res.json();
          });


          const {paymentIntent: { client_secret }} = response;

          const paymentResult = await stripe.confirmCardPayment(client_secret, {
              payment_method: {
                  card: elements.getElement(CardElement),
                  billing_details: {
                      name: currentUser ? currentUser.displayName : 'Guest',
                  },
              },
          });

          setIsProcessingPayment(false);

          if(paymentResult.error) {
              toast.error("This didn't work", paymentResult.error);
          } else {
              if (paymentResult.paymentIntent.status === 'succeeded' ){
                  toast.success('Payment Successful') && navigate("/checkout/success")
              }
          }
    };


    return (
        <PaymentFormContainer>
            <Stripe />
            <StyledPaper elevation={3}>
                <FormContainer onSubmit={paymentHandler}>
                    <PaymentContainer>
                        <StyledTypoGraphy variant="h5" gutterBottom>Credit Card Payment: </StyledTypoGraphy>
                        <AlertInfo />  
                    </PaymentContainer>             
                    <CardElement />
                    <PaymentButton 
                    isLoading={isProcessingPayment} 
                    // onClick={() => setIsProcessingPayment(true)} 
                    buttonType={BUTTON_TYPE_CLASSES.base}>
                        Pay Now €{amount}
                    </PaymentButton>
                    <RemindText variant="subtitle2" gutterBottom>*For a test card number, please try: 4242 4242 4242 4242 - 04/24 242 42424</RemindText>
                </FormContainer>
            </StyledPaper>
        </PaymentFormContainer>
    );
};

export default PaymentForm;