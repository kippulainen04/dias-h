import { useState } from "react";
import { Typography } from "@mui/material";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector"
import { selectCurrentUser } from "../../store/user/user.selector"

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";



const PaymentFormContainer = styled('div')({
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
})


const FormContainer = styled('form')({
    height: '100px',
    minWidth: '600px',
})

const PaymentButton = styled(Button)({
    marginLeft: 'auto',
    marginTop: '30px',
    marginBottom: '30px',
})

const RemindText = styled(Typography)({
    color: red[800],
})


const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal)
    const currentUser = useSelector(selectCurrentUser)
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
              alert(paymentResult.error);
          } else {
              if (paymentResult.paymentIntent.status === 'succeeded' ){
                  alert('Payment Successful')
              }
          }
    };

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <Typography variant="h5" gutterBottom>Credit Card Payment: </Typography>
                <CardElement />
                <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now €{amount}</PaymentButton>
                <RemindText variant="subtitle2" gutterBottom>*For a test card number, please try: 4242 4242 4242 4242 - 04/24 242 42424</RemindText>
            </FormContainer>
        </PaymentFormContainer>
    );
};

export default PaymentForm;