import { useState } from "react";
import { Typography } from "@mui/material";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector"
import { selectCurrentUser } from "../../store/user/user.selector"

import styled from"styled-components";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";


const PaymentFormContainer = styled.div`
height: 300px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const FormContainer = styled.form`
height: 100px;
min-width: 500px;
`

const PaymentButton = styled(Button)`
margin-left: auto;
margin-top: 30px;
`

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
                <Typography variant="h5">Credit Card Payment: </Typography>
                <CardElement />
                <br />
                <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    );
};

export default PaymentForm;