import { useState, FormEvent, ChangeEvent } from "react";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import { useDispatch } from "react-redux";
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import styled from "styled-components";

export const SignInContainer = styled.div`
display: flex;
    flex-direction: column;
    width: 380px;

    h2{
        margin: 10px 0;
    }
`

export const ButtonsContainer = styled.div`
display: flex;
justify-content: space-between;
`

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
  const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
      dispatch(googleSignInStart());
  }


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
          dispatch(emailSignInStart(email, password));
          resetFormFields();    
        } catch (error) {
          (error as AuthError).code === AuthErrorCodes.USER_DELETED
          ? alert("no user associated with this email") 
          : (error as AuthError).code === AuthErrorCodes.INVALID_PASSWORD 
          ? alert("incorrect password for email") 
          : console.log(error)
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
    
        setFormFields({ ...formFields, [name]: value });
      };

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span> Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required name="email" onChange={handleChange} value={email}/>
                <FormInput label="Password" type="password" required name="password" onChange={handleChange} value={password}/>
                <ButtonsContainer>
                  <Button type="submit">Sign In</Button>
                  <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
                </ButtonsContainer>  
            </form>
        </SignInContainer>
    )
}

export default SignInForm