import { useState } from "react";
import { useDispatch } from "react-redux";
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import { Box, styled, TextField, Typography } from "@mui/material";



const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
})

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


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
          dispatch(emailSignInStart(email, password));
          resetFormFields();    
        } catch (error) {
          error.code === "auth/user-not-found" 
          ? alert("no user associated with this email") 
          : error.code === "auth/wrong-password" 
          ? alert("incorrect password for email") 
          : console.log(error)
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormFields({ ...formFields, [name]: value });
      };

    return (
        <div>
            <form onSubmit={handleSubmit} className="sign-in-form">
                <Typography variant="h4" style={{ fontWeight: 600, textShadow: '1px 1px 2px' }} gutterBottom> Sign in</Typography>
                <Box sx={{mb: 1}}>
                  <TextField size="small" label="Email" type="email" required name="email" onChange={handleChange} value={email}/>
                </Box>
                <Box sx={{mb: 1}}>
                  <TextField size="small" label="Password" type="password" required name="password" onChange={handleChange} value={password}/>
                </Box>
                <ButtonContainer>
                  <Button type="submit"sx={{mr: 1}}>Sign In</Button>
                  <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
                </ButtonContainer>  
            </form>
        </div>
    )
}

export default SignInForm